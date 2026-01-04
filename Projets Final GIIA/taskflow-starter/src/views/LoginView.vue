<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref('')
const mode = ref('login') // 'login' | 'register'
const authStore = useAuthStore()
const router = useRouter()

const handleSubmit = async () => {
  try {
    authStore.init()
    if (mode.value === 'register') {
      await authStore.register(email.value, password.value)
    } else {
      await authStore.login(email.value, password.value)
    }
    router.push('/dashboard')
  } catch (err) {
    error.value = err.message
  }
}

const handleGoogle = async () => {
  try {
    error.value = ''
    authStore.init()
    await authStore.loginWithGoogle()
    router.push('/dashboard')
  } catch (err) {
    error.value = err.message
  }
}
</script>

<template>
  <div class="mx-auto mt-10 w-full max-w-md">
    <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 class="text-lg font-semibold text-slate-900">{{ mode === 'register' ? 'Inscription' : 'Connexion' }}</h2>
      <p class="mt-1 text-sm text-slate-500">Accédez à vos projets et tâches.</p>

      <form class="mt-6 space-y-4" @submit.prevent="handleSubmit">
        <div>
          <label class="mb-1 block text-sm font-medium text-slate-700">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="vous@exemple.com"
            class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400"
            required
          />
        </div>

        <div>
          <label class="mb-1 block text-sm font-medium text-slate-700">Mot de passe</label>
          <input
            v-model="password"
            type="password"
            placeholder="••••••••"
            class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400"
            required
          />
        </div>

        <button type="submit" class="w-full rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800">
          {{ mode === 'register' ? 'Créer un compte' : 'Se connecter' }}
        </button>

        <button
          type="button"
          class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          @click="handleGoogle"
        >
          Continuer avec Google
        </button>

        <p v-if="error" class="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{{ error }}</p>
      </form>

      <div class="mt-5 text-center text-sm text-slate-600">
        <button
          v-if="mode === 'login'"
          type="button"
          class="font-medium text-slate-900 hover:underline"
          @click="mode = 'register'"
        >
          Créer un compte
        </button>
        <button v-else type="button" class="font-medium text-slate-900 hover:underline" @click="mode = 'login'">
          J'ai déjà un compte
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>