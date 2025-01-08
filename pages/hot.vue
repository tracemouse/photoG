<template>

    <div class="mb-2 d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center cursor-pointer" @click="showCarousel = true">
            <Icon name="tabler:slideshow" class="me-1" size="1.2rem"></Icon> 照片秀
        </div>
        <div class="d-flex align-items-center cursor-pointer" @click="refreshList()">
            <Icon name="tabler:refresh" class="me-1" size="1.2rem"></Icon> 刷新
        </div>
    </div>

    <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3 g-lg-3">
      <CardImg v-for="item in photos" :item="item" @clickImg="onClickShowImgPopup($event)"/>
    </div>

    <template v-if="totalCnt == 0">
      <div class="alert alert-warning" role="alert">
          抱歉，暂无上传的照片
      </div>
    </template>

    <div v-if="showImgSrc" class="img-box position-fixed top-0 bottom-0 start-0 end-0 d-flex flex-column justify-content-center align-items-center">
        <Icon name="tabler:xbox-x" @click="onClickHideImgPopup()" class="me-1 text-white x-btn" size="3rem"></Icon>
        <img class="mb-2" :src="templateImgSrc">
        <img :src="showImgSrc">
    </div>

    <Carousel v-if="showCarousel" :list="photos" @hide="showCarousel = false"></Carousel>

</template>
<script setup lang="ts">
import type { photo } from '~/types/table';

const { $swal } = useNuxtApp()

const route = useRoute()

let photos = ref<photo[]>()
let totalCnt = ref<number>(0)
let showImgSrc = ref('');
let templateImgSrc = ref('');
let showCarousel = ref(false);

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

const refreshList = () => {
    useLoading().value = true

    
    $fetch('/api/list',{
        query:{
            sortBy: 'point',
            sortType: 'desc',
        }
    }).then((data)=>{
        
        console.log(data)

        photos.value = data.items as photo[]
        totalCnt.value = data.count as number

        useLoading().value = false
    }).catch((error)=>{
        console.log(error)
        useLoading().value = false
    })
};

const onClickShowImgPopup = (event: any) => {
    let {templateImg, id} = event;
    photos.value .find((item: any) => {
        if(item.id == id){
            templateImgSrc.value = templateImg;
            showImgSrc.value = item.url;
            document.body.style.overflow = 'hidden'
            return true;
        }
    })
}

const onClickHideImgPopup = () => {
    showImgSrc.value = '';
    document.body.style.overflow = ''
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

.img-box { 
    background-color: rgba(113, 113, 113, 0.33);
    backdrop-filter: blur(10px);
    
    .x-btn {
        position: absolute;
        top: 2%;
        right: 2%;
        cursor: pointer;
    }

    img {
        max-width: 85%;
        max-height: 45%;
    }
}


</style>