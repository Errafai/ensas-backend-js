<script setup>
import { onMounted } from 'vue'
import getPosts from '../composables/getPosts'
import { deletePost } from '../composables/storage'

const { posts, error, load } = getPosts()

onMounted(load)

const remove = (id) => {
  deletePost(id)
  load()
}
</script>

<template>
  <section>
    <div class="mb-6">
      <h1 class="text-2xl font-semibold text-white">EditPost</h1>
      <p class="mt-1 text-sm text-slate-200">Modifier ou supprimer des articles</p>
    </div>

    <p v-if="error" class="mb-4 rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-200">
      {{ error }}
    </p>

    <div v-if="posts.length === 0" class="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
      Aucun post.
    </div>

    <ul class="space-y-3" v-else>
      <li
        v-for="post in posts"
        :key="post.id"
        class="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <span class="font-medium text-white">{{ post.title }}</span>
        <div class="flex items-center gap-2">
          <RouterLink
            class="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-semibold text-white hover:bg-white/10"
            :to="`/edit/${encodeURIComponent(post.id)}`"
          >
            Modifier
          </RouterLink>
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-1.5 text-sm font-semibold text-red-200 hover:bg-red-500/15"
            @click="remove(post.id)"
          >
            Supprimer
          </button>
        </div>
      </li>
    </ul>
  </section>
</template>
