<template>
  <div class="container">
    <div v-for="(flashcard, index) in currentFlashcards" :key="flashcard[0]">
      <label>
        Word:
        <input type="text" :value="flashcard[0]" />
      </label>
      <label>
        Translation:
        <input type="text" :value="flashcard[1]" />
      </label>
      <TrashCan @click="deleteFlashcard(index)" />
    </div>
  </div>

  <div>
    <button @click="addEmptyFlashcard">
      <PenPlus />
      Add Flashcard
    </button>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import TrashCan from 'vue-material-design-icons/TrashCanOutline.vue'
import PenPlus from 'vue-material-design-icons/PenPlus.vue'

import { ref } from 'vue'

const props = defineProps({
  flashcards: {
    type: Array as PropType<string[][]>,
    required: true
  }
})

const currentFlashcards = ref(props.flashcards)

const addEmptyFlashcard = () => {
  currentFlashcards.value.push(['', ''])
  // TODO: focusLastFlashcard()
}
const deleteFlashcard = (index: number) => {
  currentFlashcards.value.splice(index, 1)
}
</script>

<style scoped></style>
