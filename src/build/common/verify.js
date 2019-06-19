/**
 * Created by Francis Xu on 2018/10/12.
 * 验证数据格式
 */

export default {
    // 验证邮箱是否符合规则
    isEmail: function (email) {
        let reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        if (!email) {
            return {
                status: "error",
                content: "邮箱不能为空！"
            };
        }
        if (email.length > 64) {
            return {
                status: "error",
                content: "邮箱字符长度必须小于64！"
            };
        }
        if (!reg.test(email)) {
            return {
                status: "error",
                content: "邮箱格式错误,请重新输入！"
            };
        }
        return {
            status: "success"
        };
    },

    // 验证手机号是否符合规格
    isTelNumber: function (telNum) {
        if (!telNum) {
            return {
                status: "error",
                content: "手机号不能为空"
            };
        }
        if (telNum.length > 11) {
            return {
                status: "error",
                content: "请填入正确手机号码！"
            };
        }
        let reg = /^1[34578]\d{9}/ig; //正则验证
        if (!reg.test(telNum)) {
            return {
                status: "error",
                content: "请填入正确手机号码！"
            };
        }
        return {
            status: "success"
        };
    },

    // 验证链接地址是否符合规则
    isUrl: function (url) {
        if (url) {
            //判断URL地址的正则表达式为:http(s)?://([\w-]+\.)+[\w-]+(/[\w- ./?%&=]*)?
            //下面的代码中应用了转义字符"\"输出一个字符"/"
            let Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/,
                objExp = new RegExp(Expression);

            if (!objExp.test(url)) {
                return {
                    status: "error",
                    content: "网址格式不正确！请重新输入"
                };
            }
            return {
                status: "success"
            };
        } else {
            return {
                status: "error",
                content: "网址不能为空"
            };
        }
    },

    dataType (data) {
        let typeStr = Object.prototype.toString.call(data);
        let ret;
        switch (typeStr) {
            case "[object Null]":
                ret = 'null';
                break;
            case "[object Undefined]":
                ret = 'undefined';
                break;
            case "[object Boolean]":
                ret = 'boolean';
                break;
            case "[object Number]":
                ret = 'number';
                break;
            case "[object String]":
                ret = 'string';
                break;
            case "[object Array]":
                ret = 'array';
                break;
            case "[object Object]":
                ret = 'object';
                break;
            case "[object Date]":
                ret = 'date';
                break;
            case "[object RegExp]":
                ret = 'regexp';
                break;
            case expression:
                break;
            default:
        }
        return ret;
    }
};
