<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getFirestore, getDocs, collection } from 'firebase/firestore'
import type { DbSet } from '../lib/types'

const allSets = ref<DbSet[] | null>(null)

const getSets = async () => {
  try {
    const db = getFirestore()
    const sets = await getDocs(collection(db, 'sets'))

    allSets.value = sets.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    })) as DbSet[]
  } catch (e) {
    console.error(e)
  }
}
getSets()
</script>

<template>
  <v-sheet class="container mt-10 p-10">
    <v-card v-for="set in allSets" class="mx-auto my-12 grid" elevation="16" max-width="344">
      <v-card-item>
        <v-card-title> {{ set.setName }}</v-card-title>

        <v-card-subtitle> {{ set.creatorEmail }}</v-card-subtitle>
      </v-card-item>

      <v-card-text>
        {{ set.flashcards.map((flashcard) => flashcard.phrase).join(', ') }}
      </v-card-text>

      <v-card-actions>
        <a :href="`/sets/${set.id}`">
          <v-btn color="primary">Learn</v-btn>
        </a>
      </v-card-actions>
    </v-card>
  </v-sheet>
</template>
<style scoped>
.container {
  width: 100vw;
  min-height: 80vh;
  display: grid;
}
.grid {
  grid-template-columns: repeat(auto-fill, minmax(344px, 1fr));
  gap: 16px;
}
</style>
