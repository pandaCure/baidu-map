<template>
  <BaiduMap ak="0uY8LQ30t3XTCHet9btqqjLl9dEMrPTm" :center="center" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BaiduMap from "./components/BaiduMap.vue";

export default defineComponent({
  name: "App",
  components: {
    BaiduMap,
  },
  data() {
    return {
      center: {
        lng: 116.404,
        lat: 39.915,
      },
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
}
</style>
