<template>
  <div class="nav-menu">
    <div class="logo" v-if="!collapse">云和教育</div>
    <el-menu
      :default-active="$route.fullPath"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="collapse"
      :router="true"
      :collapse-transition="false"
    >
      <!-- 遍历routesList -->
      <menu-item v-for="item in routesList" :key="item.path" :item="item" />
    </el-menu>
  </div>
</template>

<script>
import menuItem from "./menuItem.vue";
export default {
  components: { menuItem },
  props: {
    collapse: Boolean,
  },
  data() {
    return {
      activeIndex: "/dashboard",
    };
  },
  computed: {
    // 通过计算属性获得navData
    routesList() {
      return this.$store.state.navData.filter((route) => !route.hidden);
    },
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
  },
  watch: {
    $route: {
      handler(to) {
        this.$store.commit("setTabList", {
          title: to.meta.title,
          path: to.fullPath,
        });
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-menu {
  border: 0 !important;
  .logo {
    width: 100%;
    height: 100px;
    font-size: 24px;
    color: #fff;
    text-align: center;
    line-height: 100px;
  }
  .home {
    color: #f00;
  }
}
</style>