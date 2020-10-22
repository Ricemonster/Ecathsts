<template>
  <div
    @contextmenu.prevent="backProvince"
    class="animated pulse"
    id="map"
    style="height:600px;width:1800px;border:0;"
  ></div>
</template>

<script>
const u_map = require("../../util/map.js");
import qs from "qs";
export default {
  props: ["areaNaee"],
  data() {
    return {
      cityName: "",
      areaName: "",
      geoCoordMap: {},
      AreaId: 0
    };
  },
  mounted() {
    this.cityName = this.$route.query.name.split("-")[0];
    this.areaName = this.$route.query.name.split("-")[1];
    this.AreaId = this.$route.query.name.split("-")[2];
    let mapList = {
      甘孜藏族自治州: {
        石渠县: 0.1,
        德格县: 0.2,
        白玉县: 0.3,
        巴塘县: 0.4,
        得荣县: 0.5,
        甘孜县: 0.6,
        新龙县: 0.7,
        乡城县: 0.8,
        稻城县: 0.9,
        雅江县: 1.1,
        九龙县: 1.2,
        泸定县: 1.3,
        康定市: 1.4,
        丹巴县: 1.5,
        道孚县: 1.6,
        炉霍县: 1.7,
        色达县: 1.8,
        理塘县: 1.9
      },
      凉山彝族自治州: {
        木里藏族自治县: 0.1,
        盐源县: 0.2,
        德昌县: 0.3,
        会理县: 0.4,
        会东县: 0.5,
        宁南县: 0.6,
        普格县: 0.7,
        西昌市: 0.8,
        冕宁县: 0.9,
        越西县: 1.0,
        喜德县: 1.1,
        昭觉县: 1.2,
        布拖县: 1.3,
        甘洛县: 1.4,
        美姑县: 1.5,
        雷波县: 1.6,
        金阳县: 1.7
      },
      阿坝藏族羌族自治州: {
        壤塘县: 0.1,
        阿坝县: 0.2,
        若尔盖县: 0.3,
        九寨沟县: 0.4,
        红原县: 0.5,
        松潘县: 0.6,
        黑水县: 0.7,
        茂县: 0.8,
        理县: 0.9,
        汶川县: 1.0,
        小金县: 1.1,
        金川县: 1.2,
        马尔康: 1.3,
        茂县: 1.4
      },
      绵阳市: {
        平武县: 0.1,
        北川羌族自治县: 0.2,
        江油市: 0.3,
        安州区: 0.4,
        涪城区: 0.5,
        游仙区: 0.6,
        梓潼县: 0.7,
        三台县: 0.8,
        盐亭县: 0.9
      },
      广元市: {
        青川县: 0.1,
        利州区: 0.2,
        朝天区: 0.3,
        旺苍县: 0.4,
        昭化区: 0.5,
        剑阁县: 0.6,
        苍溪县: 0.7
      },
      巴中市: {
        巴州区: 0.1,
        恩阳区: 0.2,
        南江县: 0.3,
        通江县: 0.4,
        平昌县: 0.5
      },
      达州市: {
        渠县: 0.1,
        大竹县: 0.2,
        达川区: 0.3,
        开江县: 0.4,
        通川区: 0.5,
        宣汉县: 0.6,
        万源市: 0.7
      },
      南充市: {
        阆中市: 0.1,
        南部县: 0.2,
        仪陇县: 0.3,
        营山县: 0.4,
        西充县: 0.5,
        顺庆区: 0.6,
        蓬安县: 0.7,
        高坪区: 0.8,
        嘉陵区: 0.9
      },
      德阳市: {
        绵竹市: 0.1,
        什邡市: 0.2,
        罗江区: 0.3,
        旌阳区: 0.4,
        广汉市: 0.5,
        中江县: 0.6
      },
      遂宁市: {
        射洪市: 0.1,
        蓬溪县: 0.2,
        船山区: 0.3,
        大英县: 0.4,
        安居区: 0.5
      },
      广安市: 6,
      成都市: 10,
      资阳市: 11,
      雅安市: 12,
      眉山市: 13,
      内江市: 14,
      乐山市: 15,
      自贡市: 16,
      泸州市: 17,
      宜宾市: 18,
      攀枝花市: {
        盐边县: 0.1,
        仁和区: 0.2,
        西区: 0.3,
        东区: 0.4,
        米易县: 0.5
      }
    };
    let that = this;
    this.axios
      .get(
        `/map/${this.cityName}/${mapList[this.cityName][this.areaName]}.json`
      )
      .then(res => {
        u_map.setCsenter(res.data);
        this.axios
          .post(
            "https://hd.wykjhwj.com/index.php/home/Api/cou_dates",
            qs.stringify({
              id: that.AreaId
            })
          )
          .then(resData => {
            // 地标数据
            that.geoCoordMap = u_map.setCenter(res.data);
            // 传递地表数据和姓名
            that.echarts.registerMap("MY", JSON.stringify(res.data));
            let chart = this.echarts.init(document.getElementById("map"));
            let option = {
              tooltip: {
                trigger: "item",
                formatter: function(params) {
                  return (
                    params.name +
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
                    fontSize: 14,
                    color: "#CFCFCF"
                  },
                  emphasis: {
                    show: true,
                    fontSize: 14, // 选中地图文字字号和字体颜色
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
                }
                // regions: u_map.setColor()
              },
              series: [
                {
                  type: "effectScatter",
                  coordinateSystem: "geo",
                  data: u_map.convertData(that.geoCoordMap, resData.data),
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
          });
      });
  },
  methods: {
    // 上升到市
    backProvince() {
      let that = this;
      let city = this.cityName;
      this.$router.push({
        path: "/index/city",
        query: { name: that.cityName }
      });
    },
    initFunction() {
      // 县市初始化
      let mapList = {
        甘孜藏族自治州: {
          石渠县: 0.1,
          德格县: 0.2,
          白玉县: 0.3,
          巴塘县: 0.4,
          得荣县: 0.5,
          甘孜县: 0.6,
          新龙县: 0.7,
          乡城县: 0.8,
          稻城县: 0.9,
          雅江县: 1.1,
          九龙县: 1.2,
          泸定县: 1.3,
          康定市: 1.4,
          丹巴县: 1.5,
          道孚县: 1.6,
          炉霍县: 1.7,
          色达县: 1.8,
          理塘县: 1.9
        },
        凉山彝族自治州: {
          木里藏族自治县: 0.1,
          盐源县: 0.2,
          德昌县: 0.3,
          会理县: 0.4,
          会东县: 0.5,
          宁南县: 0.6,
          普格县: 0.7,
          西昌市: 0.8,
          冕宁县: 0.9,
          越西县: 1.0,
          喜德县: 1.1,
          昭觉县: 1.2,
          布拖县: 1.3,
          甘洛县: 1.4,
          美姑县: 1.5,
          雷波县: 1.6,
          金阳县: 1.7
        },
        阿坝藏族羌族自治州: {
          壤塘县: 0.1,
          阿坝县: 0.2,
          若尔盖县: 0.3,
          九寨沟县: 0.4,
          红原县: 0.5,
          松潘县: 0.6,
          黑水县: 0.7,
          茂县: 0.8,
          理县: 0.9,
          汶川县: 1.0,
          小金县: 1.1,
          金川县: 1.2,
          马尔康: 1.3,
          茂县: 1.4
        },
        绵阳市: {
          平武县: 0.1,
          北川羌族自治县: 0.2,
          江油市: 0.3,
          安州区: 0.4,
          涪城区: 0.5,
          游仙区: 0.6,
          梓潼县: 0.7,
          三台县: 0.8,
          盐亭县: 0.9
        },
        广元市: {
          青川县: 0.1,
          利州区: 0.2,
          朝天区: 0.3,
          旺苍县: 0.4,
          昭化区: 0.5,
          剑阁县: 0.6,
          苍溪县: 0.7
        },
        巴中市: {
          巴州区: 0.1,
          恩阳区: 0.2,
          南江县: 0.3,
          通江县: 0.4,
          平昌县: 0.5
        },
        达州市: {
          渠县: 0.1,
          大竹县: 0.2,
          达川区: 0.3,
          开江县: 0.4,
          通川区: 0.5,
          宣汉县: 0.6,
          万源市: 0.7
        },
        南充市: {
          阆中市: 0.1,
          南部县: 0.2,
          仪陇县: 0.3,
          营山县: 0.4,
          西充县: 0.5,
          顺庆区: 0.6,
          蓬安县: 0.7,
          高坪区: 0.8,
          嘉陵区: 0.9
        },
        德阳市: {
          绵竹市: 0.1,
          什邡市: 0.2,
          罗江区: 0.3,
          旌阳区: 0.4,
          广汉市: 0.5,
          中江县: 0.6
        },
        遂宁市: {
          射洪市: 0.1,
          蓬溪县: 0.2,
          船山区: 0.3,
          大英县: 0.4,
          安居区: 0.5
        },
        广安市: 6,
        成都市: 10,
        资阳市: 11,
        雅安市: 12,
        眉山市: 13,
        内江市: 14,
        乐山市: 15,
        自贡市: 16,
        泸州市: 17,
        宜宾市: 18,
        攀枝花市: {
          盐边县: 0.1,
          仁和区: 0.2,
          西区: 0.3,
          东区: 0.4,
          米易县: 0.5
        }
      };
      let that = this;
      this.axios
        .get(
          `/map/${this.cityName}/${mapList[this.cityName][this.areaName]}.json`
        )
        .then(res => {
          that.echarts.registerMap("MY", JSON.stringify(res.data));
          let chart = this.echarts.init(document.getElementById("map"));
          let option = {
            tooltip: {
              trigger: "item",
              formatter: function(params) {
                return params.name + " : " + params.value;
              },
              extraCssText: "height:20px;"
            },
            series: [
              {
                name: "SC PopEstimates",
                type: "map",
                aspectScale: 1, // 横向拉伸
                map: "MY",
                label: {
                  show: true,
                  normal: {
                    show: true, // 默认地图文字字号和字体颜色
                    fontSize: 12,
                    color: "#CFCFCF"
                  },
                  emphasis: {
                    show: true,
                    fontSize: 12, // 选中地图文字字号和字体颜色
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
                data: [
                  {
                    name: "涪城区",
                    value: Math.round(Math.random() * 2000),
                    itemStyle: {
                      normal: { areaColor: "#CD2B29", label: { show: false } }
                    }
                  },
                  { name: "广元市", value: Math.round(Math.random() * 2000) },
                  {
                    name: "巴中市",
                    value: Math.round(Math.random() * 2000),
                    itemStyle: {
                      normal: { areaColor: "#500808", label: { show: false } }
                    }
                  },
                  {
                    name: "南充市",
                    value: Math.round(Math.random() * 2000),
                    itemStyle: {
                      normal: { areaColor: "#690909", label: { show: false } }
                    }
                  },
                  { name: "广安市", value: Math.round(Math.random() * 2000) },
                  {
                    name: "达州市",
                    value: Math.round(Math.random() * 2000),
                    itemStyle: {
                      normal: { areaColor: "#1E080A", label: { show: false } }
                    }
                  },
                  {
                    name: "遂宁市",
                    value: Math.round(Math.random() * 2000),
                    itemStyle: {
                      normal: { areaColor: "#1D0708", label: { show: false } }
                    }
                  },
                  { name: "资阳市", value: Math.round(Math.random() * 2000) },
                  { name: "内江市", value: Math.round(Math.random() * 2000) },
                  { name: "自贡市", value: Math.round(Math.random() * 2000) },
                  { name: "宜宾市", value: Math.round(Math.random() * 2000) },
                  { name: "泸州市", value: Math.round(Math.random() * 2000) },
                  { name: "乐山市", value: Math.round(Math.random() * 2000) },
                  {
                    name: "凉山彝族自治州",
                    value: Math.round(Math.random() * 2000)
                  },
                  { name: "攀枝花市", value: Math.round(Math.random() * 2000) },
                  {
                    name: "甘孜藏族自治州",
                    value: Math.round(Math.random() * 2000)
                  },
                  {
                    name: "阿坝藏族羌族自治州",
                    value: Math.round(Math.random() * 2000)
                  },
                  { name: "雅安市", value: Math.round(Math.random() * 2000) },
                  {
                    name: "眉山市",
                    value: Math.round(Math.random() * 2000),
                    itemStyle: {
                      normal: { areaColor: "#261012", label: { show: false } }
                    }
                  },
                  { name: "成都市", value: Math.round(Math.random() * 2000) },
                  {
                    name: "德阳市",
                    value: Math.round(Math.random() * 2000),
                    itemStyle: {
                      normal: { areaColor: "#500808", label: { show: false } }
                    }
                  }
                ]
              }
            ]
          };

          chart.setOption(option);
        });
    }
  },
  watch: {
    areaNaee: function(value) {
      this.cityName = value[0];
      this.areaName = value[1];
      this.initFunction();
    }
  }
};
</script>

<style lang="stylus" scoped></style>
