import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '@/firebase/config'
import { onAuthStateChanged } from 'firebase/auth'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import ProjectDetails from '../views/ProjectDetails.vue'

const getCurrentUser = () =>
  new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe()
      resolve(user)
    })
  })

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: DashboardView,
      meta: { requiresAuth: true }
    },
    {
      path: '/projects/:id',
      name: 'ProjectDetails',
      component: ProjectDetails,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach(async (to) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const currentUser = auth.currentUser || (await getCurrentUser())

  if (requiresAuth && !currentUser) return '/login'
  if (!requiresAuth && currentUser && to.path === '/login') return '/dashboard'

  return true
})

export default router