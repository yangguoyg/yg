<template>
  <div class="stu-info">
    <!-- 学生信息查询 -->
    <select-stu-info @send="getData" />
    <!-- 学生信息展示 -->
    <show-stu-info :parent-table-data="parentTableData" />
  </div>
</template>

<script>
import selectStuInfo from "@/views/stuAdmin/stuInfoCom/selectStuInfo.vue";
import ShowStuInfo from "@/views/stuAdmin/stuInfoCom/showStuInfo.vue";
export default {
  components: { selectStuInfo, ShowStuInfo },
  data() {
    return {
      parentTableData: [],
    };
  },
  methods: {
    getData(data) {
      this.parentTableData = data;
    },
  },
};
</script>

<style>
</style>