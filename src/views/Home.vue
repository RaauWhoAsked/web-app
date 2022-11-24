<script setup lang="ts">
import KongStrong from '../components/kongstrong.vue';
import Store from '../components/store.vue';
</script>

<template>
  <div class="max-w-6xl px-4 mx-auto mt-8 space-y-10 sm:px-6 lg:px-8">
    <div>
      <h2 class="text-lg font-medium leading-6 text-gray-900">Overview</h2>
      <KongStrong />
    </div>
    <div>
      <h2 class="text-lg font-medium leading-6 text-gray-900">Stores</h2>
      <Store />
    </div>
  </div>
</template>
