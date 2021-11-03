import { createRouter, createWebHistory } from 'vue-router'
import FormLogin from '../views/FormLogin.vue'
import FormRegister from '../views/FormRegister.vue'
import AdminPage from '../views/AdminPage.vue'
import test from '../views/test.vue'
import Index from '../views/Index.vue'
import DataPage from '../views/data/DataPage.vue'
import DataDatePage from '../views/dataDate/DataDatePage.vue'
import BarChart from '../views/chart/BarChart.vue'
import PieChart from '../views/chart/PieChart.vue'
import LineChart from '../views/chart/LineChart.vue'

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
    path: '/data',
    name: 'DataPage',
    component: DataPage
  },
  {
    path: '/dataDate',
    name: 'DataDatePage',
    component: DataDatePage
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
  },
  {
    path: '/line',
    name: 'LineChart',
    component: LineChart
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
