import { createRouter, createWebHistory } from 'vue-router'
import { watch } from 'vue'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import SignupView from '@/views/SignupView.vue'
import ResetPasswordView from '@/views/ResetPasswordView.vue'
import ProfileView from '@/views/ProfileView.vue'
import CreateDiscussionView from '@/views/CreateDiscussionView.vue'
import DiscussionView from '@/views/DiscussionView.vue'
import { useSession } from '@/composables/useSession'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/categories/:category', name: 'category', component: HomeView, props: true },
    { path: '/login', name: 'login', component: LoginView, meta: { guestOnly: true } },
    { path: '/signup', name: 'signup', component: SignupView, meta: { guestOnly: true } },
    { path: '/reset', name: 'reset', component: ResetPasswordView, meta: { guestOnly: true } },
    { path: '/profile', name: 'profile', component: ProfileView, meta: { requiresAuth: true } },
    {
      path: '/discussions/create',
      name: 'create-discussion',
      component: CreateDiscussionView,
      meta: { requiresAuth: true },
    },
    { path: '/discussions/:id', name: 'discussion', component: DiscussionView, props: true },
  ],
})

router.beforeEach((to, _from, next) => {
  const { user, sessionReady } = useSession()

  const proceed = () => {
    if (to.meta.requiresAuth && !user.value) {
      next({ name: 'login', query: { redirect: to.fullPath } })
      return
    }
    if (to.meta.guestOnly && user.value) {
      next({ name: 'home' })
      return
    }
    next()
  }

  if (!sessionReady.value) {
    const stop = watch(sessionReady, ready => {
      if (ready) {
        stop()
        proceed()
      }
    })
  } else {
    proceed()
  }
})

export default router
