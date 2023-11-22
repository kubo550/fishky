<script setup lang="ts">
import type { PropType } from 'vue'
// import PenPlus from 'vue-material-design-icons/PenPlus.vue'
// import BasketUnfill from 'vue-material-design-icons/BasketUnfill.vue'

import { ref } from 'vue'
import type { FlashcardType } from '@/lib/types'
import Flashcard from '@/components/flash-card.vue'

const props = defineProps({
  flashcards: {
    type: Array as PropType<FlashcardType[]>,
    required: true
  }
})

const currentFlashcards = ref(props.flashcards)

const addEmptyFlashcard = () => {
  currentFlashcards.value.push({ id: Math.random().toString(), term: '', meaning: '' })
}
const deleteFlashcard = (id: string) => {
  currentFlashcards.value = currentFlashcards.value.filter((flashcard) => flashcard.id !== id)
}

const removeEmptyFlashcards = () => {
  currentFlashcards.value = currentFlashcards.value.filter(
    (flashcard) => flashcard.term.trim() !== ''
  )
}
</script>

<template>
  <div class="container">
    <div v-for="(flashcard, index) in currentFlashcards" :key="flashcard.id">
      <Flashcard :flashcard="flashcard" :index="index" :deleteFlashcard="deleteFlashcard" />
    </div>

    <div class="buttonContainer">
      <button @click="removeEmptyFlashcards">
        <!-- <BasketUnfill /> -->
        Remove Empty Flashcards
      </button>

      <button @click="addEmptyFlashcard">
        <!-- <PenPlus /> -->
        Add Flashcard
      </button>
    </div>
  </div>
</template>

<style scoped>
.buttonContainer {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}
button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: 1px solid #333;
  border-radius: 4px;
  padding: 0.5rem;
  margin-top: 0.5rem;
  background-color: #333;
  color: #fff;
  cursor: pointer;
}
</style>
