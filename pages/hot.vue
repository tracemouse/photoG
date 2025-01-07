<template>

</template>
<script setup lang="ts"> 
const { $swal } = useNuxtApp()

const route = useRoute()

const { data: data } = await useFetch("/api/list", {
    query: {
      id: id
    },
    default() {
        return null;
    },
})

 

</script>

<style lang="scss" scoped>
 
 .title{
  font-size: 1.5rem;
  font-weight: 700;
  color: black;
 }
 
 .btn {
    width: 250px;
 }

 .u-img{
  max-width: 95%;
 }
 
 .cropper-content{
    width: 100%;
    display: flex;
    justify-content: center;
} 

</style>