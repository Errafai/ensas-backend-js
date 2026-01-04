import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { db } from '@/firebase/config'
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  getDoc
} from 'firebase/firestore'

export const useProjectStore = defineStore('projects', () => {
  const projects = ref([])
  const activeProject = ref(null)
  const tasks = ref([])
  const loadingProjects = ref(false)
  const loadingTasks = ref(false)
  const projectsError = ref('')
  const tasksError = ref('')

  let unsubscribeProjects = null
  let unsubscribeTasks = null
  let unsubscribeActiveProject = null

  const tasksByStatus = computed(() => {
    const byStatus = {
      todo: [],
      doing: [],
      done: []
    }

    for (const task of tasks.value) {
      const status = task.status || 'todo'
      if (!byStatus[status]) byStatus[status] = []
      byStatus[status].push(task)
    }

    return byStatus
  })

  const subscribeProjects = (userId) => {
    if (!userId) return

    if (unsubscribeProjects) unsubscribeProjects()
    loadingProjects.value = true
    projectsError.value = ''

    // Note: `where(userId == ...) + orderBy(createdAt)` can require a composite index.
    // To keep starter projects friction-free, we query without orderBy and sort client-side.
    const q = query(collection(db, 'projects'), where('userId', '==', userId))

    unsubscribeProjects = onSnapshot(
      q,
      (snapshot) => {
        const next = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
        next.sort((a, b) => {
          const aMs = a?.createdAt?.toMillis ? a.createdAt.toMillis() : 0
          const bMs = b?.createdAt?.toMillis ? b.createdAt.toMillis() : 0
          return bMs - aMs
        })
        projects.value = next
        loadingProjects.value = false
      },
      (err) => {
        projectsError.value = err?.message || 'Erreur Firestore (projects)'
        loadingProjects.value = false
      }
    )
  }

  const unsubscribeAll = () => {
    if (unsubscribeProjects) unsubscribeProjects()
    if (unsubscribeTasks) unsubscribeTasks()
    if (unsubscribeActiveProject) unsubscribeActiveProject()

    unsubscribeProjects = null
    unsubscribeTasks = null
    unsubscribeActiveProject = null

    projects.value = []
    activeProject.value = null
    tasks.value = []
    projectsError.value = ''
    tasksError.value = ''
  }

  const addProject = async ({ userId, name, description, color }) => {
    if (!userId) throw new Error('User not authenticated')

    await addDoc(collection(db, 'projects'), {
      userId,
      name,
      description,
      color,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })
  }

  const updateProject = async (projectId, updates) => {
    await updateDoc(doc(db, 'projects', projectId), {
      ...updates,
      updatedAt: serverTimestamp()
    })
  }

  const deleteProject = async (projectId) => {
    await deleteDoc(doc(db, 'projects', projectId))
  }

  const subscribeProject = (projectId) => {
    if (!projectId) return

    if (unsubscribeActiveProject) unsubscribeActiveProject()

    const projectRef = doc(db, 'projects', projectId)
    unsubscribeActiveProject = onSnapshot(projectRef, (snap) => {
      if (snap.exists()) {
        activeProject.value = { id: snap.id, ...snap.data() }
      } else {
        activeProject.value = null
      }
    })
  }

  const subscribeTasks = (projectId) => {
    if (!projectId) return

    if (unsubscribeTasks) unsubscribeTasks()
    loadingTasks.value = true
    tasksError.value = ''

    const q = query(collection(db, 'projects', projectId, 'tasks'), orderBy('createdAt', 'asc'))

    unsubscribeTasks = onSnapshot(
      q,
      (snapshot) => {
        tasks.value = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
        loadingTasks.value = false
      },
      (err) => {
        tasksError.value = err?.message || 'Erreur Firestore (tasks)'
        loadingTasks.value = false
      }
    )
  }

  const addTask = async (projectId, { title, description, dueDate, status }) => {
    await addDoc(collection(db, 'projects', projectId, 'tasks'), {
      title,
      description,
      dueDate: dueDate || null,
      status: status || 'todo',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })
  }

  const updateTask = async (projectId, taskId, updates) => {
    await updateDoc(doc(db, 'projects', projectId, 'tasks', taskId), {
      ...updates,
      updatedAt: serverTimestamp()
    })
  }

  const deleteTask = async (projectId, taskId) => {
    await deleteDoc(doc(db, 'projects', projectId, 'tasks', taskId))
  }

  const ensureProjectLoadedOnce = async (projectId) => {
    const existing = projects.value.find((p) => p.id === projectId)
    if (existing) {
      activeProject.value = existing
      return existing
    }

    const snap = await getDoc(doc(db, 'projects', projectId))
    if (!snap.exists()) return null

    const loaded = { id: snap.id, ...snap.data() }
    activeProject.value = loaded
    return loaded
  }

  return {
    projects,
    activeProject,
    tasks,
    tasksByStatus,
    loadingProjects,
    loadingTasks,
    projectsError,
    tasksError,
    subscribeProjects,
    addProject,
    updateProject,
    deleteProject,
    subscribeProject,
    subscribeTasks,
    addTask,
    updateTask,
    deleteTask,
    ensureProjectLoadedOnce,
    unsubscribeAll
  }
})
