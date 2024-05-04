import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import HomeView from '../views/HomeView.vue'
import CreateView from '../views/CreateView.vue'
import LearnView from '@/views/LearnView.vue'
import RegisterView from '@/views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue'
import FlashCardsView from '@/views/FlashCardsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/create',
      name: 'create',
      component: CreateView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/learn',
      name: 'learn',
      component: LearnView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/sets',
      name: 'flashcards',
      component: FlashCardsView
    },
    {
      path: '/sets/:id',
      name: 'learn',
      component: LearnView
    }
  ]
})

const getCurrentUser = () => {
  return new Promise((resolve) => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe()
      resolve(user)
    })
  })
}

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!(await getCurrentUser())) {
      next({
        name: 'login'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
