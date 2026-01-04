<script setup>
import { onMounted } from 'vue'
import getPosts from '../composables/getPosts'
import PostList from '../components/PostList.vue'
import TagCloud from '../components/TagCloud.vue'

const { posts, error, load } = getPosts()

onMounted(load)
</script>

<template>
  <section class="grid gap-6 lg:grid-cols-3">
    <div class="lg:col-span-2">
      <div class="mb-4 flex items-end justify-between gap-4">
        <div>
          <h1 class="text-2xl font-semibold text-white">Blog</h1>
          <p class="mt-1 text-sm text-slate-200">Liste des posts</p>
        </div>
      </div>

      <p v-if="error" class="mb-3 rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-200">
        {{ error }}
      </p>

      <PostList :posts="posts" />
    </div>

    <div class="lg:col-span-1">
      <TagCloud :posts="posts" />
    </div>
  </section>
</template>
