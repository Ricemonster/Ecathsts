<template>
  <div class="app">
    <video :src="videoSrc" muted autoplay loop></video>
    <div class="mask">
      <div class="head-title">
        <span>农讯汇大数据服务平台</span>
      </div>
      <div class="zhutu">
        <zhutu :gend="gend" />
      </div>
      <div class="left">
        <div class="backimg2">筛选条件</div>
        <tablist @cityd="getCitName" @time="getTime" @barnd="barnd" />
      </div>
      <div class="left2">
        <div class="backimg2">勾选条件</div>
        <tablist1 @cityd="getCitName" />
      </div>
      <div class="gendi">
        <gendilist />
      </div>
      <div class="map">
        <router-view
          v-if="RegionalData !== null"
          :RegionalData="RegionalData"
          :allTipa="allTipa"
          :cityNmae="cityNmae"
          :areaNaee="areaNaee"
          @changePage="changePage"
        ></router-view>
      </div>
      <div class="dynamic">
        <div class="backimg">实时动态</div>
        <div class="dynamic-box">
          <div class="dynamic-content">
            <div class="font-space">
              <div style="display:flex;flex-direction:column;align-items:center;">
                <span>0户</span>
                <span style="font-size:15px;color:#DDDEE0">种植大户</span>
              </div>
              <img style="height:60px;width:60px" src="../assets/image/up.png" />
            </div>
            <div class="text-space">平台最新动态新加入了0个种植大户，0个化肥工</div>
          </div>
          <div class="dynamic-content">
            <div class="font-space">
              <div style="display:flex;flex-direction:column;align-items:center;">
                <span>0户</span>
                <span style="font-size:15px;color:#DDDEE0">种植大户</span>
              </div>
              <img style="height:60px;width:60px" src="../assets/image/up.png" />
            </div>
            <div class="text-space">平台最新动态新加入了0个种植大户，0个化肥工</div>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="backimg">含量占比</div>
        <piechart />
      </div>
      <div class="bottom">
        <sectore style="position: absolute;top:0;left:-80px;" />
        <sectore1 style="position: absolute;top:0;left:110px;" />
        <sectore2 style="position: absolute;top:0;left:290px;" />
        <div class="backimg1"></div>
        <div class="back-1">与平台占比</div>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs"; // 跨域写法
