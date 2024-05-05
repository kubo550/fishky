<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import type { DbSet } from '../lib/types'
// noinspection TypeScriptCheckImport
import vueFlashcard from 'vue-flashcard'

const router = useRouter()
const setId = router.currentRoute.value.params.id as string

const currentSet = ref<DbSet | null>(null)

const getSet = async (setId: string) => {
  try {
    const db = getFirestore()
    const setRef = doc(db, 'sets', setId)
    const setSnap = await getDoc(setRef)
    if (setSnap.exists()) {
      currentSet.value = setSnap.data() as DbSet
    } else {
      await router.push('/sets')
    }
  } catch (e) {
    console.error(e)
  }
}

getSet(setId)
</script>

<template>
  <v-sheet class="container">
    <h3 class="text-h5 text-sm-h4 text-md-h3 mb-10">{{ currentSet?.setName }}</h3>

    <v-carousel
      class="carousel"
      v-if="currentSet?.flashcards?.length"
      hide-delimiter-background
      show-arrows="hover"
    >
      <v-carousel-item class="item" v-for="(phrase, i) in currentSet?.flashcards || []" :key="i">
        <vue-flashcard :front="phrase.phrase" :back="phrase.meaning"> </vue-flashcard>
      </v-carousel-item>
    </v-carousel>
  </v-sheet>
</template>
<style scoped>
.container {
  padding: 2rem;
  max-width: 800px;
  margin: 3rem auto;
  min-width: auto;
  width: 90vw;
}

.carousel {
  max-width: 800px;
  margin: 0 auto;
  max-height: 400px;
}

.item {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
