import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入reset.css样式
import '@/assets/css/reset.css';
import JsonExcel from 'vue-json-excel'

Vue.component('downloadExcel', JsonExcel)

Vue.use(ElementUI);
//定义全局指令
import moment from 'moment'
//字符串首字母大写
Vue.filter('formatDate', function(value) {
    return moment(value).format("YYYY-MM-DD")
})
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')