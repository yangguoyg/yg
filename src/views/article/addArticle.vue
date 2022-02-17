<template>
  <div id="app">
    <!-- 表单 -->
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
    <!-- 文章标题 -->
      <el-form-item label="文章标题" prop="title">
        <el-input
          type="text"
          v-model="ruleForm.title"
          autocomplete="off"
        ></el-input>
      </el-form-item>

    <!-- 文章作者 -->
      <el-form-item label="文章作者" prop="author">
        <el-input
          type="text"
          v-model="ruleForm.author"
          autocomplete="off"
        ></el-input>
      </el-form-item>

    <!-- 文章描述 -->
      <el-form-item label="文章描述" prop="introduce">
        <el-input
          type="text"
          v-model="ruleForm.introduce"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <!-- 文章内容 -->
      <el-form-item label="文章内容">
        <!-- 封装的富文本编辑器组件 -->
        <editor @change="change"></editor>
      </el-form-item>

      <!-- 提交按钮 -->
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 封装的富文本编辑器组件
import editor from "./editor.vue";
import { addArticle } from "@/api/http.js";
export default {
  components: { editor },
  data() {
    return {
      ruleForm: {
        title: "",
        author: "",
        introduce: "",
        content: "",
      },
      rules: {},
    };
  },
  methods: {
    //提交富文本编辑器的内容
    change(html) {
      this.ruleForm.content = html;
    },
    //处理提交
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        try {
          //登录之后处理
          if (valid) {
            let res = await addArticle(this.ruleForm);
            if (res.data.code == 0) {
              this.$message.success("添加成功");
            }
            return;
          }
          console.log("error submit!!");
          return false;
        } catch (err) {
          console.log(err);
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>