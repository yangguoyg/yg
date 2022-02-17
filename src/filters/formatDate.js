import Vue from 'vue'
import moment from 'moment'
//字符串首字母大写
Vue.filter('formatDate', function (value) {
    return moment(value).format("YYYY-MM-DD")
})