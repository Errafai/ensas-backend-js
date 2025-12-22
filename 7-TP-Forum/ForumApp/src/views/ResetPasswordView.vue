<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const email = ref('')
const { resetPassword, authError, authLoading } = useAuth()
const success = ref(false)

const handleSubmit = async () => {
  const ok = await resetPassword(email.value)
  success.value = ok
}
</script>

<template>
  <div class="card-surface p-4">
    <h3 class="heading-text mb-3">Réinitialiser le mot de passe</h3>
    <form class="d-flex flex-column gap-3" @submit.prevent="handleSubmit">
      <div>
        <label class="form-label text-light">E-mail</label>
        <input v-model="email" type="email" class="form-control" required />
      </div>
      <BButton :disabled="authLoading" type="submit" variant="primary">
        {{ authLoading ? 'Envoi...' : 'Envoyer le lien' }}
      </BButton>
      <div v-if="authError" class="alert alert-danger">{{ authError }}</div>
      <div v-if="success" class="alert alert-success">E-mail envoyé si le compte existe.</div>
      <RouterLink class="text-info" :to="{ name: 'login' }">Retour connexion</RouterLink>
    </form>
  </div>
</template>
