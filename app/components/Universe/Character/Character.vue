<script lang="ts" setup>
import type { UniverseConfig } from '~/composables/universes/types'

const { universe, id } = defineProps<{
  universe: UniverseConfig
  id: string
}>()

const { data: character, status, error } = universe.useCharacter(id)
</script>

<template>
  <div v-if="error">
    <h3>Failed to load that character, why don't you try another one?</h3>
  </div>

  <div v-else-if="status === 'pending'" class="flex items-start flex-col md:flex-row gap-8">
    <CommonCardLoading class="md:w-72" />
    <CommonCardLoading class="flex-1" />
  </div>

  <!-- Characters -->
  <div v-else-if="character" class="flex items-start flex-col md:flex-row gap-8">
    <CommonCard :title="character.name" :description="character.description" :img-url="character.imgUrl" class="md:w-72" />
    <UniverseCharacterTable :details="character.characteristics" class="flex-1 min-w-96" />
  </div>
</template>
