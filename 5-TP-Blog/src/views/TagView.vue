<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import getPosts from '../composables/getPosts'
import PostList from '../components/PostList.vue'
import TagCloud from '../components/TagCloud.vue'

const route = useRoute()
const tag = computed(() => String(route.params.tag ?? '').toLowerCase())

const { posts, error, load } = getPosts()

onMounted(load)

const filtered = computed(() =>
  posts.value.filter((p) => Array.isArray(p.tags) && p.tags.map((t) => String(t).toLowerCase()).includes(tag.value)),
)
</script>

<template>
  <section class="grid gap-6 lg:grid-cols-3">
    <div class="lg:col-span-2">
      <div class="mb-4">
        <h1 class="text-2xl font-semibold text-white">Tag: {{ tag }}</h1>
        <p class="mt-1 text-sm text-slate-200">Posts associés</p>
      </div>

      <p v-if="error" class="mb-3 rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-200">
        {{ error }}
      </p>

      <PostList :posts="filtered" />
    </div>

    <div class="lg:col-span-1">
      <TagCloud :posts="posts" />
    </div>
  </section>
</template>
