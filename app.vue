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
  const { $swal } = useNuxtApp()
  
  onMounted(()=>{
    if(import.meta.client){
      
      if(useDeviceType().isWechat){
        $swal.fire({
          html: `
            <img style='max-width:95%;max-height:60vh;' src="/wechat.webp" />
          `,
          showCloseButton: true,
          showCancelButton: false,
          focusConfirm: false,
          confirmButtonText: '确定',
        });
      }

    }
  })


</script>
<style lang="scss">

 
 

</style>

