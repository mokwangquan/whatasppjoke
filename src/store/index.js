import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const jokeTypes = [
    'Programming',
    'Miscellaneous',
    'Dark',
    'Pun',
    'Spooky',
    'Christmas',
]

export default new Vuex.Store({
    state: {
        isMobile: false,
        error: null,
        isFetching: true,
        userIdSelected: 0,
        users: [],
        messagesArray: [],
    },
    getters: {
        getIsMobile(state) {return state.isMobile},
        getUserIdSelected(state) {return state.userIdSelected},
        getAllMessagesForSelectedPersonId(state, getters) {
            return state.messagesArray.filter(msg => msg.userId === getters.getUserIdSelected)
        },
        getUsers(state) {return state.users},
        getSelectedUsers(state, getters) {
            let data = state.users.filter(user => user.id === getters.getUserIdSelected)
            return data[0]
        },
        getSelectedUserJokeType(_, getters) {
            let data = getters.getSelectedUsers.jokeType
            return data
        },
        getIsSent: (state) => (id) => {
            let messages = state.messagesArray.filter(msg => msg.userId == id)
            if (messages.length > 1) {return messages[0].isSent}
            return null
        },
        getIsRead: (state) => (id) => {
            let messages = state.messagesArray.filter(msg => msg.userId == id)
            if (messages.length > 1) {return messages[0].isRead}
            return null
        },
        getLastUpdated: (state) => (id) => {
            let messages = state.messagesArray.filter(msg => msg.userId === id)
            if (messages.length > 1) {return messages[0].time}
            return null
        },
        getLastMessage: (state) => (id) => {
            let messages = state.messagesArray.filter(msg => msg.userId == id)
            if (messages.length > 1) {return messages[0].msg}
            return null
        },
        isSystemTyping: (state) => (id) => {
            let user = state.users.filter((user) => user.id == id)
            if (user) {return user[0].isTyping}
            return null
        },
    },
    actions: {
        fetchUsers({state, commit}) {
            fetch('https://reqres.in/api/users')
                .then((response) => {
                    if (response.ok) {return response.json();}
                }).then((input) => {
                    const users = input.data
                    const results = [];
                    for (const id in users) {
                        results.push({
                            id: users[id].id - 1,
                            firstName: users[id].first_name,
                            avatar: users[id].avatar,
                            isTyping: false,
                            jokeType: jokeTypes[id],
                        });
                    }
                    commit('fetchUsers', { results: results });
                    state.isFetching = false;
                    return results;
                }).catch((err) => {
                    console.error(err);
                    state.error = err;
                });
        },
        startConversation({state, getters, commit}, payload) {
            state.error = null;
            let userId = getters.getUserIdSelected
            if (payload.userId != null) {userId = payload.userId}
            state.isFetching = true;
            state.users[userId].isTyping = true

            fetch(`https://v2.jokeapi.dev/joke/${payload.jokeType}?blacklistFlags=nsfw,religious,political,racist,sexist,explicit`, {
                "method": "GET",
            })
            .then(response => {return response.json()})
            .then(body => {
                if (!body.error) commit('addMessage', { ...body, id: userId, isSystem: true })
                state.isFetching = false;
                state.users[userId].isTyping = false;
            })
            .catch(err => {
                console.error(err);
                state.error = err;
            });
        },
        userReply({getters, dispatch, commit}, payload) {
            commit('addMessage', 
                { ...payload, id: getters.getUserIdSelected, isSystem: false })
            dispatch('startConversation', 
                { jokeType: getters.getSelectedUserJokeType, userId: null })
        },
    },
    mutations: {
        setIsMobile(state, payload) {Object.assign(state, {isMobile: payload.isMobile})},
        fetchUsers(state, payload) {Object.assign(state, {users: payload.results})},
        selectUser(state, payload) {Object.assign(state, {userIdSelected: payload.id})},
        addMessage(state, payload) {
            let newArray = Object.assign([], state.messagesArray)
            addMessage(newArray, payload, payload.isSystem)
            Object.assign(state, {messagesArray: newArray})
        }
    },
})

function addMessage(array, payload) {
    const obj = {
        userId: payload.id,
        time: Date.now(),
        isSystemInput: payload.isSystem,
        isSent: true,
        isRead: true,
        msg: payload.isSystem ? " --- Wanna listen to a joke? ---" : payload.msg,
    }
    array.unshift(Object.assign({}, obj))
    
    if (payload.joke && payload.isSystem) {
        obj.msg = payload.joke
        array.unshift(Object.assign({}, obj))
    }
    else if (payload.isSystem) {
        obj.msg = payload.setup
        array.unshift(Object.assign({}, obj))
        obj.msg = payload.delivery
        array.unshift(Object.assign({}, obj))
    }
}