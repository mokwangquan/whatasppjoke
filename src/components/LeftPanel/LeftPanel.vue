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
          class="m-auto"
          data-toggle="tooltip"
          data-placement="top"
          title="Cant think of what function to put in this :D"
        >
          <div class="custom-icon story-icon"></div>
        </span>
      </div>
      <div class="col col-xs-12 status-bar-item">
        <span
          class="m-auto"
          data-toggle="tooltip"
          data-placement="top"
          title="Cant think of what function to put in this :D"
        >
          <div class="custom-icon message-icon"></div>
        </span>
      </div>
      <div class="col col-xs-12 status-bar-item">
        <span
          class="m-auto"
          data-toggle="tooltip"
          data-placement="top"
          title="Cant think of what function to put in this :D"
        >
          <div class="custom-icon menu-icon"></div>
        </span>
      </div>
    </div>
    <!-- Search bar -->
    <div class="search-bar">
      <div class="input-group search-bar-input">
        <span class="m-auto">
          <div class="custom-icon magnify-glass-icon"></div>
        </span>
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

<style lang="scss" scoped>
.container {
  margin: 0;
  padding: 0;
  display: inline-block;
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
.search-bar-input .m-auto {
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