<script setup lang="ts">
import Gastos from './views/Gastos.vue';
import { themeStore } from './stores/themes/store';

const tStore = themeStore()

</script>

<template :style="{`background-color: ${!tStore.isDark? tStore.base.dark : tStore.base.light}`}" >
  <Gastos />
</template>

<style >

</style>
