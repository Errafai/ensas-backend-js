<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { createJob, getJob, updateJob } from '../services/api'

const route = useRoute()
const router = useRouter()
const isEdit = computed(() => !!route.params.id)
const loading = ref(false)
const error = ref('')
const form = ref({
  title: '',
  description: '',
  salary: '',
  createdDate: '',
  yearsExperience: '',
  location: ''
})

async function loadJob() {
  if (!isEdit.value) return
  try {
    loading.value = true
    const data = await getJob(route.params.id)
    form.value = {
      title: data.title || '',
      description: data.description || '',
      salary: data.salary || '',
      createdDate: data.createdDate || '',
      yearsExperience: data.yearsExperience || '',
      location: data.location || ''
    }
  } catch (e) {
    error.value = e.message || 'Failed to load job'
  } finally {
    loading.value = false
  }
}

async function onSubmit() {
  try {
    loading.value = true
    error.value = ''
    if (isEdit.value) {
      await updateJob(route.params.id, form.value)
    } else {
      await createJob(form.value)
    }
    router.push('/')
  } catch (e) {
    error.value = e.message || 'Save failed'
  } finally {
    loading.value = false
  }
}

onMounted(loadJob)
</script>

<template>
  <section class="form-card">
    <h2>{{ isEdit ? 'Edit Job' : 'Add Job' }}</h2>
    <form @submit.prevent="onSubmit" class="form">
      <label>Title
        <input v-model="form.title" required />
      </label>
      <label>Description
        <textarea v-model="form.description" rows="4" required></textarea>
      </label>
      <label>Salary
        <input v-model="form.salary" required />
      </label>
      <label>Created Date
        <input v-model="form.createdDate" type="date" required />
      </label>
      <label>Years Experience
        <input v-model.number="form.yearsExperience" type="number" min="0" required />
      </label>
      <label>Location
        <input v-model="form.location" />
      </label>

      <div v-if="error" class="error">{{ error }}</div>

      <div class="actions">
        <button type="submit" class="btn" :disabled="loading">{{ loading ? 'Saving...' : 'Save' }}</button>
        <button type="button" class="btn outline" @click="router.push('/')">Cancel</button>
      </div>
    </form>
  </section>
</template>

<style scoped>
.form-card { background:white; border-radius:10px; padding:1.2rem; box-shadow: 0 10px 20px rgba(0,0,0,.08); max-width:640px; }
.form { display:flex; flex-direction:column; gap:.8rem; }
label { display:flex; flex-direction:column; color:#1f2937; font-weight:600; gap:.3rem; }
input, textarea { padding:.6rem .8rem; border-radius:6px; border:1px solid #d1d5db; font-size:1rem; }
.actions { display:flex; gap:.5rem; margin-top:.5rem; }
.btn { background:#3b82f6; color:white; border:none; padding:.5rem .8rem; border-radius:6px; cursor:pointer; }
.outline { background:white; color:#3b82f6; border:1px solid #3b82f6; }
.error { color:#b91c1c; }
</style>
