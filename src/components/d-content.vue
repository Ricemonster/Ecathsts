<template>
  <div class="c-content">
    <div id="main" style="height:300px;width:300px"></div>
    <div class="main-sel">
        <div class="contenta"><div class="box"></div><span class="text">35% 占总化肥</span></div>
        <div class="contenta"><div class="box"></div><span class="text">35% 占总化肥</span></div>
        <div class="contenta"><div class="box"></div><span class="text">35% 占总化肥</span></div>
    </div>
  </div>
</template>

<script>
var echarts = require('echarts')
export default {
    mounted(){
        // 初始化echarts实例
  var ayChart = echarts.init(document.getElementById('main'));
  // 绘制图表
  ayChart.setOption({
      // 弹窗
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      series: {
        name: "含量占比:", // 总标签
        type: 'pie',
        radius: '80%',
        label:{
          normal:{
            show: true, // 扇区显示文字
            position: 'inside',
            formatter:'{d}%',
            textStyle:{
              fontSize: '10'
            }
          }
        },
        data: [
          {value:25,name:"35%占总化肥"},
          {value:25,name:"40%占总化肥"},
          {value:25,name:"45%占总化肥"},
          {value:15,name:"51%占总化肥"}
        ],
        color: ['rgba(15,255,218,0.8)','rgba(255,52,48,0.5)','rgba(255,52,48,0.8)','rgba(15,255,218,0.5)'],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    })  
    }
}
</script>

<style lang="stylus" scoped>
    .c-content{
        height 100%
        width 100%
        display flex
        flex-direction row
        .main-sel{
        margin-top 300px
        display flex
        flex-direction column
        height 200px
        .contenta{
            flex-direction row
            align-items center
            width 220px
            margin-bottom 35px
        }
        .box{
            display inline-block
            height 20px
            width 45px
            background #00E9C7
        }
        .text{
            margin-top -5px
            padding-left 15px
            color #C7C9CB
        }
        }
    }
</style>
