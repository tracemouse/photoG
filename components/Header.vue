<template>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">GSC IT Development & Test Center 2025 Annual Dinner</a>
    <div class="collapse navbar-collapse" id="navbarNav">
    </div>
  </div>
</nav>
 
</template>

<script setup lang="ts">
import { useDark } from '@vueuse/core'

 
 
const route = useRoute()
const config = useRuntimeConfig()
  
let isDard = useDark()

let isDark = useDark({
  selector: 'body',
  attribute: 'data-bs-theme',
  valueDark: 'dark',
  valueLight: 'light',
})
 
</script>

<style lang="scss" scoped> 
</style>