<template>
  <div>
    <h4>Round: {{ currentRound }}/{{ globalStore.numberOfRounds }}</h4>
    <div class="players-section">
      <h2>Players ({{ players.length }})</h2>
      <ul>
        <li v-for="(player, index) in players" :key="index">
          {{ player.name }}
          {{ player.score }}
        </li>
      </ul>
    </div>
    
    <button v-if="players.length > 0" v-on:click="globalStore.cancelGame()">Cancel Game</button>
  </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from '@/stores/globalStore'

const globalStore = useGlobalStore();
let currentRound = 1;
const players = globalStore.playerList;

</script>

<style scoped>
.input-section {
  margin-bottom: 2rem;
  display: flex;
  gap: 0.5rem;
}

input {
  padding: 0.5rem;
  font-size: 1rem;
  flex: 1;
}

button {
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;
}

.players-section {
  margin-top: 2rem;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  margin: 0.5rem 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>