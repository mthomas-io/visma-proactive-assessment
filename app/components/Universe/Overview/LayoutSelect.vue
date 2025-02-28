<script lang="ts" setup>
const { layoutOptions: options, layoutPreference } = usePreferences()
</script>

<template>
  <div class="flex items-center gap-2 text-sm">
    <label for="layout-preference">View as:</label>
    <USelect id="layout-preference" v-model="layoutPreference" :options />
  </div>
</template>
