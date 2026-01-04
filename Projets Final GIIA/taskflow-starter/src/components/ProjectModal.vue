<script setup>
import { computed, ref, watch } from 'vue'
import Modal from '@/components/Modal.vue'

const props = defineProps({
  open: { type: Boolean, default: false },
  initial: { type: Object, default: null }
})

const emit = defineEmits(['close', 'save'])

const isEdit = computed(() => !!props.initial?.id)

const name = ref('')
const description = ref('')
const color = ref('#3b82f6')

watch(
  () => [props.open, props.initial],
  ([isOpen]) => {
    if (!isOpen) return
    name.value = props.initial?.name || ''
    description.value = props.initial?.description || ''
    color.value = props.initial?.color || '#3b82f6'
  },
  { immediate: true }
)

const submit = () => {
  emit('save', {
    name: name.value.trim(),
    description: description.value.trim(),
    color: color.value
  })
}
</script>

<template>
  <Modal :open="open" :title="isEdit ? 'Modifier le projet' : 'Nouveau projet'" @close="$emit('close')">
    <form class="space-y-4" @submit.prevent="submit">
      <div>
        <label class="mb-1 block text-sm font-medium text-slate-700">Nom</label>
        <input
          v-model="name"
          class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400"
          placeholder="Nom du projet"
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
          <label class="mb-1 block text-sm font-medium text-slate-700">Couleur</label>
          <input v-model="color" type="color" class="h-10 w-14 rounded border border-slate-200 bg-white" />
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
            {{ isEdit ? 'Mettre à jour' : 'Créer' }}
          </button>
        </div>
      </div>
    </form>
  </Modal>
</template>
