<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { RouterView } from 'vue-router';
import Sidebar from './components/sidebar.vue';
import Navbar from './components/navbar.vue';
import Header from './components/header.vue';
import { useGameStore } from '@/stores/Store';

const store = useGameStore();

onMounted(() => {
  if (localStorage.getItem('game')) {
    let localSave = JSON.parse(localStorage.getItem('game')!);
    store.game = localSave;
  }
  setInterval(() => {
    saveGame();
  }, 10000);

  fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd')
    .then((response) => response.json())
    .then((json) => {
      console.log(json[0].current_price);

      store.game.btc.cost = json[0]?.current_price;
    });
  store.loop();
});

const saveGame = () => {
  localStorage.setItem('game', JSON.stringify(store.game));
  console.log('saved');
};

const toggle = ref(false);

const toggleSidebar = () => {
  toggle.value = !toggle.value;
};
</script>

<template>
  <Sidebar :toggle="toggle" @toggleSidebar="toggleSidebar" />

  <div class="min-h-full">
    <div class="flex flex-col flex-1 lg:pl-64">
      <Navbar @toggleSidebar="toggleSidebar" />
      <main class="flex-1 pb-8">
        <Header />
        <RouterView />
      </main>
    </div>
  </div>
</template>
