<script setup lang="ts">
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { emailRules, passwordRules } from '@/lib/utils'

const router = useRouter()
const email = ref('')
const password = ref('')
const isLoggingIn = ref(false)
const isError = ref(false)

const auth = getAuth()
const login = async () => {
  isLoggingIn.value = true
  isError.value = false

  try {
    await signInWithEmailAndPassword(auth, email.value, password.value)
    await router.push('/')
  } catch (error) {
    email.value = ''
    password.value = ''

    isError.value = true
    console.error(error)
  } finally {
    isLoggingIn.value = false
  }
}

const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider()
  try {
    await signInWithPopup(auth, provider)
    await router.push('/')
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <v-form fast-fail @submit.prevent class="pa-4 my-12 mx-auto w-100">
    <h3 class="text-h4 text-center mb-10">Sign in</h3>

    <v-text-field
      v-model="email"
      :rules="emailRules"
      type="email"
      label="Email"
      placeholder="johndoe@example.com"
      class="my-4"
    ></v-text-field>

    <v-text-field
      v-model="password"
      :rules="passwordRules"
      type="password"
      label="Password"
      placeholder="*****"
      class="my-4"
    ></v-text-field>

    <v-btn
      color="orange-accent-2"
      class="mt-4"
      type="submit"
      block
      @click="login"
      :disabled="isLoggingIn || !email || !password"
    >
      {{ isLoggingIn ? 'Logging in...' : 'Login' }}
    </v-btn>

    <v-btn color="orange-accent-2" class="mt-4" block @click="signInWithGoogle">
      Sign in with Google
    </v-btn>

    <div class="text-md-center text-center text-red-500 mt-4 font-semibold italic invalid">
      {{ isError ? 'Invalid email or password' : '' }}
    </div>
  </v-form>
</template>

<style scoped>
input {
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  font-size: 1rem;
}

button {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 0;
  background-color: #009d3f;
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
}

.container {
  max-width: 460px;
  margin: 0 auto;

  min-width: 320px;
  display: flex;
  flex-direction: column;

  input {
    margin-bottom: 1rem;
    width: 100%;
  }
}

.invalid {
  color: rgb(209, 109, 127);
}
</style>
