<script lang="ts" setup>
import { NuxtLink } from '#components'

const props = defineProps<{
  title: string
  description: string
  imgUrl?: string
  to: string
}>()

const is = computed(() => props.to ? NuxtLink : 'div')
</script>

<template>
  <li>
    <component :is :to class="group flex items-center gap-6 px-4 py-2 rounded-lg ring-1 ring-gray-200 dark:ring-gray-800 shadow bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800">
      <UAvatar v-if="imgUrl" :src="imgUrl" size="md" />
      <UAvatar v-else icon="i-heroicons-photo" size="md" />
      <div>
        <h3 class="font-semibold capitalize">
          {{ title }}
        </h3>
        <!-- <p class="text-sm text-gray-500">
          {{ description }}
        </p> -->
      </div>
      <UIcon name="i-heroicons-arrow-right" class="ml-auto group-focus:translate-x-2 group-hover:translate-x-2 transition-transform w-5 h-5" />
    </component>
  </li>
</template>
