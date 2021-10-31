import { createRouter, createWebHistory } from 'vue-router'
import formLogin from '../views/formLogin.vue'
import formRegister from '../views/formRegister.vue'
import adminPage from '../views/adminPage.vue'
import index from '../views/index.vue'

const routes = [
  {
    path: '/',
    name: 'index',
    component: index
  },
  {
    path: '/home',
    name: 'adminPage',
    component: adminPage
  },
  {
    path: '/login',
    name: 'formLogin',
    component: formLogin
  },
  {
    path: '/register',
    name: 'formRegister',
    component: formRegister
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
