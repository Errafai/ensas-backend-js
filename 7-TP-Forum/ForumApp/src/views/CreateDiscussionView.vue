<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useDiscussions } from '@/composables/useDiscussions'

const title = ref('')
const content = ref('')
const category = ref('General')
const { categories, createDiscussion, discussionError } = useDiscussions()
const router = useRouter()
const saving = ref(false)

const handleSubmit = async () => {
  saving.value = true
  try {
    const id = await createDiscussion({ title: title.value, content: content.value, category: category.value })
    router.push({ name: 'discussion', params: { id } })
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="card-surface p-4">
    <h3 class="heading-text mb-3">Créer une nouvelle discussion</h3>
    <form class="d-flex flex-column gap-3" @submit.prevent="handleSubmit">
      <div>
        <label class="form-label text-light">Titre</label>
        <input v-model="title" type="text" class="form-control" required />
      </div>
      <div>
        <label class="form-label text-light">Catégorie</label>
        <select v-model="category" class="form-select">
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>
      <div>
        <label class="form-label text-light">Contenu</label>
        <textarea v-model="content" class="form-control" rows="6" required placeholder="Décrivez votre question ou sujet"></textarea>
      </div>
      <BButton :disabled="saving" type="submit" variant="success">
        {{ saving ? 'Publication...' : 'Publier' }}
      </BButton>
      <div v-if="discussionError" class="alert alert-danger">{{ discussionError }}</div>
    </form>
  </div>
</template>
