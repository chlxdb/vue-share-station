import Vue from 'vue'
import VueRouter from 'vue-router'


const based = () => import('../components/based')
const mainpage = () => import('../components/mainpage')
const login = () => import('../components/Login')
const login2 = () => import('../components/Login2')
const comment = () => import('../components/comment')
const contentdetail = () => import('../components/contentdetail')
const manager = () => import('../components/manager')
const passagesent = () => import('../components/passagesent')
const resousemanage = () => import('../components/resousemanage')
const controlcomment1 = () => import('../components/controlcomment1')
const noticemanage = () => import('../components/noticemanage')
const usermanager = () => import('../components/usermanager')
const datamanage = () => import('../components/datamanage')
const controlcomment2 = () => import('../components/controlcomment2')
const controlcomment2passage = () => import('../components/controlcomment2passage')

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
            {
                path: 'contentdetail/:passageID',
                name: "Details",
                component: contentdetail

            }




        ]


    },
    {
        path: '/Login',
        component: login,

    },

    {
        path: '/Login2',
        component: login2,
    },

    {
        path: '/manager',
        component: manager,
        children: [
            {
                path: '',        //嵌套的默认路径
                redirect: 'resousemanage'
            },
            {
                path: 'passagesent/:passageID',
                name: 'passagesent',
                component: passagesent
            },
            {
                path: 'resousemanage',
                name: "resousemanage",
                component: resousemanage
            },

            {
                path: 'controlcomment1',
                component: controlcomment1,


            },
            {
                path: 'controlcomment2passage',
                component: controlcomment2passage
            },

            {
                path: 'controlcomment2/:passageID',
                name: "controlcomment2Details",
                component: controlcomment2,


            },


            {
                path: 'noticemanage',
                component: noticemanage
            },

            {
                path: 'usermanager',
                component: usermanager
            },
            {
                path: 'datamanage',
                component: datamanage
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