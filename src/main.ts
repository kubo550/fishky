import './assets/main.css'
import 'vue3-toastify/dist/index.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'
import { initializeApp } from 'firebase/app'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  components,
  directives
})

const firebaseConfig = {
  apiKey: import.meta.env.VITE_NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'notefy-bae5d.firebaseapp.com',
  projectId: 'notefy-bae5d',
  storageBucket: 'notefy-bae5d.appspot.com',
  messagingSenderId: '711187894225',
  appId: import.meta.env.VITE_NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: 'G-56LLHWH1WC'
}

initializeApp(firebaseConfig)

const app = createApp(App)

app.use(Vue3Toastify, {
  autoClose: 3000
} as ToastContainerOptions)
app.use(router)
app.use(vuetify)
app.mount('#app')
