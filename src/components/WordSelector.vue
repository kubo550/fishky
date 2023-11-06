<script setup lang="ts">
import { ref } from 'vue'
import { extractPhrasesFromText, premiumExtractPhrasesFromText } from '@/lib/utils'

const { text } = defineProps({
  text: {
    type: String,
    required: true
  }
})

const phrases = ref<{ id: string; phrase: string }[]>(await premiumExtractPhrasesFromText(text))

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
const hoveredPhrase = ref<string | null>(null)

const handleMouseEnter = (phraseId: string) => {
  hoveredPhrase.value = phraseId
}

const handleMouseLeave = () => {
  hoveredPhrase.value = null
}

console.log({ hoveredPhrase: hoveredPhrase.value })
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
  <p>Now select phrases that you want to create flashcards for</p>

  <div class="gird">
    <p class="preview">
      <span v-for="phrase in phrases" :key="phrase.id">
        <span
          :id="phrase.id"
          :style="{ backgroundColor: hoveredPhrase === phrase.id ? 'yellow' : 'transparent' }"
          class="display-phrase"
          >{{ phrase.phrase }}</span
        >
        <span>{{ ' ' }}</span>
      </span>
    </p>

    <div v-for="phrase in phrases" :key="phrase.id">
      <div
        class="phrase"
        @mouseenter="() => handleMouseEnter(phrase.id)"
        @mouseleave="() => handleMouseLeave()"
      >
        <p>{{ phrase.phrase }}</p>
        <div class="buttons">
          <button @click="mergePhraseWithPrev(phrase.id)">Merge with prev</button>
          <button @click="mergePhraseWithNext(phrase.id)">Merge with next</button>
          <button @click="removePhrase(phrase.id)">Remove</button>
        </div>
      </div>
    </div>
  </div>
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

.display-phrase {
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  border-bottom: 1px solid var(--color-green);
}
</style>
