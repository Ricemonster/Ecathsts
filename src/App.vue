<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      data: {
        isLoading: true,
        isAddlist: false,
        IActive: false, // 地理位置
        aLove: false
      }
    };
  },
  components: {},
  mounted() {},
  computed: {}
};
</script>
<style>
</style>
