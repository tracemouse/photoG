<template>

<Table></Table>

<div class="card mt-3">
<div class="card-header">
  <div>
    第 {{id}} 桌
  </div>
  <div>
  </div>
</div>
<div class="card-body d-flex justify-content-center">
  <NuxtImg class="u-img" :src="base64" />
</div>
<div class="card-footer">
  <button class="btn btn-light d-flex align-items-center" @click="onClickVote()">
    <Icon name="ant-design:like-outlined" class="me-1" size="1.2rem"></Icon> {{ point }}
  </button>
  <button class="btn btn-light d-flex align-items-center">
    <Icon name="ant-design:like-filled" class="text-danger me-1" size="1.2rem"></Icon> {{ point }}
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
  $fetch('/api/vote',{
    query:{
      id: id,
    }
  }).then((data)=>{
    point.value = point.value + 1
    showSucc()
  }).catch((error)=>{
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