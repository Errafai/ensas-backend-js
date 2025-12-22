<script setup>
import { ref } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const email = ref('')
const password = ref('')
const { login, authError, authLoading } = useAuth()
const router = useRouter()
const route = useRoute()

const handleSubmit = async () => {
  const user = await login({ email: email.value, password: password.value })
  if (user) {
    const redirect = route.query.redirect || { name: 'home' }
    router.push(redirect)
  }
}
</script>

<template>
  <div class="card-surface p-4">
    <h3 class="heading-text mb-3">Connexion</h3>
    <form class="d-flex flex-column gap-3" @submit.prevent="handleSubmit">
      <div>
        <label class="form-label text-light">E-mail</label>
        <input v-model="email" type="email" class="form-control" required placeholder="exemple@mail.com" />
      </div>
      <div>
        <label class="form-label text-light">Mot de passe</label>
        <input v-model="password" type="password" class="form-control" required placeholder="••••••••" />
      </div>
      <div class="d-flex align-items-center justify-content-between">
        <RouterLink class="text-info" :to="{ name: 'signup' }">Créer un compte</RouterLink>
        <RouterLink class="text-info" :to="{ name: 'reset' }">Mot de passe oublié ?</RouterLink>
      </div>
      <BButton :disabled="authLoading" type="submit" variant="primary">
        {{ authLoading ? 'Connexion...' : 'Se connecter' }}
      </BButton>
      <div v-if="authError" class="alert alert-danger">{{ authError }}</div>
    </form>
  </div>
</template>
