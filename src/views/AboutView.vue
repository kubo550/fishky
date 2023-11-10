<script setup lang="ts">
import { ref } from 'vue'
import type { FlashcardType } from '@/lib/types'
import FlashCards from '@/components/flash-cards.vue'
import UploadImage from '@/components/UploadImage.vue'
import UploadText from '@/components/UploadText.vue'
import WordSelector from '@/components/WordSelector.vue'
enum AppState {
  UploadImage = 'upload-image',
  UploadText = 'upload-text',
  AnalyzeText = 'analyze-text',
  Translate = 'translate',
  Flashcards = 'flashcards'
}

const appState = ref<AppState>(AppState.UploadText)
const text = ref('')
const flashcards = ref<FlashcardType[]>([])

const setText = (newText: string) => {
  text.value = newText
}
const setFlashcards = (newFlashcards: FlashcardType[]) => {
  flashcards.value = newFlashcards
}
</script>

<template class="container">
  <h1>Create Your Fishky Cards</h1>

  <div class="">
    <button @click="appState = AppState.UploadImage">Img</button>
    <button @click="appState = AppState.UploadText">Text</button>
    <button @click="appState = AppState.AnalyzeText" :disabled="!text.length">Analyze</button>
    <button @click="appState = AppState.Translate" :disabled="!text.length">Translate</button>
  </div>

  <Suspense v-if="appState === AppState.UploadImage" timeout="0">
    <UploadImage :set-text="setText" :on-next="() => (appState = AppState.UploadText)" />

    <template #fallback> Loading...</template>
  </Suspense>

  <UploadText
    v-if="appState === AppState.UploadText"
    :text="text"
    :setFlashcards="setFlashcards"
    :on-next="() => (appState = AppState.AnalyzeText)"
  />

  <Suspense v-if="appState === AppState.AnalyzeText" timeout="0">
    <WordSelector :text="text" />

    <template #fallback> Loading...</template>
  </Suspense>

  <FlashCards v-if="appState === AppState.Translate" :flashcards="flashcards" />
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-width: 500px;
}

h1 {
  font-size: 2rem;
  font-weight: 500;
  color: #333;
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
</style>
