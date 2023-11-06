<script setup lang="ts">
import { ref } from 'vue'
import UploadCSV from '@/components/UploadCSV.vue'
import type { FlashcardType } from '@/lib/types'
import FlashCards from '@/components/flash-cards.vue'
import UploadImage from '@/components/UploadImage.vue'
import UploadText from '@/components/UploadText.vue'

enum UploadMethod {
  MANUAL = 'manual',
  CSV = 'csv',
  JSON = 'json',
  IMAGE = 'image',
  TEXT = 'text'
}

const flashcards = ref<FlashcardType[]>([])
const uploadMethod = ref<UploadMethod>(UploadMethod.TEXT)

const setFlashcards = (newFlashcards: FlashcardType[]) => {
  flashcards.value = newFlashcards
}
</script>

<template>
  <div class="container">
    <h1>Upload your file</h1>

    <div class="uploadMethod">
      <label>
        <input type="radio" value="image" v-model="uploadMethod" name="uploadMethod" />
        Image
      </label>

      <label>
        <input type="radio" value="text" v-model="uploadMethod" name="uploadMethod" />
        Text
      </label>

      <label>
        <input type="radio" value="csv" v-model="uploadMethod" name="uploadMethod" />
        CSV
      </label>

      <label>
        <input type="radio" value="json" v-model="uploadMethod" name="uploadMethod" />
        JSON
      </label>

      <label>
        <input type="radio" value="manual" v-model="uploadMethod" name="uploadMethod" />
        Manual
      </label>
    </div>

    <div>
      <Suspense timeout="0">
        <div v-if="uploadMethod === UploadMethod.IMAGE">
          <UploadImage :setFlashcards="setFlashcards" />
        </div>

        <template #fallback> Loading...</template>
      </Suspense>

      <div v-if="uploadMethod === UploadMethod.TEXT">
        <p>
          We will try to extract text from it and translate it to your native language and create
          flashcards for you.
        </p>
        <UploadText
          text="Pattern recognition is an activity so fundamental to human nature that it often goes unnoticed in our daily lives. It is through pattern recognition that we distinguish the faces of loved ones, understand speech, and interpret complex information from the world around us. The human brain, exceptionally adapted to seeking regularities and continuity in sensory perception, utilizes these abilities for navigation in a stimulus-rich environment. Pattern recognition enables the identification of dangers, the discovery of opportunities, as well as lifelong learning and adaptation."
          :setFlashcards="setFlashcards"
        />
      </div>
      <div v-if="uploadMethod === UploadMethod.CSV">
        <UploadCSV :setFlashcards="setFlashcards" />
      </div>

      <div v-if="uploadMethod === UploadMethod.JSON">TODO</div>

      <div v-if="uploadMethod === UploadMethod.MANUAL">TODO</div>
    </div>
  </div>

  <FlashCards v-if="flashcards.length" :flashcards="flashcards" />
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
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

.uploadMethod {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  gap: 1rem;
}
</style>
