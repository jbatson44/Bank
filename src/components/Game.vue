<template>
  <div>
    <h4>Round: {{ currentRound }}/{{ globalStore.numberOfRounds }}</h4>
    <div class="players-section">
      <h2>Players </h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(player, index) in players" :key="index">
            <td>{{ player.name }}</td>
            <td>{{ player.score }}</td>
            <td><button v-on:click="bankScore(player)" :hidden="isBanked(player)">Bank</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <h4>Current Score: {{ currentScore }} | {{ playersNotBanked[currentPlayerIndex]?.name }}'s Turn</h4>
    <div class="score-grid">
      <button
          v-for="score in scoreOptions"
          :key="score"
          class="score-btn"
          :disabled="isDisabled(score)"
          @click="addScore(score)"
          :class="{ 'danger-btn': isDanger(score) }"
        >
          {{ score }}
      </button>
    </div>
    
    <button v-if="players.length > 0" v-on:click="globalStore.cancelGame()">Cancel Game</button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useGlobalStore } from '@/stores/globalStore'
import type { Player } from '@/models/Player'

const globalStore = useGlobalStore();
let currentRound = 1;
let currentScore = ref(0);
let roll = 1;
let currentPlayerIndex = 0;
const scoreOptions = ["2","3","4","5","6","7","8","9","10","11",'12',"Doubles"]
const players = globalStore.playerList;
const playersNotBanked = computed(() => players.filter(p => !p.banked));
let lastPlayerToRoll = ref<Player>();

function bankScore(player: Player) {
  var isBankingPlayersTurnToRoll = playersNotBanked.value.findIndex(p => p === player) === currentPlayerIndex;
  if (isBankingPlayersTurnToRoll) {
    nextPlayerTurn();
  }
  player.score += currentScore.value; 
  player.banked = true;

  if (playersNotBanked.value.length === 0) {
    endRound();
  } 
}

function nextPlayerTurn() {
  currentPlayerIndex = (currentPlayerIndex + 1) % playersNotBanked.value.length;
  console.log("nextPlayerTurn " + currentPlayerIndex);
}

function isDanger(score: string) {
  return score === "7" && roll > 3;
}

function isBanked(player: Player) {
  return player.banked;
}

function addScore(score: string) {
  var player = playersNotBanked.value[currentPlayerIndex];
  lastPlayerToRoll.value = player;
  switch(score) {
    case "Doubles":
      currentScore.value *= 2;
      break;
    case"7":
      if (roll <= 3) {
        currentScore.value += 70; 
        break;
      }
      endRound();
      return;
    default:
      currentScore.value += parseInt(score);
  }
  nextPlayerTurn();
  roll++;
}

function isDisabled(score: string) {
  switch(score) {
    case "Doubles":
      return roll < 4;
    case "2":
    case "12":
      return roll > 3;
    default:
      return false;
  }
}

function endRound() {
  currentRound++;
  currentScore.value = 0; 
  roll = 1;
  players.forEach(p => p.banked = false);
  // next round, the player that comes after the last roller should start
  currentPlayerIndex = players.findIndex(p => p === lastPlayerToRoll.value)
  console.log("last player to roll index in players: " + currentPlayerIndex);
  nextPlayerTurn();
  if (currentRound > globalStore.numberOfRounds) {
    alert('Game Over!');
    globalStore.cancelGame();
  }
}

</script>

<style scoped>
.score-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr)); /* responsive */
  max-width: 500px; /* about 5 × 100px columns */
  gap: 10px;
}
.danger-btn {
  background-color: red !important;
  color: white;
}
.score-btn {
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: #fafafa;
  cursor: pointer;
}
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