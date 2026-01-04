import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import JobDetails from './views/JobDetails.vue'
import JobForm from './views/JobForm.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/job/:id',
    name: 'JobDetails',
    component: JobDetails
  },
  {
    path: '/add',
    name: 'AddJob',
    component: JobForm
  },
  {
    path: '/edit/:id',
    name: 'EditJob',
    component: JobForm
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
