<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import getPost from '../composables/getPost'
import getPosts from '../composables/getPosts'
import TagCloud from '../components/TagCloud.vue'
import { deletePost } from '../composables/storage'

const route = useRoute()
const router = useRouter()

const id = computed(() => route.params.id)

const { post, error, load } = getPost(id.value)
const { posts, load: loadAll } = getPosts()

onMounted(() => {
  load()
  loadAll()
})

const remove = () => {
  if (!post.value) return
  const ok = deletePost(post.value.id)
  if (ok) router.push('/')
}
</script>

<template>
  <section class="grid gap-6 lg:grid-cols-3">
    <div class="lg:col-span-2">
      <p v-if="error" class="mb-4 rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-200">
        {{ error }}
      </p>

      <article v-if="post" class="rounded-xl border border-white/10 bg-white/5 p-5">
        <h1 class="text-2xl font-semibold text-white">{{ post.title }}</h1>

        <div class="mt-3 flex flex-wrap gap-2" v-if="post.tags && post.tags.length">
          <RouterLink
            v-for="tag in post.tags"
            :key="tag"
            class="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-200 hover:bg-white/10 hover:text-white"
            :to="`/tags/${encodeURIComponent(tag)}`"
          >
            #{{ tag }}
          </RouterLink>
        </div>

        <p class="mt-4 whitespace-pre-wrap text-sm leading-6 text-slate-200">{{ post.body }}</p>

        <div class="mt-6 flex flex-wrap gap-2">
          <RouterLink
            class="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
            :to="`/edit/${encodeURIComponent(post.id)}`"
          >
            Modifier
          </RouterLink>
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-200 hover:bg-red-500/15"
            @click="remove"
          >
            Supprimer
          </button>
        </div>
      </article>
    </div>

    <div class="lg:col-span-1">
      <TagCloud :posts="posts" />
    </div>
  </section>
</template>
