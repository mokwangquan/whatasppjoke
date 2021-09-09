<template>
  <div class="container" @click="isMobile ? openContentForMobile(id) : selectUser(id)">
    <div class="row" :class="isSelectedUser ? 'selected-user' : ''">
      <div class="col image-wrapper">
        <img :src="img" class="profile-image" alt="Profile Thumbnail" />
      </div>
      <div class="col content-wrapper">
        <div class="row justify-content-between content-name">
          <h2 class="col">{{ name }}</h2>
          <p class="col-3 date">{{ lastUpdated | parseDate }}</p>
        </div>
        <div class="row content-lastmsg">
          <div v-if="isRead || isSent" class="col col-1 tick-wrapper">
            <span v-if="isRead">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 18 18"
                width="18"
                height="18"
              >
                <path
                  fill="currentColor"
                  d="M17.394 5.035l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-.427-.388a.381.381 0 0 0-.578.038l-.451.576a.497.497 0 0 0 .043.645l1.575 1.51a.38.38 0 0 0 .577-.039l7.483-9.602a.436.436 0 0 0-.076-.609zm-4.892 0l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-2.614-2.556a.435.435 0 0 0-.614.007l-.505.516a.435.435 0 0 0 .007.614l3.887 3.8a.38.38 0 0 0 .577-.039l7.483-9.602a.435.435 0 0 0-.075-.609z"
                ></path>
              </svg>
            </span>
            <span v-else-if="isSent"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 14 18"
                width="14"
                height="18"
              >
                <path
                  fill="currentColor"
                  d="M12.502 5.035l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-2.614-2.556a.435.435 0 0 0-.614.007l-.505.516a.435.435 0 0 0 .007.614l3.887 3.8a.38.38 0 0 0 .577-.039l7.483-9.602a.435.435 0 0 0-.075-.609z"
                ></path></svg
            ></span>
          </div>
          <div class="col msg-wrapper">
            <p v-if="!isTyping">{{ lastMsg | trimText }}</p>
            <p>{{ isTyping ? 'typing...' : '' }}</p>
          </div>
        </div>
      </div>
    </div>
    <hr class="divider" />
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

<style scoped>
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
}
.row:hover {
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
}
.content-name {
  margin: 0;
  padding: 0;
}
.date {
  text-align: right;
}
.content-lastmsg {
  margin: auto;
  padding: 0;
}
.tick-wrapper {
  margin: auto;
  padding: 0;
  width: 20px;
}
.msg-wrapper {
  margin: auto;
  margin-top: 5px;
  padding: 0;
}
.divider {
  margin: 0;
  padding: 0;
  width: 80%;
  float: right;
}
</style>