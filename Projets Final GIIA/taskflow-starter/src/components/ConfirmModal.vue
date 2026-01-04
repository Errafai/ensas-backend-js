<script setup>
import Modal from '@/components/Modal.vue'

defineProps({
  open: { type: Boolean, default: false },
  title: { type: String, default: 'Confirmer la suppression' },
  message: { type: String, default: 'Cette action est irréversible.' },
  confirmText: { type: String, default: 'Supprimer' },
  cancelText: { type: String, default: 'Annuler' }
})

defineEmits(['close', 'confirm'])
</script>

<template>
  <Modal :open="open" :title="title" @close="$emit('close')">
    <div class="space-y-4">
      <p class="text-sm text-slate-600">{{ message }}</p>

      <div class="flex items-center justify-end gap-2">
        <button
          type="button"
          class="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
          @click="$emit('close')"
        >
          {{ cancelText }}
        </button>
        <button
          type="button"
          class="rounded-lg bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-500"
          @click="$emit('confirm')"
        >
          {{ confirmText }}
        </button>
      </div>
    </div>
  </Modal>
</template>
