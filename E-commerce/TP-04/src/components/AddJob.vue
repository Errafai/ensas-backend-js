<template>
    <div class="w-[90%] h-auto flex justify-center items-center flex-col">
        <h1 class="text-3xl">Add Employees</h1>
        <form @submit.prevent="postData" action="" method="post">
            <label>Job Title</label>
            <input v-model="title" type="text" class="w-full border" required>
            <label>Job Description</label>
            <input v-model="description" type="text" class="w-full">
            <label>Is it completed</label>
            <input v-model="completed" type="checkbox" class="w-full">
            
            <button type="submit" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Add Job</button>
        </form>
    </div>
</template>

<script>
export default {
    name: "AddJobView",
    mounted() {
        console.log("AddJob (temporary) mounted");
    },
    data(){
        return{
            title: '',
            description: '',
            completed: false,
        }
    },
    methods:{
        async postData(){
                const payload = {
                    title: this.title,
                    description: this.description,
                    completed: !!this.completed
                }

                try {
                    const resp = await fetch('http://localhost:3000/jobs', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    })

                    if (!resp.ok) throw new Error(`HTTP ${resp.status}`)

                    const created = await resp.json()
                    console.log('Job created', created)

                    this.title = ''
                    this.description = ''
                    this.completed = false

                    if (this.$router) this.$router.push('/')
                } catch (err) {
                    console.error('Failed to post job', err)
                    alert('Failed to add job. See console for details.')
                }

        }
    }
};
</script>

<style scoped>
.add-job { padding: 1rem; }
</style>