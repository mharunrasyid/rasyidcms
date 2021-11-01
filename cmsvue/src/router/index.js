import { createRouter, createWebHistory } from 'vue-router'
import FormLogin from '../views/FormLogin.vue'
import FormRegister from '../views/FormRegister.vue'
import AdminPage from '../views/AdminPage.vue'
import DataPage from '../views/addData/DataPage.vue'
import Index from '../views/Index.vue'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/home',
    name: 'AdminPage',
    component: AdminPage
  },
  {
    path: '/data',
    name: 'DataPage',
    component: DataPage
  },
  {
    path: '/login',
    name: 'FormLogin',
    component: FormLogin
  },
  {
    path: '/register',
    name: 'FormRegister',
    component: FormRegister
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
