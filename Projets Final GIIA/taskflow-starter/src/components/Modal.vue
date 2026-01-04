<script setup>
import { onBeforeUnmount, onMounted, watch } from 'vue'

const props = defineProps({
  open: { type: Boolean, default: false },
  title: { type: String, default: '' }
})

const emit = defineEmits(['close'])

const onKeyDown = (e) => {
  if (e.key === 'Escape') emit('close')
}

onMounted(() => {
  document.addEventListener('keydown', onKeyDown)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeyDown)
})

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
  },
  { immediate: true }
)
</script>

<template>
  <teleport to="body">
    <div v-if="open" class="fixed inset-0 z-50">
      <div class="absolute inset-0 bg-black/40" @click="$emit('close')" />
      <div class="relative mx-auto mt-24 w-[min(92vw,560px)] rounded-xl bg-white shadow-lg">
        <div class="flex items-center justify-between border-b px-5 py-4">
          <h3 class="text-base font-semibold text-slate-900">{{ title }}</h3>
          <button
            class="rounded-md px-2 py-1 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
            @click="$emit('close')"
            aria-label="Fermer"
          >
            ✕
          </button>
        </div>
        <div class="px-5 py-4">
          <slot />
        </div>
      </div>
    </div>
  </teleport>
</template>