import Piechart from "../components/PieChart"; // 饼图
import Sectore from "../components/Sector"; // 环形图
import Sectore1 from "../components/Sectore1"; // 环形图1
import Sectore2 from "../components/Sectore2"; //  环形图2
import Tablist from "../components/tabList"; // 筛选条件
import Tablist1 from "../components/tabList1"; // 勾选条件
import gendilist from "../components/gendi"; // 耕地面积
import zhutu from "../components/zhutu"; // 柱状图
export default {
  data() {
    return {
      videoSrc: "http://106.54.118.27/vido/bakcground.mp4",
      cityNmae: "",
      areaNaee: "",
      allCount: 0, // 总销量,
      RegionalData: null, // 地区数据
      allTipa: null, // 提示牌,
      nowPage: 0,
      CityName1: "",
      // gendi组件
      gend: {
        Allpeople: 0,
        Allfarmer: 0,
        Allarea: 0,
        Allland: 0
      }
    };
  },
  components: {
    Piechart,
    Sectore,
    Sectore1,
    Sectore2,
    Tablist,
    Tablist1,
    gendilist,
    zhutu
  },
  mounted() {
    let Scale = this.detectZoom();
    console.log(Scale);
    let that = this;
    // 请求数据分发中心
    this.axios
      .post(
        "https://hd.wykjhwj.com/index.php/home/Api/all_date",
        qs.stringify({
          type: "all"
        })
      )
      .then(function(res) {
        that.axios
          .post(
            "https://hd.wykjhwj.com/index.php/home/Api/orter_data",
            qs.stringify({
              type: "all"
            })
          )
          .then(mapDate => {
            let allSales = [];
            let allTip = [];
            let count = 0; // 总销量
            let stores = 0; //经销商数
            let area = 0; // 地区面积
            let land = 0; // 耕地面积
            let people = 0; // 总人口
            let farmer = 0; // 农业人口
            let villages = 0; //村镇数量
            for (let key in res.data) {
              let CityName = key;
              let data = res.data[CityName];
              for (let value in data) {
                if (data[value] !== null) {
                  count += Number(data[value]);
                }
              }
              // 每个层级对应的颜色
              that.allCount += count;
              // 总计每个城市的销量
              allSales.push({
                name: CityName,
                SalesgGrade: count
              });
              count = 0;
            }
            for (let key in mapDate.data) {
              let CityName = key;
              let data = mapDate.data[CityName];
              for (let value in data) {
                if (data[value] !== null) {
                  if (value === "stores" && data[value] !== null) {
                    stores += Number(data[value]);
                  }
                  if (value === "area" && data[value] !== null) {
                    area += Number(data[value]);
                  }
                  if (value === "land" && data[value] !== null) {
                    land += Number(data[value]);
                  }
                  if (value === "people" && data[value] !== null) {
                    people += Number(data[value]);
                  }
                  if (value === "farmer" && data[value] !== null) {
                    farmer += Number(data[value]);
                  }
                  if (value === "villages" && data[value] !== null) {
                    villages += Number(data[value]);
                  }
                }
              }
              allTip.push({
                name: CityName,
                stores: stores,
                area: area,
                land: land,
                people: people,
                farmer: farmer,
                villages: villages
              });
              that.gend.Allpeople += people;
              that.gend.Allfarmer += farmer;
              that.gend.Allarea += area;
              that.gend.Allland += land;
              stores = 0;
              area = 0;
              land = 0;
              people = 0;
              farmer = 0;
              villages = 0;
            }
            that.allTipa = allTip;
            for (let i = 0; i < allSales.length; i++) {
              let le = "";
              if (allSales[i].SalesgGrade / that.allCount >= 0.9) {
                le = 1;
              } else if (
                allSales[i].SalesgGrade / that.allCount < 0.9 &&
                allSales[i].SalesgGrade / that.allCount >= 0.8
              ) {
                le = 2;
              } else if (
                allSales[i].SalesgGrade / that.allCount < 0.8 &&
                allSales[i].SalesgGrade / that.allCount >= 0.7
              ) {
                le = 3;
              } else if (
                allSales[i].SalesgGrade / that.allCount < 0.7 &&
                allSales[i].SalesgGrade / that.allCount >= 0.6
              ) {
                le = 4;
              } else if (
                allSales[i].SalesgGrade / that.allCount < 0.6 &&
                allSales[i].SalesgGrade / that.allCount >= 0.5
              ) {
                le = 5;
              } else if (
                allSales[i].SalesgGrade / that.allCount < 0.5 &&
                allSales[i].SalesgGrade / that.allCount >= 0.4
              ) {
                le = 6;
              } else if (
                allSales[i].SalesgGrade / that.allCount < 0.4 &&
                allSales[i].SalesgGrade / that.allCount >= 0.3
              ) {
                le = 7;
              } else if (
                allSales[i].SalesgGrade / that.allCount < 0.3 &&
                allSales[i].SalesgGrade / that.allCount >= 0.2
              ) {
                le = 8;
              } else if (
                allSales[i].SalesgGrade / that.allCount < 0.2 &&
                allSales[i].SalesgGrade / that.allCount >= 0.1
              ) {
                le = 9;
              } else if (
                allSales[i].SalesgGrade / that.allCount < 0.1 &&
                allSales[i].SalesgGrade / that.allCount >= 0
              ) {
                le = 10;
              }
              allSales[i].hierarchy = le;
            }
            // 处理完后的数据
            that.RegionalData = allSales;
          });
      });
  },
  watch: {
    $route: {
      handler(route) {
        let that = this;
        // 请求数据分发中心
        this.axios
          .post(
            "https://hd.wykjhwj.com/index.php/home/Api/all_date",
            qs.stringify({
              type: "all"
            })
          )
          .then(function(res) {
            that.axios
              .post(
                "https://hd.wykjhwj.com/index.php/home/Api/orter_data",
                qs.stringify({
                  type: "all"
                })
              )
              .then(mapDate => {
                let allSales = [];
                let allTip = [];
                let count = 0; // 总销量
                let stores = 0; //经销商数
                let area = 0; // 地区面积
                let land = 0; // 耕地面积
                let people = 0; // 总人口
                let farmer = 0; // 农业人口
                let villages = 0; //村镇数量
                for (let key in res.data) {
                  let CityName = key;
                  let data = res.data[CityName];
                  for (let value in data) {
                    if (data[value] !== null) {
                      count += Number(data[value]);
                    }
                  }
                  // 每个层级对应的颜色
                  that.allCount += count;
                  // 总计每个城市的销量
                  allSales.push({
                    name: CityName,
                    SalesgGrade: count
                  });
                  count = 0;
                }
                for (let key in mapDate.data) {
                  let CityName = key;
                  let data = mapDate.data[CityName];
                  for (let value in data) {
                    if (data[value] !== null) {
                      if (value === "stores" && data[value] !== null) {
                        stores += Number(data[value]);
                      }
                      if (value === "area" && data[value] !== null) {
                        area += Number(data[value]);
                      }
                      if (value === "land" && data[value] !== null) {
                        land += Number(data[value]);
                      }
                      if (value === "people" && data[value] !== null) {
                        people += Number(data[value]);
                      }
                      if (value === "farmer" && data[value] !== null) {
                        farmer += Number(data[value]);
                      }
                      if (value === "villages" && data[value] !== null) {
                        villages += Number(data[value]);
                      }
                    }
                  }
                  allTip.push({
                    name: CityName,
                    stores: stores,
                    area: area,
                    land: land,
                    people: people,
                    farmer: farmer,
                    villages: villages
                  });
                  that.gend.Allpeople += people;
                  that.gend.Allfarmer += farmer;
                  that.gend.Allarea += area;
                  that.gend.Allland += land;
                  stores = 0;
                  area = 0;
                  land = 0;
                  people = 0;
                  farmer = 0;
                  villages = 0;
                }
                that.allTipa = allTip;
                for (let i = 0; i < allSales.length; i++) {
                  let le = "";
                  if (allSales[i].SalesgGrade / that.allCount >= 0.9) {
                    le = 1;
                  } else if (
                    allSales[i].SalesgGrade / that.allCount < 0.9 &&
                    allSales[i].SalesgGrade / that.allCount >= 0.8
                  ) {
                    le = 2;
                  } else if (
                    allSales[i].SalesgGrade / that.allCount < 0.8 &&
                    allSales[i].SalesgGrade / that.allCount >= 0.7
                  ) {
                    le = 3;
                  } else if (
                    allSales[i].SalesgGrade / that.allCount < 0.7 &&
                    allSales[i].SalesgGrade / that.allCount >= 0.6
                  ) {
                    le = 4;
                  } else if (
                    allSales[i].SalesgGrade / that.allCount < 0.6 &&
                    allSales[i].SalesgGrade / that.allCount >= 0.5
                  ) {
                    le = 5;
                  } else if (
                    allSales[i].SalesgGrade / that.allCount < 0.5 &&
                    allSales[i].SalesgGrade / that.allCount >= 0.4
                  ) {
                    le = 6;
                  } else if (
                    allSales[i].SalesgGrade / that.allCount < 0.4 &&
                    allSales[i].SalesgGrade / that.allCount >= 0.3
                  ) {
                    le = 7;
                  } else if (
                    allSales[i].SalesgGrade / that.allCount < 0.3 &&
                    allSales[i].SalesgGrade / that.allCount >= 0.2
                  ) {
                    le = 8;
                  } else if (
                    allSales[i].SalesgGrade / that.allCount < 0.2 &&
                    allSales[i].SalesgGrade / that.allCount >= 0.1
                  ) {
                    le = 9;
                  } else if (
                    allSales[i].SalesgGrade / that.allCount < 0.1 &&
                    allSales[i].SalesgGrade / that.allCount >= 0
                  ) {
                    le = 10;
                  }
                  allSales[i].hierarchy = le;
                }
                // 处理完后的数据
                that.RegionalData = allSales;
              });
          });
      }
    }
  },
  methods: {
    // 判断当前浏览器缩放比例
    detectZoom() {
      var ratio = 0,
        screen = window.screen,
        ua = navigator.userAgent.toLowerCase();

      if (window.devicePixelRatio !== undefined) {
        ratio = window.devicePixelRatio;
      } else if (~ua.indexOf("msie")) {
        if (screen.deviceXDPI && screen.logicalXDPI) {
          ratio = screen.deviceXDPI / screen.logicalXDPI;
        }
      } else if (
        window.outerWidth !== undefined &&
        window.innerWidth !== undefined
      ) {
        ratio = window.outerWidth / window.innerWidth;
      }

      if (ratio) {
        ratio = Math.round(ratio * 100);
      }

      return ratio;
    },
    changePage(value) {
      this.nowPage = value.nowPage;
      this.CityName1 = value.cityName;
    },
    // 组建数据分发中心
    getCitName(data) {
      if (typeof data === "string") {
        // 单个地名
        this.cityNmae = data;
        this.nowPage = 1;
        this.CityName1 = data;
        console.log(this.CityName1);
        this.$router.push({
          path: "/index/city",
          query: { name: data }
        });
        this.barnd("all");
      } else {
        // 多级地名
        this.areaNaee = data;
        this.$router.push({
          path: "/index/area",
          query: {
            name: data[0] + "-" + data[1]
          }
        });
      }
    },
    getTime(data) {
      // console.log("开始时间", data[0]);
      // console.log("结束时间", data[1]);
    },
    barnd(data) {
      this.initMap(data);
    },
    initMap(data) {
      let that = this;
      // 请求数据分发中心
      this.axios
        .post(
          "https://hd.wykjhwj.com/index.php/home/Api/all_date",
          qs.stringify({
            type: data,
            city: that.CityName1,
            ym: that.nowPage
          })
        )
        .then(function(res) {
          console.log("代码", res);
          that.allCount = 0;
          let allSales = [];
          let count = 0;
          for (let key in res.data) {
            let CityName = key;
            let data = res.data[CityName];
            for (let value in data) {
              if (data[value] !== null) {
                count += Number(data[value]);
              }
            }
            // 每个层级对应的颜色
            that.allCount += count;
            // 总计每个城市的销量
            allSales.push({
              name: CityName,
              SalesgGrade: count
            });
            count = 0;
          }
          for (let i = 0; i < allSales.length; i++) {
            let le = "";
            if (allSales[i].SalesgGrade / that.allCount >= 0.9) {
              le = 1;
            } else if (
              allSales[i].SalesgGrade / that.allCount < 0.9 &&
              allSales[i].SalesgGrade / that.allCount >= 0.8
            ) {
              le = 2;
            } else if (
              allSales[i].SalesgGrade / that.allCount < 0.8 &&
              allSales[i].SalesgGrade / that.allCount >= 0.7
            ) {
              le = 3;
            } else if (
              allSales[i].SalesgGrade / that.allCount < 0.7 &&
              allSales[i].SalesgGrade / that.allCount >= 0.6
            ) {
              le = 4;
            } else if (
              allSales[i].SalesgGrade / that.allCount < 0.6 &&
              allSales[i].SalesgGrade / that.allCount >= 0.5
            ) {
              le = 5;
            } else if (
              allSales[i].SalesgGrade / that.allCount < 0.5 &&
              allSales[i].SalesgGrade / that.allCount >= 0.4
            ) {
              le = 6;
            } else if (
              allSales[i].SalesgGrade / that.allCount < 0.4 &&
              allSales[i].SalesgGrade / that.allCount >= 0.3
            ) {
              le = 7;
            } else if (
              allSales[i].SalesgGrade / that.allCount < 0.3 &&
              allSales[i].SalesgGrade / that.allCount >= 0.2
            ) {
              le = 8;
            } else if (
              allSales[i].SalesgGrade / that.allCount < 0.2 &&
              allSales[i].SalesgGrade / that.allCount >= 0.1
            ) {
              le = 9;
            } else if (
              allSales[i].SalesgGrade / that.allCount < 0.1 &&
              allSales[i].SalesgGrade / that.allCount >= 0
            ) {
              le = 10;
            }
            allSales[i].hierarchy = le;
          }
          // 处理完后的数据
          that.RegionalData = allSales;
          console.log(that.RegionalData);
        });
    }
  }
};
</script>

