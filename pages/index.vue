<template>
<div class="i-container">

  <div class="py-3 px-3 title">
    GSC IT Development & Test Center<br>2025 Annual Dinner
  </div>

  <div class="d-flex justify-content-center mt-3">
    <button class="btn btn-primary" @click="onClickUpload">上传照片</button>
  </div>
  
  <div class="d-flex justify-content-center mt-3">
    <button class="btn btn-danger" @click="onClickVote">点赞照片</button>
  </div>
  
  <div class="d-flex justify-content-center mt-3">
    <button class="btn btn-info" @click="onClickHot">排行榜</button>
  </div>

  <div class="d-flex justify-content-center mt-3 mb-5">
    <button class="btn btn-warning" @click="onClickSeatplan">座位分布图</button>
  </div>

  <!-- <Footer/> -->

</div>
</template>
<script setup lang="ts"> 
const { $swal } = useNuxtApp()

definePageMeta({
  layout: 'simple',
});

let tables = {}
for(let i=1; i<32; i++){
  tables[i + ""] = i
}

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
    inputOptions: tables,
    inputPlaceholder: "请选择桌号",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "确定",
    cancelButtonText: "取消",
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

const onClickSeatplan = ()=>{
  navigateTo('/seatplan')
}

const onClickHot = ()=>{
  navigateTo('/hot')
}

</script>

<style lang="scss" scoped>
 .i-container{
    min-height: 100vh;
    min-width: 100vw;
    color: white;

    .title{
      background: url("/bg1.jpg");
      background-size: cover;
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