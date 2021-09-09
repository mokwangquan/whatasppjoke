<template>
  <div class="outer-wrapper">
    <!-- NOT mobile view -->
    <div v-if="!isMobile" class="row justify-content-start">
      <!-- Left side -->
      <div class="col left-panel">
        <left-panel />
      </div>
      <!-- Right side -->
      <div class="col right-content">
        <right-content />
      </div>
    </div>

    <!-- Mobile view -->
    <div v-else>
      <left-panel v-if="!shouldDisplayContent" keep-alive />
      <!-- Dialog -->
      <right-content v-else keep-alive />
    </div>
  </div>
</template>

<script lang="ts">
import { EventBus } from "../../utils/EventBus"

export default {
  components: {
    "left-panel": () => import("../../components/LeftPanel/LeftPanel.vue"),
    "right-content": () => import("../../components/RightContent/RightContent.vue"),
  },
  data() {
    return {
      shouldDisplayContent: false,
    }
  },
  computed: {
    isMobile() {return this.$store.getters.getIsMobile},
  },
  mounted() {
    EventBus.$on('toggleDialog', () => this.shouldDisplayContent = !this.shouldDisplayContent);
  }
};
</script>

<style scoped>
.outer-wrapper {
  margin: 0;
  padding: 0;
  width: 100%;
}
.row {
  margin: auto;
}

/* Left Panel CSS */

.left-panel {
  max-width: 30%;
  padding: 0;
}
.right-content {
  padding: 0;
}

.dialog-wrapper {
}
</style>