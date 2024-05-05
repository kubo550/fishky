<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <main>
    <div class="side">
      <img src="https://i.ibb.co/MyvCDx8/OIG2-removebg-preview.png" alt="Flashcards" />
    </div>
    <div class="side">
      <h1 class="text-h4 text-sm-h3 text-md-h2">
        Fishky, Master Your Mind, One Flashcard at a Time!
      </h1>

      <p class="text-sm-body text-md-body text-lg-body">
        Fishky is more than just a flashcard app; it's your personal learning assistant, designed to
        make studying efficient, effective, and enjoyable
      </p>

      <RouterLink to="/create">
        <button>Get Started</button>
      </RouterLink>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: row;
  width: 100%;
}
.side {
  margin: 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.side img {
  width: 100%;
  max-width: 600px;
  object-fit: contain;
}
h1 {
  font-size: 3rem;
  font-weight: 500;
  color: #333;
}

span {
  color: var(--color-green);
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
button {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 0;
  background-color: #009d3f;
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
}

@media (max-width: 1214px) {
  main {
    flex-direction: column;
  }
}
</style>
