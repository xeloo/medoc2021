import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import("../layouts/Main.vue"),
    children: [
      {
        path: "",
        component: () => import('../page/Home.vue')
      }
    ]
  },
  {
    path: '/login/',
    name: 'Login',
    component: () => import("../layouts/Login.vue"),
    children: [
      {
        path: "",
        component: () => import('../page/Login.vue')
      }
    ]
  },
  {
    path: '/logout/',
    name: 'Logout',
    beforeEnter: (to, from, next) => {
      store.commit('auth/setAuth', false)
      next('/login')
    },
  },
  {
    path: '/about/',
    name: 'About',
    component: () => import("../layouts/Main.vue"),
    children: [
      {
        path: "",
        component: () => import('../page/About.vue')
      }
    ]
  }
]
const router = new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({
    x: 0,
    y: 0
  }),
  base: process.env.BASE_URL,
  routes,
})
router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !(store.state.auth.auth)){
    next('/login')
  }else if(to.path === '/login' && (store.state.auth.auth)){
    next('/')
  }
  else next()
})
export default router
