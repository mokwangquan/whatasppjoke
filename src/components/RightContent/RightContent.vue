<template>
  <div class="container vh-100">
    <!-- Header -->
    <div class="row header-bar">
      <i v-if="isMobile" class="col-1 m-auto p-auto bi bi-arrow-left-circle-fill" @click="handleBackButton"></i>
      <div class="col header-bar-image-wrapper">
        <img :src="selectedUser.avatar" alt="Profile Thumbnail" />
      </div>
      <div class="col header-bar-text-wrapper">
        <h2 class="row">{{ selectedUser.firstName }}</h2>
        <p class="row">{{ isTyping ? "typing..." : "online" }}</p>
      </div>
      <div class="col-1 header-bar-item">
        <span
          data-testid="search-alt"
          data-icon="search-alt"
          class="svg-wrapper"
          data-toggle="tooltip"
          data-placement="top"
          title="Still working it :O"
          >
            <div class="custom-icon magnify-glass-icon"></div>
          </span>
      </div>
      <div class="col-1 header-bar-item">
        <span
          class="svg-wrapper"
          data-toggle="tooltip"
          data-placement="top"
          title="Cant think of what function to put in this :D"
        >
          <div class="custom-icon menu-icon"></div>
        </span>
      </div>
    </div>
    <!-- Main Content -->
    <div id="content" class="overflow-auto main-content">
      <!-- Display Language -->
      <div class="content-header-wrapper">
        <p class="content-header">Joke Type: {{ selectedUser.jokeType }}</p>
      </div>
      <right-content-item />
    </div>
    <form class="d-flex row input-bar-wrapper">
      <div class="input-group">
        <textarea
          class="form-control"
          placeholder="Key in something"
          aria-label="Key in something"
          v-model="userInput"
          @keydown.enter.exact.prevent
          @keyup.enter.exact="sendMessage"
          @keydown.enter.shift.exact="newline"
        />
        <button v-if="isMobile" class="col-1" type='submit' @click.prevent="sendMessage">
          <i class="bi bi-arrow-right-circle-fill"></i>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { EventBus } from "../../utils/EventBus"

export default {
  components: {
    "right-content-item": () => import("./RightContentItem.vue"),
  },
  data: function () {
    return {
      userInput: "",
    };
  },
  computed: {
    isMobile() {return this.$store.getters.getIsMobile},
    selectedUser() {return this.$store.getters.getSelectedUsers},
    isTyping: function () {
      let isTyping = this.$store.getters.isSystemTyping(this.selectedUser.id);
      return isTyping;
    },
  },
  methods: {
    sendMessage() {
      if (this.userInput === '') return
      this.$store.dispatch("userReply", { msg: this.userInput });
      this.userInput = "";
    },
    scrollDown() {
      document.getElementById("content").scrollTop =
        document.getElementById("content").scrollHeight;
    },
    handleBackButton() {
      EventBus.$emit('toggleDialog');
    }
  },
  updated() {this.scrollDown()},
};
</script>

<style lang="scss" scoped>
h2 {
  font-size: 17px;
  margin: 0;
  padding: 0;
}
p {
  font-size: 13px;
  margin: 0;
  color: rgba(0, 0, 0, 0.8);
}
.container {
  margin: 0;
  padding: 0;
}
.svg-wrapper {
  margin: auto;
  color: #919191;
}
.header-bar {
  background-color: #ededed;
  padding: 0.5rem 0;
  margin: auto;
  border-right: 1px solid #f6f6f6;
}
.header-bar-image-wrapper {
  max-width: 80px;
}
.header-bar-image-wrapper img {
  margin: 0 10px;
  width: 43px;
  border-radius: 50%;
}
.header-bar-text-wrapper {
  padding: 0;
}
.header-bar-item {
  display: flex;
  align-content: center;
  justify-content: center;
  margin: auto;
  margin-left: 0;
  margin-right: 0;
  padding: 0;
  max-width: 4.5%;
}
.main-content {
  background-image: url("https://i.pinimg.com/originals/e8/d9/4e/e8d94e1e8b6b530ad315e9385290141b.jpg");
  height: 80vh;
  margin: auto 0;
  display: flex;
  justify-content: center;
  align-content: center;
}
.content-header-wrapper {
  position: fixed;
  margin: auto;
  padding: 5px 0;
}
.content-header {
  background-color: #e1f1fb;
  margin: auto;
  padding: 5px 12px 6px;
  border-radius: 7.5px;
  font-size: 12.5px;
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
.input-bar-wrapper {
  background-color: #ededed;
  padding: 0.5rem 0.5rem;
  margin: auto;
  border-right: 1px solid #f6f6f6;
  button {
    border: none;
    width: 20px;
  }
}
</style>