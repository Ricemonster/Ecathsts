<template>
  <div
    @contextmenu.prevent="backProvince"
    class="animated pulse"
    id="map"
    style="height:700px;width:1600px;border:0;"
  ></div>
</template>

<script>
const u_map = require("../../util/map.js");
import qs from "qs";
export default {
  props: ["cityNmae", "RegionalData"],
  data() {
    return {
      geoCoordMap: {}, // 传递的全体数据，需要经过处理后使用
      cityName: "", // 跳转目的地的所在地名字
      cityList: null,
      allCount: 0, // 总销量,
      RegionalDat: null, // 地区数据,
      allTipa: null
    };
  },
  mounted() {
    let that = this;
    let mapList = {
      甘孜藏族自治州: 0,
      阿坝藏族羌族自治州: 1,
      绵阳市: 2,
      广元市: 3,
      巴中市: 4,
      达州市: 5,
      广安市: 6,
      南充市: 7,
      德阳市: 8,
      遂宁市: 9,
      成都市: 10,
      资阳市: 11,
      雅安市: 12,
      眉山市: 13,
      内江市: 14,
      乐山市: 15,
      自贡市: 16,
      泸州市: 17,
      宜宾市: 18,
      凉山彝族自治州: 19,
      攀枝花市: 20
    };
    let getMap = {
      遂宁市: 1,
      南充市: 2,
      绵阳市: 3,
      广元市: 4,
      德阳市: 5,
      巴中市: 6
    };
    that.cityName = this.$route.query.name;
    this.getCityList();
    // 请求县市数据
    this.axios
      .post(
        "https://hd.wykjhwj.com/index.php/home/Api/citys",
        qs.stringify({
          id: getMap[that.cityName.toString()]
        })
      )
      .then(function(resData) {
        that.axios
          .post(
            "https://hd.wykjhwj.com/index.php/home/Api/all_dates",
            qs.stringify({
              country: that.cityList
            })
          )
          .then(resa => {
            that.allCount = 0;
            let allSales = [];
            let count = 0;
            for (let key in resa.data) {
              let CityName = key;
              let data = resa.data[CityName];
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
            that.RegionalDat = allSales;
            // 渲染到页面上
            that.axios.get(`/map/${mapList[that.cityName]}.json`).then(res => {
              // 请求名牌数据
              that.axios
                .post(
                  "https://hd.wykjhwj.com/index.php/home/Api/orter_data",
                  qs.stringify({
                    type: "country",
                    city: that.cityName
                  })
                )
                .then(mapdata => {
                  that.allTipa = mapdata.data;
                  that.echarts.registerMap("MY", JSON.stringify(res.data));
                  that.geoCoordMap = that.getCenter(res);
                  let chart = that.echarts.init(document.getElementById("map"));
                  let option = {
                    tooltip: {
                      trigger: "item",
                      formatter: function(params) {
                        return (
                          params.name +
                          "<br>" +
                          params.marker +
                          "化肥销量" +
                          "：" +
                          params.data.data.sales +
                          "吨" +
                          "<br>" +
                          '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#F40034;"></span>' +
                          "化肥品牌" +
                          "：" +
                          params.data.data.Brand +
                          "<br>" +
                          '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#862324;"></span>' +
                          "耕地面积" +
                          "：" +
                          params.data.data.land +
                          "平方米" +
                          "<br>" +
                          '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#088170;"></span>' +
                          "人口数量" +
                          "：" +
                          params.data.data.people +
                          "人" +
                          "<br>" +
                          '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#F1F3F4;"></span>' +
                          "农民数量" +
                          "：" +
                          params.data.data.farmer +
                          "人" +
                          "<br>" +
                          '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#43BC86;"></span>' +
                          "村镇数量" +
                          "：" +
                          params.data.data.villages +
                          "个" +
                          "<br>" +
                          '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#AB7877;"></span>' +
                          "经销商数量" +
                          "：" +
                          params.data.data.stores +
                          "个"
                        );
                      }
                      // extraCssText: "height:80px;"
                    },
                    geo: {
                      name: "SC PopEstimates",
                      type: "map",
                      aspectScale: 1, // 横向拉伸
                      map: "MY",
                      label: {
                        show: true,
                        normal: {
                          show: true, // 默认地图文字字号和字体颜色
                          fontSize: 13,
                          color: "#CFCFCF"
                        },
                        emphasis: {
                          show: true,
                          fontSize: 13, // 选中地图文字字号和字体颜色
                          color: "#CFCFCF"
                        }
                      },
                      itemStyle: {
                        normal: {
                          areaColor: "#000606", //地图本身的颜色
                          borderColor: "#7E8080", //省份边框颜色
                          borderWidth: 1, // 省份边框宽度
                          opacity: 1 //图形透明度
                        },
                        emphasis: {
                          areaColor: "#CD2B29", // 高亮时候地图显示的颜色
                          borderWidth: 0 // 高亮时的边框宽度
                        }
                      },
                      textFixed: {
                        Alaska: [20, -20]
                      },
                      regions: u_map.setColor(
                        that.RegionalDat,
                        that.RegionalData
                      )
                    },
                    series: [
                      {
                        type: "effectScatter",
                        coordinateSystem: "geo",
                        data: that.converData([resData.data]),
                        symbolSize: 12,
                        label: {
                          normal: {
                            show: false
                          },
                          emphasis: {
                            show: false
                          }
                        },
                        itemStyle: {
                          normal: {
                            shadowBlur: 10,
                            color: "#00ECC8"
                          },
                          emphasis: {
                            borderColor: "#fff",
                            borderWidth: 1
                          }
                        }
                      }
                    ]
                  };
                  chart.setOption(option);
                  // 下钻到县
                  chart.on("click", function(params) {
                    for (let i = 0; i < resData.data.length; i++) {
                      if (params.name === resData.data[i].name) {
                        that.$router.push({
                          path: "/index/area",
                          query: {
                            name:
                              that.cityName +
                              "-" +
                              params.name +
                              "-" +
                              resData.data[i].id
                          }
                        });
                      }
                    }
                  });
                });
            });
          });
      });
  },
  // 监听的勾选数据的变化
  watch: {
    RegionalData: function(value) {
      this.initFunction();
    },
    cityNmae: function(value) {
      this.cityName = value;
      this.initFunction();
    }
  },
  methods: {
    // 请求数据
    getCityList() {
      if (this.cityName === "绵阳市") {
        this.cityList = [
          "平武县",
          "北川羌族自治县",
          "安州区",
          "涪城区",
          "三台县",
          "盐亭县",
          "梓潼县",
          "游仙区",
          "江油市"
        ];
      } else if (this.cityName === "巴中市") {
        this.cityList = ["南江县", "恩阳区", "巴州区", "平昌县", "通江县"];
      } else if (this.cityName === "广元市") {
        this.cityList = [
          "青川县",
          "剑阁县",
          "利州区",
          "朝天区",
          "昭化区",
          "苍溪县",
          "旺苍县"
        ];
      } else if (this.cityName === "德阳市") {
        this.cityList = [
          "什邡市",
          "绵竹市",
          "广汉市",
          "旌阳区",
          "罗江区",
          "中江县"
        ];
      } else if (this.cityName === "遂宁市") {
        this.cityList = ["射洪市", "大英县", "船山区", "蓬溪县", "安居区"];
      } else if (this.cityName === "南充市") {
        this.cityList = [
          "阆中市",
          "南部县",
          "西充县",
          "嘉陵区",
          "顺庆区",
          "高坪区",
          "遂安县",
          "营山县",
          "仪陇县"
        ];
      }
    },
    // 上升到市
    backProvince() {
      let that = this;
      this.$emit("changePage", {
        nowPage: 0,
        cityName: ""
      });
      this.$router.push({
        path: "/index/province"
      });
    },
    converData: function(city) {
      let reaas = [];
      let data = city[0];
      let that = this;
      var res = [];
      if (that.RegionalData[0].name !== "绵阳市") {
        for (var i = 0; i < that.RegionalData.length; i++) {
          var geoCoord = that.geoCoordMap[that.RegionalData[i].name];
          let sss = that.RegionalData[i].SalesgGrade;
          if (geoCoord) {
            res.push({
              name: that.RegionalData[i].name,
              value: geoCoord,
              data: {
                sales: sss,
                Brand: "万稼宜",
                stores: that.allTipa[i].stores,
                area: that.allTipa[i].area,
                land: that.allTipa[i].land,
                farmer: that.allTipa[i].farmer,
                villages: that.allTipa[i].villages,
                people: that.allTipa[i].people
              }
            });
          }
        }
      } else {
        for (var i = 0; i < that.RegionalDat.length; i++) {
          var geoCoord = that.geoCoordMap[that.RegionalDat[i].name];
          let sss = that.RegionalDat[i].SalesgGrade;
          if (geoCoord) {
            res.push({
              name: that.RegionalDat[i].name,
              value: geoCoord,
              data: {
                sales: sss,
                Brand: "万稼宜",
                stores: that.allTipa[i].stores,
                area: that.allTipa[i].area,
                land: that.allTipa[i].land,
                farmer: that.allTipa[i].farmer,
                villages: that.allTipa[i].villages,
                people: that.allTipa[i].people
              }
            });
          }
        }
      }
      return res;
    },
    getCenter: function(mapData) {
      let that = this;
      let geoMap = {};
      for (let i = 0; i < mapData.data.features.length; i++) {
        // 处理地图数据
        let name = mapData.data.features[i].properties.name;
        let center = mapData.data.features[i].properties.center;
        geoMap[name] = center;
      }
      return geoMap;
    },
    // 处理地理显示层级颜色方法
    getcolor: function(city) {
      let data = city[0];
      let that = this;
      let center = [];
      for (var i = 0; i < data.length; i++) {
        if (data[i].name) {
          center.push({
            name: data[i].name,
            hierarchy: 1
          });
        }
      }
      return center;
    },
    // 同级跳转时调用的函数,初始化整个页面
    initFunction: function() {
      let that = this;
      let mapList = {
        甘孜藏族自治州: 0,
        阿坝藏族羌族自治州: 1,
        绵阳市: 2,
        广元市: 3,
        巴中市: 4,
        达州市: 5,
        广安市: 6,
        南充市: 7,
        德阳市: 8,
        遂宁市: 9,
        成都市: 10,
        资阳市: 11,
        雅安市: 12,
        眉山市: 13,
        内江市: 14,
        乐山市: 15,
        自贡市: 16,
        泸州市: 17,
        宜宾市: 18,
        凉山彝族自治州: 19,
        攀枝花市: 20
      };
      let getMap = {
        遂宁市: 1,
        南充市: 2,
        绵阳市: 3,
        广元市: 4,
        德阳市: 5,
        巴中市: 6
      };
      that.cityName = this.$route.query.name;
      this.getCityList();
      // 请求县市数据
      this.axios
        .post(
          "https://hd.wykjhwj.com/index.php/home/Api/citys",
          qs.stringify({
            id: getMap[that.cityName.toString()]
          })
        )
        .then(function(resData) {
          that.axios
            .post(
              "https://hd.wykjhwj.com/index.php/home/Api/all_dates",
              qs.stringify({
                country: that.cityList
              })
            )
            .then(resa => {
              that.allCount = 0;
              let allSales = [];
              let count = 0;
              for (let key in resa.data) {
                let CityName = key;
                let data = resa.data[CityName];
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
              that.RegionalDat = allSales;
              // 渲染到页面上
              that.axios
                .get(`/map/${mapList[that.cityName]}.json`)
                .then(res => {
                  // 请求名牌数据
                  that.axios
                    .post(
                      "https://hd.wykjhwj.com/index.php/home/Api/orter_data",
                      qs.stringify({
                        type: "country",
                        city: that.cityName
                      })
                    )
                    .then(mapdata => {
                      that.allTipa = mapdata.data;
                      that.echarts.registerMap("MY", JSON.stringify(res.data));
                      that.geoCoordMap = that.getCenter(res);
                      let chart = that.echarts.init(
                        document.getElementById("map")
                      );
                      let option = {
                        tooltip: {
                          trigger: "item",
                          formatter: function(params) {
                            return (
                              params.name +
                              "<br>" +
                              params.marker +
                              "化肥销量" +
                              "：" +
                              params.data.data.sales +
                              "吨" +
                              "<br>" +
                              '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#F40034;"></span>' +
                              "化肥品牌" +
                              "：" +
                              params.data.data.Brand +
                              "<br>" +
                              '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#862324;"></span>' +
                              "耕地面积" +
                              "：" +
                              params.data.data.land +
                              "平方米" +
                              "<br>" +
                              '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#088170;"></span>' +
                              "人口数量" +
                              "：" +
                              params.data.data.people +
                              "人" +
                              "<br>" +
                              '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#F1F3F4;"></span>' +
                              "农民数量" +
                              "：" +
                              params.data.data.farmer +
                              "人" +
                              "<br>" +
                              '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#43BC86;"></span>' +
                              "村镇数量" +
                              "：" +
                              params.data.data.villages +
                              "个" +
                              "<br>" +
                              '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#AB7877;"></span>' +
                              "经销商数量" +
                              "：" +
                              params.data.data.stores +
                              "个"
                            );
                          }
                          // extraCssText: "height:80px;"
                        },
                        geo: {
                          name: "SC PopEstimates",
                          type: "map",
                          aspectScale: 1, // 横向拉伸
                          map: "MY",
                          label: {
                            show: true,
                            normal: {
                              show: true, // 默认地图文字字号和字体颜色
                              fontSize: 13,
                              color: "#CFCFCF"
                            },
                            emphasis: {
                              show: true,
                              fontSize: 13, // 选中地图文字字号和字体颜色
                              color: "#CFCFCF"
                            }
                          },
                          itemStyle: {
                            normal: {
                              areaColor: "#000606", //地图本身的颜色
                              borderColor: "#7E8080", //省份边框颜色
                              borderWidth: 1, // 省份边框宽度
                              opacity: 1 //图形透明度
                            },
                            emphasis: {
                              areaColor: "#CD2B29", // 高亮时候地图显示的颜色
                              borderWidth: 0 // 高亮时的边框宽度
                            }
                          },
                          textFixed: {
                            Alaska: [20, -20]
                          },
                          regions: u_map.setColor(
                            that.RegionalDat,
                            that.RegionalData
                          )
                        },
                        series: [
                          {
                            type: "effectScatter",
                            coordinateSystem: "geo",
                            data: that.converData([resData.data]),
                            symbolSize: 12,
                            label: {
                              normal: {
                                show: false
                              },
                              emphasis: {
                                show: false
                              }
                            },
                            itemStyle: {
                              normal: {
                                shadowBlur: 10,
                                color: "#00ECC8"
                              },
                              emphasis: {
                                borderColor: "#fff",
                                borderWidth: 1
                              }
                            }
                          }
                        ]
                      };
                      chart.setOption(option);
                      // 下钻到县
                      chart.on("click", function(params) {
                        for (let i = 0; i < resData.data.length; i++) {
                          if (params.name === resData.data[i].name) {
                            that.$router.push({
                              path: "/index/area",
                              query: {
                                name:
                                  that.cityName +
                                  "-" +
                                  params.name +
                                  "-" +
                                  resData.data[i].id
                              }
                            });
                          }
                        }
                      });
                    });
                });
            });
        });
    }
  }
};
</script>

<style></style>
