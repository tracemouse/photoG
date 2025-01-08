<template>
    <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-3 g-lg-3">
      <CardImg v-for="item in photos" :item="item"/>
    </div>

    <template v-if="totalCnt == 0">
      <div class="alert alert-warning" role="alert">
          抱歉，暂无上传的照片
      </div>
    </template>

</template>
<script setup lang="ts">
import type { photo } from '~/types/table';

const { $swal } = useNuxtApp()

const route = useRoute()

let photos = ref<photo[]>()
let totalCnt = ref<number>(0)

const { status, data } = await useFetch("/api/list", {
    query: {
        sortBy: 'point',
        sortType: 'desc',
    },
    default() {
        return {count:0, items:[]};
    },
});

photos.value = data.value.items as photo[]
totalCnt.value = data.value.count as number
console.log(photos)

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