<style lang="stylus" scoped>
.app {
  width: 100vw;
  overflow: hidden;
  height: 100vh;
  position: relative;
}

video {
  height: 100%;
  width: 100%;
  object-fit: fill;
}

.mask {
  position: absolute;
  height: 95%;
  width: 95%;
  top: 0px;
  left: 50px;

  .head-title {
    position: absolute;
    width: 60%;
    left: 500px;
    margin: 0 auto;
    height: 10%;
    background-image: url('../assets/image/top.png');
    background-size: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      margin-top: 50px;
      letter-spacing: 3px;
      font-size: 25px;
      color: #ffffff;
    }
  }

  .left {
    position: absolute;
    top: 150px;
    width: 900px;
    height: 1700px;
  }

  .left2 {
    position: absolute;
    top: 730px;
    width: 900px;
    height: 1700px;
  }

  .map {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 130px;
    left: 400px;
    width: 1800px;
    height: 1300px;
  }

  .dynamic {
    right: 0;
    top: 350px;
    position: absolute;
    height: 50%;
    width: 21%;

    .dynamic-box {
      margin-top: -120px;
      height: 400px;
      width: 600px;
      display: flex;
      flex-direction: column;

      .dynamic-content {
        height: 30%;
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        color: #01FFDE;

        .font-space {
          width: 30%;
          justify-content: center;
          display: flex;
          align-items: center;
          flex-direction: row;
          height: 100%;
          font-weight: bold;
          font-size: 30px;
        }

        .text-space {
          width: 45%;
          height: 100%;
          font-size: 25px;
          color: #E8E9EB;
          display: flex;
          align-items: center;
        }
      }
    }
  }

  .content {
    right: 0;
    top: 750px;
    position: absolute;
    height: 50%;
    width: 21%;
  }

  .bottom {
    position: absolute;
    right: 0;
    top: 900px;
    height: 20%;
    width: 30%;
  }

  .backimg {
    position: absolute;
    top: -200px;
    font-size: 24px;
    color: #ffffff;
    width: 200px;
    height: 45px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-image: url('../assets/image/border.png');
    background-size: 100%;
  }

  .backimg1 {
    position: absolute;
    top: 150px;
    left: 700px;
    font-size: 20px;
    color: #ffffff;
    width: 80px;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-image: url('../assets/image/left.png');
    background-size: 100%;
  }

  .backimg2 {
    position: absolute;
    top: 0px;
    font-size: 24px;
    color: #ffffff;
    width: 200px;
    height: 45px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-image: url('../assets/image/border.png');
    background-size: 100%;
  }

  .back-1 {
    position: absolute;
    top: 187px;
    left: 725px;
    font-size: 26px;
    width: 50px;
    color: #ffffff;
  }
}

.gendi {
  position: absolute;
  top: 1140px;
  left: 520px;
}

.zhutu {
  position: absolute;
  left: 540px;
  top: 100px;
}
</style>
