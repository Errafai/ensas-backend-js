import { ref } from 'vue'
import { getPostById } from './storage'

export default function getPost(id) {
  const post = ref(null)
  const error = ref(null)

  const load = () => {
    error.value = null
    try {
      post.value = getPostById(id)
      if (!post.value) {
        error.value = 'Post introuvable.'
      }
    } catch (e) {
      error.value = e instanceof Error ? e.message : String(e)
      post.value = null
    }
  }

  return { post, error, load }
}
