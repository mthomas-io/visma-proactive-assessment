<script lang="ts" setup>
const { navLinks } = useUniverseNavLinks()
</script>

<template>
  <header class="flex flex-wrap justify-between gap-2 border-b border-gray-200 dark:border-gray-800 mb-2">
    <UHorizontalNavigation :links="navLinks" class="flex-1" />
    <UniverseOverviewLayoutSelect class="ml-auto" />
  </header>
</template>
