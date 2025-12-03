import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('globalStore', () => {
  const gameStarted = ref(false)
  function startGame() {
    gameStarted.value = true;
  }

  return { gameStarted, startGame }
})
