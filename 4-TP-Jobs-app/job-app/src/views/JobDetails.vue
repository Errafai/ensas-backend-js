<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getJob, deleteJob } from '../services/api'

const route = useRoute()
const router = useRouter()
const job = ref(null)
const loading = ref(false)
const error = ref('')

async function load() {
  try {
    loading.value = true
    error.value = ''
    job.value = await getJob(route.params.id)
  } catch (e) {
    error.value = e.message || 'Failed to load job'
  } finally {
    loading.value = false
  }
}

async function onDelete() {
  if (!confirm('Are you sure you want to delete this job?')) return
  try {
    await deleteJob(route.params.id)
    router.push('/')
  } catch (e) {
    alert(e.message || 'Delete failed')
  }
}

onMounted(load)
</script>

<template>
  <section class="details" v-if="!loading && job">
    <h2>{{ job.title }}</h2>
    <p class="desc">{{ job.description }}</p>
    <ul class="meta">
      <li><strong>Salary:</strong> {{ job.salary }}</li>
      <li><strong>Created:</strong> {{ job.createdDate }}</li>
      <li><strong>Experience:</strong> {{ job.yearsExperience }} years</li>
      <li v-if="job.location"><strong>Location:</strong> {{ job.location }}</li>
    </ul>
    <div class="actions">
      <button class="btn" @click="router.push(`/edit/${job.id}`)">Edit</button>
      <button class="btn danger" @click="onDelete">Delete</button>
      <button class="btn outline" @click="router.push('/')">Back</button>
    </div>
  </section>
  <div v-else-if="loading" class="state">Loading...</div>
  <div v-else class="state error">{{ error || 'Job not found' }}</div>
</template>

<style scoped>
.details { background:white; border-radius:10px; padding:1.2rem; box-shadow: 0 10px 20px rgba(0,0,0,.08); }
.desc { color:#4b5563; }
.meta { list-style:none; padding:0; margin:1rem 0; color:#374151; }
.meta li { margin:.3rem 0; }
.actions { display:flex; gap:.5rem; }
.btn { background:#3b82f6; color:white; border:none; padding:.5rem .8rem; border-radius:6px; cursor:pointer; }
.danger { background:#ef4444; }
.outline { background:white; color:#3b82f6; border:1px solid #3b82f6; }
.state { color:white; text-align:center; }
.error { color:#fee2e2; }
</style>
