<script lang="ts" setup>
defineProps<{
  title: string
  description?: string
  imgUrl?: string
  isButton?: boolean
}>()
</script>

<template>
  <UCard class="group h-full flex flex-col justify-between" :class="{ 'hover:bg-gray-100 dark:hover:bg-gray-800': isButton }">
    <template #header>
      <h3 class="font-bold capitalize">
        {{ title }}
      </h3>
    </template>

    <div class="flex flex-col gap-4">
      <div class="w-full aspect-[4/3] overflow-hidden">
        <img v-if="imgUrl" :src="imgUrl" :alt="title" class="w-full h-full object-cover">
        <div v-else class="w-full flex items-center justify-center">
          <UIcon name="i-heroicons-photo" size="xl" />
        </div>
      </div>

      <p v-if="description" class="italic">
        {{ description }}
      </p>
    </div>

    <template v-if="isButton" #footer>
      <div class="flex justify-end">
        <UButton variant="ghost" color="gray" tabindex="-1">
          View
          <template #trailing>
            <UIcon name="i-heroicons-arrow-right" class="w-5 h-5 group-focus:translate-x-2 group-hover:translate-x-2 transition-transform " />
          </template>
        </UButton>
      </div>
    </template>
  </UCard>
</template>
