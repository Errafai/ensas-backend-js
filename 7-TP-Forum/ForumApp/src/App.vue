<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { useSession } from '@/composables/useSession'

const router = useRouter()
const { logout } = useAuth()
const { user, profile } = useSession()

const handleLogout = async () => {
  await logout()
  router.push({ name: 'home' })
}
</script>

<template>
  <div>
    <BNavbar variant="dark" class="mb-3 card-surface px-3 py-2" toggleable="lg">
      <RouterLink class="navbar-brand fw-bold" :to="{ name: 'home' }">
        {{ import.meta.env.VITE_APP_NAME || 'Forum' }}
      </RouterLink>
      <BNavbarToggle target="nav-collapse" />
      <BCollapse id="nav-collapse" is-nav>
        <BNavbarNav>
          <RouterLink class="nav-link" :to="{ name: 'home' }">Accueil</RouterLink>
          <RouterLink class="nav-link" :to="{ name: 'category', params: { category: 'General' } }">Catégories</RouterLink>
          <RouterLink class="nav-link" :to="{ name: 'create-discussion' }">Créer</RouterLink>
        </BNavbarNav>
        <BNavbarNav class="ms-auto align-items-center gap-2">
          <template v-if="user">
            <span class="text-light small">Connecté en tant que {{ profile?.displayName || user.email }}</span>
            <RouterLink class="btn btn-outline-info btn-sm" :to="{ name: 'profile' }">Profil</RouterLink>
            <BButton size="sm" variant="outline-danger" @click="handleLogout">Déconnexion</BButton>
          </template>
          <template v-else>
            <RouterLink class="btn btn-info btn-sm" :to="{ name: 'login' }">Connexion</RouterLink>
            <RouterLink class="btn btn-outline-light btn-sm" :to="{ name: 'signup' }">Inscription</RouterLink>
          </template>
        </BNavbarNav>
      </BCollapse>
    </BNavbar>

    <RouterView />
  </div>
</template>
