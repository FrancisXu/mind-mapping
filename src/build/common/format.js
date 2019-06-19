/**
 * Created by Francis Xu on 2018/10/12.
 * 数据转换
 */

import verify from "./verify";

export default {
    // 时间戳 转 年-月-日
    getDate(time) {
        let date = new Date(time),
            Y = date.getFullYear() + '-',
            M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth()) + '-',
            D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
        return Y + M + D;
    },

    // 时间戳 转 年-月-日 时:分:秒
    getDataTime(time) {
        let date;
        if (time) {
            date = new Date(time);
        } else {
            date = new Date();
        }

        let Y = date.getFullYear() + '-',
            M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth()) + '-',
            D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ',
            h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':',
            m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':',
            s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return Y + M + D + h + m + s;
    },

    // 时间戳 转 月-日 时:分:秒
    dateTimeWithoutYearSecond(time) {
        let date;
        if (time) {
            date = new Date(time);
        } else {
            date = new Date();
        }

        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth()) + '-',
            D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ',
            h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':',
            m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
        return M + D + h + m;
    },

    // 千分位分隔符
    thousandSeparator(str) {
        str = str.toString();
        return str.replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
    },

    // 数字向下取整 --> 比如 97按10位向下取整的话就是90
    digitInt(val, digit) {
        // digit 按多少位取整
        return Math.floor(val / digit) * digit;
    },

    // 四舍五入至n位小数点
    roundNumber(num, n) {
        let temp = 1;
        for (let i = 0; i < n; i++) {
            temp = temp * 10;
        }
        return Math.round(num * temp) / temp;
    },

    // 将数字组成的数组转为数字字符组成的数组
    arrayValToString(list) {
        list = list.map(function (val) {
            return String(val)
        });
        return list;
    },

    resetObject(condition) {
        Object.keys(condition).forEach(function (name) {
            switch (verify.dataType(condition[name])) {
                case "array":
                    condition[name] = [];
                    break;
                case "number":
                    condition[name] = "";
                    break;
                case "object":
                    condition[name] = {};
                    break;
                case "string":
                case "boolean":
                case "date":
                    condition[name] = "";
                    break;
                default:
                    condition[name] = "";
            }
        });
    },

    getTreeData(dataList) {
        let minIndex, result = [], arr = dataList.map(
            function (data) {
                if (!data.children) {
                    data.children = [];
                }
                return data;
            }
        );
        arr.forEach(function (item1, index) {
            if (index === 0) {
                minIndex = item1.index;
            } else {
                if (minIndex > item1.index) {
                    minIndex = item1.index;
                }
            }
            arr.findIndex(function (item2) {
                if (item2.categoryId === item1.parentId) {
                    item2.children.push(item1);
                }
            })
        });

        arr.forEach(function (item) {
            if (item.index === minIndex) {
                result.push(item);
            }
        });

        return result;
    },

    filterTreeData(dataList, nodeValue) {
        let arr = dataList.map(
            (data) => {
                if (!data.children) {
                    data.children = [];
                }
                return data;
            }
        );
        arr.forEach(function (item1) {
            arr.findIndex(function (item2) {
                if (item2.categoryId === item1.parentId) {
                    item2.children.push(item1);
                }
            })
        });
        return [arr.find(function (item) {
            return item.nodeValue === nodeValue;
        })];
    }
};