<template>
  <div class="login">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <!-- 账号 -->
      <el-form-item label="账号" prop="account">
        <el-input
          type="text"
          v-model="ruleForm.account"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <!-- 密码 -->
      <el-form-item label="密码" prop="pw">
        <el-input
          type="password"
          v-model="ruleForm.pw"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <!-- 提交按钮 -->
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >登录</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { asyncRoutes } from "@/router/index.js";
import { login } from "@/api/http.js";
export default {
  data() {
    const checkPw = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("密码不能为空"));
      }
      if (!/^\w{3,5}$/i.test(value)) {
        return callback(new Error("密码在3-5位字符串"));
      }
      callback();
    };
    return {
      ruleForm: {
        account: "",
        pw: "",
      },
      rules: {
        account: [
          { required: true, message: "此项必填", trigger: "blur" },
          { min: 2, max: 5, message: "必须是2-5个字符", trigger: "blur" },
        ],
        pw: [{ validator: checkPw, trigger: "blur" }],
      },
    };
  },
  methods: {
    // 处理登录后的数据
    handleLogin(res) {
      let { code, token, role, navData } = res.data;

      if (code === 0) {
        //登录成功后，把navData存入store
        this.$store.commit("getNavData", navData);
        sessionStorage.setItem("role", role);
        //成功登录
        sessionStorage.setItem("navData", JSON.stringify(navData));
        sessionStorage.setItem("token", token);

        // 动态添加路由
        asyncRoutes();

        this.$router.push("/home");
        this.$message({
          message: "登录成功",
          type: "success",
        });
      } else {
        this.$refs["ruleForm"].resetFields();
        //登录失败
        this.$message({
          message: "登录失败",
          type: "error",
        });
      }
    },

    //处理提交
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        try {
          //登录之后处理
          if (valid) {
            //登录
            let res = await login(this.ruleForm);
            this.handleLogin(res);
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
.login {
  width: 100%;
  height: 100%;
  background-color: #2d3a4b;
  display: flex;
  justify-content: center;
  align-items: center;
  .demo-ruleForm {
    width: 600px;
    height: 300px;
    background-color: #fff;
    border-radius: 4px;
    padding: 20px;
  }
}
</style>
