<template>
  <div id="app">
    <head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
    </head>
    <whats-app></whats-app>
  </div>
</template>

<script>
import WhatsApp from "./pages/WhatsApp.vue";

export default {
  name: "App",
  components: {
    WhatsApp,
  },
};
</script>

<style>
</style>
