<template>
  <div class="v-tabs">
    <el-button type="primary" v-for="(item, index) in tabList" :key="item.path">
      <!-- <span class="el-icon-close" @click="del(index)"></span> -->
      <i class="el-icon-close" @click="del(index)"></i>
      <router-link :to="item.path">{{ item.title }}</router-link>
    </el-button>
  </div>
</template>

<script>
export default {
  computed: {
    tabList() {
      return this.$store.state.tabList;
    },
  },
  methods: {
    del(index) {
      this.$store.commit("delTabItem", index);
    },
  },
};
</script>

<style lang="scss" scoped>
.v-tabs {
  margin-top: 20px;
}
::v-deep .el-button {
  padding: 6px 20px;
  text-align: center;
  border: 1px solid rgb(36, 91, 209);
  position: relative;
  .el-icon-close {
    font-size: 12px;
  }
  i {
    position: absolute;
    right: 2px;
    top: 6px;
  }
}
</style>