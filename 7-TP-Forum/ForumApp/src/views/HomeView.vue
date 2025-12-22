<script setup>
import { computed, ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDiscussions } from '@/composables/useDiscussions'
import { useSession } from '@/composables/useSession'

const route = useRoute()
const router = useRouter()
const search = ref('')
const selectedCategory = ref(route.params.category || 'all')
const sort = ref('recent')
const { list, loadingList, watchDiscussions, categories } = useDiscussions()
const { isModerator } = useSession()

const filters = computed(() => ({
  category: selectedCategory.value,
  search: search.value.trim(),
  sort: sort.value,
}))

watch(
  filters,
  value => {
    watchDiscussions(value)
    if (value.category && value.category !== 'all') {
      router.replace({ name: 'category', params: { category: value.category } })
    }
  },
  { immediate: true },
)

watch(
  () => route.params.category,
  category => {
    selectedCategory.value = category || 'all'
  },
)

onMounted(() => {
  if (!route.params.category) watchDiscussions(filters.value)
})

const formattedDate = timestamp => {
  if (!timestamp?.seconds) return '—'
  return new Date(timestamp.seconds * 1000).toLocaleString()
}
</script>

<template>
  <div class="d-flex flex-column gap-3">
    <div class="card-surface p-3">
      <div class="d-flex flex-wrap gap-2 align-items-center justify-content-between mb-3">
        <div>
          <p class="text-info mb-1">Forum communautaire</p>
          <h2 class="heading-text mb-0">Discussions récentes</h2>
        </div>
        <RouterLink class="btn btn-primary" :to="{ name: 'create-discussion' }">Nouvelle discussion</RouterLink>
      </div>
      <div class="row g-3">
        <div class="col-md-4">
          <label class="form-label text-light">Rechercher</label>
          <input v-model="search" type="search" class="form-control" placeholder="Titre ou mot-clé" />
        </div>
        <div class="col-md-4">
          <label class="form-label text-light">Catégorie</label>
          <select v-model="selectedCategory" class="form-select">
            <option value="all">Toutes</option>
            <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
          </select>
        </div>
        <div class="col-md-4">
          <label class="form-label text-light">Filtrer</label>
          <select v-model="sort" class="form-select">
            <option value="recent">Récentes</option>
            <option value="popular">Populaires</option>
          </select>
        </div>
      </div>
    </div>

    <div class="card-surface p-3">
      <div v-if="loadingList" class="text-center py-4 text-info">Chargement des discussions…</div>
      <div v-else-if="!list.length" class="text-center py-4 text-muted">Aucune discussion pour le moment.</div>
      <div v-else class="d-flex flex-column gap-3">
        <div
          v-for="discussion in list"
          :key="discussion.id"
          class="border rounded p-3 bg-dark text-light"
        >
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <RouterLink class="fs-5 text-info" :to="{ name: 'discussion', params: { id: discussion.id } }">
                {{ discussion.title }}
              </RouterLink>
              <p class="mb-1 muted">Par {{ discussion.authorName }} • {{ formattedDate(discussion.createdAt) }}</p>
              <p class="mb-2">{{ discussion.content ? discussion.content.slice(0, 180) : '' }}...</p>
              <div class="d-flex gap-2 flex-wrap">
                <span class="badge bg-info">{{ discussion.category }}</span>
                <span class="badge bg-secondary">{{ discussion.replyCount || 0 }} réponses</span>
                <span v-if="isModerator" class="badge bg-warning text-dark">Modérateur</span>
              </div>
            </div>
            <div class="text-end">
              <small class="muted">Mis à jour {{ formattedDate(discussion.updatedAt) }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
