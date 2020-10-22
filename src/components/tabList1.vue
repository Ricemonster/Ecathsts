<template>
  <div class="box">
    <div class="list">
      <div class="item" @click="change(0)">
        <img class="end" src="../assets//image/tabBar/end.png" alt />
        <img class="item-title" src="../assets/image/tabBar/font.png" alt />
        <img class="item-icon" src="../assets//image//tabBar/icon1.png" alt />
        <span class="item-text">服务代理</span>
      </div>
      <div class="item" @click="change(1)">
        <img class="end" src="../assets//image/tabBar/end.png" alt />
        <img class="item-title" src="../assets/image/tabBar/font.png" alt />
        <img class="item-icon" src="../assets//image//tabBar/7.png" alt />
        <span class="item-text">化肥品牌</span>
      </div>
      <div class="item" @click="change(2)">
        <img class="end" src="../assets//image/tabBar/end.png" alt />
        <img class="item-title" src="../assets/image/tabBar/font.png" alt />
        <img class="item-icon" src="../assets//image//tabBar/8.png" alt />
        <span class="item-text">化肥类型</span>
      </div>
      <div class="item" @click="change(3)">
        <img class="end" src="../assets//image/tabBar/end.png" alt />
        <img class="item-title" src="../assets/image/tabBar/font.png" alt />
        <img class="item-icon" src="../assets//image//tabBar/9.png" alt />
        <span class="item-text">收购类型</span>
      </div>
      <div class="item" @click="change(4)">
        <img class="end" src="../assets//image/tabBar/end.png" alt />
        <img class="item-title" src="../assets/image/tabBar/font.png" alt />
        <img class="item-icon" src="../assets//image//tabBar/10.png" alt />
        <span class="item-text">种子</span>
      </div>
      <div class="item" @click="change(5)">
        <img class="end" src="../assets//image/tabBar/end.png" alt />
        <img class="item-title" src="../assets/image/tabBar/font.png" alt />
        <img class="item-icon" src="../assets//image//tabBar/11.png" alt />
        <span class="item-text">农药</span>
      </div>
    </div>
    <!-- 出来的东西 -->
    <div class="zhezhao" style="top:0px;" v-if="isHidden">
      <div class="boxaa" style="margin-left:120px">无数据</div>
    </div>
    <div class="zhezhao" v-if="isHidden1" style="top:60px;">
      <div style="padding-top:50px;display:flex;flex-direction:column;justify-content:center;">
        <div class="iconcheck">
          <el-checkbox
            class="labelTop"
            :indeterminate="isIndeterminate1"
            v-model="checkAll1"
            @change="handleCheckAllChange1"
          >全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedCities1" @change="handleCheckedCitiesChange1">
            <el-checkbox v-for="(city,i) in cities1" :label="city" :key="i">{{city}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </div>
    <div class="zhezhao" v-if="isHidden2" style="top:120px;">
      <div style="padding-top:50px;display:flex;flex-direction:column;justify-content:center;">
        <div class="iconcheck">
          <el-checkbox
            class="labelTop"
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          >全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="(city,i) in cities" :label="city" :key="i">{{city}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </div>
    <div class="zhezhao" v-if="isHidden3" style="top:180px;">
      <div class="boxaa" style="margin-left:80px">无数据</div>
    </div>
    <div class="zhezhao" v-if="isHidden4" style="top:245px;">
      <div class="boxaa" style="margin-left:120px">无数据</div>
    </div>
    <div class="zhezhao" v-if="isHidden5" style="top:305px;">
      <div class="boxaa" style="margin-left:120px">无数据</div>
    </div>
  </div>
</template>

<script>
const cityOptions = ["复合肥"];
const cityOptions1 = ["万稼宜"];
export default {
  data() {
    return {
      isHidden: false,
      isHidden1: false,
      isHidden2: false,
      isHidden3: false,
      isHidden4: false,
      isHidden5: false,
      // 时间
      value1: "",
      value2: "",
      // 地址
      city: [],
      value6: "",
      // 含量
      value3: "",
      value4: "",
      checkAll: false,
      checkedCities: ["复合肥"],
      cities: cityOptions,
      isIndeterminate: true,
      checkAll1: false,
      checkedCities1: ["万稼宜"],
      cities1: cityOptions1,
      isIndeterminate1: true
    };
  },
  mounted() {
    // console.log(this.checkedCities);
  },
  methods: {
    change(value) {
      if (value == 0) {
        this.isHidden1 = false;
        this.isHidden2 = false;
        this.isHidden3 = false;
        this.isHidden4 = false;
        this.isHidden5 = false;
        this.isHidden = !this.isHidden;
      } else if (value == 1) {
        this.isHidden = false;
        this.isHidden2 = false;
        this.isHidden3 = false;
        this.isHidden4 = false;
        this.isHidden5 = false;
        this.isHidden1 = !this.isHidden1;
      } else if (value == 2) {
        this.isHidden = false;
        this.isHidden1 = false;
        this.isHidden3 = false;
        this.isHidden4 = false;
        this.isHidden5 = false;
        this.isHidden2 = !this.isHidden2;
      } else if (value == 3) {
        this.isHidden = false;
        this.isHidden1 = false;
        this.isHidden2 = false;
        this.isHidden4 = false;
        this.isHidden5 = false;
        this.isHidden3 = !this.isHidden3;
      } else if (value == 4) {
        this.isHidden = false;
        this.isHidden1 = false;
        this.isHidden2 = false;
        this.isHidden3 = false;
        this.isHidden5 = false;
        this.isHidden4 = !this.isHidden4;
      } else if (value == 5) {
        this.isHidden = false;
        this.isHidden1 = false;
        this.isHidden2 = false;
        this.isHidden3 = false;
        this.isHidden4 = false;
        this.isHidden5 = !this.isHidden5;
      }
    },
    timeChange() {
      console.log(this.value);
    },
    handleChange() {
      console.log(this.city);
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      console.log(value);
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    }
  }
};
</script>

<style lang="stylus" scoped>
.box {
  position: relative;
}

.list {
  height: 740px;
  width: 450px;
  margin-top: 60px;
}

.item {
  cursor: default;
  position: relative;
  margin-top: 10px;

  .item-title {
    position: absolute;
    top: -10px;
    left: 0;
    height: 100px;
  }

  .item-icon {
    position: absolute;
    left: 10px;
    top: 10px;
    height: 60px;
  }

  .end {
    height: 70px;
    width: 450px;
  }

  .item-text {
    position: absolute;
    left: 180px;
    top: 20px;
    color: #E9EBEB;
    font-size: 25px;
  }
}

.hoverItem {
  position: absolute;
  width: 500px;
  height: 500px;
  left: 530px;
  top: 0;
  z-index: 1000;
  background: white;
}

.zhezhao {
  background-image: url('../assets/image/tabBar/aaaaa.png');
  background-repeat: no-repeat;
  background-size: 100%;
  position: absolute;
  top: -180px;
  left: 450px;
  height: 400px;
  width: 490px;
  z-index: 100;
}

// 时间框
.el-date-editor {
  width: 350px;
}

>>> .el-input__inner {
  height: 70px;
  margin-bottom: 5px;
  border: 1px solid #00FFE6 !important;
  background: #004D42;
  text-align: center;
  font-size: 30px;
}

>>> .el-input__icon {
  margin-left: 50px;
}

>>> .el-input__prefix {
  font-size: 25px;
}

>>> .el-input--suffix {
  width: 80%;
}

>>> .el-icon-arrow-down {
  display: none;
}

>>> .el-select__caret {
  display: none;
}

.icon {
  position: relative;

  img {
    position: absolute;
    top: 60px;
    left: 100px;
    z-index: 111;
    height: 40px;
    width: 40px;
  }
}

>>> .el-select-dropdown {
  border: none;
  display: inline-block;
  background: url('../assets/image/tabBar/33.png') no-repeat right top transparent;
  height: 450px;
  left: -15px !important;
}

>>> .el-scrollbar {
  color: #E4E8E7;
  border: none;
}

>>> .el-select-dropdown__item {
  height: 60px;
  text-align: center;
  line-height: 60px;
  color: #ffffff;
  font-size: 25px;
  width: 350px;
  margin-left: 50px;
  opacity: 0.9;
}

>>> .el-select-dropdown__wrap {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

>>> .el-select-dropdown__item:hover {
  background: #06A38E !important;
  // color #ffffff
}

>>> .hover {
  background: #06A38E !important;
}

>>> .el-input--suffix input {
  color: #B5BDC4;
}

>>> .popper__arrow {
  display: none;
}

.el-select-dropdown__item {
}

>>> .el-select-dropdown__list {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
<style lang="stylus">
// 城市地点
.el-cascader__dropdown {
  border: none;
  display: inline-block;
  background: url('../assets/image/tabBar/101.png') no-repeat;
  height: 750px;
  width: 500px;

  .popper__arrow {
    display: none;
  }

  .el-cascader-panel {
    margin-top: 20px;
    border: none;
    overflow-y: hidden;
  }

  .el-cascader-node:hover {
    background: #059280;
  }

  .el-cascader-menu__wrap {
    height: 650px;
    width: 210px;
    overflow-x: hidden;
  }

  .el-cascader-node {
    height: 50px;
    width: 140px;
  }

  // 字体
  .el-cascader-node__label {
    font-size: 25px;
    border: none;
  }

  .el-scrollbar {
    height: 750px;
  }

  .in-active-path {
    background: #059280 !important;
    width: 500px;
  }

  .el-icon-check {
    display: none;
  }

  .el-cascader-menu {
    border: none;
    // background : url(../assets/image/tabBar/101.png) no-repeat;
  }
}

.iconcheck {
  margin-left: 40px;
}

.is-checked {
  .el-checkbox__inner {
    background-color: #07BFA4 !important;
    border-color: #07BFA4 !important;
  }
}

.is-indeterminate {
  .el-checkbox__inner {
    background-color: #07BFA4 !important;
    border-color: #07BFA4 !important;
  }
}

.el-checkbox__input.is-checked+.el-checkbox__label {
  color: #07BFA4 !important;
}

.el-checkbox__inner {
  width: 30px;
  height: 20px;
}

.el-checkbox__label {
  font-size: 30px;
  margin-bottom: 20px;
}

.el-checkbox__inner::after {
  box-sizing: content-box;
  content: '';
  border: 0.013333rem solid #FFF;
  border-left: 0;
  border-top: 0;
  height: 0.193333rem;
  left: 0.163333rem;
  position: absolute;
  top: 0.013333rem;
  transform: rotate(45deg) scaleY(0);
  width: 0.04rem;
  transition: transform 0.15s ease-in 0.05s;
  transform-origin: center;
}

.el-select-dropdown__empty {
  font-size: 30px;
  padding: 150px 0;
}

.boxaa {
  font-size: 25px;
  padding-top: 100px;
  padding-left: -20px;
  color: rgb(153, 153, 153);
}
</style>