<template>
 
  <div>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage></NuxtPage>
      <!-- <NuxtSnackbar /> -->
    </NuxtLayout>

  </div>
  
  <ClientOnly>
    <ApiLoading v-if="useLoading().value"></ApiLoading>
  </ClientOnly>
</template>
<script setup lang="ts">
  

</script>
<style lang="scss">

 
 

</style>

