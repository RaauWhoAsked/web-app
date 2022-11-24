<script setup lang="ts">
import { CheckBadgeIcon, ClockIcon } from '@heroicons/vue/24/outline';
import { useGameStore } from '@/stores/Store';

const store = useGameStore();

const actions = [
  {
    title: `Upgrade how many Kongs you get per second`,
    icon: ClockIcon,
    iconForeground: 'text-teal-700',
    iconBackground: 'bg-teal-50',
    function: 'gainItemsGainRate',
  },
  {
    title: 'Upgrade the speed for your Kongs per second',
    icon: CheckBadgeIcon,
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50',
    function: 'gainItemsSpeedValue',
  },
  {
    title: 'Upgrade value clicks',
    icon: CheckBadgeIcon,
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50',
    function: 'itemsGainValue',
  },
];

const eventHandler = (func: string) => {
  //
  switch (func) {
    case 'gainItemsSpeedValue':
      store.gainItemsSpeedValue();
      break;
    case 'gainItemsGainRate':
      store.gainItemsGainRate();
      break;
    case 'itemsGainValue':
      store.itemsGainValue();
  }
};
</script>
<template>
  <div class="max-w-6xl px-4 mx-auto mt-8 space-y-10 sm:px-6 lg:px-8">
    <div>
      <h2 class="text-lg font-medium leading-6 text-gray-900">Overview</h2>
      <div
        class="mt-3 overflow-hidden bg-gray-200 divide-y divide-gray-200 rounded-lg shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0"
      >
        <div
          v-for="(action, actionIdx) in actions"
          @click="eventHandler(action.function)"
          :key="action.title"
          :class="[
            actionIdx === 0
              ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none'
              : '',
            actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
            actionIdx === actions.length - 2 ? 'sm:rounded-bl-lg' : '',
            actionIdx === actions.length - 1
              ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none'
              : '',
            'relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 cursor-pointer',
          ]"
        >
          <div>
            <span
              :class="[
                action.iconBackground,
                action.iconForeground,
                'rounded-lg inline-flex p-3 ring-4 ring-white',
              ]"
            >
              <component :is="action.icon" class="w-6 h-6" aria-hidden="true" />
            </span>
          </div>
          <div class="mt-8">
            <h3 class="text-lg font-medium">
              <div class="focus:outline-none">
                <!-- Extend touch target to entire panel -->
                <span class="absolute inset-0" aria-hidden="true" />
                {{ action.title }}
              </div>
            </h3>
            <p class="mt-2 text-sm text-gray-500">
              Doloribus dolores nostrum quia qui natus officia quod et dolorem.
              Sit repellendus qui ut at blanditiis et quo et molestiae.
            </p>
          </div>
          <span
            class="absolute text-gray-300 pointer-events-none top-6 right-6 group-hover:text-gray-400"
            aria-hidden="true"
          >
            <svg
              class="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
