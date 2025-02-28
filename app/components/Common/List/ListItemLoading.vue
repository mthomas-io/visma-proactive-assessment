<template>
  <li class="group flex items-center gap-6 px-4 py-2 rounded-lg ring-1 ring-gray-200 dark:ring-gray-800 shadow bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800">
    <USkeleton class="h-12 w-12" :ui="{ rounded: 'rounded-full' }" />
    <div class="space-y-2">
      <USkeleton class="h-4 w-[250px]" />
      <USkeleton class="h-4 w-[200px]" />
    </div>
  </li>
</template>
