<script setup lang="ts">
import { ref } from 'vue'
import Flashcards from '@/components/flash-cards.vue'

export type FlashcardType = {
  id: string
  term: string
  meaning: string
}

const flashcards = ref<FlashcardType[]>([
  {
    id: '1',
    term: 'Hello',
    meaning: 'Cześć'
  }
])
</script>

<template>
  <div class="wrapper">
    <h1>Insert Here your words</h1>

    <Flashcards :flashcards="flashcards" />
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

h1 {
  font-size: 2rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 2rem;
}
</style>
