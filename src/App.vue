<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'

const auth = getAuth()
const router = useRouter()

const user = ref(auth.currentUser)

onMounted(() => {
  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser
  })
})

const logout = async () => {
  await signOut(auth)
  await router.push('/')
}
</script>

<template>
  <div class="container">
    <header>
      <div class="wrapper">
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/create">Create</RouterLink>

          <RouterLink to="/register" v-if="!user">Register</RouterLink>
          <RouterLink to="/login" v-if="!user">Login</RouterLink>

          <button v-if="user" @click="logout">Logout</button>
        </nav>
      </div>
    </header>

    <div class="content-wrapper">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a {
  color: #333;
}

nav a.router-link-exact-active {
  color: #fda428;
}

nav a.router-link-exact-active:hover {
  color: rgba(253, 164, 40, 0.86);
}

nav a:hover {
  color: rgba(253, 164, 40, 0.86);
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  background-color: transparent;
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    width: 100vw;
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}

.content-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
