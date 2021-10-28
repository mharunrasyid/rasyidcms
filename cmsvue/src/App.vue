<template>
  <div>
    <index />
  </div>
</template>

<script>
import index from "./views/index.vue";

export default {
  name: "App",
  components: {
    index,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #ffffff;
}
</style>
