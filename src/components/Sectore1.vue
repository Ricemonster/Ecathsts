<template>
  <div class="content">
    <div id="mainaa" style="height:230px;width:250px"></div>
    <div class="text">化肥工厂与平台合作占比</div>
  </div>
</template>

<script>
export default {
  mounted() {
    // 初始化echarts实例
    var myChart = this.echarts.init(document.getElementById("mainaa"));
    var option = {
      title: {
        text: "共0户，已合\n作0户，占比\n0%",
        // subtext: '178658',
        x: "center",
        y: "center",
        textStyle: {
          fontWeight: "normal",
          fontSize: 15,
          color: "#ffffff"
        }, // 标题
        subtextStyle: {
          fontWeight: "normal",
          fontSize: 10,
          color: "#C6C9CA"
        }
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      color: ["#007060", "#00ECC8"],
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: ["50%", "65%"], // 半径
          center: ["50%", "51%"], // 位置
          label: {
            normal: {
              show: false, // 扇区显示文字
              formatter: "{b}\n  {c}",
              position: "inside"
            }
          },
          data: [
            {
              value: 0,
              name: "合作"
            },
            {
              value: 0,
              name: "未合作"
            }
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    };
    myChart.setOption(option);
  },
  methods: {}
};
</script>

<style lang="stylus" scoped>
.content {
  margin-top: 70px;
}

.text {
  font-size: 25px;
  width: 200px;
  margin-left: 100px;
  color: #ffffff;
  text-align: center;
}
</style>