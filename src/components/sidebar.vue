<script lang="ts" setup>
import { toRef, watch, ref } from 'vue';
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import {
  BeakerIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline';
import { useRoute } from 'vue-router';

const route = useRoute();

const navigation = ref([
  { name: 'Production', href: '/', icon: HomeIcon, current: true },
  { name: 'Upgrades', href: '/upgrades', icon: BeakerIcon, current: false },
  // { name: 'Balances', href: '/', icon: ScaleIcon, current: false },
  // { name: 'Cards', href: '/', icon: CreditCardIcon, current: false },
  // { name: 'Recipients', href: '/', icon: UserGroupIcon, current: false },
  // { name: 'Reports', href: '/', icon: DocumentChartBarIcon, current: false },
]);

watch(route, (to) => {
  navigation.value.forEach((nav) => {
    if (nav.href === to.fullPath) {
      nav.current = true;
    } else {
      nav.current = false;
    }
  });
});

const secondaryNavigation = [
  // { name: 'Einstellungen', href: '/', icon: CogIcon },
  { name: 'Help', href: '/', icon: QuestionMarkCircleIcon },
  // { name: 'Privacy', href: '/', icon: ShieldCheckIcon },
];

const props = defineProps<{
  toggle: boolean;
}>();

const sidebarOpen = toRef(props, 'toggle');

const emit = defineEmits(['toggleSidebar']);

const toggleSidebar = () => {
  emit('toggleSidebar');
};
</script>

<template>
  <TransitionRoot as="template" :show="sidebarOpen">
    <Dialog as="div" class="relative z-40 lg:hidden" @close="toggleSidebar">
      <TransitionChild
        as="template"
        enter="transition-opacity ease-linear duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-600 bg-opacity-75" />
      </TransitionChild>

      <div class="fixed inset-0 z-40 flex">
        <TransitionChild
          as="template"
          enter="transition ease-in-out duration-300 transform"
          enter-from="-translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leave-from="translate-x-0"
          leave-to="-translate-x-full"
        >
          <DialogPanel
            class="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-cyan-700"
          >
            <TransitionChild
              as="template"
              enter="ease-in-out duration-300"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="ease-in-out duration-300"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div class="absolute top-0 right-0 pt-2 -mr-12">
                <button
                  type="button"
                  class="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  @click="toggleSidebar"
                >
                  <span class="sr-only">Close sidebar</span>
                  <XMarkIcon class="w-6 h-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </TransitionChild>
            <div class="flex items-center flex-shrink-0 px-4">
              <img
                class="w-auto h-8"
                src="https://tailwindui.com/img/logos/mark.svg?color=cyan&shade=300"
                alt="Easywire logo"
              />
            </div>
            <nav
              class="flex-shrink-0 h-full mt-5 overflow-y-auto divide-y divide-cyan-800"
              aria-label="Sidebar"
            >
              <div class="px-2 space-y-1">
                <router-link
                  v-for="item in navigation"
                  :key="item.name"
                  :to="item.href"
                  :class="[
                    item.current
                      ? 'bg-cyan-800 text-white'
                      : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                    'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                  ]"
                  :aria-current="item.current ? 'page' : undefined"
                >
                  <component
                    :is="item.icon"
                    class="flex-shrink-0 w-6 h-6 mr-4 text-cyan-200"
                    aria-hidden="true"
                  />
                  {{ item.name }}
                </router-link>
              </div>
              <div class="pt-6 mt-6">
                <div class="px-2 space-y-1">
                  <router-link
                    v-for="item in secondaryNavigation"
                    :key="item.name"
                    :to="item.href"
                    class="flex items-center px-2 py-2 text-base font-medium rounded-md group text-cyan-100 hover:bg-cyan-600 hover:text-white"
                  >
                    <component
                      :is="item.icon"
                      class="w-6 h-6 mr-4 text-cyan-200"
                      aria-hidden="true"
                    />
                    {{ item.name }}
                  </router-link>
                </div>
              </div>
            </nav>
          </DialogPanel>
        </TransitionChild>
        <div class="flex-shrink-0 w-14" aria-hidden="true">
          <!-- Dummy element to force sidebar to shrink to fit close icon -->
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

  <!-- Static sidebar for desktop -->
  <div class="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
    <!-- Sidebar component, swap this element with another sidebar if you like -->
    <div class="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto bg-cyan-700">
      <div class="flex items-center flex-shrink-0 px-4">
        <img
          class="w-auto h-8"
          src="https://tailwindui.com/img/logos/mark.svg?color=cyan&shade=300"
          alt="Easywire logo"
        />
      </div>
      <nav
        class="flex flex-col flex-1 mt-5 overflow-y-auto divide-y divide-cyan-800"
        aria-label="Sidebar"
      >
        <div class="px-2 space-y-1">
          <router-link
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            :class="[
              item.current
                ? 'bg-cyan-800 text-white'
                : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
              'group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md',
            ]"
            :aria-current="item.current ? 'page' : undefined"
          >
            <component
              :is="item.icon"
              class="flex-shrink-0 w-6 h-6 mr-4 text-cyan-200"
              aria-hidden="true"
            />
            {{ item.name }}
          </router-link>
        </div>
        <div class="pt-6 mt-6">
          <div class="px-2 space-y-1">
            <router-link
              v-for="item in secondaryNavigation"
              :key="item.name"
              :to="item.href"
              class="flex items-center px-2 py-2 text-sm font-medium leading-6 rounded-md group text-cyan-100 hover:bg-cyan-600 hover:text-white"
            >
              <component
                :is="item.icon"
                class="w-6 h-6 mr-4 text-cyan-200"
                aria-hidden="true"
              />
              {{ item.name }}
            </router-link>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>
