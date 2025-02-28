<script lang="ts" setup>
defineProps<{
  details: Record<string, string>
}>()
</script>

<template>
  <UCard class="w-full">
    <template #header>
      <h3 class="font-bold">
        Character details
      </h3>
    </template>

    <div>
      <table class="w-full">
        <tr v-for="(value, key) in details" :key="key">
          <td class="w-1/3 py-2 font-bold align-top">
            {{ key }}
          </td>
          <td>{{ value }}</td>
        </tr>
      </table>
    </div>
  </UCard>
</template>
