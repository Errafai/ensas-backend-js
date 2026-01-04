const STORAGE_KEY = 'tp_blog_posts'

function safeJsonParse(value, fallback) {
  try {
    return JSON.parse(value)
  } catch {
    return fallback
  }
}

function generateId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return String(Date.now()) + '-' + Math.random().toString(16).slice(2)
}

function normalizeTags(tags) {
  const items = Array.isArray(tags)
    ? tags
    : String(tags ?? '')
        .split(',')
        .map((t) => t.trim())

  const cleaned = items
    .map((t) => String(t).trim())
    .filter(Boolean)
    .map((t) => t.toLowerCase())

  return Array.from(new Set(cleaned))
}

function seedPosts() {
  return [
    {
      id: generateId(),
      title: 'Bienvenue sur le blog',
      body: 'Ceci est un exemple de post. Vous pouvez ajouter, modifier et supprimer des articles via l\'application.',
      tags: ['vue', 'tp'],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: generateId(),
      title: 'Tags et navigation',
      body: 'Essayez de cliquer sur un tag pour filtrer les posts associés. Chaque post a aussi une page de détail.',
      tags: ['tags', 'router'],
      createdAt: Date.now() - 1000 * 60 * 60,
      updatedAt: Date.now() - 1000 * 60 * 60,
    },
  ]
}

export function readPosts() {
  const raw = localStorage.getItem(STORAGE_KEY)
  const parsed = safeJsonParse(raw, null)

  if (!Array.isArray(parsed) || parsed.length === 0) {
    const seeded = seedPosts()
    writePosts(seeded)
    return seeded
  }

  return parsed
}

export function writePosts(posts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
}

export function getPostById(id) {
  const posts = readPosts()
  return posts.find((p) => String(p.id) === String(id)) ?? null
}

export function createPost({ title, body, tags }) {
  const now = Date.now()
  const post = {
    id: generateId(),
    title: String(title ?? '').trim(),
    body: String(body ?? '').trim(),
    tags: normalizeTags(tags),
    createdAt: now,
    updatedAt: now,
  }

  const posts = readPosts()
  writePosts([post, ...posts])
  return post
}

export function updatePost(id, { title, body, tags }) {
  const posts = readPosts()
  const idx = posts.findIndex((p) => String(p.id) === String(id))
  if (idx === -1) return null

  const existing = posts[idx]
  const updated = {
    ...existing,
    title: String(title ?? existing.title).trim(),
    body: String(body ?? existing.body).trim(),
    tags: tags === undefined ? existing.tags : normalizeTags(tags),
    updatedAt: Date.now(),
  }

  const next = [...posts]
  next[idx] = updated
  writePosts(next)
  return updated
}

export function deletePost(id) {
  const posts = readPosts()
  const next = posts.filter((p) => String(p.id) !== String(id))
  writePosts(next)
  return next.length !== posts.length
}
