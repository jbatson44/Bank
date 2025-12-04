<template>
  <div>
    <div class="input-section">
      <input
        v-model="playerInput"
        type="text"
        placeholder="Enter player name"
        @keydown="handleKeydown"
      />
      <button @click="addPlayer">Add Player</button>
    </div>

    <div v-if="players.length > 0" class="players-section">
      <h2>Players ({{ players.length }})</h2>
      <ul>
        <li v-for="(player, index) in players" :key="index">
          {{ player }}
          <button @click="removePlayer(index)">Remove</button>
        </li>
      </ul>
    </div>

    <p v-else>No players added yet</p>

    <select v-model="selectedRounds">
      <option v-for="rounds in roundOptions" :key="rounds" :value="rounds">
        {{ rounds }}
      </option>
    </select>

    <button v-if="players.length > 0" v-on:click="startGame()">Start Game</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useGlobalStore } from '@/stores/globalStore'

const globalStore = useGlobalStore();
const playerInput = ref('')
const players = ref<string[]>([])
const roundOptions = ref<number[]>([10, 15, 20])
const selectedRounds = ref<number>(10)

const addPlayer = () => {
  if (playerInput.value.trim()) {
    players.value.push(playerInput.value.trim())
    playerInput.value = ''
  }
}

const removePlayer = (index: number) => {
  players.value.splice(index, 1)
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    addPlayer()
  }
}

function startGame() {
  globalStore.startGame(players.value, selectedRounds.value);
}
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