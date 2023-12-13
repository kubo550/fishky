<script setup lang="ts">
import type { Phrase } from '@/lib/types'
import type { PropType } from 'vue'

const { phrases, translatingPhrases } = defineProps({
  phrases: {
    type: Array as PropType<Phrase[]>,
    required: true
  },
  translatingPhrases: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits<{
  (e: 'onPhraseAdd'): void
  (e: 'onPhraseDelete', id: string): void
  (e: 'onTranslatePhrases'): void
}>()
</script>

<template>
  <div class="phrases">
    <div v-for="(phrase, index) in phrases" :key="phrase.id" class="phrase">
      <v-text-field
        v-model="phrase.phrase"
        :label="`Phrase ${index + 1}`"
        :append-icon="'mdi-delete'"
        variant="filled"
        type="text"
        @click:append="emit('onPhraseDelete', phrase.id)"
      ></v-text-field>
    </div>

    <v-btn class="add-phrase-button" variant="outlined" @click="emit('onPhraseAdd')">
      <v-icon icon="mdi-plus" class="add-phrase-button__icon"></v-icon>
      Add Phrase
    </v-btn>
  </div>

  <v-btn
    variant="outlined"
    :disabled="translatingPhrases"
    @click="emit('onTranslatePhrases')"
    class="translate-button"
  >
    <template v-if="!translatingPhrases">
      <v-icon icon="mdi-translate" class="translate-button__icon"></v-icon>
      Translate phrases
    </template>
    <v-progress-circular v-else indeterminate :size="20" :width="2"></v-progress-circular>
  </v-btn>
</template>

<style scoped>
.phrases {
  margin-top: 8px;
  display: grid;
  grid-template-columns: repeat(3, 250px);
  gap: 4px 16px;
}

.phrase {
  width: 100%;
  display: flex;
  align-items: center;
}

.translate-button {
  width: 220px;
}

.translate-button__icon {
  display: block;
  margin-right: 8px;
  height: auto;
}
.add-phrase-button {
  margin-top: 10px;
  width: 150px;
}

.add-phrase-button__icon {
  display: block;
  margin-right: 8px;
  height: auto;
}
</style>
