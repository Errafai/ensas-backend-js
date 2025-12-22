<template>
    <div class="edit-job flex justify-center py-8 text-white">
        <div class="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <h2 class="text-2xl font-semibold mb-4">Edit Job</h2>

            <form @submit.prevent="patchData" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium mb-1">Job Title</label>
                    <input
                        v-model="title"
                        type="text"
                        class="w-full border text-black border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        required
                    />
                </div>

                <div>
                    <label class="block text-sm font-medium mb-1">Job Description</label>
                    <textarea
                        v-model="description"
                        class="w-full border text-black border-gray-300 rounded px-3 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
                    ></textarea>
                </div>

                <div class="flex items-center gap-2">
                    <input
                        id="completed"
                        v-model="completed"
                        type="checkbox"
                        class="h-4 w-4 text-blue-600 text-black rounded focus:ring-blue-300"
                    />
                    <label for="completed" class="text-sm">Completed</label>
                </div>

                <div class="flex flex-wrap gap-2 mt-4">
                    <button
                        type="submit"
                        class="flex-1 min-w-[120px] text-black px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Update Job
                    </button>

                    <button
                        type="button"
                        @click="deleteJob"
                        class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Delete
                    </button>

                    <router-link
                        to="/"
                        class="px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
                    >
                        Cancel
                    </router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data: () => {
        return {
            title: "",
            description: "",
            completed: false
        }
    },
    name: "EditJobView",
    mounted() {
        // load job by id from route param
        const id = this.$route && this.$route.params && this.$route.params.id
        if (id) this.getData(id)
    },
    methods: {
        async getData(id) {
            try {
                const resp = await fetch(`http://localhost:3000/jobs/${id}`)
                if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
                const job = await resp.json()
                this.title = job.title || ''
                this.description = job.description || ''
                // ensure boolean
                this.completed = !!job.completed
            } catch (err) {
                console.error('Failed to load job for edit', err)
                alert('Failed to load job. See console.');
            }
        },
        async patchData() {
            const id = this.$route && this.$route.params && this.$route.params.id
            if (!id) return alert('Missing job id')

            const payload = {
                title: this.title,
                description: this.description,
                completed: !!this.completed
            }

            try {
                const resp = await fetch(`http://localhost:3000/jobs/${id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                })
                if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
                const updated = await resp.json()
                console.log('Job updated', updated)
                if (this.$router) this.$router.push('/')
            } catch (err) {
                console.error('Failed to update job', err)
                alert('Failed to update job. See console.');
            }
        },
        async deleteJob() {
            const id = this.$route && this.$route.params && this.$route.params.id
            if (!id) return alert('Missing job id')
            const ok = confirm('Are you sure you want to delete this job?')
            if (!ok) return
            try {
                const resp = await fetch(`http://localhost:3000/jobs/${id}`, { method: 'DELETE' })
                if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
                if (this.$router) this.$router.push('/')
            } catch (err) {
                console.error('Failed to delete job', err)
                alert('Failed to delete job. See console.');
            }
        }
    }
};
</script>

<style scoped>
.edit-job { padding: 1rem; }
</style>