<template>
<div class="i-container">

  <div class=" pt-5 px-5 title">
    GSC IT Development & Test Center<br>2025 Annual Dinner
  </div>


  <div class="d-flex justify-content-center mt-5">
    <button class="btn btn-primary" @click="onClickUpload">上传照片</button>
  </div>
  
  <div class="d-flex justify-content-center mt-3">
    <button class="btn btn-danger" @click="onClickVote">点赞照片</button>
  </div>
  
  <div class="d-flex justify-content-center mt-3">
    <button class="btn btn-info" @click="onClickVote">排行版</button>
  </div>
  
</div>
</template>
<script setup lang="ts"> 
const { $swal } = useNuxtApp()

definePageMeta({
  layout: 'simple',
});

const onClickUpload = async ()=>{
  // navigateTo("/upload/1")
  // $swal.fire({
  //   title: 'Hello World!',
  //   text: 'This is a SweetAlert message.',
  //   icon: 'success'
  // });

  const { value: tableId } = await $swal.fire({
    title: "选择桌号",
    input: "select",
    inputOptions: {
      "1":1,
      "2":2,
      "3":4,
      "4":4,
    },
    inputPlaceholder: "请选择桌号",
    showCancelButton: true,
    inputValidator: (value) => {
      return new Promise((resolve) => {
        if (value) {
          resolve();
        } else {
          resolve("桌号不正确");
        }
      });
    }
  });
  if (tableId) {
    // $swal.fire(`You selected: ${tableId}`);
    navigateTo(`/upload/${tableId}`)
  }
}

const onClickVote = ()=>{
  navigateTo('/photo/1')
}

</script>

<style lang="scss" scoped>
 .i-container{
    background: url("/bg1.jpg");
    background-size: cover;
    min-height: 100vh;
    min-width: 100vw;
    color: white;

    .title{
      font-size: 2rem;
      font-weight: 700;
      display: flex;
      text-align: center;
      justify-content: center;
    }
 }

 .btn {
    width: 250px;
 }
 

</style>