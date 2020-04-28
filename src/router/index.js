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
    path: '/resetPassword',
    name: 'resetPassword',
    component: () => import(/* webpackChunkName: "resetPassword" */ '../views/resetPassword.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
