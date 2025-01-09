<template>

<Table></Table>

<div class="card mt-3 position-relative">
  <div class="card-header">
    <div>
      第 {{id}} 桌
    </div>
    <div>
    </div>
  </div>
  <div class="card-body d-flex flex-column align-items-center">
    <img class="u-img mb-2" :src="templateImg" @click="onClickShowImgPopup()"/>
    <img class="u-img" v-if="base64" :src="base64" @click="onClickShowImgPopup()"/>
    <img class="u-img" src="/photo-question.jpg" v-if="!base64">
    <!-- <div style="padding: 5rem 0 !important;" class="pic-box upload-box d-flex flex-column justify-content-center align-items-center text-align-center fw-bold py-5 text-bg-light text-secondary" v-if="!base64">
      <div>
        <Icon name="tabler:photo-question" class="me-1" size="3.5rem"></Icon>
      </div>
      <div>
        尚未上传照片
      </div>
    </div> -->
  </div>
  <div class="point-box" v-if="base64">
    <div class="d-flex align-items-center cursor-pointer" @click="onClickVote(true)" v-if="!useStore().vote.includes(id)">
      <Icon name="ant-design:like-outlined" class="me-1" size="1.2rem"></Icon> {{ point }}
    </div>
    <div class="d-flex align-items-center cursor-pointer" @click="onClickVote(false)" v-if="useStore().vote.includes(id)">
      <Icon name="ant-design:like-filled" class="text-danger me-1" size="1.2rem"></Icon> {{ point }}
    </div>
  </div>
  <div v-if="showImg" class="img-box position-fixed top-0 bottom-0 start-0 end-0 d-flex flex-column justify-content-center align-items-center">
    <Icon name="tabler:xbox-x" @click="onClickHideImgPopup()" class="me-1 text-white x-btn" size="3rem"></Icon>
    <img :src="templateImg" class="mb-2">
    <img :src="base64">
    <img src="/photo-question.jpg" v-if="!base64">
    <!-- <div style="padding: 5rem 0 !important;" class="pic-box upload-box d-flex flex-column justify-content-center align-items-center text-align-center fw-bold py-5 text-bg-light text-secondary" v-if="!base64">
      <div>
        <Icon name="tabler:photo-question" class="me-1" size="3.5rem"></Icon>
      </div>
      <div>
        尚未上传照片
      </div>
    </div> -->
    <button class="prev-btn" type="button" v-if="id > 1" @click="onClickPrev()">
      <Icon name="tabler:chevron-left" class="me-1 text-white" size="3rem" aria-hidden="true"></Icon>
    </button>
    <button class="next-btn" type="button" v-if="id < 31" @click="onClickNext()">
      <Icon name="tabler:chevron-right" class="me-1 text-white" size="3rem" aria-hidden="true"></Icon>
    </button>
  </div>
</div>

</template>
<script setup lang="ts"> 
const { $swal } = useNuxtApp()

const route = useRoute()
const id:number = parseInt(route.params.id as string)

// const snackbar = useSnackbar()
let loading = ref(false)
 
let selected = ref(false)
let base64 = ref("")
let point = ref(0)
let showImg = ref(false)
let templateImg = ref("")

let template = [
  [1,2],
  [3,4,5,6],
  [7,8,9,10],
  [11,12,13,14],
  [15,16,17,18],
  [19,20,21,22],
  [23,24,25,26],
  [27,28,29,30,31]
]
template.find((item)=>{
  if(item.includes(id)){
    templateImg.value = `/emoj/${item.join('.')}.webp`
    return true;
  }
})

onMounted(()=>{
  if(import.meta.client){
    showImg.value = (()=>{
      let parURL = window.location.search
      let reg = new RegExp('show')
      if(parURL.match(reg)){
        return true;
      }else {
        return false;
      }
    })()
  }
})

const { data: photo } = await useFetch("/api/get", {
        query: {
          id: id
        },
        default() {
            return null;
        },
})

if(photo.value){
  base64.value = photo.value.url
  point.value = photo.value.point
}

const showError = (likes: boolean)=>{

  let text = '抱歉，点赞失败，请稍候再试！'
  if(!likes) {
    let text = '抱歉，取消点赞失败，请稍候再试！'
  }

  $swal.fire({
    icon: "error",
    title: "Oops...",
    text: text,
  });
}

const showSucc = (likes: boolean)=>{

  let text = "点赞成功！"
  if(!likes) {
    text = "取消点赞成功！"
  }

  $swal.fire({
    icon: "success",
    title: text,
  });
}

const onClickVote = (likes: boolean)=>{
  useLoading().value = true

  $fetch('/api/vote',{
    query:{
      id: id,
      likes: likes
    }
  }).then((data)=>{
    let vote = useStore().vote
    if(likes){
      point.value = point.value + 1
      if(!vote) vote = []
      vote.push(id)
    }else {
      point.value = point.value - 1
      vote.splice(vote.indexOf(id),1)
    }
    useStore().setVote(vote)

    showSucc(likes)
    useLoading().value = false
  }).catch((error)=>{
    useLoading().value = false
    showError(likes)
  })
}

const onClickShowImgPopup = () => {
  showImg.value = true
  document.body.style.overflow = 'hidden'
  
}

const onClickHideImgPopup = () => {
  showImg.value = false
  document.body.style.overflow = ''
}

const onClickPrev = () => {
  let toUrl = '/photo/' + (id - 1) + '?show'
  navigateTo(toUrl)
}

const onClickNext = () => {
  let toUrl = '/photo/' + (id + 1) + '?show'
  navigateTo(toUrl)
}

</script>

<style lang="scss" scoped>
 
 .title{
  font-size: 1.5rem;
  font-weight: 700;
  color: black;
 }
 
 .point-box {
    position: absolute;
    top: var(--bs-card-cap-padding-y);
    right: var(--bs-card-cap-padding-x);
 }

 .u-img{
  max-width: 95%;
  cursor: pointer;
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
    z-index: 99;
    cursor: pointer;
  }

  img {
    max-width: 85%;
    max-height: 45%;
  }
}

.pic-box{
  max-width: 95%;
  width: 800px;

}

.prev-btn, .next-btn {
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15%;
  height: 15%;
  margin: auto;
  padding: 0;
  color: #fff;
  text-align: center;
  background: 0 0;
  border: 0;
  opacity: .8;
  transition: opacity .15s ease;

  &:hover {
    opacity: 1;
  }
}

.prev-btn {
  left: 7.5%;
}

.next-btn {
  right: 7.5%;
}

</style>