<script setup lang="ts">
import TrashCan from 'vue-material-design-icons/TrashCanOutline.vue'
import type { PropType } from 'vue'
import type { FlashcardType } from '@/lib/types'

defineProps({
  flashcard: {
    type: Object as PropType<FlashcardType>,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  deleteFlashcard: {
    type: Function,
    required: true
  }
})
</script>

<template>
  <div class="container">
    <label>
      Term:
      <input type="text" :value="flashcard.term" />
    </label>

    <label>
      Meaning:
      <input type="text" :value="flashcard.meaning" />
    </label>

    <button>
      <TrashCan @click="deleteFlashcard(flashcard.id)" />
    </button>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
label {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

input {
  border: 1px solid #333;
  border-radius: 4px;
  padding: 0.5rem;
  margin-top: 0.5rem;
}

input:focus {
  outline: none;
}

button {
  border: 0;
  background-color: transparent;
  color: #333;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  margin-top: 1rem;
}

button:hover {
  color: #fda428;
  cursor: pointer;
}

button svg {
  margin-right: 0.5rem;
}
</style>
