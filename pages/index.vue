<template>

<div class="d-flex justify-content-center">
  <button class="btn btn-primary" @click="onClickUpload">我要上传</button>
</div>

<div class="d-flex justify-content-center mt-3">
  <button class="btn btn-danger" @click="onClickVote">我要点赞</button>
</div>

</template>
<script setup lang="ts"> 

const onClickUpload = ()=>{
  navigateTo("/upload/1")
}

const onClickVote = ()=>{
  
}

</script>

<style lang="scss" scoped>
 
 .btn {
    width: 250px;
 }
 

</style>