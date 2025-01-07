<template>

<Table></Table>

<div class="card mt-3">
<div class="card-header">
  <div>
    第 {{id}} 桌
  </div>
  <div>
    <button class="btn btn-light">
      {{ point }}
    </button>
  </div>
</div>
<div class="card-body d-flex justify-content-center">
  <img class="u-img" :src="base64" />
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
}
 

const showError = ()=>{
  $swal.fire({
    icon: "error",
    title: "Oops...",
    text: "抱歉，上传失败，请稍候再试！",
  });
}

const showSucc = ()=>{
  $swal.fire({
    icon: "success",
    title: "上传成功！",
  });
}

const onClickBack = ()=>{
  navigateTo("/")
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