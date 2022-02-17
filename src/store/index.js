import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        tabList: [{
            title: "首页",
            path: "/home/dashboard",
        }],
        navData: [] //动态获取导航
    },
    mutations: {
        setTabList: ({ tabList }, payload) => {
            let flag = false
            tabList.forEach(item => {
                if (item.title == payload.title) {
                    flag = true
                }
            })
            if (!flag) {
                tabList.push(payload)
            }
        },

        delTabItem: ({ tabList }, index) => {
            tabList.splice(index, 1)
        },
        //在登录成功，异步获取了菜单数据后，把数据存储到vuex中
        getNavData: (state, data) => {
            state.navData = data
        }

    },
    actions: {},
    modules: {}
})