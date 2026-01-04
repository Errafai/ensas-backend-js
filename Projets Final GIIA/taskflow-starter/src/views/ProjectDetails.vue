<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProjectStore } from '@/stores/projectStore'
import TaskModal from '@/components/TaskModal.vue'
import ConfirmModal from '@/components/ConfirmModal.vue'

const route = useRoute()
const router = useRouter()
const projectStore = useProjectStore()

const projectId = computed(() => route.params.id)

const error = ref('')
const taskModalOpen = ref(false)

const confirmOpen = ref(false)
const pendingDeleteTask = ref(null)

const confirmMessage = computed(() => {
	const t = pendingDeleteTask.value
	return t?.title ? `Supprimer la tâche "${t.title}" ?` : 'Supprimer cette tâche ?'
})

const closeConfirm = () => {
	confirmOpen.value = false
	pendingDeleteTask.value = null
}

const project = computed(() => projectStore.activeProject)
const tasksByStatus = computed(() => projectStore.tasksByStatus)

const handleAddTask = async (payload) => {
	error.value = ''
	try {
		if (!payload?.title?.trim()) return
		await projectStore.addTask(projectId.value, {
			title: payload.title.trim(),
			description: payload.description?.trim?.() || '',
			dueDate: payload.dueDate || null,
			status: 'todo'
		})
		taskModalOpen.value = false
	} catch (e) {
		error.value = e?.message || 'Erreur lors de la création de la tâche'
	}
}

const handleMoveTask = async (task, status) => {
	error.value = ''
	try {
		await projectStore.updateTask(projectId.value, task.id, { status })
	} catch (e) {
		error.value = e?.message || 'Erreur lors de la mise à jour'
	}
}

const requestDeleteTask = (task) => {
	pendingDeleteTask.value = task
	confirmOpen.value = true
}

const confirmDeleteTask = async () => {
	const task = pendingDeleteTask.value
	closeConfirm()

	if (!task?.id) return

	error.value = ''
	try {
		await projectStore.deleteTask(projectId.value, task.id)
	} catch (e) {
		error.value = e?.message || 'Erreur lors de la suppression'
	}
}

onMounted(async () => {
	await projectStore.ensureProjectLoadedOnce(projectId.value)
	projectStore.subscribeProject(projectId.value)
	projectStore.subscribeTasks(projectId.value)
})
</script>

<template>
	<div>
		<div class="flex flex-wrap items-start justify-between gap-3">
			<div>
				<h1 class="text-xl font-semibold text-slate-900">{{ project?.name || 'Projet' }}</h1>
				<p v-if="project?.description" class="mt-1 text-sm text-slate-600">{{ project.description }}</p>
			</div>
			<div class="flex items-center gap-2">
				<button
					class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
					@click="router.push('/dashboard')"
				>
					Retour
				</button>
				<button
					class="rounded-lg bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-800"
					@click="taskModalOpen = true"
				>
					Ajouter une tâche
				</button>
			</div>
		</div>

		<p
			v-if="error"
			class="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
		>
			{{ error }}
		</p>

		<div class="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
			<section class="rounded-xl border border-slate-200 bg-white shadow-sm">
				<div class="border-b px-4 py-3">
					<h3 class="text-sm font-semibold text-slate-900">À faire</h3>
				</div>
				<div class="space-y-3 p-4">
					<div
						v-for="task in tasksByStatus.todo"
						:key="task.id"
						class="rounded-lg border border-slate-200 bg-white p-3"
					>
						<div class="text-sm font-semibold text-slate-900">{{ task.title }}</div>
						<div v-if="task.description" class="mt-1 text-sm text-slate-600">{{ task.description }}</div>
						<div v-if="task.dueDate" class="mt-2 text-xs text-slate-500">Date limite: {{ task.dueDate }}</div>
						<div class="mt-3 flex flex-wrap gap-2">
							<button
								class="rounded-md bg-slate-900 px-2.5 py-1.5 text-xs text-white hover:bg-slate-800"
								@click="handleMoveTask(task, 'doing')"
							>
								→ En cours
							</button>
							<button class="rounded-md px-2.5 py-1.5 text-xs text-red-600 hover:bg-red-50" @click="requestDeleteTask(task)">
								Supprimer
							</button>
						</div>
					</div>
				</div>
			</section>

			<section class="rounded-xl border border-slate-200 bg-white shadow-sm">
				<div class="border-b px-4 py-3">
					<h3 class="text-sm font-semibold text-slate-900">En cours</h3>
				</div>
				<div class="space-y-3 p-4">
					<div
						v-for="task in tasksByStatus.doing"
						:key="task.id"
						class="rounded-lg border border-slate-200 bg-white p-3"
					>
						<div class="text-sm font-semibold text-slate-900">{{ task.title }}</div>
						<div v-if="task.description" class="mt-1 text-sm text-slate-600">{{ task.description }}</div>
						<div v-if="task.dueDate" class="mt-2 text-xs text-slate-500">Date limite: {{ task.dueDate }}</div>
						<div class="mt-3 flex flex-wrap gap-2">
							<button class="rounded-md border border-slate-200 px-2.5 py-1.5 text-xs text-slate-700 hover:bg-slate-50" @click="handleMoveTask(task, 'todo')">
								← À faire
							</button>
							<button
								class="rounded-md bg-slate-900 px-2.5 py-1.5 text-xs text-white hover:bg-slate-800"
								@click="handleMoveTask(task, 'done')"
							>
								→ Terminé
							</button>
							<button class="rounded-md px-2.5 py-1.5 text-xs text-red-600 hover:bg-red-50" @click="requestDeleteTask(task)">
								Supprimer
							</button>
						</div>
					</div>
				</div>
			</section>

			<section class="rounded-xl border border-slate-200 bg-white shadow-sm">
				<div class="border-b px-4 py-3">
					<h3 class="text-sm font-semibold text-slate-900">Terminé</h3>
				</div>
				<div class="space-y-3 p-4">
					<div
						v-for="task in tasksByStatus.done"
						:key="task.id"
						class="rounded-lg border border-slate-200 bg-white p-3"
					>
						<div class="text-sm font-semibold text-slate-900">{{ task.title }}</div>
						<div v-if="task.description" class="mt-1 text-sm text-slate-600">{{ task.description }}</div>
						<div v-if="task.dueDate" class="mt-2 text-xs text-slate-500">Date limite: {{ task.dueDate }}</div>
						<div class="mt-3 flex flex-wrap gap-2">
							<button class="rounded-md border border-slate-200 px-2.5 py-1.5 text-xs text-slate-700 hover:bg-slate-50" @click="handleMoveTask(task, 'doing')">
								← En cours
							</button>
							<button class="rounded-md px-2.5 py-1.5 text-xs text-red-600 hover:bg-red-50" @click="requestDeleteTask(task)">
								Supprimer
							</button>
						</div>
					</div>
				</div>
			</section>
		</div>

		<TaskModal :open="taskModalOpen" @close="taskModalOpen = false" @save="handleAddTask" />

		<ConfirmModal
			:open="confirmOpen"
			title="Supprimer la tâche"
			:message="confirmMessage"
			confirmText="Supprimer"
			@close="closeConfirm"
			@confirm="confirmDeleteTask"
		/>
	</div>
</template>

<style scoped></style>
