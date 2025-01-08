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
<div class="card-body d-flex justify-content-center">
  <NuxtImg class="u-img" :src="base64" />
  <div style="padding: 4rem 0 !important;" class="w-100 upload-box mt-3 d-flex flex-column justify-content-center align-items-center text-align-center fw-bold py-5 text-bg-light text-secondary" v-if="!base64">
    <div>
      <Icon name="tabler:photo-question" class="me-1" size="2rem"></Icon>
    </div>
    <div>
      尚未上传图片
    </div>
  </div>
</div>
<div class="point-box" v-if="base64">
  <div class="d-flex align-items-center" @click="onClickVote(true)" v-if="!useStore().vote.includes(id)">
    <Icon name="ant-design:like-outlined" class="me-1" size="1.2rem"></Icon> {{ point }}
  </div>
  <div class="d-flex align-items-center" @click="onClickVote(false)" v-if="useStore().vote.includes(id)">
    <Icon name="ant-design:like-filled" class="text-danger me-1" size="1.2rem"></Icon> {{ point }}
  </div>
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
 }
 
 .cropper-content{
    width: 100%;
    display: flex;
    justify-content: center;
} 

</style>