<template>
  <div class="admin-class">
    <!-- 卡片 -->
    <el-card class="box-card">
      <!-- 卡片标题 -->
      <div slot="header" class="clearfix">
        <span>班级列表</span>

        <el-button style="float: right; padding: 3px 0" type="text"
          >批量操作</el-button
        >
        <el-button
          style="float: right; padding: 3px 0; margin-right: 30px"
          type="primary"
          @click="openAddClass"
          >新建</el-button
        >
      </div>

      <el-table
        :data="filterData()"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <!-- 实现多选的复选框 -->
        <el-table-column type="selection" width="55"> </el-table-column>

        <el-table-column type="index" label="索引号" :index="indexMethod">
        </el-table-column>
        <!-- <el-table-column prop="classId" label="classId" width="180" sortable> -->
        <el-table-column
          prop="className"
          label="班级名称"
          show-overflow-tooltip
          :filters="filterItem2"
          :filter-method="filterHandler2"
        >
        </el-table-column>

        <!-- 添加了过滤器 -->
        <el-table-column
          prop="classroom"
          label="教室名称"
          :filters="filterItem"
          :filter-method="filterHandler"
        >
        </el-table-column>
        <el-table-column prop="ht" label="班主任"> </el-table-column>

        <el-table-column prop="startDate" label="开班时间">
          <template v-slot="scope">{{
            scope.row.startDate | formatDate
          }}</template>
        </el-table-column>

        <!-- 自定义列 -->
        <el-table-column align="right">
          <template v-slot:header>
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"
            />
          </template>

          <template v-slot="scope">
            <!-- 编辑按钮 -->
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >

            <!-- 删除按钮 -->
            <el-popconfirm
              title="该内容确定删除吗？"
              @confirm="handleDelete(scope.$index, scope.row)"
            >
              <el-button size="mini" type="danger" slot="reference"
                >删除</el-button
              >
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="5"
        @current-change="currentChange"
        :current-page="page"
      >
      </el-pagination>
    </el-card>

    <!-- 新建或编辑弹窗 -->
    <add-class
      v-if="isAddClass"
      @closeWindow="closeWindow"
      :rule-form="record"
      :action="action"
    />
  </div>
</template>

<script>
import addClass from "./adminClassCom/addClass.vue";
import { selectClass, delClass } from "@/api/http.js";
export default {
  name: "adminClass",
  components: { addClass },
  data() {
    return {
      allData: [],
      tableData: [],
      total: 0,
      isAddClass: false,
      multipeSelection: [],
      // 传递给编辑弹窗的值
      record: {},
      search: "",
      // add或edit
      action: "",
      filterItem: [
        {
          text: "王屋山",
          value: "王屋山",
        },
        {
          text: "洞庭湖",
          value: "洞庭湖",
        },
      ],
      filterItem2: [
        {
          text: "H5班",
          value: "H5",
        },
        {
          text: "Java",
          value: "java",
        },
      ],
      page: 1,
    };
  },
  created() {
    this.getData(this.page);
  },
  methods: {
    openAddClass() {
      this.record = {
        className: "",
        classroom: "",
        startData: "",
        ht: "",
      };
      this.isAddClass = true;
      this.action = "add";
    },
    closeWindow(status) {
      //弹窗子组件触发弹窗自身的关闭效果(通过向父组件发送数据)

      // status=""  status="add"  status="edit"
      this.isAddClass = false;
      if (status === "add") {
        this.getData(1);
      }
      if (status === "edit") {
        this.getData(this.page);
      }
    },
    getData(page) {
      // console.log(1);
      this.loading = true;
      selectClass()
        .then((res) => {
          if (res.data.code === 0) {
            // 把接口数据存入tableData
            this.allData = res.data.list;
            this.currentChange(page);
            this.total = res.data.total;
            this.page = page;
            this.loading = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 当删除时
    onDel(row, $index) {
      console.log(scope);
    },
    // 当多选时
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 当使用表格过滤功能时
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    filterHandler2(value, row, column) {
      const property = column["property"]; //"className"
      return /^H5/i.test(row[property]);
    },

    // 编辑
    handleEdit(index, row) {
      this.isAddClass = true;
      this.action = "edit";
      this.record = JSON.parse(JSON.stringify(row));
    },

    // 删除
    handleDelete(index, row) {
      let { classId } = row;
      delClass({
        id: classId,
      })
        .then((res) => {
          if (res.data.code === 0) {
            this.$message.success("删除成功");
            this.getData(1);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //当输入关键字时，响应式数据search发生变化，触发视图更新
    filterData() {
      // search=""   search="王"  search="王屋"
      return this.tableData.filter((item) => {
        return !this.search || item.classroom.includes(this.search);
      });
    },

    //页码改变时
    currentChange(page) {
      // page=1   0-4
      // page=2   5-9
      // page=3   10-14
      this.page = page;
      let start = (page - 1) * 5;
      let end = page * 5;
      this.tableData = this.allData.slice(start, end);
    },
    //处理每页的索引
    indexMethod(index) {
      // console.log(this.page);
      // page=1   0
      // page =2  0+5
      // page =3  0+5*2
      return (this.page - 1) * 5 + index;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-table ::v-deep .warning-row {
  background: oldlace;
}

.el-table ::v-deep .success-row {
  background: #f0f9eb;
}
</style>