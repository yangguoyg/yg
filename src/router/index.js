import Vue from 'vue'
import VueRouter from 'vue-router'
import constRoutes from './constRoutes'
//引入store
import store from "@/store/index.js"

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/home'
    },
    ...constRoutes,
    {
        path: '/login',
        name: 'login',
        meta: {
            title: '登录'
        },
        component: () =>
            import ('../views/login')
    },
]

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}


//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
//解决重新登录时，路由重复定义的报错
const createRouter = () => new VueRouter({
    routes
})

const router = createRouter()

//在重新登录时，重置路由对象
function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // the relevant part
}
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&


//****************************************************************** */
export function asyncRoutes() {
    resetRouter() //重置路由

    let navData = store.state.navData; //store中的动态路由菜单 
    // console.log(navData);
    // router.addRoute({
    //   path: "/charts",
    //   component: ()=> import("@/views/layout"),
    //   meta: {
    //     title: '图表',
    //     icon: ''
    //   },
    //   children: [
    //     {
    //       path: 'pie',
    //       component: ()=> import("@/views/charts/pie.vue"),
    //       meta: {
    //         title: '图表',
    //         icon: ''
    //       },
    //     }
    //   ]
    // })
    navData.forEach(item => {
        let routeItem = {}
        if (item.children) {
            routeItem = {
                path: item.path,
                name: item.name,
                component: () =>
                    import ('@/views/layout'),
                meta: {
                    title: item.title,
                    icon: item.icon
                },
                children: []
            }
            item.children.forEach(route => {
                routeItem.children.push({
                    path: route.path,
                    name: route.name,
                    component: () =>
                        import ('@/views' + route.url),
                    meta: {
                        title: route.title,
                        icon: route.icon
                    }
                })
            })

        } else {
            routeItem = {
                path: item.path,
                component: () =>
                    import ('@/views/layout'),
                children: [{
                    path: item.name,
                    name: item.name,
                    component: () =>
                        import ('@/views' + item.url),
                    meta: {
                        title: item.title,
                        icon: item.icon
                    }
                }]
            }
        }
        router.addRoute(routeItem)

    })
    router.addRoute({
        path: '*',
        name: '404',
        meta: {
            title: '404页面'
        },
        component: () =>
            import ('../views/404')
    })
}

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    let token = sessionStorage.getItem("token")
    if (to.fullPath === "/login") {
        next()
    } else {
        if (token) {
            //******************************************************
            // 有token进入有两种情况：
            // 1. 正常跳转，vuex中始终有navData数据
            // 2. 刷新进入，vuex中没有navData数据
            let navData = store.state.navData;
            if (navData.length === 0) { //如果长度为0,则是刷新
                // 从sessionStorage中拿navData数据
                navData = JSON.parse(sessionStorage.getItem("navData"))
                store.commit("getNavData", navData);
                asyncRoutes(navData);
                // 参考4.3.4解释
                next({...to, replace: true });
            } else {
                next()
            }
        } else {
            next("/login")
        }
    }

})

export default router