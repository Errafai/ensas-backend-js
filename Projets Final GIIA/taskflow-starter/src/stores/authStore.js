import { defineStore } from 'pinia'
import { ref } from 'vue'
import { auth } from '@/firebase/config'
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(auth.currentUser)
  const initialized = ref(false)

  let unsubscribeAuth = null

  const init = () => {
    if (initialized.value) return
    initialized.value = true

    unsubscribeAuth = onAuthStateChanged(auth, (u) => {
      user.value = u
    })
  }

  const login = async (email, password) => {
    const res = await signInWithEmailAndPassword(auth, email, password)
    user.value = res.user
  }

  const register = async (email, password) => {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    user.value = res.user
  }

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    const res = await signInWithPopup(auth, provider)
    user.value = res.user
  }

  const logout = async () => {
    await signOut(auth)
    user.value = null
  }

  const dispose = () => {
    if (unsubscribeAuth) unsubscribeAuth()
    unsubscribeAuth = null
    initialized.value = false
  }

  return { user, init, dispose, login, register, loginWithGoogle, logout }
})