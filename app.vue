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
            <div class="mb-1">您目前正在使用微信访问此网页，建议使用手机浏览器访问。</div>
            <img style='max-width:95%;max-height:40vh;' src="/wechat.webp" />
          `,
          title: "温馨提示",
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

