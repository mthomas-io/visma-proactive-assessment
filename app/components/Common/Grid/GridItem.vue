<script lang="ts" setup>
import { NuxtLink } from '#components'

const props = defineProps<{
  to?: string
}>()

const is = computed(() => props.to ? NuxtLink : 'div')
</script>

<template>
  <li>
    <component :is :to="props.to">
      <slot />
    </component>
  </li>
</template>
