<script setup>
</script>

<template>
  <header class="sticky top-0 z-10 border-b border-white/10 bg-slate-950/80 backdrop-blur">
    <nav class="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
      <RouterLink
        to="/"
        class="text-sm font-semibold tracking-wide text-slate-100 hover:text-white"
      >
        Blog
      </RouterLink>

      <div class="flex items-center gap-2">
        <RouterLink
          class="rounded-md px-3 py-1.5 text-sm text-slate-200 hover:bg-white/10 hover:text-white"
          to="/"
        >
          Home
        </RouterLink>
        <RouterLink
          class="rounded-md px-3 py-1.5 text-sm text-slate-200 hover:bg-white/10 hover:text-white"
          to="/create"
        >
          addPost
        </RouterLink>
        <RouterLink
          class="rounded-md px-3 py-1.5 text-sm text-slate-200 hover:bg-white/10 hover:text-white"
          to="/edit"
        >
          EditPost
        </RouterLink>
      </div>
    </nav>
  </header>
</template>
