import { createRouter, createWebHistory } from "vue-router";
import { auth } from "./firebase";
import AuthPage from "./components/AuthPage.vue";
import EventsPage from "./components/EventsPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Auth",
      component: AuthPage,
      meta: { requiresAuth: false },
    },
    {
      path: "/events",
      name: "Events",
      component: EventsPage,
      meta: { requiresAuth: true },
    },
  ],
});

// Navigation guard to protect routes
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const currentUser = auth.currentUser;

  if (requiresAuth && !currentUser) {
    // Redirect to login if trying to access protected route without authentication
    next("/");
  } else if (!requiresAuth && currentUser && to.path === "/") {
    // Redirect to events if already authenticated and trying to access login
    next("/events");
  } else {
    next();
  }
});

export default router;
