<script setup lang="ts">
import type { PropType } from 'vue'
import type { Phrase } from '@/lib/types'
import { ref } from 'vue'

const { phrases } = defineProps({
  phrases: {
    type: Array as PropType<Phrase[]>,
    required: true
  }
})
const name = ref('')

const emit = defineEmits<{
  (e: 'onSave', phrases: Phrase[], setName: string): void
}>()
</script>

<template>
  <v-container class="container">
    <p>You are about to save {{ phrases.length }} phrases</p>

    <v-form>
      <v-text-field
        v-model="name"
        label="Name"
        variant="filled"
        type="text"
        class="input"
        placeholder="Name of your flashcards set"
      ></v-text-field>
    </v-form>

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

    <v-btn variant="outlined" class="mt-4" @click="emit('onSave', phrases, name)">
      <v-icon icon="mdi-content-save"></v-icon>
      Save
    </v-btn>
  </v-container>
</template>

<style scoped>
.container {
  margin-top: 8px;
  max-width: 660px;
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
</style>
