<script setup lang="ts">
import {
  getAuth,
  createUserWithEmailAndPassword,
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

const auth = getAuth()
const register = async () => {
  isLoggingIn.value = true
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value)
    await router.push('/create')
    isLoggingIn.value = false
  } catch (error) {
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
  <v-form fast-fail @submit.prevent class="pa-4 my-12 mx-auto container">
    <h3 class="text-h4 text-center mb-10">Sign up</h3>

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
      @click="register"
      :disabled="isLoggingIn || !email || !password"
    >
      {{ isLoggingIn ? 'Registering...' : 'Register' }}
    </v-btn>

    <v-btn color="orange-accent-2" class="mt-4" block @click="signInWithGoogle">
      Sign up with Google
    </v-btn>
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
</style>
