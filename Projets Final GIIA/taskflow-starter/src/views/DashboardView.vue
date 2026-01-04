<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useProjectStore } from '@/stores/projectStore'
import ProjectModal from '@/components/ProjectModal.vue'
import ConfirmModal from '@/components/ConfirmModal.vue'

const router = useRouter()
const authStore = useAuthStore()
const projectStore = useProjectStore()

authStore.init()

const userId = computed(() => authStore.user?.uid)

const error = ref('')
const modalOpen = ref(false)
const editingProject = ref(null)

const confirmOpen = ref(false)
const pendingDeleteProject = ref(null)

const confirmMessage = computed(() => {
  const p = pendingDeleteProject.value
  return p?.name ? `Supprimer le projet "${p.name}" ?` : 'Supprimer ce projet ?'
})

const closeConfirm = () => {
  confirmOpen.value = false
  pendingDeleteProject.value = null
}

const projects = computed(() => projectStore.projects)
const loading = computed(() => projectStore.loadingProjects)
const projectsError = computed(() => projectStore.projectsError)

const openCreate = () => {
  error.value = ''
  editingProject.value = null
  modalOpen.value = true
}

const openEdit = (project) => {
  error.value = ''
  editingProject.value = project
  modalOpen.value = true
}

const handleSave = async (payload) => {
  error.value = ''
  try {
    if (!payload?.name?.trim()) return
    if (editingProject.value?.id) {
      await projectStore.updateProject(editingProject.value.id, payload)
    } else {
      await projectStore.addProject({ userId: userId.value, ...payload })
    }
    modalOpen.value = false
    editingProject.value = null
  } catch (e) {
    error.value = e?.message || 'Erreur lors de l\'enregistrement'
  }
}

const requestDelete = (project) => {
  pendingDeleteProject.value = project
  confirmOpen.value = true
}

const confirmDelete = async () => {
  const project = pendingDeleteProject.value
  closeConfirm()

  if (!project?.id) return

  error.value = ''
  try {
    await projectStore.deleteProject(project.id)
  } catch (e) {
    error.value = e?.message || 'Erreur lors de la suppression'
  }
}

const openProject = (project) => {
  router.push(`/projects/${project.id}`)
}

watch(
  userId,
  (uid) => {
    if (uid) projectStore.subscribeProjects(uid)
  },
  { immediate: true }
)

onMounted(() => {
  if (userId.value) projectStore.subscribeProjects(userId.value)
})
</script>

<template>
  <div>
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 class="text-xl font-semibold text-slate-900">Tableau de bord</h1>
        <p class="mt-1 text-sm text-slate-500">Gérez vos projets.</p>
      </div>
      <button class="rounded-lg bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-800" @click="openCreate">
        Nouveau projet
      </button>
    </div>

    <p
      v-if="error"
      class="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
    >
      {{ error }}
    </p>
    <p
      v-if="projectsError"
      class="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
    >
      {{ projectsError }}
    </p>

    <div class="mt-6">
      <div class="flex items-center justify-between">
        <h3 class="text-sm font-semibold text-slate-900">Mes projets</h3>
        <span v-if="loading" class="text-sm text-slate-500">Chargement...</span>
      </div>

      <div v-if="projects.length === 0" class="mt-3 rounded-xl border border-dashed border-slate-200 bg-white p-6">
        <p class="text-sm text-slate-600">Aucun projet pour le moment.</p>
      </div>

      <div class="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="project in projects"
          :key="project.id"
          class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
        >
          <div class="flex items-start justify-between gap-3">
            <button class="text-left" @click="openProject(project)">
              <div class="flex items-center gap-2">
                <span class="h-2.5 w-2.5 rounded-full" :style="{ backgroundColor: project.color || '#3b82f6' }" />
                <div class="text-sm font-semibold text-slate-900">{{ project.name }}</div>
              </div>
              <div v-if="project.description" class="mt-2 line-clamp-3 text-sm text-slate-600">
                {{ project.description }}
              </div>
            </button>

            <div class="flex flex-col items-end gap-2">
              <button class="text-sm text-slate-700 hover:underline" @click="openEdit(project)">Modifier</button>
              <button class="text-sm text-red-600 hover:underline" @click="requestDelete(project)">Supprimer</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ProjectModal
      :open="modalOpen"
      :initial="editingProject"
      @close="modalOpen = false"
      @save="handleSave"
    />

    <ConfirmModal
      :open="confirmOpen"
      title="Supprimer le projet"
      :message="confirmMessage"
      confirmText="Supprimer"
      @close="closeConfirm"
      @confirm="confirmDelete"
    />
  </div>
</template>

<style scoped></style>