<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ChevronRightIcon, EnvelopeIcon } from '@heroicons/vue/20/solid';
import { useGameStore } from '@/stores/Store';

const store = useGameStore();

interface Persons {
  name: string;
  email: string;
  company: {
    name: string;
  };
  buyPrice: string;
  buyQuanity: string;
}

const persons = ref<Persons>();
const img = ref<string>();

onMounted(() => {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((json) => {
      json.forEach((item: any) => {
        item.buyPrice = (Math.random() * (2 - 1) + 1).toFixed(2);
        item.buyQuanity = (Math.random() * (50 - 1) + 1).toFixed(0);
      });
      persons.value = json;
    });

  fetch('https://jsonplaceholder.typicode.com/photos/1')
    .then((response) => response.json())
    .then((json) => {
      img.value = json.url;
    });
});

const setStoreValue = (value: number, price: number) => {
  store.setStoreValue(value, price);
};
</script>

<template>
  <div class="mt-3 overflow-hidden bg-white shadow sm:rounded-md">
    <ul role="list" class="divide-y divide-gray-200">
      <li v-for="(person, index) in persons" :key="index">
        <div
          @click="
            // @ts-ignore
            setStoreValue(person.buyPrice, person.buyQuanity)
          "
          class="block cursor-pointer hover:bg-gray-50"
        >
          <div class="flex items-center px-4 py-4 sm:px-6">
            <div class="flex items-center flex-1 min-w-0">
              <div class="flex-shrink-0">
                <img class="w-12 h-12 rounded-full" :src="img" alt="" />
              </div>
              <div class="flex-1 min-w-0 px-4 md:grid md:grid-cols-2 md:gap-4">
                <div>
                  <p class="text-sm font-medium text-indigo-600 truncate">
                    {{
                      // @ts-ignore
                      person.name
                    }}
                  </p>
                  <p class="flex items-center mt-2 text-sm text-gray-500">
                    <EnvelopeIcon
                      class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    <span class="truncate">{{
                      // @ts-ignore
                      person.email
                    }}</span>
                  </p>
                </div>
                <div class="hidden md:block">
                  <div>
                    <p class="text-sm text-gray-900">
                      {{
                        // @ts-ignore
                        person.company.name
                      }}
                    </p>
                    <p class="flex items-center mt-2 text-sm text-gray-500">
                      Buys
                      {{
                        // @ts-ignore
                        person.buyQuanity
                      }}
                      KongStrongs for ${{
                        // @ts-ignore
                        person.buyPrice
                      }}
                      each
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <ChevronRightIcon
                class="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
