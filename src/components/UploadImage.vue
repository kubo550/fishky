<script setup lang="ts">
import type { PropType } from 'vue'
import { ref } from 'vue'
import type { FlashcardType } from '@/lib/types'
import { createWorker } from 'tesseract.js'
import WordSelector from '@/components/WordSelector.vue'

const isLoading = ref(false)
const error = ref<string | null>(null)
const text = ref('')
const editMode = ref(false)
const imageProgress = ref(0)

const worker = await createWorker({
  logger: (m) => {
    console.log(m)
    imageProgress.value = m.progress
  }
})

const { setFlashcards } = defineProps({
  setFlashcards: {
    type: Function as PropType<(newFlashcards: FlashcardType[]) => void>,
    required: true
  }
})

async function extractTextFromImage(image: string) {
  await worker.loadLanguage('eng')
  await worker.initialize('eng')
  const {
    data: { text }
  } = await worker.recognize(image)

  await worker.terminate()
  return text
}

const handleUploadFile = (e: Event) => {
  // @ts-ignore
  const file = e.target?.files?.[0]
  if (!file || (file.type !== 'image/png' && file.type !== 'image/jpeg')) {
    alert('Invalid file')
    return
  }

  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = async () => {
    isLoading.value = true
    imageProgress.value = 0

    error.value = null
    try {
      text.value = await extractTextFromImage(file)
      editMode.value = true
    } catch (e) {
      error.value = 'Error while extracting text from image'
    } finally {
      isLoading.value = false
    }

    isLoading.value = false
  }
}
</script>

<template>
  <p>Here you can upload your image with text in different languages.</p>
  <p>
    We will try to extract text from it and translate it to your native language and create
    flashcards for you.
  </p>

  <p>
    Download template file to see how it should look like in order to upload it correctly
    <a href="/template-image.png" download>download</a>
  </p>

  <input type="file" accept="image/png, image/jpeg" @change="handleUploadFile" />

  <!--  TODO: -->
  <!--  <p>or</p>-->
  <!--  <button>Take a photo</button>-->

  <div v-if="isLoading">
    <p>Extracting text from image...</p>
    <progress :value="imageProgress" max="1" />
  </div>
  <div v-if="error">Error: {{ error }}</div>

  <div v-if="text.length && editMode">
    <p>
      Check if the text is correct and then click on the button below to navigate to the next step
    </p>

    <textarea v-model="text" />

    <button @click="editMode = false">Next</button>
  </div>

  <WordSelector v-if="text.length && !editMode" :text="text" />
</template>

<style scoped>
p {
  margin-bottom: 1rem;
}

textarea {
  width: 100%;
  height: 200px;
  border: 1px solid #333;
  border-radius: 4px;
  padding: 0.5rem;
  margin-top: 0.5rem;
}
</style>
