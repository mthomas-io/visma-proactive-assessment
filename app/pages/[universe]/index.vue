<script lang="ts" setup>
const route = useRoute('universe')
const universe = useUniverse(() => route.params.universe)
</script>

<template>
  <UContainer class="py-8 w-full">
    <UniverseOverviewHeaderNav />

    <UniverseNotFound v-if="!universe" />

    <div v-else>
      <UniverseOverview :universe />
    </div>
  </UContainer>
</template>
