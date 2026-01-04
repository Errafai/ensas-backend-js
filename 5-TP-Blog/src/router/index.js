import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import CreatePostView from '../views/CreatePostView.vue'
import PostDetailView from '../views/PostDetailView.vue'
import TagView from '../views/TagView.vue'
import EditIndexView from '../views/EditIndexView.vue'
import EditPostView from '../views/EditPostView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/create', name: 'createPost', component: CreatePostView },
    { path: '/posts/:id', name: 'postDetail', component: PostDetailView, props: true },
    { path: '/tags/:tag', name: 'tag', component: TagView, props: true },
    { path: '/edit', name: 'editIndex', component: EditIndexView },
    { path: '/edit/:id', name: 'editPost', component: EditPostView, props: true },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

export default router
