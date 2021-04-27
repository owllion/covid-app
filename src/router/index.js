import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ()=> import('@/views/Home.vue')
  },
  {
    path: '/country-status',
    name: 'CountryStauts',
    component: ()=> import('@/views/Country-status.vue')
  },
  {
    path: '/us-status',
    name: 'AmericaStatus',
    component: ()=> import('@/views/US-status.vue')
  },
  {
    path: '/total',
    name: 'TotalStatus',
    component: ()=> import('@/views/TotalStatus.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
