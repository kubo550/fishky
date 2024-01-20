<script setup lang="ts">
import type { PropType } from 'vue'
import type { Phrase } from '@/lib/types'

const { phrases } = defineProps({
  phrases: {
    type: Array as PropType<Phrase[]>,
    required: true
  }
})

const emit = defineEmits<{
  (e: 'onPhraseAdd'): void
  (e: 'onPhraseDelete', id: string): void
  (e: 'onPrepare'): void
}>()
</script>

<template>
  <div class="phrases">
    <div v-for="(phrase, index) in phrases" :key="phrase.id" class="phrase">
      <v-text-field
        class="phrase__phrase-input"
        v-model="phrase.phrase"
        :label="`Phrase ${index + 1}`"
        variant="filled"
        type="text"
      ></v-text-field>

      <v-text-field
        class="phrase__meaning-input"
        v-model="phrase.meaning"
        :label="`Meaning ${index + 1}`"
        variant="filled"
        type="text"
        :append-icon="'mdi-delete'"
        @click:append="emit('onPhraseDelete', phrase.id)"
      ></v-text-field>
    </div>

    <v-btn class="add-phrase-button" variant="outlined" @click="emit('onPhraseAdd')">
      <v-icon icon="mdi-plus" class="button__icon"></v-icon>
      Add Phrase
    </v-btn>
  </div>

  <v-btn variant="outlined" class="save-button" @click="emit('onPrepare')">
    <v-icon icon="mdi-translate" class="button__icon"></v-icon>
    Summarize
  </v-btn>
</template>

<style scoped>
.phrases {
  margin-top: 8px;
  display: grid;
  grid-template-columns: 550px;
  gap: 4px 16px;
}

.phrase {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.phrase__phrase-input {
  width: 100%;
}

.phrase__meaning-input {
  width: 100%;
  margin: 0 0 0 16px;
}

.button__icon {
  display: block;
  margin-right: 8px;
  height: auto;
}

.save-button {
  margin-top: 20px;
}
</style>
