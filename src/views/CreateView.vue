<script setup lang="ts">
import UploadImage from '@/components/UploadImage.vue'
import UploadText from '@/components/UploadText.vue'
import WordSelector from '@/components/WordSelector.vue'
import { apiClient } from '@/lib/api-client'
import type { Phrase } from '@/lib/types'
import { ref } from 'vue'
import _ from 'lodash'
enum AppState {
  UploadImage = 'upload-image',
  UploadText = 'upload-text',
  AnalyzeText = 'analyze-text',
  Translate = 'translate',
  Flashcards = 'flashcards'
}

const appState = ref<AppState>(AppState.UploadText)
const text = ref('')
const phrases = ref<Phrase[]>([])
const getPhrasesButtonLoading = ref<boolean>(false)

const setText = (newText: string) => {
  text.value = newText
}

const getPhrasesHandler = async () => {
  getPhrasesButtonLoading.value = true
  await getPhrases()
  appState.value = AppState.AnalyzeText
  getPhrasesButtonLoading.value = false
}

const getPhrases = async () => {
  phrases.value = await apiClient.getPhrases(text.value)
}

const onPhraseDeleteHandler = (id: string) => {
  phrases.value = phrases.value.filter((phrase) => phrase.id !== id)
}

const onPhraseAddHandler = () => {
  if (_.last(phrases.value)?.phrase?.trim() === '') return
  phrases.value = [...phrases.value, { id: Math.random().toString(), phrase: '' }]
}
</script>

<template class="container">
  <h1>Create Your Fishky Cards</h1>

  <div class="main__buttons">
    <v-btn
      variant="outlined"
      :active="appState === AppState.UploadImage"
      @click="appState = AppState.UploadImage"
    >
      <v-icon icon="mdi-image" class="main__buttons__icon"></v-icon>
      Img
    </v-btn>
    <v-btn
      variant="outlined"
      :active="appState === AppState.UploadText"
      @click="appState = AppState.UploadText"
    >
      <v-icon icon="mdi-text-box" class="main__buttons__icon"></v-icon>
      Text
    </v-btn>
    <v-btn
      variant="outlined"
      :active="appState === AppState.AnalyzeText"
      @click="appState = AppState.AnalyzeText"
      :disabled="!phrases.length"
    >
      <v-icon icon="mdi-poll" class="main__buttons__icon"></v-icon>
      Analyze
    </v-btn>
    <v-btn
      variant="outlined"
      :active="appState === AppState.Translate"
      @click="appState = AppState.Translate"
      :disabled="!phrases.length"
    >
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
    :get-phrases-button-loading="getPhrasesButtonLoading"
    @on-get-phrases="getPhrasesHandler"
    @on-change="setText"
  />

  <Suspense v-if="appState === AppState.AnalyzeText" timeout="0">
    <WordSelector
      :phrases="phrases"
      @on-phrase-delete="onPhraseDeleteHandler"
      @on-phrase-add="onPhraseAddHandler"
    />
    <template #fallback>Loading...</template>
  </Suspense>

  <!-- <FlashCards v-if="appState === AppState.Translate" :flashcards="flashcards" /> -->
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
