<script setup>
import SinglePost from './SinglePost.vue'

defineProps({
  posts: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <section class="space-y-3">
    <SinglePost v-for="post in posts" :key="post.id" :post="post" />
    <p v-if="posts.length === 0" class="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
      Aucun post.
    </p>
  </section>
</template>
