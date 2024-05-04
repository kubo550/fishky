<template>
  <v-sheet class="container">
    <v-form fast-fail @submit.prevent class="pa-4 my-12 mx-auto w-100">
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
        class="mt-4"
        type="submit"
        block
        @click="register"
        :disabled="isLoggingIn || !email || !password"
      >
        {{ isLoggingIn ? 'Registering...' : 'Register' }}
      </v-btn>

      <v-btn class="mt-4" block @click="signInWithGoogle"> Sign up with Google </v-btn>
    </v-form>
  </v-sheet>
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

<script setup>
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const isLoggingIn = ref(false)

const emailRules = [
  (v) => !!v || 'Email is required',
  (v) => /.+@.+\..+/.test(v) || 'Email must be valid'
]
const passwordRules = [
  (v) => !!v || 'Password is required',
  (v) => v.length >= 6 || 'Password must be at least 6 characters'
]

const auth = getAuth()
const register = async () => {
  isLoggingIn.value = true
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value)
    await router.push('/create')
    isLoggingIn.value = false
  } catch (error) {
    isLoggingIn.value = false
    console.error(error)

    alert(error.message)
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
