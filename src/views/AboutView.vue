<script>
import { defineComponent, ref } from 'vue'
import { parseCsv } from '@/lib/utils'

// todo: move to composition api
export default defineComponent({
  name: 'HomeView',
  setup() {
    // todo: use FlashcardType
    const flashcard = ref([])

    const handleFile = (e) => {
      const file = e.target?.files?.[0]
      if (!file || (file.type !== 'text/csv' && file.type !== 'application/json')) {
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        flashcard.value = parseCsv(e.target.result)
      }
      reader.readAsText(file)
    }

    return {
      handleFile,
      flashcard
    }
  }
})
</script>

<template>
  <div class="container">
    <h1>Flashcards</h1>
    <input type="file" @change="handleFile" />
    <div v-for="item in flashcard" :key="item[0]">
      <input type="text" disabled :value="item[0]" />
      <input type="text" :value="item[1]" />
    </div>
    <RouterLink to="/saved">Save</RouterLink>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
}

h1 {
  font-size: 2rem;
  font-weight: 500;
  color: #333;
}

span {
  color: #009d3f;
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
</style>
