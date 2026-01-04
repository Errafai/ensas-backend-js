<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createPost } from '../composables/storage'

const router = useRouter()

const title = ref('')
const body = ref('')
const tags = ref('')
const error = ref(null)

const submit = () => {
  error.value = null

  if (!title.value.trim() || !body.value.trim()) {
    error.value = 'Titre et body sont obligatoires.'
    return
  }

  createPost({ title: title.value, body: body.value, tags: tags.value })
  router.push('/')
}
</script>

<template>
  <section>
    <div class="mb-6">
      <h1 class="text-2xl font-semibold text-white">Créer un post</h1>
      <p class="mt-1 text-sm text-slate-200">Ajouter un nouvel article (titre, body, tags)</p>
    </div>

    <p v-if="error" class="mb-4 rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-200">
      {{ error }}
    </p>

    <form class="max-w-2xl space-y-4" @submit.prevent="submit">
      <label class="block">
        <span class="text-sm font-medium text-slate-200">Titre</span>
        <input
          v-model="title"
          type="text"
          class="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/10"
        />
      </label>

      <label class="block">
        <span class="text-sm font-medium text-slate-200">Body</span>
        <textarea
          v-model="body"
          rows="10"
          class="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/10"
        />
      </label>

      <label class="block">
        <span class="text-sm font-medium text-slate-200">Tags (séparés par des virgules)</span>
        <input
          v-model="tags"
          type="text"
          placeholder="vue, js"
          class="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/10"
        />
      </label>

      <div class="pt-2">
        <button
          type="submit"
          class="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100"
        >
          Ajouter
        </button>
      </div>
    </form>
  </section>
</template>
