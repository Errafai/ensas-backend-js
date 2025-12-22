import { ref, computed, onUnmounted } from 'vue'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  increment,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import { collections, db, serverTime } from '@/firebase/config'
import { useSession } from './useSession'

const categories = ['General', 'Frontend', 'Backend', 'Database', 'DevOps', 'Community']

const buildKeywords = text =>
  text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean)

export const useDiscussions = () => {
  const list = ref([])
  const replies = ref([])
  const activeDiscussion = ref(null)
  const loadingList = ref(false)
  const loadingDiscussion = ref(false)
  const loadingReplies = ref(false)
  const listError = ref(null)
  const discussionError = ref(null)
  const replyError = ref(null)
  const { user, profile, isModerator } = useSession()

  let stopListWatcher
  let stopDiscussionWatcher
  let stopRepliesWatcher

  const canModerate = computed(() => isModerator.value)
  const canEdit = authorId => isModerator.value || user.value?.uid === authorId

  const watchDiscussions = filters => {
    listError.value = null
    loadingList.value = true
    if (stopListWatcher) stopListWatcher()

    const constraints = []
    if (filters?.category && filters.category !== 'all') {
      constraints.push(where('category', '==', filters.category))
    }
    if (filters?.search) {
      constraints.push(where('keywords', 'array-contains', filters.search.toLowerCase()))
    }
    if (filters?.authorId) {
      constraints.push(where('authorId', '==', filters.authorId))
    }

    const order = filters?.sort === 'popular' ? orderBy('replyCount', 'desc') : orderBy('createdAt', 'desc')
    const discussionsQuery = query(collection(db, collections.discussions), ...constraints, order)

    stopListWatcher = onSnapshot(
      discussionsQuery,
      snapshot => {
        list.value = snapshot.docs.map(docItem => ({ id: docItem.id, ...docItem.data() }))
        loadingList.value = false
      },
      err => {
        listError.value = err.message
        loadingList.value = false
      },
    )
  }

  const createDiscussion = async payload => {
    discussionError.value = null
    if (!user.value) throw new Error('You must be logged in')
    const keywords = buildKeywords(`${payload.title} ${payload.content}`)
    const docRef = await addDoc(collection(db, collections.discussions), {
      title: payload.title,
      content: payload.content,
      category: payload.category || 'General',
      keywords,
      authorId: user.value.uid,
      authorName: profile.value?.displayName || user.value.email,
      authorRole: profile.value?.role || 'user',
      replyCount: 0,
      createdAt: serverTime(),
      updatedAt: serverTime(),
    })
    return docRef.id
  }

  const updateDiscussion = async (id, payload) => {
    discussionError.value = null
    const discussionRef = doc(db, collections.discussions, id)
    const snapshot = await getDoc(discussionRef)
    if (!snapshot.exists()) throw new Error('Discussion not found')
    if (!canEdit(snapshot.data().authorId)) throw new Error('You cannot edit this discussion')

    const keywords = buildKeywords(`${payload.title} ${payload.content}`)
    await updateDoc(discussionRef, {
      ...payload,
      keywords,
      updatedAt: serverTime(),
    })
  }

  const removeDiscussion = async id => {
    const discussionRef = doc(db, collections.discussions, id)
    const snapshot = await getDoc(discussionRef)
    if (!snapshot.exists()) throw new Error('Discussion not found')
    if (!canEdit(snapshot.data().authorId)) throw new Error('You cannot delete this discussion')
    await deleteDoc(discussionRef)
  }

  const watchDiscussion = id => {
    if (stopDiscussionWatcher) stopDiscussionWatcher()
    loadingDiscussion.value = true
    const discussionRef = doc(db, collections.discussions, id)
    stopDiscussionWatcher = onSnapshot(
      discussionRef,
      snapshot => {
        activeDiscussion.value = snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null
        loadingDiscussion.value = false
      },
      err => {
        discussionError.value = err.message
        loadingDiscussion.value = false
      },
    )
  }

  const watchReplies = discussionId => {
    if (stopRepliesWatcher) stopRepliesWatcher()
    loadingReplies.value = true
    const repliesQuery = query(
      collection(db, collections.discussions, discussionId, collections.replies),
      orderBy('createdAt', 'asc'),
    )
    stopRepliesWatcher = onSnapshot(
      repliesQuery,
      snapshot => {
        replies.value = snapshot.docs.map(docItem => ({ id: docItem.id, ...docItem.data() }))
        loadingReplies.value = false
      },
      err => {
        replyError.value = err.message
        loadingReplies.value = false
      },
    )
  }

  const addReply = async (discussionId, content) => {
    replyError.value = null
    if (!user.value) throw new Error('You must be logged in to reply')
    const parentRef = doc(db, collections.discussions, discussionId)
    await addDoc(collection(db, collections.discussions, discussionId, collections.replies), {
      content,
      authorId: user.value.uid,
      authorName: profile.value?.displayName || user.value.email,
      authorRole: profile.value?.role || 'user',
      createdAt: serverTime(),
      updatedAt: serverTime(),
    })
    await updateDoc(parentRef, { replyCount: increment(1), updatedAt: serverTime() })
  }

  const updateReply = async (discussionId, replyId, content) => {
    const replyRef = doc(db, collections.discussions, discussionId, collections.replies, replyId)
    const snapshot = await getDoc(replyRef)
    if (!snapshot.exists()) throw new Error('Reply not found')
    if (!canEdit(snapshot.data().authorId)) throw new Error('You cannot edit this reply')
    await updateDoc(replyRef, { content, updatedAt: serverTime() })
  }

  const removeReply = async (discussionId, replyId) => {
    const replyRef = doc(db, collections.discussions, discussionId, collections.replies, replyId)
    const snapshot = await getDoc(replyRef)
    if (!snapshot.exists()) throw new Error('Reply not found')
    if (!canEdit(snapshot.data().authorId)) throw new Error('You cannot delete this reply')
    await deleteDoc(replyRef)
    await updateDoc(doc(db, collections.discussions, discussionId), {
      replyCount: increment(-1),
      updatedAt: serverTime(),
    })
  }

  onUnmounted(() => {
    if (stopListWatcher) stopListWatcher()
    if (stopDiscussionWatcher) stopDiscussionWatcher()
    if (stopRepliesWatcher) stopRepliesWatcher()
  })

  return {
    categories,
    list,
    replies,
    activeDiscussion,
    loadingList,
    loadingDiscussion,
    loadingReplies,
    listError,
    discussionError,
    replyError,
    watchDiscussions,
    watchDiscussion,
    watchReplies,
    createDiscussion,
    updateDiscussion,
    removeDiscussion,
    addReply,
    updateReply,
    removeReply,
    canEdit,
    canModerate,
  }
}
