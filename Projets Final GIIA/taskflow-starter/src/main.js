import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { auth } from './firebase/config'
import { onAuthStateChanged } from 'firebase/auth'

let app

onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App)
    app.use(createPinia())
    app.use(router)
    app.mount('#app')
  }
})