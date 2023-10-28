<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <main>
    <h1>Add words to your custom <span> flashcards </span></h1>
    <p>
      Flashcards are nothing but lightning bolts in the world of learning. You simply show them to
      your brain, and it goes "BOOM" - information gets absorbed faster than light rays into a black
      hole!
    </p>

    <RouterLink to="/about">
      <button>Get Started</button>
    </RouterLink>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
}

h1 {
  font-size: 2rem;
  font-weight: 500;
  color: #333;
}

span {
  color: #009d3f;
}

p {
  font-size: 1.2rem;
  color: #666;
  margin-top: 1rem;
  text-align: center;
}

a {
  margin-top: 2rem;
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
</style>
