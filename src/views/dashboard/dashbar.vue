<template>
  <div class="box" ref="box"></div>
</template>

<script>
//引入echarts
import * as echarts from "echarts";
export default {
  data() {
    return {
      categories: [],
      dataList: [],
    };
  },
  computed: {
    options() {
      return {
        title: {
          text: "异步数据加载示例",
        },
        tooltip: {},
        legend: {
          data: ["销量"],
        },
        xAxis: {
          data: this.categories,
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: this.dataList,
          },
        ],
      };
    },
  },
  created() {
    setTimeout(() => {
      let data = {
        categories: [
          "衬衫",
          "羊毛衫",
          "雪纺衫",
          "裤子",
          "高跟鞋",
          "袜子",
          "coat",
          "羽绒服",
        ],
        dataList: [20, 20, 36, 10, 10, 20, 100, 80],
      };
      this.categories = data.categories;
      this.dataList = data.dataList;
      this.myChart.hideLoading();
      this.myChart.setOption(this.options);
    }, 3000);
  },
  mounted() {
    this.myChart = echarts.init(this.$refs.box);
    this.myChart.setOption(this.options);
    this.myChart.showLoading();
  },
};
</script>

<style>
.box {
  width: 800px;
  height: 500px;
  border: 1px solid black;
}
</style>