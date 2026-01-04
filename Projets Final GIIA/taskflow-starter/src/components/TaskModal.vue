<script setup>
import { ref, watch } from 'vue'
import Modal from '@/components/Modal.vue'

const props = defineProps({
  open: { type: Boolean, default: false }
})

const emit = defineEmits(['close', 'save'])

const title = ref('')
const description = ref('')
const dueDate = ref('')

watch(
  () => props.open,
  (isOpen) => {
    if (!isOpen) return
    title.value = ''
    description.value = ''
    dueDate.value = ''
  }
)

const submit = () => {
  emit('save', {
    title: title.value.trim(),
    description: description.value.trim(),
    dueDate: dueDate.value || null
  })
}
</script>

<template>
  <Modal :open="open" title="Nouvelle tâche" @close="$emit('close')">
    <form class="space-y-4" @submit.prevent="submit">
      <div>
        <label class="mb-1 block text-sm font-medium text-slate-700">Titre</label>
        <input
          v-model="title"
          class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400"
          placeholder="Titre"
          required
        />
      </div>

      <div>
        <label class="mb-1 block text-sm font-medium text-slate-700">Description</label>
        <textarea
          v-model="description"
          rows="3"
          class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400"
          placeholder="Description"
        />
      </div>

      <div class="flex items-center justify-between gap-3">
        <div>
          <label class="mb-1 block text-sm font-medium text-slate-700">Date limite</label>
          <input v-model="dueDate" type="date" class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm" />
        </div>

        <div class="flex items-center gap-2">
          <button
            type="button"
            class="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
            @click="$emit('close')"
          >
            Annuler
          </button>
          <button type="submit" class="rounded-lg bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-800">
            Ajouter
          </button>
        </div>
      </div>
    </form>
  </Modal>
</template>
