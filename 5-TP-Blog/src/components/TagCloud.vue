<script setup>
import { computed } from 'vue'

const props = defineProps({
  posts: {
    type: Array,
    default: () => [],
  },
})

const tags = computed(() => {
  const all = []
  for (const post of props.posts) {
    if (Array.isArray(post?.tags)) all.push(...post.tags)
  }
  return Array.from(new Set(all.map((t) => String(t).trim()).filter(Boolean))).sort()
})
</script>

<template>
  <aside class="rounded-xl border border-white/10 bg-white/5 p-4">
    <h3 class="text-sm font-semibold uppercase tracking-wide text-slate-200">Tags</h3>

    <p v-if="tags.length === 0" class="mt-3 text-sm text-slate-200">Aucun tag.</p>

    <div class="mt-3 flex flex-wrap gap-2" v-else>
      <RouterLink
        v-for="tag in tags"
        :key="tag"
        class="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-200 hover:bg-white/10 hover:text-white"
        :to="`/tags/${encodeURIComponent(tag)}`"
      >
        {{ tag }}
      </RouterLink>
    </div>
  </aside>
</template>
