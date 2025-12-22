<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { useDiscussions } from '@/composables/useDiscussions'
import { useSession } from '@/composables/useSession'

const route = useRoute()
const router = useRouter()
const {
  activeDiscussion,
  watchDiscussion,
  watchReplies,
  replies,
  addReply,
  updateReply,
  removeReply,
  updateDiscussion,
  removeDiscussion,
  canEdit,
  loadingDiscussion,
  loadingReplies,
} = useDiscussions()
const { user } = useSession()

const replyContent = ref('')
const editingReplyId = ref(null)
const editingReplyContent = ref('')
const editingDiscussion = ref(false)
const editTitle = ref('')
const editContent = ref('')
const error = ref('')

const discussionId = computed(() => route.params.id)

watch(
  () => activeDiscussion.value,
  value => {
    if (value) {
      editTitle.value = value.title
      editContent.value = value.content
    }
  },
  { immediate: true },
)

onMounted(() => {
  watchDiscussion(discussionId.value)
  watchReplies(discussionId.value)
})

watch(discussionId, id => {
  watchDiscussion(id)
  watchReplies(id)
})

const formattedDate = timestamp => {
  if (!timestamp?.seconds) return '—'
  return new Date(timestamp.seconds * 1000).toLocaleString()
}

const submitReply = async () => {
  if (!replyContent.value.trim()) return
  await addReply(discussionId.value, replyContent.value.trim())
  replyContent.value = ''
}

const saveDiscussion = async () => {
  error.value = ''
  try {
    await updateDiscussion(discussionId.value, { title: editTitle.value, content: editContent.value, category: activeDiscussion.value.category })
    editingDiscussion.value = false
  } catch (err) {
    error.value = err.message
  }
}

const deleteDiscussion = async () => {
  await removeDiscussion(discussionId.value)
  router.push({ name: 'home' })
}

const startReplyEdit = reply => {
  editingReplyId.value = reply.id
  editingReplyContent.value = reply.content
}

const saveReplyEdit = async () => {
  await updateReply(discussionId.value, editingReplyId.value, editingReplyContent.value)
  editingReplyId.value = null
  editingReplyContent.value = ''
}

const deleteReplyItem = async replyId => {
  await removeReply(discussionId.value, replyId)
}
</script>

<template>
  <div class="d-flex flex-column gap-3">
    <div class="card-surface p-4">
      <div v-if="loadingDiscussion" class="text-info">Chargement...</div>
      <div v-else-if="!activeDiscussion" class="text-danger">Discussion introuvable</div>
      <template v-else>
        <div class="d-flex justify-content-between align-items-start gap-3">
          <div>
            <p class="text-info mb-1">{{ activeDiscussion.category }}</p>
            <h3 class="heading-text mb-2" v-if="!editingDiscussion">{{ activeDiscussion.title }}</h3>
            <div v-else class="d-flex flex-column gap-2">
              <input v-model="editTitle" type="text" class="form-control" />
              <textarea v-model="editContent" rows="5" class="form-control"></textarea>
              <div class="d-flex gap-2">
                <BButton size="sm" variant="success" @click="saveDiscussion">Enregistrer</BButton>
                <BButton size="sm" variant="outline-light" @click="editingDiscussion = false">Annuler</BButton>
              </div>
            </div>
            <p class="muted mb-2">Par {{ activeDiscussion.authorName }} • {{ formattedDate(activeDiscussion.createdAt) }}</p>
            <p class="mb-0" v-if="!editingDiscussion">{{ activeDiscussion.content }}</p>
            <div class="mt-2 d-flex gap-2">
              <span class="badge bg-secondary">{{ activeDiscussion.replyCount || 0 }} réponses</span>
            </div>
          </div>
          <div v-if="canEdit(activeDiscussion.authorId)" class="d-flex flex-column gap-2">
            <BButton size="sm" variant="outline-info" @click="editingDiscussion = !editingDiscussion">{{ editingDiscussion ? 'Fermer' : 'Modifier' }}</BButton>
            <BButton size="sm" variant="outline-danger" @click="deleteDiscussion">Supprimer</BButton>
          </div>
        </div>
        <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
      </template>
    </div>

    <div class="card-surface p-4">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="heading-text mb-0">Réponses</h5>
        <span class="muted">{{ replies.length }} messages</span>
      </div>
      <div v-if="loadingReplies" class="text-info">Chargement des réponses...</div>
      <div v-else-if="!replies.length" class="text-muted">Aucune réponse pour le moment.</div>
      <div v-else class="d-flex flex-column gap-3">
        <div v-for="reply in replies" :key="reply.id" class="bg-dark border rounded p-3">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <p class="mb-1 heading-text">{{ reply.authorName }}</p>
              <p class="muted mb-2">{{ formattedDate(reply.createdAt) }}</p>
            </div>
            <div v-if="canEdit(reply.authorId)" class="d-flex gap-2">
              <BButton size="sm" variant="outline-info" @click="startReplyEdit(reply)">Modifier</BButton>
              <BButton size="sm" variant="outline-danger" @click="deleteReplyItem(reply.id)">Supprimer</BButton>
            </div>
          </div>
          <div v-if="editingReplyId === reply.id" class="d-flex flex-column gap-2 mt-2">
            <textarea v-model="editingReplyContent" class="form-control" rows="3"></textarea>
            <div class="d-flex gap-2">
              <BButton size="sm" variant="success" @click="saveReplyEdit">Enregistrer</BButton>
              <BButton size="sm" variant="outline-light" @click="editingReplyId = null">Annuler</BButton>
            </div>
          </div>
          <p v-else class="mb-0">{{ reply.content }}</p>
        </div>
      </div>
    </div>

    <div class="card-surface p-4">
      <h5 class="heading-text mb-3">Répondre</h5>
      <div v-if="!user" class="alert alert-warning">
        <RouterLink class="text-info" :to="{ name: 'login', query: { redirect: route.fullPath } }">Connectez-vous</RouterLink>
        pour participer à la discussion.
      </div>
      <template v-else>
        <textarea
          v-model="replyContent"
          class="form-control mb-3"
          rows="4"
          placeholder="Partagez votre réponse"
        ></textarea>
        <BButton variant="primary" :disabled="!replyContent.trim()" @click="submitReply">Publier ma réponse</BButton>
      </template>
    </div>
  </div>
</template>
