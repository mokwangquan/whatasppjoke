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
        error: null,
        isFetching: true,
        userIdSelected: 0,
        users: [],
        messagesArray: [],
    },

    mutations: {
        fetchUsers(state, payload) {
            state.users = payload.results
        },
        selectUser(state, payload) {
            state.userIdSelected = payload.id
        },
        addSystemMessage(state, payload) {
            state.messagesArray
            .unshift({
                userId: payload.id,
                time: Date.now(),
                isSystemInput: true,
                isSent: true,
                isRead: true,
                msg: " --- Wanna listen to a joke? ---",
            });
            if (payload.joke) {
                state.messagesArray
                    .unshift({
                        userId: payload.id,
                        time: Date.now(),
                        isSystemInput: true,
                        isSent: true,
                        isRead: true,
                        msg: payload.joke,
                    });
            }
            else {
                state.messagesArray
                    .unshift({
                        userId: payload.id,
                        time: Date.now(),
                        isSystemInput: true,
                        isSent: true,
                        isRead: true,
                        msg: payload.setup,
                    });
                state.messagesArray
                    .unshift({
                        userId: payload.id,
                        time: Date.now(),
                        isSystemInput: true,
                        isSent: true,
                        isRead: true,
                        msg: payload.delivery,
                    });
            }
        },
        addUserMessage(state, payload) {
            state.messagesArray
                .unshift({
                    userId: payload.id,
                    time: Date.now(),
                    isSystemInput: false,
                    isSent: true,
                    isRead: true,
                    msg: payload.msg,
                });
        }
    },
    actions: {
        fetchUsers(context) {
            fetch('https://reqres.in/api/users')
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                })
                .then((input) => {
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
                    context.commit('fetchUsers', { results: results });
                    context.state.isFetching = false;
                    return results;
                })
                .catch((err) => {
                    console.error(err);
                    context.state.error = err;
                });
        },
        startConversation(context, payload) {
            context.state.error = null;
            let userId = context.getters.getUserIdSelected
            if (payload.userId != null) {
                userId = payload.userId
            }
            context.state.isFetching = true;
            context.state.users[userId].isTyping = true

            fetch(`https://v2.jokeapi.dev/joke/${payload.jokeType}?blacklistFlags=nsfw,religious,political,racist,sexist,explicit`, {
                "method": "GET",
            })
                .then(response => {
                    return response.json()
                })
                .then(body => {
                    if (!body.error) context.commit('addSystemMessage', { ...body, id: userId })
                    context.state.isFetching = false;
                    context.state.users[userId].isTyping = false;
                })
                .catch(err => {
                    console.error(err);
                    context.state.error = err;
                });
        },
        userReply(context, payload) {
            context.commit('addUserMessage', { ...payload, id: context.getters.getUserIdSelected })
            context.dispatch('startConversation', { jokeType: context.getters.getSelectedUserJokeType, userId: null })
        },
    },
    getters: {
        getUserIdSelected(state) {
            return state.userIdSelected
        },
        getAllMessagesForSelectedPersonId(state, getters) {
            return state.messagesArray.filter(msg => msg.userId === getters.getUserIdSelected)
        },
        getUsers(state) {
            return state.users;
        },
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
            if (messages.length > 1) {
                return messages[0].isSent
            }
            return null

        },
        getIsRead: (state) => (id) => {
            let messages = state.messagesArray.filter(msg => msg.userId == id)
            if (messages.length > 1) {
                return messages[0].isRead
            }
            return null
        },
        getLastUpdated: (state) => (id) => {
            let messages = state.messagesArray.filter(msg => msg.userId === id)
            if (messages.length > 1) {
                return messages[0].time
            }
            return null
        },
        getLastMessage: (state) => (id) => {
            let messages = state.messagesArray.filter(msg => msg.userId == id)
            if (messages.length > 1) {
                return messages[0].msg
            }
            return null
        },
        isSystemTyping: (state) => (id) => {
            let user = state.users.filter((user) => user.id == id)
            if (user) {
                return user[0].isTyping
            }
            return null
        },
    }
})