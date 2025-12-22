<template>
  <div class="w-[90%] py-6">
    <h1 class="text-2xl font-bold mb-4">{{ job.title }}</h1>
    <p class="mb-2"><strong>Description:</strong> {{ job.description }}</p>
    <p class="mb-2"><strong>Completed:</strong> {{ job.completed ? 'Yes' : 'No' }}</p>
    <div class="mt-4 flex gap-2">
      <router-link :to="{ name: 'EditJob', params: { id: job.id } }" class="px-4 py-2 rounded bg-blue-500 text-white">Edit</router-link>
      <button @click="deleteJob" class="px-4 py-2 rounded bg-red-500 text-white">Delete</button>
      <router-link to="/" class="px-4 py-2 rounded bg-gray-200">Back</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JobView',
  data() {
    return {
      job: {},
    }
  },
  mounted() {
    const id = this.$route && this.$route.params && this.$route.params.id
    if (id) this.load(id)
  },
  methods: {
    async load(id) {
      try {
        const resp = await fetch(`http://localhost:3000/jobs/${id}`)
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
        this.job = await resp.json()
      } catch (err) {
        console.error('Failed to load job', err)
        alert('Failed to load job. See console.')
      }
    },
    async deleteJob() {
      const ok = confirm('Are you sure you want to delete this job?')
      if (!ok) return
      const id = this.job && this.job.id
      try {
        const resp = await fetch(`http://localhost:3000/jobs/${id}`, { method: 'DELETE' })
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
        if (this.$router) this.$router.push('/')
      } catch (err) {
        console.error('Failed to delete job', err)
        alert('Failed to delete job. See console.')
      }
    }
  }
}
</script>

<style scoped>
</style>
