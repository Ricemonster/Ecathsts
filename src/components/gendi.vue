<!--
 * @Author: your name
 * @Date: 2020-06-10 09:01:44
 * @LastEditTime: 2020-06-11 16:05:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \echartsaaaa\src\components\gendi.vue
--> 
<template>
  <div class="page">
    <div class="box">
      <div class="item">
        <div class="item-box"></div>
        <div class="item-text">≥90%销量占比</div>
      </div>
      <div class="item">
        <div style="background-color:#A81714;" class="item-box"></div>
        <div class="item-text">≥80%销量占比</div>
      </div>
      <div class="item">
        <div style="background-color:#701513;" class="item-box"></div>
        <div class="item-text">≥70%销量占比</div>
      </div>
      <div class="item">
        <div style="background-color:#441A19;" class="item-box"></div>
        <div class="item-text">≥60%销量占比</div>
      </div>
      <div class="item">
        <div style="background-color:#512B2B" class="item-box"></div>
        <div class="item-text">≥50%销量占比</div>
      </div>
    </div>
    <div class="box" style="margin-left:20px">
      <div class="item">
        <div class="item-box" style="background-color:#72504F;"></div>
        <div class="item-text">≥40销量占比</div>
      </div>
      <div class="item">
        <div style="background-color:#784847;" class="item-box"></div>
        <div class="item-text">≥30销量占比</div>
      </div>
      <div class="item">
        <div style="background-color:#985553;" class="item-box"></div>
        <div class="item-text">≥20销量占比</div>
      </div>
      <div class="item">
        <div style="background-color:#B36664;" class="item-box"></div>
        <div class="item-text">≥10销量占比</div>
      </div>
      <div class="item">
        <div style="background-color:#ab7877;" class="item-box"></div>
        <div class="item-text">≤0%销量占比</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {}
};
</script>

<style lang="stylus" scoped>
.page {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.box {
  margin-left: -40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.item {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.item-box {
  width: 66px;
  height: 20px;
  background: #FF3430;
  opacity: 0.9;
}

.item-text {
  margin-left: 13px;
  color: #E4E4E4;
  font-size: 21px;
}
</style>