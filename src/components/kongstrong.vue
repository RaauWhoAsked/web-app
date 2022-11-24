<script setup lang="ts">
import {
  CurrencyDollarIcon,
  BuildingLibraryIcon,
} from '@heroicons/vue/20/solid';
import BTC from './svg/btc.vue';
import { useGameStore } from '@/stores/Store';

const store = useGameStore();

const incrementKongStrong = () => {
  store.incrementKongStrong();
};

const sellKongStrongs = () => {
  store.sellKongStrongs();
};

const convertBTC = () => {
  store.convertBTC();
};
</script>

<template>
  <div class="mt-3 overflow-hidden bg-white shadow sm:rounded-lg">
    <div class="px-4 py-5 sm:px-6">
      <h3 class="text-lg font-medium leading-6 text-gray-900">
        Kong Strong Factory 1
      </h3>
      <p class="max-w-2xl mt-1 text-sm text-gray-500">
        Click to gain Kong Strongs and sell them for cash.
      </p>
    </div>
    <div class="px-4 py-5 border-t border-gray-200 sm:px-6">
      <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Kong Strong</dt>
          <button
            id="kongStrongClick"
            type="button"
            class="inline-flex items-center px-6 py-3 mt-5 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-cyan-700 hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
            @click="incrementKongStrong"
          >
            Produce KongStrongs
            <BuildingLibraryIcon
              class="w-5 h-5 ml-3 -mr-1"
              aria-hidden="true"
            />
          </button>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Stores</dt>
          <button
            type="button"
            class="inline-flex items-center px-6 py-3 mt-5 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-cyan-700 hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
            @click="sellKongStrongs"
          >
            Sell {{ store.game.store.value }} KongStrongs for ${{
              (store.game.store.price * store.game.store.value).toFixed(2)
            }}
            <CurrencyDollarIcon class="w-5 h-5 ml-3 -mr-1" aria-hidden="true" />
          </button>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Convert to BTC</dt>
          <button
            type="button"
            class="inline-flex items-center px-6 py-3 mt-5 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-cyan-700 hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
            @click="convertBTC"
          >
            Convert BTC
            <BTC :bg="'white'" fill="#0e7490" class="ml-3 -mr-1" />
          </button>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Salary expectation</dt>
          <dd class="mt-1 text-sm text-gray-900">$120,000</dd>
        </div>
      </dl>
    </div>
  </div>
</template>
