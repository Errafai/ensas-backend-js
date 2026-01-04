<script setup>
import { ref, onMounted, computed } from 'vue'
import { getJobs, deleteJob } from '../services/api'
import { useRouter } from 'vue-router'

const router = useRouter()
const jobs = ref([])
const loading = ref(false)
const error = ref('')
const q = ref('')

const filtered = computed(() => {
  const term = q.value.trim().toLowerCase()
  if (!term) return jobs.value
  return jobs.value.filter(j =>
    j.title.toLowerCase().includes(term) ||
    (j.description || '').toLowerCase().includes(term) ||
    (j.location || '').toLowerCase().includes(term)
  )
})

async function load() {
  try {
    loading.value = true
    error.value = ''
    jobs.value = await getJobs()
  } catch (e) {
    error.value = e.message || 'Failed to load jobs'
  } finally {
    loading.value = false
  }
}

async function confirmDelete(id) {
  if (!confirm('Are you sure you want to delete this job?')) return
  try {
    await deleteJob(id)
    jobs.value = jobs.value.filter(j => j.id !== id)
  } catch (e) {
    alert(e.message || 'Delete failed')
  }
}

onMounted(load)
</script>

<template>
  <section class="home">
    <div class="toolbar">
      <input v-model="q" placeholder="Search jobs..." class="search" />
      <button class="add" @click="router.push('/add')">+ Add Job</button>
    </div>

    <div v-if="loading" class="state">Loading...</div>
    <div v-else-if="error" class="state error">{{ error }}</div>
    <div v-else class="grid">
      <article v-for="job in filtered" :key="job.id" class="card">
        <header class="card-header">
          <h2>{{ job.title }}</h2>
          <span class="badge">{{ job.yearsExperience }} yrs</span>
        </header>
        <p class="desc">{{ job.description }}</p>
        <ul class="meta">
          <li><strong>Salary:</strong> {{ job.salary }}</li>
          <li><strong>Created:</strong> {{ job.createdDate }}</li>
          <li v-if="job.location"><strong>Location:</strong> {{ job.location }}</li>
        </ul>
        <footer class="actions">
          <button @click="router.push(`/job/${job.id}`)" class="btn">Details</button>
          <button @click="router.push(`/edit/${job.id}`)" class="btn warn">Edit</button>
          <button @click="confirmDelete(job.id)" class="btn danger">Delete</button>
        </footer>
      </article>
    </div>
  </section>
</template>

<style scoped>
.home { color: #1f2937; }
.toolbar { display:flex; gap:1rem; justify-content: space-between; align-items:center; margin-bottom:1rem; }
.search { flex:1; padding:.6rem .8rem; border-radius:6px; border:1px solid #d1d5db; }
.add { background:#10b981; color:white; border:none; padding:.6rem 1rem; border-radius:6px; cursor:pointer; }
.grid { display:grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap:1rem; }
.card { background:white; border-radius:10px; padding:1rem; box-shadow: 0 10px 20px rgba(0,0,0,.08); }
.card-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:.5rem; }
.badge { background:#eef2ff; color:#4338ca; padding:.2rem .5rem; border-radius:999px; font-size:.8rem; }
.desc { color:#4b5563; min-height: 3em; }
.meta { list-style:none; padding:0; margin:.5rem 0; color:#374151; }
.meta li { margin:.2rem 0; }
.actions { display:flex; gap:.5rem; }
.btn { background:#3b82f6; color:white; border:none; padding:.5rem .8rem; border-radius:6px; cursor:pointer; }
.warn { background:#f59e0b; }
.danger { background:#ef4444; }
.state { color:white; text-align:center; }
.error { color:#fee2e2; }
</style>
