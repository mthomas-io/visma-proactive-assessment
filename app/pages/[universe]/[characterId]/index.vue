<script lang="ts" setup>
const route = useRoute('universe-characterId')
const universe = useUniverse(() => route.params.universe)
</script>

<template>
  <div class="py-8">
    <UContainer>
      <UniverseNotFound v-if="!universe" />

      <div v-else>
        <UniverseCharacter :id="route.params.characterId" :universe />
      </div>
    </UContainer>
  </div>
</template>
