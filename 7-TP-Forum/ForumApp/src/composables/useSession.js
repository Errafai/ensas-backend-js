import { ref, computed } from 'vue'
import { onAuthStateChanged, updateProfile as updateFirebaseProfile } from 'firebase/auth'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { auth, db, collections, serverTime } from '@/firebase/config'

const user = ref(null)
const profile = ref(null)
const sessionReady = ref(false)
let stopAuthWatcher

const ensureUserDocument = async current => {
  if (!current) return
  const userRef = doc(db, collections.users, current.uid)
  const snapshot = await getDoc(userRef)
  if (!snapshot.exists()) {
    await setDoc(userRef, {
      email: current.email,
      displayName: current.displayName || current.email?.split('@')[0],
      role: 'user',
      createdAt: serverTime(),
      updatedAt: serverTime(),
    })
  }
}

const loadProfile = async uid => {
  if (!uid) {
    profile.value = null
    return
  }
  const userRef = doc(db, collections.users, uid)
  const snapshot = await getDoc(userRef)
  if (snapshot.exists()) {
    profile.value = { id: snapshot.id, ...snapshot.data() }
  } else {
    profile.value = null
  }
}

const startSessionListener = () => {
  if (stopAuthWatcher) return
  stopAuthWatcher = onAuthStateChanged(auth, async current => {
    user.value = current
    await ensureUserDocument(current)
    await loadProfile(current?.uid)
    sessionReady.value = true
  })
}

const updateProfile = async payload => {
  if (!auth.currentUser) throw new Error('No authenticated user')
  const { displayName, photoURL } = payload
  await updateFirebaseProfile(auth.currentUser, { displayName, photoURL })
  const userRef = doc(db, collections.users, auth.currentUser.uid)
  await updateDoc(userRef, {
    displayName: displayName || auth.currentUser.displayName,
    photoURL: photoURL || null,
    updatedAt: serverTime(),
  })
  await loadProfile(auth.currentUser.uid)
}

const isModerator = computed(() => profile.value?.role === 'moderator')

export const useSession = () => {
  startSessionListener()
  return {
    user,
    profile,
    isModerator,
    sessionReady,
    updateProfile,
  }
}
