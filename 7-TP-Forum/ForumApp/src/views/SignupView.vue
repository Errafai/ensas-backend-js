<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const displayName = ref('')
const email = ref('')
const password = ref('')
const { signup, authError, authLoading } = useAuth()
const router = useRouter()

const handleSubmit = async () => {
  const user = await signup({ displayName: displayName.value, email: email.value, password: password.value })
  if (user) router.push({ name: 'home' })
}
</script>

<template>
  <div class="card-surface p-4">
    <h3 class="heading-text mb-3">Inscription</h3>
    <form class="d-flex flex-column gap-3" @submit.prevent="handleSubmit">
      <div>
        <label class="form-label text-light">Pseudo</label>
        <input v-model="displayName" type="text" class="form-control" required placeholder="Votre pseudo" />
      </div>
      <div>
        <label class="form-label text-light">E-mail</label>
        <input v-model="email" type="email" class="form-control" required />
      </div>
      <div>
        <label class="form-label text-light">Mot de passe</label>
        <input v-model="password" type="password" class="form-control" minlength="6" required />
      </div>
      <div class="d-flex align-items-center justify-content-between">
        <RouterLink class="text-info" :to="{ name: 'login' }">Déjà inscrit ?</RouterLink>
        <RouterLink class="text-info" :to="{ name: 'reset' }">Mot de passe oublié ?</RouterLink>
      </div>
      <BButton :disabled="authLoading" type="submit" variant="success">
        {{ authLoading ? 'Création...' : 'Créer mon compte' }}
      </BButton>
      <div v-if="authError" class="alert alert-danger">{{ authError }}</div>
    </form>
  </div>
</template>
