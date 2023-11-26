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
  <div class="upload-text__container">
    <v-textarea
      :model-value="text"
      @input="onChange(text)"
      label="Text"
      variant="outlined"
      rows="20"
      class="upload-text__textarea"
    ></v-textarea>
    <v-btn variant="outlined" @click="onNext">
      next
      <v-icon icon="mdi-arrow-right" class="upload-text_button-icon"></v-icon>
    </v-btn>
  </div>
</template>

<style scoped>
.upload-text__textarea {
  width: 30vw;
}

.upload-text_button-icon {
  display: block;
  height: auto;
  margin-left: 8px;
}
</style>
