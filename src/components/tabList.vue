<template>
  <div class="box">
    <div class="list">
      <div class="item" @click="change(0)">
        <img class="end" src="../assets//image/tabBar/end.png" alt />
        <img class="item-title" src="../assets/image/tabBar/font.png" alt />
        <img class="item-icon" src="../assets//image//tabBar/icon1.png" alt />
        <span class="item-text">时间</span>
      </div>
      <div class="item" @click="change(1)">
        <img class="end" src="../assets//image/tabBar/end.png" alt />
        <img class="item-title" src="../assets/image/tabBar/font.png" alt />
        <img class="item-icon" src="../assets//image//tabBar/7.png" alt />
        <span class="item-text">地点</span>
      </div>
      <div class="item" @click="change(2)">
        <img class="end" src="../assets//image/tabBar/end.png" alt />
        <img class="item-title" src="../assets/image/tabBar/font.png" alt />
        <img class="item-icon" src="../assets//image//tabBar/8.png" alt />
        <span class="item-text">含量</span>
      </div>
      <div class="item" @click="change(3)">
        <img class="end" src="../assets//image/tabBar/end.png" alt />
        <img class="item-title" src="../assets/image/tabBar/font.png" alt />
        <img class="item-icon" src="../assets//image//tabBar/9.png" alt />
        <span class="item-text">品牌</span>
      </div>
      <div class="item" @click="change(4)">
        <img class="end" src="../assets//image/tabBar/end.png" alt />
        <img class="item-title" src="../assets/image/tabBar/font.png" alt />
        <img class="item-icon" src="../assets//image//tabBar/10.png" alt />
        <span class="item-text">化肥</span>
      </div>
      <div class="item" @click="change(5)">
        <img class="end" src="../assets//image/tabBar/end.png" alt />
        <img class="item-title" src="../assets/image/tabBar/font.png" alt />
        <img class="item-icon" src="../assets//image//tabBar/11.png" alt />
        <span class="item-text">服务代理</span>
      </div>
    </div>
    <!-- 出来的东西 -->
    <div class="zhezhao" v-if="isHidden">
      <div
        style="padding-top:150px;display:flex;flex-direction:column;align-items:center;justify-content:center;"
      >
        <!-- 时间 -->
        <div>
          <el-date-picker v-model="value1" clear-icon type="month" placeholder="开始时间"></el-date-picker>
        </div>
        <div style="margin-top:10px;margin-bottom:20px;">
          <el-date-picker v-model="value2" clear-icon type="month" placeholder="结束时间"></el-date-picker>
        </div>
      </div>
    </div>
    <div class="zhezhao" v-if="isHidden1" style="top:-70px;">
      <div
        style="padding-top:150px;display:flex;flex-direction:column;align-items:center;justify-content:center;"
      >
        <div class="icon" style="padding-left:10px;padding-top:32px">
          <img src="../assets/image/didian.png" alt style="margin-top: -6px;margin-left:-50px" />
          <el-cascader
            :popper-append-to-body="false"
            @visible-change="disappear1"
            v-model="city"
            placeholder="请选择地点"
            :options="options"
            size="medium"
            @change="handleChange"
          ></el-cascader>
        </div>
      </div>
    </div>
    <div class="zhezhao" v-if="isHidden2" style="top:-5px;">
      <div
        style="padding-top:150px;display:flex;flex-direction:column;align-items:center;justify-content:center;"
      >
        <div class="icon" style="padding-top:30px">
          <img style="left:10px;top:38px;" src="../assets/image/tabBar/huaf.png" alt />
          <!-- 化肥 -->
          <el-select
            @visible-change="disappear"
            :popper-append-to-body="false"
            v-model="value5"
            placeholder="       请选择化肥含量"
          >
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div class="zhezhao" v-if="isHidden3" style="top:50px;">
      <div
        style="padding-top:150px;display:flex;flex-direction:column;align-items:center;justify-content:center;"
      >
        <div class="icon" style="padding-top:25px">
          <img
            src="../assets/image/tabBar/pinpai.png"
            style="margin-left:-60px;margin-top:-10px"
            alt
          />
          <el-select
            @visible-change="disappea2"
            :popper-append-to-body="false"
            v-model="value6"
            placeholder="      请选择农资品牌"
          >
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div class="zhezhao bbb" v-if="isHidden4" style="top:115px;">
      <div
        style="padding-top:150px;display:flex;flex-direction:column;align-items:center;justify-content:center;"
      >
        <div class="icon" style="padding-top:30px">
          <img
            style="height:50px;width:50px;top:23px;left:1px;"
            src="../assets/image/tabBar/hanl.png"
            alt
          />
          <el-cascader
            popper-class="acaca"
            :popper-append-to-body="false"
            v-model="value3"
            :options="options3"
            @change="handleChange"
          ></el-cascader>
        </div>
      </div>
    </div>
    <div class="zhezhao" v-if="isHidden5" style="top:175px;">
      <div
        style="padding-top:150px;display:flex;flex-direction:column;align-items:center;justify-content:center;"
      >
        <div class="icon" style="padding-top:30px">
          <img src="../assets/image/tabBar/daili.png" style="margin-left:-60px;margin-top:-8px" alt />
          <el-select
            class="aaaaa"
            v-model="value4"
            :popper-append-to-body="false"
            placeholder="       请选择服务代理"
          >
            <el-option
              v-for="item in options4"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
      options: [
        // {
        //   value: "成都市",
        //   label: "成都市",
        //   children: [
        //     {
        //       value: "金牛区",
        //       label: "金牛区"
        //     },
        //     {
        //       value: "青羊区",
        //       label: "青羊区"
        //     },
        //     {
        //       value: "武侯区",
        //       label: "武侯区"
        //     },
        //     {
        //       value: "成华区",
        //       label: "成华区"
        //     },
        //     {
        //       value: "郫都区",
        //       label: "郫都区"
        //     },
        //     {
        //       value: "龙泉驿区",
        //       label: "龙泉驿区"
        //     },
        //     {
        //       value: "简阳市",
        //       label: "简阳市"
        //     },
        //     {
        //       value: "金堂县",
        //       label: "金堂县"
        //     },
        //     {
        //       value: "青白江区",
        //       label: "青白江区"
        //     },
        //     {
        //       value: "彭州市",
        //       label: "彭州市"
        //     },
        //     {
        //       value: "都江堰市",
        //       label: "都江堰市"
        //     },
        //     {
        //       value: "崇州市",
        //       label: "崇州市"
        //     },
        //     {
        //       value: "大邑县",
        //       label: "大邑县"
        //     },
        //     {
        //       value: "邛崃市",
        //       label: "邛崃市"
        //     },
        //     {
        //       value: "蒲江县",
        //       label: "蒲江县"
        //     },
        //     {
        //       value: "新津县",
        //       label: "新津县"
        //     },
        //     {
        //       value: "双流区",
        //       label: "双流区"
        //     },
        //     {
        //       value: "锦江区",
        //       label: "锦江区"
        //     },
        //     {
        //       value: "温江区",
        //       label: "温江区"
        //     }
        //   ]
        // },
        {
          value: "绵阳市",
          label: "      绵阳市"
          // children: [
          //   {
          //     value: "涪城区",
          //     label: "涪城区"
          //   },
          //   {
          //     value: "平武县",
          //     label: "平武县"
          //   },
          //   {
          //     value: "北川羌族自治县",
          //     label: "北川羌族自治县"
          //   },
          //   {
          //     value: "游仙区",
          //     label: "游仙区"
          //   },
          //   {
          //     value: "江油市",
          //     label: "江油市"
          //   },
          //   {
          //     value: "安州区",
          //     label: "安州区"
          //   },
          //   {
          //     value: "梓潼县",
          //     label: "梓潼县"
          //   },
          //   {
          //     value: "三台县",
          //     label: "三台县"
          //   },
          //   {
          //     value: "盐亭县",
          //     label: "盐亭县"
          //   }
          // ]
        },
        {
          value: "德阳市",
          label: "德阳市"
        },
        {
          value: "遂宁市",
          label: "遂宁市"
        },
        // {
        //   value: "雅安市",
        //   label: "雅安市"
        // },
        // {
        //   value: "眉山市",
        //   label: "眉山市"
        // },
        // {
        //   value: "乐山市",
        //   label: "乐山市"
        // },
        {
          value: "广元市",
          label: "广元市"
        },
        {
          value: "巴中市",
          label: "巴中市"
        },
        // {
        //   value: "达州市",
        //   label: "达州市"
        // },
        {
          value: "南充市",
          label: "南充市"
        }
        // {
        //   value: "宜宾市",
        //   label: "宜宾市"
        // },
        // {
        //   value: "攀枝花市",
        //   label: "攀枝花市"
        // },
        // {
        //   value: "资阳市",
        //   label: "资阳市"
        // },
        // {
        //   value: "自贡市",
        //   label: "自贡市"
        // },
        // {
        //   value: "内江市",
        //   label: "内江市"
        // },
        // {
        //   value: "泸州市",
        //   label: "泸州市"
        // },
        // {
        //   value: "广安市",
        //   label: "广安市"
        // },
        // {
        //   value: "达州市",
        //   label: "达州市"
        // }
      ],
      value5: "",
      // 肥料
      options1: [
        {
          value: "35bb",
          label: "35%bb肥"
        },
        {
          value: "35kl",
          label: "35%颗粒肥"
        },
        {
          value: "40kl",
          label: "40%颗粒肥"
        },
        {
          value: "45fh",
          label: "45%复合肥"
        },
        {
          value: "nsx",
          label: "尿素"
        },
        {
          value: "25fh",
          label: "25%复合肥"
        },
        {
          value: "pc",
          label: "普彩肥"
        },
        {
          value: "hj",
          label: "红钾肥"
        },
        {
          value: "ty",
          label: "通用肥"
        },
        {
          value: "30hs",
          label: "花生颗粒肥"
        }
      ],
      // 农资品牌
      options2: [
        {
          value: "万稼宜",
          label: "万稼宜"
        },
        {
          value: "仙农",
          label: "仙农"
        },
        {
          value: "万亿",
          label: "万亿"
        }
      ],
      value6: "",
      // 含量
      options3: [
        {
          value: "专用肥",
          label: "        专用肥",
          children: [
            {
              value: "小麦",
              label: "小麦",
              children: [
                {
                  value: "30%含量",
                  label: "30%含量",
                  children: [
                    {
                      value: "20kg",
                      label: "20kg"
                    },
                    {
                      value: "25kg",
                      label: "25kg"
                    },
                    {
                      value: "35kg",
                      label: "35kg"
                    },
                    {
                      value: "40kg",
                      label: "40kg"
                    },
                    {
                      value: "50kg",
                      label: "50kg"
                    }
                  ]
                },
                {
                  value: "35%含量",
                  label: "35%含量",
                  children: [
                    {
                      value: "20kg",
                      label: "20kg"
                    },
                    {
                      value: "25kg",
                      label: "25kg"
                    },
                    {
                      value: "35kg",
                      label: "35kg"
                    },
                    {
                      value: "40kg",
                      label: "40kg"
                    },
                    {
                      value: "50kg",
                      label: "50kg"
                    }
                  ]
                },
                {
                  value: "40%含量",
                  label: "40%含量",
                  children: [
                    {
                      value: "20kg",
                      label: "20kg"
                    },
                    {
                      value: "25kg",
                      label: "25kg"
                    },
                    {
                      value: "35kg",
                      label: "35kg"
                    },
                    {
                      value: "40kg",
                      label: "40kg"
                    },
                    {
                      value: "50kg",
                      label: "50kg"
                    }
                  ]
                },
                {
                  value: "45%含量",
                  label: "45%含量",
                  children: [
                    {
                      value: "20kg",
                      label: "20kg"
                    },
                    {
                      value: "25kg",
                      label: "25kg"
                    },
                    {
                      value: "35kg",
                      label: "35kg"
                    },
                    {
                      value: "40kg",
                      label: "40kg"
                    },
                    {
                      value: "50kg",
                      label: "50kg"
                    }
                  ]
                }
              ]
            },
            {
              value: "玉米",
              label: "玉米",
              children: [
                {
                  value: "30%含量",
                  label: "30%含量",
                  children: [
                    {
                      value: "20kg",
                      label: "20kg"
                    },
                    {
                      value: "25kg",
                      label: "25kg"
                    },
                    {
                      value: "35kg",
                      label: "35kg"
                    },
                    {
                      value: "40kg",
                      label: "40kg"
                    },
                    {
                      value: "50kg",
                      label: "50kg"
                    }
                  ]
                },
                {
                  value: "35%含量",
                  label: "35%含量",
                  children: [
                    {
                      value: "20kg",
                      label: "20kg"
                    },
                    {
                      value: "25kg",
                      label: "25kg"
                    },
                    {
                      value: "35kg",
                      label: "35kg"
                    },
                    {
                      value: "40kg",
                      label: "40kg"
                    },
                    {
                      value: "50kg",
                      label: "50kg"
                    }
                  ]
                },
                {
                  value: "40%含量",
                  label: "40%含量",
                  children: [
                    {
                      value: "20kg",
                      label: "20kg"
                    },
                    {
                      value: "25kg",
                      label: "25kg"
                    },
                    {
                      value: "35kg",
                      label: "35kg"
                    },
                    {
                      value: "40kg",
                      label: "40kg"
                    },
                    {
                      value: "50kg",
                      label: "50kg"
                    }
                  ]
                },
                {
                  value: "45%含量",
                  label: "45%含量",
                  children: [
                    {
                      value: "20kg",
                      label: "20kg"
                    },
                    {
                      value: "25kg",
                      label: "25kg"
                    },
                    {
                      value: "35kg",
                      label: "35kg"
                    },
                    {
                      value: "40kg",
                      label: "40kg"
                    },
                    {
                      value: "50kg",
                      label: "50kg"
                    }
                  ]
                }
              ]
            },
            {
              value: "花生",
              label: "花生",
              children: [
                {
                  value: "30%含量",
                  label: "30%含量",
                  children: [
                    {
                      value: "20kg",
                      label: "20kg"
                    },
                    {
                      value: "25kg",
                      label: "25kg"
                    },
                    {
                      value: "35kg",
                      label: "35kg"
                    },
                    {
                      value: "40kg",
                      label: "40kg"
                    },
                    {
                      value: "50kg",
                      label: "50kg"
                    }
                  ]
                },
                {
                  value: "35%含量",
                  label: "35%含量",
                  children: [
                    {
                      value: "20kg",
                      label: "20kg"
                    },
                    {
                      value: "25kg",
                      label: "25kg"
                    },
                    {
                      value: "35kg",
                      label: "35kg"
                    },
                    {
                      value: "40kg",
                      label: "40kg"
                    },
                    {
                      value: "50kg",
                      label: "50kg"
                    }
                  ]
                },
                {
                  value: "40%含量",
                  label: "40%含量",
                  children: [
                    {
                      value: "20kg",
                      label: "20kg"
                    },
                    {
                      value: "25kg",
                      label: "25kg"
                    },
                    {
                      value: "35kg",
                      label: "35kg"
                    },
                    {
                      value: "40kg",
                      label: "40kg"
                    },
                    {
                      value: "50kg",
                      label: "50kg"
                    }
                  ]
                },
                {
                  value: "45%含量",
                  label: "45%含量",
                  children: [
                    {
                      value: "20kg",
                      label: "20kg"
                    },
                    {
                      value: "25kg",
                      label: "25kg"
                    },
                    {
                      value: "35kg",
                      label: "35kg"
                    },
                    {
                      value: "40kg",
                      label: "40kg"
                    },
                    {
                      value: "50kg",
                      label: "50kg"
                    }
                  ]
                }
              ]
            },
            {
              value: "西瓜",
              label: "西瓜",
              children: [
                {
                  value: "30%含量",
                  label: "30%含量",
                  children: [
                    {
                      value: "20kg",
                      label: "20kg"
                    },
                    {
                      value: "25kg",
                      label: "25kg"
                    },
                    {
                      value: "35kg",
                      label: "35kg"
                    },
                    {
                      value: "40kg",
                      label: "40kg"
                    },
                    {
                      value: "50kg",
                      label: "50kg"
                    }
                  ]
                },
                {
                  value: "35%含量",
                  label: "35%含量",
                  children: [
                    {
                      value: "20kg",
                      label: "20kg"
                    },
                    {
                      value: "25kg",
                      label: "25kg"
                    },
                    {
                      value: "35kg",
                      label: "35kg"
                    },
                    {
                      value: "40kg",
                      label: "40kg"
                    },
                    {
                      value: "50kg",
                      label: "50kg"
                    }
                  ]
                },
                {
                  value: "40%含量",
                  label: "40%含量",
                  children: [
                    {
                      value: "20kg",
                      label: "20kg"
                    },
                    {
                      value: "25kg",
                      label: "25kg"
                    },
                    {
                      value: "35kg",
                      label: "35kg"
                    },
                    {
                      value: "40kg",
                      label: "40kg"
                    },
                    {
                      value: "50kg",
                      label: "50kg"
                    }
                  ]
                },
                {
                  value: "45%含量",
                  label: "45%含量",
                  children: [
                    {
                      value: "20kg",
                      label: "20kg"
                    },
                    {
                      value: "25kg",
                      label: "25kg"
                    },
                    {
                      value: "35kg",
                      label: "35kg"
                    },
                    {
                      value: "40kg",
                      label: "40kg"
                    },
                    {
                      value: "50kg",
                      label: "50kg"
                    }
                  ]
                }
              ]
            },
            {
              value: "桑树",
              label: "桑树",
              children: [
                {
                  value: "30%含量",
                  label: "30%含量",
                  children: [
                    {
                      value: "20kg",
                      label: "20kg"
                    },
                    {
                      value: "25kg",
                      label: "25kg"
                    },
                    {
                      value: "35kg",
                      label: "35kg"
                    },
                    {
                      value: "40kg",
                      label: "40kg"
                    },
                    {
                      value: "50kg",
                      label: "50kg"
                    }
                  ]
                },
                {
                  value: "35%含量",
                  label: "35%含量",
                  children: [
                    {
                      value: "20kg",
                      label: "20kg"
                    },
                    {
                      value: "25kg",
                      label: "25kg"
                    },
                    {
                      value: "35kg",
                      label: "35kg"
                    },
                    {
                      value: "40kg",
                      label: "40kg"
                    },
                    {
                      value: "50kg",
                      label: "50kg"
                    }
                  ]
                },
                {
                  value: "40%含量",
                  label: "40%含量",
                  children: [
                    {
                      value: "20kg",
                      label: "20kg"
                    },
                    {
                      value: "25kg",
                      label: "25kg"
                    },
                    {
                      value: "35kg",
                      label: "35kg"
                    },
                    {
                      value: "40kg",
                      label: "40kg"
                    },
                    {
                      value: "50kg",
                      label: "50kg"
                    }
                  ]
                },
                {
                  value: "45%含量",
                  label: "45%含量",
                  children: [
                    {
                      value: "20kg",
                      label: "20kg"
                    },
                    {
                      value: "25kg",
                      label: "25kg"
                    },
                    {
                      value: "35kg",
                      label: "35kg"
                    },
                    {
                      value: "40kg",
                      label: "40kg"
                    },
                    {
                      value: "50kg",
                      label: "50kg"
                    }
                  ]
                }
              ]
            },
            {
              value: "油菜",
              label: "油菜",
              children: [
                {
                  value: "30%含量",
                  label: "30%含量",
                  children: [
                    {
                      value: "20kg",
                      label: "20kg"
                    },
                    {
                      value: "25kg",
                      label: "25kg"
                    },
                    {
                      value: "35kg",
                      label: "35kg"
                    },
                    {
                      value: "40kg",
                      label: "40kg"
                    },
                    {
                      value: "50kg",
                      label: "50kg"
                    }
                  ]
                },
                {
                  value: "35%含量",
                  label: "35%含量",
                  children: [
                    {
                      value: "20kg",
                      label: "20kg"
                    },
                    {
                      value: "25kg",
                      label: "25kg"
                    },
                    {
                      value: "35kg",
                      label: "35kg"
                    },
                    {
                      value: "40kg",
                      label: "40kg"
                    },
                    {
                      value: "50kg",
                      label: "50kg"
                    }
                  ]
                },
                {
                  value: "40%含量",
                  label: "40%含量",
                  children: [
                    {
                      value: "20kg",
                      label: "20kg"
                    },
                    {
                      value: "25kg",
                      label: "25kg"
                    },
                    {
                      value: "35kg",
                      label: "35kg"
                    },
                    {
                      value: "40kg",
                      label: "40kg"
                    },
                    {
                      value: "50kg",
                      label: "50kg"
                    }
                  ]
                },
                {
                  value: "45%含量",
                  label: "45%含量",
                  children: [
                    {
                      value: "20kg",
                      label: "20kg"
                    },
                    {
                      value: "25kg",
                      label: "25kg"
                    },
                    {
                      value: "35kg",
                      label: "35kg"
                    },
                    {
                      value: "40kg",
                      label: "40kg"
                    },
                    {
                      value: "50kg",
                      label: "50kg"
                    }
                  ]
                }
              ]
            },
            {
              value: "育秧",
              label: "育秧",
              children: [
                {
                  value: "30%含量",
                  label: "30%含量",
                  children: [
                    {
                      value: "20kg",
                      label: "20kg"
                    },
                    {
                      value: "25kg",
                      label: "25kg"
                    },
                    {
                      value: "35kg",
                      label: "35kg"
                    },
                    {
                      value: "40kg",
                      label: "40kg"
                    },
                    {
                      value: "50kg",
                      label: "50kg"
                    }
                  ]
                },
                {
                  value: "35%含量",
                  label: "35%含量",
                  children: [
                    {
                      value: "20kg",
                      label: "20kg"
                    },
                    {
                      value: "25kg",
                      label: "25kg"
                    },
                    {
                      value: "35kg",
                      label: "35kg"
                    },
                    {
                      value: "40kg",
                      label: "40kg"
                    },
                    {
                      value: "50kg",
                      label: "50kg"
                    }
                  ]
                },
                {
                  value: "40%含量",
                  label: "40%含量",
                  children: [
                    {
                      value: "20kg",
                      label: "20kg"
                    },
                    {
                      value: "25kg",
                      label: "25kg"
                    },
                    {
                      value: "35kg",
                      label: "35kg"
                    },
                    {
                      value: "40kg",
                      label: "40kg"
                    },
                    {
                      value: "50kg",
                      label: "50kg"
                    }
                  ]
                },
                {
                  value: "45%含量",
                  label: "45%含量",
                  children: [
                    {
                      value: "20kg",
                      label: "20kg"
                    },
                    {
                      value: "25kg",
                      label: "25kg"
                    },
                    {
                      value: "35kg",
                      label: "35kg"
                    },
                    {
                      value: "40kg",
                      label: "40kg"
                    },
                    {
                      value: "50kg",
                      label: "50kg"
                    }
                  ]
                }
              ]
            },
            {
              value: "水稻",
              label: "水稻",
              children: [
                {
                  value: "30%含量",
                  label: "30%含量",
                  children: [
                    {
                      value: "20kg",
                      label: "20kg"
                    },
                    {
                      value: "25kg",
                      label: "25kg"
                    },
                    {
                      value: "35kg",
                      label: "35kg"
                    },
                    {
                      value: "40kg",
                      label: "40kg"
                    },
                    {
                      value: "50kg",
                      label: "50kg"
                    }
                  ]
                },
                {
                  value: "35%含量",
                  label: "35%含量",
                  children: [
                    {
                      value: "20kg",
                      label: "20kg"
                    },
                    {
                      value: "25kg",
                      label: "25kg"
                    },
                    {
                      value: "35kg",
                      label: "35kg"
                    },
                    {
                      value: "40kg",
                      label: "40kg"
                    },
                    {
                      value: "50kg",
                      label: "50kg"
                    }
                  ]
                },
                {
                  value: "40%含量",
                  label: "40%含量",
                  children: [
                    {
                      value: "20kg",
                      label: "20kg"
                    },
                    {
                      value: "25kg",
                      label: "25kg"
                    },
                    {
                      value: "35kg",
                      label: "35kg"
                    },
                    {
                      value: "40kg",
                      label: "40kg"
                    },
                    {
                      value: "50kg",
                      label: "50kg"
                    }
                  ]
                },
                {
                  value: "45%含量",
                  label: "45%含量",
                  children: [
                    {
                      value: "20kg",
                      label: "20kg"
                    },
                    {
                      value: "25kg",
                      label: "25kg"
                    },
                    {
                      value: "35kg",
                      label: "35kg"
                    },
                    {
                      value: "40kg",
                      label: "40kg"
                    },
                    {
                      value: "50kg",
                      label: "50kg"
                    }
                  ]
                }
              ]
            },
            {
              value: "红薯",
              label: "红薯",
              children: [
                {
                  value: "30%含量",
                  label: "30%含量",
                  children: [
                    {
                      value: "20kg",
                      label: "20kg"
                    },
                    {
                      value: "25kg",
                      label: "25kg"
                    },
                    {
                      value: "35kg",
                      label: "35kg"
                    },
                    {
                      value: "40kg",
                      label: "40kg"
                    },
                    {
                      value: "50kg",
                      label: "50kg"
                    }
                  ]
                },
                {
                  value: "35%含量",
                  label: "35%含量",
                  children: [
                    {
                      value: "20kg",
                      label: "20kg"
                    },
                    {
                      value: "25kg",
                      label: "25kg"
                    },
                    {
                      value: "35kg",
                      label: "35kg"
                    },
                    {
                      value: "40kg",
                      label: "40kg"
                    },
                    {
                      value: "50kg",
                      label: "50kg"
                    }
                  ]
                },
                {
                  value: "40%含量",
                  label: "40%含量",
                  children: [
                    {
                      value: "20kg",
                      label: "20kg"
                    },
                    {
                      value: "25kg",
                      label: "25kg"
                    },
                    {
                      value: "35kg",
                      label: "35kg"
                    },
                    {
                      value: "40kg",
                      label: "40kg"
                    },
                    {
                      value: "50kg",
                      label: "50kg"
                    }
                  ]
                },
                {
                  value: "45%含量",
                  label: "45%含量",
                  children: [
                    {
                      value: "20kg",
                      label: "20kg"
                    },
                    {
                      value: "25kg",
                      label: "25kg"
                    },
                    {
                      value: "35kg",
                      label: "35kg"
                    },
                    {
                      value: "40kg",
                      label: "40kg"
                    },
                    {
                      value: "50kg",
                      label: "50kg"
                    }
                  ]
                }
              ]
            },
            {
              value: "莲藕",
              label: "莲藕",
              children: [
                {
                  value: "30%含量",
                  label: "30%含量",
                  children: [
                    {
                      value: "20kg",
                      label: "20kg"
                    },
                    {
                      value: "25kg",
                      label: "25kg"
                    },
                    {
                      value: "35kg",
                      label: "35kg"
                    },
                    {
                      value: "40kg",
                      label: "40kg"
                    },
                    {
                      value: "50kg",
                      label: "50kg"
                    }
                  ]
                },
                {
                  value: "35%含量",
                  label: "35%含量",
                  children: [
                    {
                      value: "20kg",
                      label: "20kg"
                    },
                    {
                      value: "25kg",
                      label: "25kg"
                    },
                    {
                      value: "35kg",
                      label: "35kg"
                    },
                    {
                      value: "40kg",
                      label: "40kg"
                    },
                    {
                      value: "50kg",
                      label: "50kg"
                    }
                  ]
                },
                {
                  value: "40%含量",
                  label: "40%含量",
                  children: [
                    {
                      value: "20kg",
                      label: "20kg"
                    },
                    {
                      value: "25kg",
                      label: "25kg"
                    },
                    {
                      value: "35kg",
                      label: "35kg"
                    },
                    {
                      value: "40kg",
                      label: "40kg"
                    },
                    {
                      value: "50kg",
                      label: "50kg"
                    }
                  ]
                },
                {
                  value: "45%含量",
                  label: "45%含量",
                  children: [
                    {
                      value: "20kg",
                      label: "20kg"
                    },
                    {
                      value: "25kg",
                      label: "25kg"
                    },
                    {
                      value: "35kg",
                      label: "35kg"
                    },
                    {
                      value: "40kg",
                      label: "40kg"
                    },
                    {
                      value: "50kg",
                      label: "50kg"
                    }
                  ]
                }
              ]
            },
            {
              value: "辣椒",
              label: "辣椒",
              children: [
                {
                  value: "30%含量",
                  label: "30%含量",
                  children: [
                    {
                      value: "20kg",
                      label: "20kg"
                    },
                    {
                      value: "25kg",
                      label: "25kg"
                    },
                    {
                      value: "35kg",
                      label: "35kg"
                    },
                    {
                      value: "40kg",
                      label: "40kg"
                    },
                    {
                      value: "50kg",
                      label: "50kg"
                    }
                  ]
                },
                {
                  value: "35%含量",
                  label: "35%含量",
                  children: [
                    {
                      value: "20kg",
                      label: "20kg"
                    },
                    {
                      value: "25kg",
                      label: "25kg"
                    },
                    {
                      value: "35kg",
                      label: "35kg"
                    },
                    {
                      value: "40kg",
                      label: "40kg"
                    },
                    {
                      value: "50kg",
                      label: "50kg"
                    }
                  ]
                },
                {
                  value: "40%含量",
                  label: "40%含量",
                  children: [
                    {
                      value: "20kg",
                      label: "20kg"
                    },
                    {
                      value: "25kg",
                      label: "25kg"
                    },
                    {
                      value: "35kg",
                      label: "35kg"
                    },
                    {
                      value: "40kg",
                      label: "40kg"
                    },
                    {
                      value: "50kg",
                      label: "50kg"
                    }
                  ]
                },
                {
                  value: "45%含量",
                  label: "45%含量",
                  children: [
                    {
                      value: "20kg",
                      label: "20kg"
                    },
                    {
                      value: "25kg",
                      label: "25kg"
                    },
                    {
                      value: "35kg",
                      label: "35kg"
                    },
                    {
                      value: "40kg",
                      label: "40kg"
                    },
                    {
                      value: "50kg",
                      label: "50kg"
                    }
                  ]
                }
              ]
            },
            {
              value: "茶叶",
              label: "茶叶",
              children: [
                {
                  value: "30%含量",
                  label: "30%含量",
                  children: [
                    {
                      value: "20kg",
                      label: "20kg"
                    },
                    {
                      value: "25kg",
                      label: "25kg"
                    },
                    {
                      value: "35kg",
                      label: "35kg"
                    },
                    {
                      value: "40kg",
                      label: "40kg"
                    },
                    {
                      value: "50kg",
                      label: "50kg"
                    }
                  ]
                },
                {
                  value: "35%含量",
                  label: "35%含量",
                  children: [
                    {
                      value: "20kg",
                      label: "20kg"
                    },
                    {
                      value: "25kg",
                      label: "25kg"
                    },
                    {
                      value: "35kg",
                      label: "35kg"
                    },
                    {
                      value: "40kg",
                      label: "40kg"
                    },
                    {
                      value: "50kg",
                      label: "50kg"
                    }
                  ]
                },
                {
                  value: "40%含量",
                  label: "40%含量",
                  children: [
                    {
                      value: "20kg",
                      label: "20kg"
                    },
                    {
                      value: "25kg",
                      label: "25kg"
                    },
                    {
                      value: "35kg",
                      label: "35kg"
                    },
                    {
                      value: "40kg",
                      label: "40kg"
                    },
                    {
                      value: "50kg",
                      label: "50kg"
                    }
                  ]
                },
                {
                  value: "45%含量",
                  label: "45%含量",
                  children: [
                    {
                      value: "20kg",
                      label: "20kg"
                    },
                    {
                      value: "25kg",
                      label: "25kg"
                    },
                    {
                      value: "35kg",
                      label: "35kg"
                    },
                    {
                      value: "40kg",
                      label: "40kg"
                    },
                    {
                      value: "50kg",
                      label: "50kg"
                    }
                  ]
                }
              ]
            },
            {
              value: "果蔬",
              label: "果蔬",
              children: [
                {
                  value: "30%含量",
                  label: "30%含量",
                  children: [
                    {
                      value: "20kg",
                      label: "20kg"
                    },
                    {
                      value: "25kg",
                      label: "25kg"
                    },
                    {
                      value: "35kg",
                      label: "35kg"
                    },
                    {
                      value: "40kg",
                      label: "40kg"
                    },
                    {
                      value: "50kg",
                      label: "50kg"
                    }
                  ]
                },
                {
                  value: "35%含量",
                  label: "35%含量",
                  children: [
                    {
                      value: "20kg",
                      label: "20kg"
                    },
                    {
                      value: "25kg",
                      label: "25kg"
                    },
                    {
                      value: "35kg",
                      label: "35kg"
                    },
                    {
                      value: "40kg",
                      label: "40kg"
                    },
                    {
                      value: "50kg",
                      label: "50kg"
                    }
                  ]
                },
                {
                  value: "40%含量",
                  label: "40%含量",
                  children: [
                    {
                      value: "20kg",
                      label: "20kg"
                    },
                    {
                      value: "25kg",
                      label: "25kg"
                    },
                    {
                      value: "35kg",
                      label: "35kg"
                    },
                    {
                      value: "40kg",
                      label: "40kg"
                    },
                    {
                      value: "50kg",
                      label: "50kg"
                    }
                  ]
                },
                {
                  value: "45%含量",
                  label: "45%含量",
                  children: [
                    {
                      value: "20kg",
                      label: "20kg"
                    },
                    {
                      value: "25kg",
                      label: "25kg"
                    },
                    {
                      value: "35kg",
                      label: "35kg"
                    },
                    {
                      value: "40kg",
                      label: "40kg"
                    },
                    {
                      value: "50kg",
                      label: "50kg"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          value: "通用肥",
          label: "        通用肥",
          children: [
            {
              value: "30%含量",
              label: "30%含量",
              children: [
                {
                  value: "20kg",
                  label: "20kg"
                },
                {
                  value: "25kg",
                  label: "25kg"
                },
                {
                  value: "35kg",
                  label: "35kg"
                },
                {
                  value: "40kg",
                  label: "40kg"
                },
                {
                  value: "50kg",
                  label: "50kg"
                }
              ]
            },
            {
              value: "35%含量",
              label: "35%含量",
              children: [
                {
                  value: "20kg",
                  label: "20kg"
                },
                {
                  value: "25kg",
                  label: "25kg"
                },
                {
                  value: "35kg",
                  label: "35kg"
                },
                {
                  value: "40kg",
                  label: "40kg"
                },
                {
                  value: "50kg",
                  label: "50kg"
                }
              ]
            },
            {
              value: "40%含量",
              label: "40%含量",
              children: [
                {
                  value: "20kg",
                  label: "20kg"
                },
                {
                  value: "25kg",
                  label: "25kg"
                },
                {
                  value: "35kg",
                  label: "35kg"
                },
                {
                  value: "40kg",
                  label: "40kg"
                },
                {
                  value: "50kg",
                  label: "50kg"
                }
              ]
            },
            {
              value: "45%含量",
              label: "45%含量",
              children: [
                {
                  value: "20kg",
                  label: "20kg"
                },
                {
                  value: "25kg",
                  label: "25kg"
                },
                {
                  value: "35kg",
                  label: "35kg"
                },
                {
                  value: "40kg",
                  label: "40kg"
                },
                {
                  value: "50kg",
                  label: "50kg"
                }
              ]
            }
          ]
        }
      ],
      value3: "",
      // 服务代理
      options4: [],
      value4: ""
    };
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
      console.log("化肥aaa", this.value);
    },
    // 地点
    handleChange() {
      if (this.city[1]) {
        this.$emit("cityd", this.city);
      } else {
        this.$emit("cityd", this.city[0]);
      }
    },
    disappear(data) {
      if (data === false) {
        this.isHidden2 = false;
      }
    },
    disappear1(data) {
      if (data === false) {
        this.isHidden1 = false;
      }
    },
    disappea2(data) {
      if (data === false) {
        this.isHidden3 = false;
      }
    }
  },
  watch: {
    // 时间
    value2: function(value) {
      if (this.value1 === "") {
        this.$message({
          message: "请选择开始时间或者结束时间",
          type: "warning"
        });
      } else if (this.value1 !== "") {
        if (this.value1 > this.value2) {
          this.$message.error("开始时间不能大于结束时间");
          this.value1 = "";
          this.value2 = "";
        } else {
          let time = [this.value1, this.value2];
          // 传送时间数据
          this.$emit("time", time);
        }
      }
    },
    // 化肥产品
    value5: function(value) {
      //改变化肥品牌是需要更换的数据
      this.$emit("barnd", value);
    },
    // 品牌
    value6: function(value) {
      console.log(value);
    }
  }
};
</script>

<style lang="stylus" scoped>
.box {
  position: relative;
}

.list {
  height: 680px;
  width: 420px;
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
  background-image: url('../assets/image/tabBar/background.png');
  background-repeat: no-repeat;
  background-size: 100%;
  position: absolute;
  top: -180px;
  left: 400px;
  height: 400px;
  width: 500px;
  z-index: 100;
}

// 时间框
.el-date-editor {
  width: 350px;
}

>>> .el-input__inner {
  height: 55px;
  width: 245px;
  margin-bottom: 2px;
  border: 1px solid #00FFE6 !important;
  background: #004D42;
  text-align: center;
  font-size: 22px;
}

>>> .el-input__icon {
  margin-left: 30px;
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
    top: 65px;
    left: 100px;
    z-index: 111;
    height: 30px;
    width: 30px;
  }
}

>>> .el-select-dropdown {
  border: none;
  display: inline-block;
  background: url('../assets/image/tabBar/33.png') no-repeat right top transparent;
  height: 450px;
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
  font-size: 20px;
  width: 280px;
  margin-left: 50px;
  opacity: 0.9;
}

>>> .el-select-dropdown__wrap {
  display: flex;
  justify-content: center;
  margin-top: 40px;
  max-height: 500px !important;
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

>>> .el-scrollbar__wrap {
  height: 300px !important;
  overflow-x: hidden;
}

>>> .el-scrollbar {
  height: 430px !important;
}

>>> .el-select-dropdown__list {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 500px;
}
</style>
<style lang="stylus">
// 城市地点
.el-cascader__dropdown {
  border: none;
  display: inline-block;
  background: url('../assets/image/tabBar/101.png') no-repeat;
  height: 750px;
  width: 700px;

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
    width: 100px !important;
  }

  // 字体
  .el-cascader-node__label {
    font-size: 22px !important;
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

.is-active {
  color: #08BCA2 !important;
}

.in-active-path {
  color: #08BCA2 !important;
}

.el-select-dropdown__empty {
  font-size: 20px !important;
  padding: 150px 0;
}

.aaaaa .el-select-dropdown {
  min-width: 290px !important;
}

.acaca {
  top: 690px !important;
  height: 400px !important;
  width: 1000px !important;
}

.el-cascader-menu {
  height: 500px !important;
}

.el-cascader-panel {
  overflow-x: hidden;
}
</style>
