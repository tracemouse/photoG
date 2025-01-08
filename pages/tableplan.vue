<template>

<div class="card mt-3">
<div class="card-header">
  座位分布图
</div>
<div class="card-body d-flex justify-content-center">
  <img src="/seatplan.jpg" />
</div>
</div>

</template>
<script setup lang="ts"> 
const { $swal } = useNuxtApp()
 
</script>

<style lang="scss" scoped>

img{
  max-width: 95%;
}
</style>