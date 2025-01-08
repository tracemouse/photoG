<template>
    <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3 g-lg-3">
      <CardImg v-for="item in photos" :item="item" @clickImg="showImg($event)"/>
    </div>

    <template v-if="totalCnt == 0">
      <div class="alert alert-warning" role="alert">
          抱歉，暂无上传的照片
      </div>
    </template>

    <div v-if="showImgSrc" style="background-color: rgb(0,0,0, 0.35);" class="position-absolute top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center">
        <Icon name="tabler:x" @click="showImgSrc=''" class="me-1 text-white x-btn" size="3.5rem"></Icon>
        <img style="max-width: 85%;max-height: 85%;" :src="showImgSrc">
    </div>

</template>
<script setup lang="ts">
import type { photo } from '~/types/table';

const { $swal } = useNuxtApp()

const route = useRoute()

let photos = ref<photo[]>()
let totalCnt = ref<number>(0)
let showImgSrc = ref('');

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

const showImg = (id: any) => {
    photos.value .find((item: any) => {
        if(item.id == id){
            showImgSrc.value = item.url;
            return true;
        }
    })
}

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

.x-btn {
    position: absolute;
    top: 2%;
    right: 2%;
    cursor: pointer;
}

</style>