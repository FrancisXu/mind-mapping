import Vue from 'vue';
import format from "./common/format";

Vue.filter('percentage', function (value) {
    if (value) {
        return Math.round(value * 1000) / 10 + "%";
    }
    return "0%";
});

Vue.filter('getThousand', function (value) {
    if (value) {
        value = value.toString();
        return value.replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
    }
    return 0;
});

Vue.filter('oneDecimalPlace', function (value) {
    if (value) {
        return (Math.round(value * 10) / 10).toFixed(1);
    }
    return "0";
});

Vue.filter('isNull', function (value) {
    if (!value) {
        return "-";
    }
    return value;
});

Vue.filter("dateTime", function (value) {
    if (value) {
        return format.getDataTime(value);
    }
    return "";
});

Vue.filter("dateTimeWithoutYearSecond", function (value) {
    return format.dateTimeWithoutYearSecond(value);
});

