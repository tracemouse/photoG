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
  <div class="w-100 upload-box mt-3 d-flex flex-column justify-content-center align-items-center text-align-center fw-bold py-5 text-bg-light text-secondary" v-if="!base64">
    <div>
      <Icon name="tabler:photo-up" class="me-1" size="2rem"></Icon>
    </div>
    <div>
      未上传图片
    </div>
  </div>
</div>
<div class="point-box" v-if="base64">
  <div class="d-flex align-items-center" @click="onClickVote()" v-if="!useStore().vote.includes(id)">
    <Icon name="ant-design:like-outlined" class="me-1" size="1.2rem"></Icon> {{ point }}
  </div>
  <div class="d-flex align-items-center" disabled v-if="useStore().vote.includes(id)">
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

const showError = ()=>{
  $swal.fire({
    icon: "error",
    title: "Oops...",
    text: "抱歉，点赞失败，请稍候再试！",
  });
}

const showSucc = ()=>{
  $swal.fire({
    icon: "success",
    title: "点赞成功！",
  });
}

const onClickVote = ()=>{
  useLoading().value = true

  $fetch('/api/vote',{
    query:{
      id: id,
    }
  }).then((data)=>{
    point.value = point.value + 1
    showSucc()
    let vote = useStore().vote
    if(!vote) vote = []
    vote.push(id)
    useStore().setVote(vote)
    useLoading().value = false
  }).catch((error)=>{
    useLoading().value = false
    showError()
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