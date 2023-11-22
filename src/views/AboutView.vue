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

  <div class="main__buttons">
    <v-btn variant="outlined" @click="appState = AppState.UploadImage">
      <v-icon icon="mdi-image" class="main__buttons__icon"></v-icon>
      Img
    </v-btn>
    <v-btn variant="outlined" @click="appState = AppState.UploadText">
      <v-icon icon="mdi-text-box" class="main__buttons__icon"></v-icon>
      Text
    </v-btn>
    <v-btn variant="outlined" @click="appState = AppState.AnalyzeText" :disabled="!text.length">
      <v-icon icon="mdi-poll" class="main__buttons__icon"></v-icon>
      Analyze
    </v-btn>
    <v-btn variant="outlined" @click="appState = AppState.Translate" :disabled="!text.length">
      <v-icon icon="mdi-translate" class="main__buttons__icon"></v-icon>
      Translate
    </v-btn>
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
  gap: 16px;
}

.main__buttons {
  display: flex;
  gap: 8px;
  margin-top: 8px;
  margin-bottom: 8px;
}

.main__buttons__icon {
  display: block;
  margin-right: 8px;
  height: auto;
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
