<script setup lang="ts">
import type { PropType } from 'vue'
import type { Phrase } from '@/lib/types'
import { ref } from 'vue'
import { apiClient } from '@/lib/api-client'
import { toast } from 'vue3-toastify'

const { phrases } = defineProps({
  phrases: {
    type: Array as PropType<Phrase[]>,
    required: true
  }
})

const isSaving = ref(false)
const error = ref<string | null>(null)
const isSaved = ref(false)

const saveFlashcardsSet = async (setName: string, flashcards: Phrase[]) => {
  try {
    error.value = null
    isSaving.value = true
    await apiClient.saveFlashcardsSet({ setName, flashcards })
    isSaving.value = false
    toast(`Flashcards set saved!`, {
      type: 'success',
      theme: 'dark',
      position: 'bottom-center',
      pauseOnHover: false
    })
    // TODO: add confetti animation
    isSaved.value = true
  } catch (e) {
    error.value = 'Something went wrong. Please try again later.'
    isSaving.value = false
  }
}

const toQuizletFormat = (flashcards: Phrase[]) => {
  return flashcards.map((flashcard) => `${flashcard.meaning}       ${flashcard.phrase}`).join('\n')
}

const copyToClipboard = (text: string) => {
  const el = document.createElement('textarea')
  el.value = text
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
}

const handleCopyToClipboard = () => {
  copyToClipboard(toQuizletFormat(phrases))
  toast(`Copied, now paste this in Quizlet`, {
    type: 'success',
    theme: 'dark',
    position: 'bottom-center',
    pauseOnHover: false
  })
}
</script>

<template>
  <v-container class="container">
    <p>You are about to save {{ phrases.length }} phrases</p>

    <v-carousel height="400" hide-delimiter-background show-arrows="hover">
      <v-carousel-item v-for="(phrase, i) in phrases" :key="i">
        <v-sheet height="100%">
          <div class="d-flex fill-height justify-center align-center flex-column">
            <div class="text-h4">{{ phrase.phrase }}</div>
            <div class="text-h6">{{ phrase.meaning }}</div>
          </div>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>

    <!--    <v-btn-->
    <!--      v-if="!isSaved"-->
    <!--      :disabled="isSaving || isSaved"-->
    <!--      variant="outlined"-->
    <!--      class="mt-4"-->
    <!--      @click="saveFlashcardsSet"-->
    <!--    >-->
    <!--      <v-icon icon="mdi-content-save" class="mr-2"></v-icon>-->
    <!--      {{ isSaving ? 'Saving...' : 'Save' }}-->
    <!--    </v-btn>-->

    <!--    <v-btn v-if="isSaved" variant="outlined" class="mt-4" @click="isSaved = false">-->
    <!--      <v-icon icon="mdi-lightbulb-on" class="mr-2"></v-icon>-->
    <!--      Go to flashcards-->
    <!--    </v-btn>-->

    <v-btn
      v-if="!isSaved"
      :disabled="isSaving || isSaved"
      variant="outlined"
      class="mt-4"
      @click="handleCopyToClipboard"
    >
      <v-icon icon="mdi-content-save" class="mr-2"></v-icon>
      Copy to clipboard
    </v-btn>
  </v-container>
</template>

<style scoped>
.container {
  margin-top: 8px;
  max-width: 660px;
  min-width: auto;
}
form {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  max-width: 460px;
}

.input {
  width: 100%;
}

.text-h4, .text-h6 {
  text-align: center;
}
</style>
