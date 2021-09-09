<template>
  <div class="container">
    <!-- Status bar -->
    <div class="row status-bar">
      <div class="col col-xs-12 col-md-7">
        <img
          data-toggle="tooltip"
          data-placement="top"
          title="Cant think of what function to put in this :D"
          src="https://reqres.in/img/faces/7-image.jpg"
          class="status-bar-image"
          alt="Profile Thumbnail"
        />
      </div>
      <div class="col col-xs-12 status-bar-item">
        <span
          class="svg-wrapper"
          data-toggle="tooltip"
          data-placement="top"
          title="Cant think of what function to put in this :D"
        >
          <svg
            id="ee51d023-7db6-4950-baf7-c34874b80976"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              fill="currentColor"
              d="M12 20.664a9.163 9.163 0 0 1-6.521-2.702.977.977 0 0 1 1.381-1.381 7.269 7.269 0 0 0 10.024.244.977.977 0 0 1 1.313 1.445A9.192 9.192 0 0 1 12 20.664zm7.965-6.112a.977.977 0 0 1-.944-1.229 7.26 7.26 0 0 0-4.8-8.804.977.977 0 0 1 .594-1.86 9.212 9.212 0 0 1 6.092 11.169.976.976 0 0 1-.942.724zm-16.025-.39a.977.977 0 0 1-.953-.769 9.21 9.21 0 0 1 6.626-10.86.975.975 0 1 1 .52 1.882l-.015.004a7.259 7.259 0 0 0-5.223 8.558.978.978 0 0 1-.955 1.185z"
            ></path>
          </svg>
        </span>
      </div>
      <div class="col col-xs-12 status-bar-item">
        <span
          class="svg-wrapper"
          data-toggle="tooltip"
          data-placement="top"
          title="Cant think of what function to put in this :D"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              fill="currentColor"
              d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z"
            ></path>
          </svg>
        </span>
      </div>
      <div class="col col-xs-12 status-bar-item">
        <span
          class="svg-wrapper"
          data-toggle="tooltip"
          data-placement="top"
          title="Cant think of what function to put in this :D"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              fill="currentColor"
              d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"
            ></path>
          </svg>
        </span>
      </div>
    </div>
    <!-- Search bar -->
    <div class="search-bar">
      <div class="input-group search-bar-input">
        <span class="svg-wrapper">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              fill="currentColor"
              d="M15.009 13.805h-.636l-.22-.219a5.184 5.184 0 0 0 1.256-3.386 5.207 5.207 0 1 0-5.207 5.208 5.183 5.183 0 0 0 3.385-1.255l.221.22v.635l4.004 3.999 1.194-1.195-3.997-4.007zm-4.808 0a3.605 3.605 0 1 1 0-7.21 3.605 3.605 0 0 1 0 7.21z"
            ></path></svg
        ></span>
        <input
          type="text"
          class="form-control"
          placeholder="Not functioning yet"
          aria-label="Not functioning yet"
        />
      </div>
    </div>
    <div class="overflow-auto item-list">
      <left-panel-item
        v-for="user in users"
        :key="user.id"
        :id="user.id"
        :img="user.avatar"
        :name="user.firstName"
      />
      <div class="credit-text">
        <p>
          Built with VueJS by
          <a href="https://mokwangquan.github.io/mokwangquan/" target="_blank"
            >Mok</a
          >
          <br />With the help of
          <a href="https://sv443.net/jokeapi/v2/" target="_blank">JokeAPI</a>
          and
          <a href="https://reqres.in/" target="_blank">ReqRes.in</a>
          <br />
        </p>
        <p style="font-size: 12px; line-height: 1">
          ***This is built for learning purpose <br />Yeah I know there is
          always improvement to be done. <br />Don't judge k?
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    "left-panel-item": () => import("./LeftPanelItem.vue"),
  },
  data: function () {
    return {};
  },
  computed: {
    users() {
      let data = this.$store.getters.getUsers;
      return data;
    },
  },
  beforeMount() {
    this.$store.dispatch("fetchUsers");
  },
  mounted() {
    setInterval(() => {
      let randomNumber = ~~(0 + Math.random() * 5);
      // prevent random chat from selected user
      if (randomNumber === this.$store.getters.getUserIdSelected) {
        if (randomNumber === 0) {
          randomNumber = 5;
        } else {
          randomNumber--;
        }
      }
      let user = this.users.find((user) => user.id === randomNumber);
      this.$store.dispatch("startConversation", {
        jokeType: user.jokeType,
        userId: user.id,
      });
    }, 5000);
  },
};
</script>

<style scoped>
.container {
  margin: 0;
  padding: 0;
  display: inline-block;
}
.svg-wrapper {
  margin: auto;
  color: #919191;
}
.status-bar {
  background-color: #ededed;
  padding: 0.5rem 0;
  margin: auto;
  border-right: 1px solid #f6f6f6;
}
.status-bar-image {
  width: 43px;
  border-radius: 50%;
}
.status-bar-item {
  display: flex;
  align-content: center;
  justify-content: center;
  margin: auto;
  margin-left: 0;
  margin-right: 0;
  padding: 0;
  max-width: 13%;
}
.search-bar {
  background-color: #f6f6f6;
  margin: auto;
  height: 49px;
  display: flex;
  align-content: center;
  justify-content: center;
}
.search-bar-input {
  background-color: white;
  max-width: 95%;
  margin: auto;
  display: flex;
  align-content: center;
  justify-content: center;
  border-radius: 1rem;
}
.search-bar-input .svg-wrapper {
  padding: 0 0.5rem 0 1rem;
}
.search-bar-input input {
  height: 2rem;
  border: none;
  border-radius: 1rem;
}
.item-list {
  height: 83vh;
  display: flex;
  flex-direction: column;
}
.credit-text {
  text-align: center;
}
/* Scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: white;
}
::-webkit-scrollbar-thumb {
  background: #cccccc;
}
</style>