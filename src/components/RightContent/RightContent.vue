<template>
  <div class="container">
    <!-- Header -->
    <div class="row header-bar">
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
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              fill="currentColor"
              d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z"
            ></path></svg
        ></span>
      </div>
      <div class="col-1 header-bar-item">
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
    <!-- Main Content -->
    <div id="content" class="overflow-auto main-content">
      <!-- Display Language -->
      <div class="content-header-wrapper">
        <p class="content-header">Joke Type: {{ selectedUser.jokeType }}</p>
      </div>
      <right-content-item />
    </div>
    <form class="input-bar-wrapper">
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
      </div>
    </form>
  </div>
</template>

<script>
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
    selectedUser() {
      let data = this.$store.getters.getSelectedUsers;
      return data;
    },
    isTyping: function () {
      let isTyping = this.$store.getters.isSystemTyping(this.selectedUser.id);
      return isTyping;
    },
  },
  methods: {
    sendMessage() {
      this.$store.dispatch("userReply", { msg: this.userInput });
      this.userInput = "";
    },
    scrollDown() {
      document.getElementById("content").scrollTop =
        document.getElementById("content").scrollHeight;
    },
  },
  updated() {
    this.scrollDown();
  },
};
</script>

<style scoped>
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
  height: 78vh;
  margin: auto;
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
}
</style>