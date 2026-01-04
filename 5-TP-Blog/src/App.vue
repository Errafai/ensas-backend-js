<script setup>
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div class="min-h-dvh bg-slate-950 text-slate-100">
    <NavBar />
    <main class="mx-auto w-full max-w-6xl px-4 py-8">
      <RouterView />
    </main>
  </div>
</template>
