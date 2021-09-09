<template>
  <div class="outer-wrapper">
    <div class="row justify-content-start">
      <!-- Left side -->
      <div class="col left-panel">
        <left-panel />
      </div>
      <!-- Right side -->
      <div class="col right-content">
        <right-content />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  components: {
    "left-panel": () => import("../components/LeftPanel/LeftPanel.vue"),
    "right-content": () => import("../components/RightContent/RightContent.vue"),
  },
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
  margin: auto;
  max-width: 30%;
  padding: 0;
}
.right-content {
  padding: 0;
}
</style>