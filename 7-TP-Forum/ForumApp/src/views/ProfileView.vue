<script setup>
import { ref, watch } from 'vue'
import { useSession } from '@/composables/useSession'

const { user, profile, updateProfile } = useSession()
const displayName = ref(profile.value?.displayName || '')
const photoURL = ref(profile.value?.photoURL || '')
const status = ref('')

watch(
  () => profile.value,
  value => {
    displayName.value = value?.displayName || ''
    photoURL.value = value?.photoURL || ''
  },
  { immediate: true },
)

const handleSubmit = async () => {
  status.value = ''
  await updateProfile({ displayName: displayName.value, photoURL: photoURL.value })
  status.value = 'Profil mis à jour'
}
</script>

<template>
  <div class="card-surface p-4 d-flex flex-column gap-3">
    <div>
      <p class="text-info mb-1">Mon espace</p>
      <h3 class="heading-text mb-0">Profil utilisateur</h3>
    </div>
    <div class="row g-3">
      <div class="col-md-6">
        <div class="bg-dark border rounded p-3 h-100">
          <p class="muted mb-1">Identité</p>
          <p class="mb-0">{{ profile?.displayName || user?.email }}</p>
          <p class="muted">{{ user?.email }}</p>
          <span class="badge bg-secondary me-2">{{ profile?.role || 'user' }}</span>
          <span v-if="profile?.role === 'moderator'" class="badge bg-warning text-dark">Modérateur</span>
        </div>
      </div>
      <div class="col-md-6">
        <form class="d-flex flex-column gap-3 bg-dark border rounded p-3" @submit.prevent="handleSubmit">
          <div>
            <label class="form-label text-light">Pseudo</label>
            <input v-model="displayName" type="text" class="form-control" />
          </div>
          <div>
            <label class="form-label text-light">Photo URL (optionnel)</label>
            <input v-model="photoURL" type="url" class="form-control" placeholder="https://..." />
          </div>
          <BButton type="submit" variant="primary">Mettre à jour</BButton>
          <div v-if="status" class="alert alert-success mb-0">{{ status }}</div>
        </form>
      </div>
    </div>
  </div>
</template>
