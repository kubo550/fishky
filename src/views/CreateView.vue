<script setup lang="ts">
import UploadImage from '@/components/UploadImage.vue'
import UploadText from '@/components/UploadText.vue'
import WordSelector from '@/components/WordSelector.vue'
import { apiClient } from '@/lib/api-client'
import type { Phrase } from '@/lib/types'
import { ref } from 'vue'
import _ from 'lodash'
import Translator from '@/components/Translator.vue'
import SaveFlashcards from '@/components/SaveFlashcards.vue'
enum AppState {
  UploadImage = 'upload-image',
  UploadText = 'upload-text',
  AnalyzeText = 'analyze-text',
  Translate = 'translate',
  Flashcards = 'flashcards',
  Saving = 'saving'
}

const appState = ref<AppState>(AppState.UploadText)
const text = ref('')
const phrases = ref<Phrase[]>([])
const getPhrasesButtonLoading = ref<boolean>(false)
const translatingPhrasesButtonLoading = ref<boolean>(false)

const setText = (newText: string) => {
  text.value = newText
}

const getPhrasesHandler = async () => {
  getPhrasesButtonLoading.value = true
  await getPhrases()
  appState.value = AppState.AnalyzeText
  getPhrasesButtonLoading.value = false
}

const onTranslatePhrasesHandler = async () => {
  translatingPhrasesButtonLoading.value = true
  await translatePhrases()
  appState.value = AppState.Translate
  translatingPhrasesButtonLoading.value = false
}

const isTranslateButtonDisabled = () => {
  return phrases.value.every((phrase) => !phrase.meaning)
}

const onPhraseDeleteHandler = (id: string) => {
  phrases.value = phrases.value.filter((phrase) => phrase.id !== id)
}

const onPhraseAddHandler = () => {
  if (_.last(phrases.value)?.phrase?.trim() === '') return
  phrases.value = [...phrases.value, { id: Math.random().toString(), phrase: '', meaning: '' }]
}

const getPhrases = async () => {
  phrases.value = await apiClient.getPhrases(text.value)
}

const translatePhrases = async () => {
  phrases.value = await apiClient.translatePhrases(phrases.value, 'pl')
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
      :disabled="!phrases.length"
      @click="appState = AppState.AnalyzeText"
    >
      <v-icon icon="mdi-poll" class="main__buttons__icon"></v-icon>
      Analyze
    </v-btn>
    <v-btn
      variant="outlined"
      :active="appState === AppState.Translate"
      :disabled="isTranslateButtonDisabled()"
      @click="appState = AppState.Translate"
    >
      <v-icon icon="mdi-translate" class="main__buttons__icon"></v-icon>
      Translate
    </v-btn>
  </div>

  <Suspense v-if="appState === AppState.UploadImage" timeout="0">
    <UploadImage :set-text="setText" :on-next="() => (appState = AppState.UploadText)" />

    <template #fallback>
      <p>Loading...</p>
    </template>
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
      :translatingPhrases="translatingPhrasesButtonLoading"
      @on-phrase-delete="onPhraseDeleteHandler"
      @on-translate-phrases="onTranslatePhrasesHandler"
      @on-phrase-add="onPhraseAddHandler"
    />
    <template #fallback>Loading...</template>
  </Suspense>

  <Translator
    v-if="appState === AppState.Translate"
    :phrases="phrases"
    @on-phrase-add="onPhraseAddHandler"
    @on-phrase-delete="onPhraseDeleteHandler"
    @on-prepare="() => (appState = AppState.Saving)"
  />

  <SaveFlashcards v-if="appState === AppState.Saving" :phrases="phrases" />
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
  margin-top: 16px;
  margin-bottom: 16px;
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

@media (max-width: 550px) {
  .main__buttons {
    flex-direction: column;
  }
}
</style>
