<template>
  <div class="box">
    <div class="item item-1">
      <span class="item-title">耕地面积与占地面积比</span>
      <span class="item-title">农业人口与总人口比</span>
    </div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <!-- 耕地面积与占地面积比 -->
    <div class="gendi" :style="{ width: gendi.b + 'px' }"></div>
    <div class="longye" :style="{ width: gendi.a + 'px' }"></div>
    <!-- 农业人口与总人口比 -->
    <div class="gendi1" :style="{ width: longye.a + 'px' }"></div>
    <div class="longye1" :style="{ width: longye.b + 'px' }"></div>
  </div>
</template>

<script>
export default {
  props: ["gend"],
  data() {
    return {
      gendi: {
        a: 250,
        b: 50
      },
      longye: {
        a: 250,
        b: 100
      }
    };
  },
  mounted() {},
  watch: {
    gend(value) {
      let a = Math.round(Math.random() * 300);
      let b = Math.round(Math.random() * 300);
      this.gendi.b = a;
      this.longye.b = b;
    }
  }
};
</script>

<style lang="stylus" scoped>
.box {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 50px;

  .item {
    border-right: 1px dashed #9D9F9F;
    height: 180px;
    width: 90px;

    .item-title {
      color: #01B79C;
      font-size: 15px;
    }
  }

  .item-1 {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .gendi {
    position: absolute;
    background: #B32C29;
    top: 29px;
    z-index: 100;
    left: 95px;
    height: 25px;
    width: 310px;
  }

  .longye {
    position: absolute;
    background: #682624;
    top: 29px;
    left: 95px;
    height: 25px;
    width: 400px;
  }

  .gendi1 {
    position: absolute;
    background: #017566;
    top: 125px;
    left: 95px;
    height: 25px;
    width: 300px;
  }

  .longye1 {
    position: absolute;
    top: 125px;
    left: 95px;
    height: 25px;
    width: 200px;
    background: #00BB9E;
  }
}
</style>
