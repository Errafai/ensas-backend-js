<script setup>
import { computed } from 'vue'

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
})

const snippet = computed(() => {
  const text = String(props.post?.body ?? '')
  return text.length > 50 ? text.substring(0, 50) + '...' : text
})
</script>

<template>
  <article class="rounded-xl border border-white/10 bg-white/5 p-4 shadow-sm">
    <h2 class="text-lg font-semibold text-white">
      {{ post.title }}
    </h2>

    <div class="mt-2 flex flex-wrap gap-2" v-if="post.tags && post.tags.length">
      <RouterLink
        v-for="tag in post.tags"
        :key="tag"
        class="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-200 hover:bg-white/10 hover:text-white"
        :to="`/tags/${encodeURIComponent(tag)}`"
      >
        #{{ tag }}
      </RouterLink>
    </div>

    <p class="mt-3 text-sm leading-6 text-slate-200">
      {{ snippet }}
    </p>

    <RouterLink
      class="mt-4 inline-flex items-center text-sm font-medium text-slate-100 underline-offset-4 hover:underline"
      :to="`/posts/${encodeURIComponent(post.id)}`"
    >
      Lire la suite
    </RouterLink>
  </article>
</template>
