import Vue from 'vue'
import VueRouter from 'vue-router'


const based = () => import('../components/based')
const mainpage = () => import('../components/mainpage')
const login = () => import('../components/Login')
const login2 = () => import('../components/Login2')
const manager = () => import('../components/manager')
const comment = () => import('../components/comment')
const passagesent = () => import('../components/passagesent')
const contentdetail = () => import('../components/contentdetail')
Vue.use(VueRouter)
const routes = [
    {
        path: '',
        redirect: '/based',
    },
    {
        path: '/based',
        component: based,
        children: [
            {
                path: '',        //嵌套的默认路径
                redirect: 'mainpage',
            },
            {
                path: 'mainpage',
                component: mainpage
            },
            {
                path: 'comment',
                component: comment
            },




        ]


    },
    {
        path: '/Login',
        component: login,

    },

    {
        path: '/login2',
        component: login2
    },

    {
        path: '/manager',
        component: manager,
        children: [
            // {
            //   path: '',        //嵌套的默认路径
            // redirect: 'passagesent'
            //},
            {
                path: 'passagesent',
                component: passagesent
            },



        ],


        beforeEnter: (to, from, next) => {
            if (to.path === '/Login') return next();
            // 获取token
            const tokenStr = window.sessionStorage.getItem('token')
            if (!tokenStr) return next('/Login')
            next()

        }


    },
    {
        path: '/contentdetail/:passageID',
        name: "Details",
        component: contentdetail

    }


]
const router = new VueRouter({
    routes,
    mode: 'history'
})
//挂载路由导航守卫
//router.beforeEach((to, from, next) => {
//  if (to.path === '/login') return next();
//获取token
//const tokenStr = window.sessionStorage.getItem('token')
//if (!tokenStr) return next('/Login')
//next()
//})

//导出对象到实例
export default router