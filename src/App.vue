<template>
  <h1>Bank Game</h1>
  <GameSetup  v-if="!isGameStarted"></GameSetup>
  <Game v-else></Game>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import GameSetup from './components/GameSetup.vue';
import Game from './components/Game.vue';
import { useGlobalStore } from '@/stores/globalStore'

const globalStore = useGlobalStore();
const isGameStarted = computed(() => globalStore.isGameStarted);

</script>

<style scoped></style>
