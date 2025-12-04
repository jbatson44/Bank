import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Player } from '@/models/Player'

export const useGlobalStore = defineStore('globalStore', () => {
  const isGameStarted = ref(false);
  const numberOfRounds = ref(0);
  var playerList = ref<Player[]>([]);
  function startGame(players: string[], rounds: number) {
    isGameStarted.value = true;
    playerList.value = players.map(n => ({
      name: n,
      score: 0,
      banked: false
    }));
    numberOfRounds.value = rounds;
  }
  function cancelGame() {
    isGameStarted.value = false;
    playerList.value = [];
    numberOfRounds.value = 10;
  }

  return { isGameStarted, startGame, numberOfRounds, playerList,cancelGame };
})
