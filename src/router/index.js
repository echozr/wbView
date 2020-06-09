import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "login" */ '../views/home.vue'),
    meta: {
      isLogin: true
    },
    children: [
      {
        path: '/blogInfo/:id',
        name: 'blogInfo',
        component: () => import(/* webpackChunkName: "blogInfo" */ '../views/blogInfo.vue')
      },
      {
        path: '/userInfo/:userName',
        name: 'userInfo',
        component: () => import(/* webpackChunkName: "userInfo" */ '../views/userInfo.vue')
      }
    ]
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import(/* webpackChunkName: "setting" */ '../views/setting.vue'),
    meta: {
      isLogin: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login.vue'),
    meta: {
      isLogin: false
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/register.vue'),
    meta: {
      isLogin: false
    }
  },
  {
    path: '/message',
    name: 'message',
    component: () => import(/* webpackChunkName: "resetPassword" */ '../views/message.vue')
  },
  {
    path: '/error',
    name: 'error',
    component: () => import(/* webpackChunkName: "404" */ '../views/error.vue'),
    meta: {
      isLogin: false
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
