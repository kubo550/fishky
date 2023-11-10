<script setup lang="ts">
import type { PropType } from 'vue'
import { ref } from 'vue'
import type { FlashcardType } from '@/lib/types'

const { text: initialText, onChange } = defineProps({
  text: {
    type: String,
    required: false,
    default: ''
  },
  onChange: {
    type: Function as PropType<(newText: string) => void>,
    required: false,
    default: () => {}
  },
  onButtonClick: {
    type: Function as PropType<() => void>,
    required: false,
    default: () => {}
  },
  setFlashcards: {
    type: Function as PropType<(newFlashcards: FlashcardType[]) => void>,
    required: true
  },
  onNext: {
    type: Function as PropType<() => void>,
    required: false,
    default: () => {}
  }
})

const text = ref(initialText)
</script>

<template>
  <textarea v-model="text" @input="onChange(text)" />

  <button @click="onNext">Next</button>
</template>

<style scoped>
textarea {
  width: 100%;
  height: 200px;
  border: 1px solid #333;
  border-radius: 4px;
  padding: 0.5rem;
  margin-top: 0.5rem;
}
</style>
