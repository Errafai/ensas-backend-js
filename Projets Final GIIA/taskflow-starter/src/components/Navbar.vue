<script setup>
import { useAuthStore } from '@/stores/authStore'
import { useProjectStore } from '@/stores/projectStore'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const authStore = useAuthStore()
const projectStore = useProjectStore()
const router = useRouter()

authStore.init()
const user = computed(() => authStore.user)

const handleLogout = async () => {
  await authStore.logout()
  projectStore.unsubscribeAll()
  router.push('/login')
}
</script>

<template>
  <header class="border-b bg-white">
    <nav class="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4">
      <button
        class="text-sm font-semibold text-slate-900"
        @click="router.push(user ? '/dashboard' : '/login')"
      >
        TaskFlow
      </button>

      <div v-if="user" class="flex items-center gap-3">
        <button
          class="rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
          @click="router.push('/dashboard')"
        >
          Dashboard
        </button>
        <span class="hidden text-sm text-slate-500 sm:inline">{{ user.email }}</span>
        <button
          class="rounded-lg bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-800"
          @click="handleLogout"
        >
          Déconnexion
        </button>
      </div>
      <div v-else>
        <button
          class="rounded-lg bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-800"
          @click="router.push('/login')"
        >
          Connexion
        </button>
      </div>
    </nav>
  </header>
</template>

<style scoped></style>