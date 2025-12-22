import { createApp } from 'vue'
import { BootstrapVueNext } from 'bootstrap-vue-next'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

const app = createApp(App)

app.use(router)
app.use(BootstrapVueNext)

app.mount('#app')
