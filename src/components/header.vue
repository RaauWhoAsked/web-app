<script lang="ts" setup>
import { BanknotesIcon, BuildingOfficeIcon } from '@heroicons/vue/20/solid';
import { toRef } from 'vue';
import BTC from './svg/btc.vue';
import { useGameStore } from '@/stores/Store';

const store = useGameStore();
</script>

<template>
  <div class="bg-white shadow">
    <div class="px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
      <div
        class="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200"
      >
        <div class="flex-1 min-w-0">
          <!-- Profile -->
          <div class="flex items-center">
            <img
              class="hidden w-16 h-16 rounded-full sm:block"
              src="https://i.pinimg.com/originals/f3/91/55/f39155b8463a483f7e2efaba0c621a0e.jpg"
              alt=""
            />
            <div>
              <div class="flex items-center">
                <img
                  class="w-16 h-16 rounded-full sm:hidden"
                  src="https://i.pinimg.com/originals/f3/91/55/f39155b8463a483f7e2efaba0c621a0e.jpg"
                  alt=""
                />
                <h1
                  class="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9"
                >
                  Kong Strong Stats:
                </h1>
              </div>
              <dl
                class="flex flex-col mt-6 sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap"
              >
                <dt class="sr-only">Kong Strongs</dt>
                <dd
                  class="flex items-center text-sm font-medium text-gray-500 capitalize sm:mr-6"
                >
                  <BuildingOfficeIcon
                    class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />

                  {{ store.game.item.toFixed(2) }}
                </dd>
                <dt class="sr-only">Kong Strongs Per Second</dt>
                <dd
                  class="flex items-center text-sm font-medium text-gray-500 capitalize sm:mr-6"
                >
                  {{
                    (
                      (store.game.itemsGain.rate /
                        store.game.itemsSpeed.value) *
                      1000
                    ).toFixed(2)
                  }}
                  Kongs per second
                </dd>
                <dt class="sr-only">Cash</dt>
                <dd
                  class="flex items-center mt-3 text-sm font-medium text-gray-500 capitalize sm:mr-6 sm:mt-0"
                >
                  <BanknotesIcon
                    class="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                    aria-hidden="true"
                  />
                  ${{ store.game.cash.toFixed(2) }}
                </dd>
                <dt class="sr-only">BTC</dt>
                <dd
                  class="flex items-center mt-3 text-sm font-medium text-gray-500 capitalize sm:mr-6 sm:mt-0"
                >
                  <BTC :bg="'#F7931A'" fill="white" />
                  {{ store.game.btc.value.toFixed(6) }}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
