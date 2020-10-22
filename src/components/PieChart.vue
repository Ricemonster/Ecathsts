<template>
  <div class="c-content">
    <div id="main" style="height:300px;width:300px"></div>
    <div class="main-sel">
      <div class="contenta">
        <div class="box"></div>
        <span class="text">花生颗粒肥</span>
      </div>
      <div class="contenta">
        <div class="box" style="background:#CC2F2C;"></div>
        <span class="text">35%bb</span>
      </div>
      <div class="contenta">
        <div class="box" style="background:#028D7A;"></div>
        <span class="text">35%颗粒肥</span>
      </div>
      <div class="contenta">
        <div class="box" style="background:#822826;"></div>
        <span class="text">40%颗粒肥</span>
      </div>
      <div class="contenta">
        <div class="box" style="background:#03D7B5;"></div>
        <span class="text">其他</span>
      </div>
    </div>
  </div>
</template>

<script>
var echarts = require("echarts");
export default {
  mounted() {
    // 初始化echarts实例
    var ayChart = echarts.init(document.getElementById("main"));
    // 绘制图表
    ayChart.setOption({
      // 弹窗
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      series: {
        name: "含量占比:", // 总标签
        type: "pie",
        radius: "80%",
        label: {
          normal: {
            show: true, // 扇区显示文字
            position: "inside",
            formatter: "{d}%",
            textStyle: {
              fontSize: "10"
            }
          }
        },
        data: [
          { value: 25, name: "花生颗粒肥" },
          { value: 25, name: "35%bb" },
          { value: 25, name: "35%颗粒肥" },
          { value: 25, name: "40%颗粒肥" },
          { value: 15, name: "其他" }
        ],
        color: [
          "rgba(15,255,218,0.8)",
          "#00F0C8",
          "rgba(255,52,48,0.8)",
          "rgba(15,255,218,0.5)",
          "#88232C",
          "rgba(15,255,218,0.5)"
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      }
    });
  }
};
</script>
<style lang="stylus" scoped>
.c-content {
  margin-top: -180px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;

  .main-sel {
    margin-top: 300px;
    display: flex;
    flex-direction: column;
    height: 200px;

    .contenta {
      flex-direction: row;
      align-items: center;
      width: 220px;
    }

    .box {
      display: inline-block;
      height: 15px;
      width: 35px;
      background: #00E9C7;
    }

    .text {
      padding-left: 15px;
      color: #C7C9CB;
    }
  }
}
</style>
