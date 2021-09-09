<template>
  <div class="outer-wrapper">
    <!-- Display content -->
    <div
      class="content-wrapper"
      :class="isSystemInput(msg.isSystemInput)"
      v-for="msg in output"
      :key="msg.index"
    >
      <div class="all-input">
        <p class="text">{{ msg.msg }}</p>
        <p class="text text-date">{{ msg.time | parseDate }}</p>
        <span class="content-lastmsg">
          <div v-if="msg.isRead || msg.isSent" class="tick-wrapper">
            <span v-if="msg.isRead">
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
            <span v-else-if="msg.isSent"
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
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    output() {
      let data = this.$store.getters.getAllMessagesForSelectedPersonId;
      return data;
    },
  },
  methods: {
    isSystemInput(check) {
      if (check) {
        return "system-input";
      } else {
        return "user-input";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}
.outer-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  overflow: auto;
}
.content-wrapper {
  margin: 6px 7px 8px 9px;
  padding: 3px 12px;
  border-radius: 7.5px;
  width: fit-content;
}
.all-input {
  margin: auto;
  font-size: 16px;
  max-width: 400px;
  display: flex;
  justify-content: flex-end;
  word-break: break-word;
}
.all-input text {
  margin: 0;
}
.user-input {
  margin-left: auto;
  margin-right: 82px;
  background-color: #d5ffc5;
}
.system-input {
  margin-left: 82px;
  background-color: white;
}
@media screen and (max-width: 800px) {
  .user-input {
    margin-right: 10px;
  }
  .system-input {
    margin-left: 10px;
  }
}
.text-date {
  margin: auto;
  margin-left: 10px;
  margin-bottom: 0;
  margin-right: 0;
  font-size: 10px;
  min-width: 50px;
}
.content-lastmsg {
  margin: auto;
  margin-left: 0;
  margin-bottom: 0;
  margin-right: 0;
  padding: 0;
}
.tick-wrapper {
  margin: auto;
  padding: 0;
  width: 20px;
}
</style>