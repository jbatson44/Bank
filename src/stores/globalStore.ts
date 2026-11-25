import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Player } from '@/models/Player'

export const useGlobalStore = defineStore('globalStore', () => {
  const isGameStarted = ref(false);
  const numberOfRounds = ref(0);
  const playerList = ref<Player[]>([]);
  const punishingEnabled = ref(false);

  function startGame(players: string[], rounds: number, punishing: boolean) {
    isGameStarted.value = true;
    playerList.value = players.map(n => ({
      name: n,
      score: 0,
      banked: false
    }));
    numberOfRounds.value = rounds;
    punishingEnabled.value = punishing;
  }
  function cancelGame() {
    isGameStarted.value = false;
    playerList.value = [];
    numberOfRounds.value = 10;
  }

  return { isGameStarted, startGame, numberOfRounds, playerList, cancelGame, punishingEnabled };
})
