<template>
  <div id="app">
    <head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
    </head>
    <whats-app></whats-app>
  </div>
</template>

<script lang="ts">
import WhatsApp from "./pages/WhatsApp/WhatsApp.vue";

export default {
  name: "App",
  components: {
    WhatsApp
  },
  data() {
    return {
      displayWidth: window.innerWidth,
    }
  },
  methods: {
    handleWidthChange(width) {
      this.$store.commit('setIsMobile', {isMobile: width <= 800})
    },
  },
  watch: {
    displayWidth(newValue) {this.handleWidthChange(newValue)}
  },
  mounted() {
    this.handleWidthChange(this.displayWidth)
    window.addEventListener('resize', () => this.displayWidth = window.innerWidth)
  },
  beforeDestroy() {
    window.removeEventListener('resize', () => this.displayWidth = window.innerWidth)
  },
};
</script>

<style>
</style>
