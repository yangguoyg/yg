<template>
  <div class="v-header">
    <div class="top">
      <p @click="toggle">
        <i class="el-icon-s-unfold" v-if="collapse"></i>
        <i class="el-icon-s-fold" v-else></i>
      </p>
      <p><el-button type="primary" @click="quit">退出登录</el-button></p>
    </div>

    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="item in breadcrumbList" :key="item">{{
        item
      }}</el-breadcrumb-item>
    </el-breadcrumb>
    <hr />
    <!-- tab标签页 -->
    <v-tabs />
  </div>
</template>

<script>
import vTabs from "./vTabs.vue";
export default {
  components: { vTabs },
  data() {
    return {
      collapse: true,
      breadcrumbList: [],
    };
  },
  methods: {
    toggle() {
      this.collapse = !this.collapse;
      this.$emit("toggle");
    },
    //退出登录
    quit() {
      sessionStorage.clear();
      this.$router.push("/login");
    },
  },
  watch: {
    $route: {
      handler(to, from) {
        // ['学生管理','班级管理',"三级内容"]
        if (to.fullPath == "/home/dashboard") {
          this.breadcrumbList = [];
          return;
        }
        if (to.matched[0].meta.title) {
          this.breadcrumbList = this.$route.matched.map(
            (record) => record.meta.title
          );
        } else {
          this.breadcrumbList = this.$route.matched.slice(1).map((record) => {
            return record.meta.title;
          });
        }
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
i {
  font-size: 30px;
}
.el-breadcrumb ::v-deep .el-breadcrumb__separator {
  color: #000 !important;
}
.top {
  display: flex;
  justify-content: space-between;
}
</style>