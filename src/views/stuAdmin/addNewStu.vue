<template>
  <el-card class="add-student">
    <!-- 卡片的标题 -->
    <div slot="header" class="clearfix">
      <span>新增学生信息</span>
    </div>

    <el-form ref="form11" :model="form" label-width="120px">
      <el-row>
        <!-- 左列 -->
        <el-col :span="8">
          <!-- 学生姓名 -->
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>

          <!-- 班级 -->
          <el-form-item label="班级" prop="classId">
            <el-select v-model="form.classId" placeholder="请选择班级">
              <el-option
                v-for="item in classList"
                :key="item.classId"
                :label="item.className"
                :value="item.classId"
              ></el-option>
            </el-select>
          </el-form-item>

          <!-- 年龄 -->
          <el-form-item label="年龄" prop="age">
            <el-input v-model="form.age"></el-input>
          </el-form-item>

          <!-- 性别 -->
          <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="form.gender">
              <el-radio label="0">男</el-radio>
              <el-radio label="1">女</el-radio>
              <el-radio label="2">其他</el-radio>
            </el-radio-group>
          </el-form-item>

          <!-- 电话 -->
          <el-form-item label="电话" prop="tel">
            <el-input v-model="form.tel"></el-input>
          </el-form-item>

          <!-- 身份证号 -->
          <el-form-item label="身份证号" prop="idCard">
            <el-input v-model="form.idCard"></el-input>
          </el-form-item>

          <!-- 住址 -->
          <el-form-item label="住址" prop="address">
            <el-input v-model="form.address"></el-input>
          </el-form-item>
        </el-col>
        <!-- 右列 -->
        <el-col :span="12" :offset="4">
          <!-- 照片 -->
          <el-form-item label="照片" prop="imgUrl">
            <el-upload
              class="avatar-uploader"
              action="http://localhost:3000/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :headers="headers"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <!-- 缴费金额 -->
          <el-form-item label="pay" prop="pay">
            <el-input v-model="form.pay"></el-input>
          </el-form-item>

          <!-- 缴费状态 -->
          <el-form-item label="缴费状态" prop="payStatus">
            <el-radio-group v-model="form.payStatus">
              <el-radio label="1">试听</el-radio>
              <el-radio label="2">欠费</el-radio>
              <el-radio label="3">已缴费</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-button type="primary" @click="submitForm('form11')"
            >提交</el-button
          >
        </el-col>
        <el-col :span="12">
          <el-button type="primary" @click="resetForm('form11')"
            >重置</el-button
          >
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>

<script>
import { selectClassByStatus, addNewStudent, editStudent } from "@/api/http.js";
export default {
  data() {
    return {
      form: {
        name: "",
        classId: "",
        age: "",
        gender: "",
        tel: "",
        idCard: "",
        address: "",
        imgUrl: "",
        pay: 0,
        payStatus: "1",
      },
      imageUrl: "",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      classList: [],
      action: "",
    };
  },
  created() {
    // 页面初始化时，请求未开班的班级信息
    this.getClassInfo();
    let { row, action } = this.$route.params;

    if (action === "edit") {
      this.form = row;
      this.form.gender = row.gender.toString();
      this.form.payStatus = row.payStatus.toString();
      this.action = action;
      this.imageUrl = "http://localhost:3000/upload/" + this.form.imgUrl;
    }
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    // 处理上传成功之后的代码
    handleAvatarSuccess(res, file) {
      //URL.createObjectURL 会基于提供的文件信息,生成一个可用的文件的url地址
      this.imageUrl = URL.createObjectURL(file.raw);
      this.form.imgUrl = res.url;
    },
    //处理上传之前格式和尺寸的验证
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      //return true,则继续完成上传的逻辑,return false, 终止上传的任务
      return isJPG && isLt2M;
    },
    //初始化时获取未开班的班级信息
    getClassInfo() {
      //0表示未开班
      selectClassByStatus(0)
        .then((res) => {
          let { code, list } = res.data;
          if (code === 0) {
            this.classList = list;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 新增的处理
    handleAdd() {
      // 提交表单数据
      addNewStudent(this.form)
        .then((res) => {
          let { code } = res.data;
          if (code === 0) {
            this.$message.success("添加成功");
            this.$router.push("/stuAdmin/stuInfo");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 编辑的处理
    handleEdit() {
      //提交表单数据
      editStudent(this.form)
        .then((res) => {
          let { code } = res.data;
          if (code === 0) {
            this.$message.success("编辑成功");
            this.$router.push({
              name: "stuInfo",
              params: {
                page: this.$route.params.page,
              },
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //提交表单时
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.action === "edit" ? this.handleEdit() : this.handleAdd();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置表单
    resetForm(formName) {
      this.imageUrl = "";
      this.$refs["form11"].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.el-card ::v-deep .el-form {
  // width: 800px;
}

// 缩略图样式
.avatar-uploader ::v-deep .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader ::v-deep .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>