<script setup lang="ts">
import type { PropType } from 'vue'
import type { Phrase } from '@/lib/types'
import { ref } from 'vue'
import { toast } from 'vue3-toastify'
import { getAuth } from 'firebase/auth'
import type { User } from 'firebase/auth'

const { phrases } = defineProps({
  phrases: {
    type: Array as PropType<Phrase[]>,
    required: true
  }
})

const isSaving = ref(false)
const error = ref<string | null>(null)
const isSaved = ref(false)
const auth = getAuth()

const saveToFirestore = async (creator: User, setName: string, flashcards: Phrase[]) => {
  const data = {
    creatorId: creator.uid,
    creatorEmail: creator.email,
    setName,
    flashcards
  }

  // Save data to Firestore
}

const saveFlashcardsSet = async (setName: string, flashcards: Phrase[]) => {
  const user = auth.currentUser
  if (!user) {
    return
  }

  try {
    error.value = null
    isSaving.value = true

    isSaving.value = false
    toast(`Flashcards set saved!`, {
      type: 'success',
      theme: 'dark',
      position: 'bottom-center',
      pauseOnHover: false
    })
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
    <p>
      Absolutely! With our assistance, you've successfully created {{ phrases.length }} flashcards.
      Now you can start learning new words directly on our website or copy the flashcards and paste
      them into <a href="https://quizlet.com/857781636/autosaved">Quizlet</a>.
    </p>
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

    <v-btn
      v-if="!isSaved"
      :disabled="isSaving || isSaved"
      variant="outlined"
      class="mt-4"
      @click="saveFlashcardsSet"
    >
      Save set
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

.text-h4,
.text-h6 {
  text-align: center;
}
</style>
