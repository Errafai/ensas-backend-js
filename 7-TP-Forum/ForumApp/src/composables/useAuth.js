import { ref } from 'vue'
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile as updateFirebaseProfile,
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, collections, db, serverTime } from '@/firebase/config'
import { useSession } from './useSession'

const authError = ref(null)
const authLoading = ref(false)

const signup = async ({ email, password, displayName }) => {
  authError.value = null
  authLoading.value = true
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    await updateFirebaseProfile(cred.user, { displayName })
    await setDoc(doc(db, collections.users, cred.user.uid), {
      email,
      displayName,
      role: 'user',
      createdAt: serverTime(),
      updatedAt: serverTime(),
    })
    return cred.user
  } catch (err) {
    authError.value = err.message
    return null
  } finally {
    authLoading.value = false
  }
}

const login = async ({ email, password }) => {
  authError.value = null
  authLoading.value = true
  try {
    const cred = await signInWithEmailAndPassword(auth, email, password)
    return cred.user
  } catch (err) {
    authError.value = err.message
    return null
  } finally {
    authLoading.value = false
  }
}

const resetPassword = async email => {
  authError.value = null
  authLoading.value = true
  try {
    await sendPasswordResetEmail(auth, email)
    return true
  } catch (err) {
    authError.value = err.message
    return false
  } finally {
    authLoading.value = false
  }
}

const logout = async () => {
  authError.value = null
  authLoading.value = true
  try {
    await signOut(auth)
    const { profile } = useSession()
    profile.value = null
    return true
  } catch (err) {
    authError.value = err.message
    return false
  } finally {
    authLoading.value = false
  }
}

export const useAuth = () => ({
  signup,
  login,
  resetPassword,
  logout,
  authError,
  authLoading,
})
