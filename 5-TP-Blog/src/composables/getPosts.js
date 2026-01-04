import { ref } from 'vue'
import { readPosts } from './storage'

export default function getPosts() {
  const posts = ref([])
  const error = ref(null)

  const load = () => {
    error.value = null
    try {
      const all = readPosts()
      posts.value = [...all].sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0))
    } catch (e) {
      error.value = e instanceof Error ? e.message : String(e)
      posts.value = []
    }
  }

  return { posts, error, load }
}
