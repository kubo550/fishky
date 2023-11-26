<script setup lang="ts">
import type { PropType } from 'vue'
import { ref } from 'vue'
import { apiClient } from '@/lib/api-client'

const { text } = defineProps({
  text: {
    type: String,
    required: true
  },
  onSave: {
    type: Function as PropType<(newText: string) => void>,
    required: false,
    default: () => {}
  }
})

const phrases = ref<{ id: string; phrase: string }[]>([])

;(async () => {
  phrases.value = await apiClient.getPhrases(text)
})()

const removePhrase = (id: string) => {
  phrases.value = phrases.value.filter((p) => p.id !== id)
}

const mergePhraseWithPrev = (id: string) => {
  const index = phrases.value.findIndex((p) => p.id === id)
  if (index === 0) return
  phrases.value[index - 1].phrase = `${phrases.value[index - 1].phrase} ${
    phrases.value[index].phrase
  }`
  removePhrase(id)
}

const mergePhraseWithNext = (id: string) => {
  const index = phrases.value.findIndex((p) => p.id === id)
  if (index === phrases.value.length - 1) return
  phrases.value[index + 1].phrase = `${phrases.value[index].phrase} ${
    phrases.value[index + 1].phrase
  }`
  removePhrase(id)
}
</script>

<template class="container">
  <div v-for="phrase in phrases" :key="phrase.id">
    <div class="phrase">
      <p>{{ phrase.phrase }}</p>
      <div class="buttons">
        <button @click="mergePhraseWithPrev(phrase.id)">Merge with prev</button>
        <button @click="mergePhraseWithNext(phrase.id)">Merge with next</button>
        <button @click="removePhrase(phrase.id)">Remove</button>
      </div>
    </div>
  </div>

  <button @click="$emit('onButtonClick', phrases)">Next</button>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  gap: 1rem;
}

p {
  margin-bottom: 1rem;
}

.phrase {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.buttons {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
</style>
