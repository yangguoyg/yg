<template>
  <div class="article">
    <el-table :data="tableData" style="width: 100%">
      <!-- 文章标题 -->
      <el-table-column prop="title" label="title" width="180">
        <template v-slot="scope">
          <router-link
            :to="'/article/detail?articleId=' + scope.row.articleId"
            >{{ scope.row.title }}</router-link
          >
        </template>
      </el-table-column>

      <!-- 文章作者 -->
      <el-table-column prop="author" label="author" width="180">
      </el-table-column>

      <!-- 文章简介 -->
      <el-table-column prop="introduce" label="简介"> </el-table-column>

      <!-- 操作 -->
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
          <el-popconfirm title="内容确定删除吗？" @confirm="handleDelete()">
            <el-button type="primary" slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { selectArticle } from "@/api/http";
export default {
  data() {
    return {
      tableData: [],
    };
  },
  components: {},
  created() {
    this.getData();
  },
  computed: {},
  methods: {
    async getData() {
      let res = await selectArticle();
      this.tableData = res.data.list;
    },
    edit(row) {
      this.$router.push({
        path: "/article/editArticle",

        // 实际开发场景中，不一定会把当前记录以传参的形式全部传给编辑页面
        // 更多的实现的只传id
        query: {
          row,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>