import { createRouter, createWebHistory } from 'vue-router'
import FormLogin from '../views/FormLogin.vue'
import FormRegister from '../views/FormRegister.vue'
import AdminPage from '../views/AdminPage.vue'
import DataPage from '../views/addData/DataPage.vue'
import BarChart from '../views/chart/BarChart.vue'
import PieChart from '../views/chart/PieChart.vue'
import test from '../views/test.vue'
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
    path: '/test',
    name: 'test',
    component: test
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
  },
  {
    path: '/bar',
    name: 'BarChart',
    component: BarChart
  },
  {
    path: '/pie',
    name: 'PieChart',
    component: PieChart
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
