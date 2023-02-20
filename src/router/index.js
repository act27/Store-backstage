import { createRouter, createWebHistory } from 'vue-router'
import LayOut from '../views/LayOut/LayOut.vue'
import store from '../store/index.js'
const routes = [
  {
    path:'/login',
    name:'login',
    component: ()=>import('../views/pages/login.vue')
  },
  {
    path:'/',
    name:'layout',
    component: LayOut,
    redirect:'/login',
      // 子路由/嵌套路由
      children:[
        {
          path:'/roles',
          name:'roles',
          component:()=>import('../views/pages/rolesList.vue')
        },
        {
          path:'/users',
          name:'users',
          component:()=>import('../views/pages/usersList.vue')
        },
        {
          path:'/goods',
          name:'goods',
          component:()=>import('../views/pages/goodsList.vue')
        },
        {
          path:'/hello',
          name:'hello',
          component:()=>import('../views/pages/index.vue')
        }
      ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to,from,next)=>{
  // to   :从哪个页面
  // from :到哪个页面
  // next :只有执行next() 页面才会跳转

  // 判断用户是否登录
  // console.log("store",store.state.uInfo)
  const uInfo = store.state.uInfo.userInfo
  if(!uInfo.username){
    // 未登录,跳转到login
    console.log("未登录");
    if(to.path === "/login"){
      next()
      return
    }
    next('/login')
  }else{
    next()
  }
})

// 暴露路由对象
export default router
