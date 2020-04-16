import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/register.vue')
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
