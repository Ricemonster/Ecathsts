/*
 * @Author: your name
 * @Date: 2020-06-03 15:26:03
 * @LastEditTime: 2020-06-08 15:45:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \echarts\src\util\map.js
 */
module.exports = {
    // 设置等级颜色
    setColor(data, RegionalData) {
        var res = [];
        if (RegionalData[0].name !== '绵阳市') {
            for (let i = 0; i < RegionalData.length; i++) {
                let name = RegionalData[i].name;
                let hierarchy = RegionalData[i].hierarchy;
                let colorMap = {
                    1: "#FF3430",
                    2: "#A81714",
                    3: "#701513",
                    4: "#441A19",
                    5: "#512B2B",
                    6: "#72504F",
                    7: "#784847",
                    8: "#985553",
                    9: "#B36664",
                    10: "#ab7877",
                    11: "#000606"

                };
                if (name) {
                    res.push({
                        name: name,
                        itemStyle: {
                            normal: {
                                areaColor: colorMap[hierarchy]
                            }
                        }
                    });
                }
            }
        } else {
            for (let i = 0; i < data.length; i++) {
                let name = data[i].name;
                let hierarchy = data[i].hierarchy;
                let colorMap = {
                    1: "#FF3430",
                    2: "#A81714",
                    3: "#701513",
                    4: "#441A19",
                    5: "#512B2B",
                    6: "#72504F",
                    7: "#784847",
                    8: "#985553",
                    9: "#B36664",
                    10: "#ab7877"
                };
                if (name) {
                    res.push({
                        name: name,
                        itemStyle: {
                            normal: {
                                areaColor: colorMap[hierarchy]
                            }
                        }
                    });
                }
            }
        }
        return res;
    },
    // 处理中心点位置
    // 绵阳-平武
    setCenter(data, city) {
        let geoMap = {}
        for (let i = 0; i < data.features.length; i++) {
            let name = data.features[i].properties.name;
            if (data.features[i].properties.center) {
                let center = data.features[i].properties.center
                geoMap[name] = center;
            }
        }
        return geoMap
    },
    convertData(center, data) {
        let res = []
        for (let i = 0; i < data.length; i++) {
            let geoCoord = center[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord,
                    data: {
                        sales: 0,
                        Brand: "万稼宜",
                        stores: data[i].stores,
                        area: data[i].area,
                        land: data[i].land,
                        farmer: data[i].farmer,
                        villages: data[i].villages,
                        people: data[i].people
                    }
                })
            }
        }
        return res
    },
    // 批量的给数组添加地标数据 center
    setCsenter(data) {
        for (let i = 0; i < data.features.length; i++) {
            if (!data.features[i].properties.center) {
                let one = data.features[i].geometry.coordinates[0][0][0]
                let two = data.features[i].geometry.coordinates[0][0][1]
                data.features[i].properties.center = [one, two]
            }
        }
    }
}