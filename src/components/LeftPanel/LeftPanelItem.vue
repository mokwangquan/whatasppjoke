<template>
  <div class="container" @click="isMobile ? openContentForMobile(id) : selectUser(id)">
    <div class="row" :class="isSelectedUser ? 'selected-user' : ''">
      <div class="col image-wrapper">
        <img :src="img" class="profile-image" alt="Profile Thumbnail" />
      </div>
      <div class="col content-wrapper">
        <div class="row justify-content-between m-0 p-0">
          <h2 class="col">{{ name }}</h2>
          <p class="col-3 date">{{ lastUpdated | parseDate }}</p>
        </div>
        <div class="row m-auto p-0">
          <div class="col col-1 m-auto p-0">
            <div v-if="isRead" class="mt-0 custom-icon double-tick-icon w-75"></div>
            <div v-else-if="isSent" class="mt-0 custom-icon single-tick-icon w-75"></div>
          </div>
          <div class="col m-auto p-0">
            <p v-if="!isTyping">{{ lastMsg | trimText }}</p>
            <p>{{ isTyping ? 'typing...' : '' }}</p>
          </div>
        </div>
      </div>
    </div>
    <hr class="divider p-0 m-0 mt-auto" />
  </div>
</template>

<script>
import { EventBus } from "../../utils/EventBus"
export default {
  props: {
    id: Number,
    img: String,
    name: String,
  },
  data: function () {
    return {};
  },
  computed: {
    isMobile() {return this.$store.getters.getIsMobile},
    isRead() {return this.$store.getters.getIsRead(this.id)},
    isSent() {return this.$store.getters.getIsSent(this.id)},
    lastUpdated() {return this.$store.getters.getLastUpdated(this.id)},
    lastMsg() {return this.$store.getters.getLastMessage(this.id)},
    isSelectedUser() {return this.id === this.$store.getters.getUserIdSelected},
    isTyping() {return this.$store.getters.isSystemTyping(this.id)},
  },
  methods: {
    selectUser(id) {this.$store.commit("selectUser", { id: id })},
    openContentForMobile(id) {
      this.selectUser(id)
      EventBus.$emit('toggleDialog');
    }
  },
};
</script>

<style lang="scss" scoped>
h2 {
  font-size: 17px;
  margin: auto;
  padding: 0;
}
p {
  font-size: 13px;
  margin: auto;
  padding: 0;
  color: rgba(0, 0, 0, 0.8);
}

.container {
  padding: 0;
  max-height: 86px;
}
.selected-user {
  background-color: #ededed;
}
.row {
  max-width: 100%;
  margin: auto;
  min-height: 20px;
  cursor: pointer;
}
.image-wrapper {
  margin: auto;
  padding: 0;
  max-width: 17%;
}
.profile-image {
  display: block;
  margin: auto;
  width: 50px;
  border-radius: 50%;
}
.content-wrapper {
  margin: 12px 4px;
  padding: 0;
  height: 50px;
}
.date {
  text-align: right;
}
.divider {
  width: 85%;
  float: right;
}
</style>