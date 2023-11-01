<script setup lang="ts">
import { ref } from 'vue'
import Flashcards from '@/components/Flashcards.vue'
const flashcards = ref<string[][]>([
  ['Pies', 'Dog'],
  ['Kot', 'Cat']
])
</script>

<template>
  <div class="wrapper">
    <h1>Insert Here your words</h1>

    <Flashcards :flashcards="flashcards" />

    <RouterLink to="/saved">Save</RouterLink>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
}
</style>
