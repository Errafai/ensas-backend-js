<script setup>
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <div class="min-h-screen">
    <Navbar />
    <main class="mx-auto w-full max-w-6xl px-4 py-6">
      <RouterView />
    </main>
  </div>
</template>