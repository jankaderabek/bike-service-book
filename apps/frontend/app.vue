<template>
  <div>
    <Header/>
    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>
import './assets/tailwind.scss'
</script>

<style lang="scss">
body {
  @apply bg-gray-50 dark:bg-gray-900;
}
</style>
