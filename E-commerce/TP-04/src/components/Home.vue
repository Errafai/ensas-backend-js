<template>
  <div class="w-full flex flex-col items-center py-6">
    <h1 class="text-3xl font-bold mb-6 flex items-start justify-between">Our Employees Tasks</h1>

    <div class="w-[90%]">
      <router-link
        to="/addJob"
        class="px-4 py-1 rounded bg-green-500 text-white hover:bg-green-600"
      >
        Add
      </router-link>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          v-for="job in jobs"
          :key="job.id"
          class="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
        >
          <router-link :to="{ name: 'Job', params: { id: job.id } }">
            <strong class="text-lg">{{ job.title }}</strong>
          </router-link>
          <p class="text-sm text-gray-600 mb-3">{{ job.description }}</p>

          <div class="flex justify-end mt-10 gap-2 text-sm">
            <router-link
              :to="{ name: 'EditJob', params: { id: job.id } }"
              class="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
            >
              Edit
            </router-link>

            <button @click="deleteJob(job.id)" class="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      jobs: [],
    };
  },
  mounted() {
    console.log("Home (temporary) mounted");
    this.getData();
  },

  methods: {
    async getData() {
      try {
        // Fetch from local json-server API
        const response = await fetch("http://localhost:3000/jobs");
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const json = await response.json();
        this.jobs = json;
        console.log("Loaded jobs (API)", this.jobs);
      } catch (err) {
        console.error("Failed to load jobs data from API", err);
      }
    },
    async deleteJob(id) {
      const ok = confirm('Are you sure you want to delete this job?');
      if (!ok) return;

      try {
        const resp = await fetch(`http://localhost:3000/jobs/${id}`, { method: 'DELETE' })
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
        // remove locally for immediate feedback
        this.jobs = this.jobs.filter(j => String(j.id) !== String(id))
      } catch (err) {
        console.error('Failed to delete job', err)
        alert('Failed to delete job. See console.');
        // refresh list as fallback
        this.getData()
      }
    }
  },
};
</script>
