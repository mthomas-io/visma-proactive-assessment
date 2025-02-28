<script lang="ts" setup>
import type { UniverseConfig } from '~/composables/universes/types'

const { universe } = defineProps<{
  universe: UniverseConfig
}>()

const { data: characters, status, error, pageNumber, pageSize, totalItems } = universe.useCharacters()

const { layoutPreference } = usePreferences()
</script>

<template>
  <div v-if="error">
    <h2>Error</h2>
    <p>{{ error }}</p>
  </div>

  <!-- List renderer -->
  <div v-else-if="layoutPreference === 'list'">
    <CommonList v-if="status === 'pending'">
      <CommonListItemLoading v-for="x in 3" :key="x" />
    </CommonList>

    <CommonList v-else>
      <CommonListItem v-for="character of characters" :key="character.id" :img-url="character.imgUrl" :title="character.name" :description="character.id" :to="`/${universe.slug}/${character.id}`" />
    </CommonList>
  </div>

  <!-- Grid renderer -->
  <div v-else>
    <CommonGrid v-if="status === 'pending'">
      <CommonGridItem v-for="x in 4" :key="x">
        <CommonCardLoading />
      </CommonGridItem>
    </CommonGrid>

    <CommonGrid v-else>
      <CommonGridItem v-for="character of characters" :key="character.id" :to="`/${universe.slug}/${character.id}`">
        <CommonCard :img-url="character.imgUrl" :title="character.name" is-button />
      </CommonGridItem>
    </CommonGrid>
  </div>

  <!-- Paging -->
  <div class="flex justify-center my-4">
    <UPagination v-model="pageNumber" :page-count="pageSize" :total="totalItems" />
  </div>
</template>
