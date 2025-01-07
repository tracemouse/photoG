<template>

<div class="d-flex justify-content-center">
  <button class="btn btn-primary" @click="onClickUpload">我要上传</button>
</div>

<div class="d-flex justify-content-center mt-3">
  <button class="btn btn-danger" @click="onClickVote">我要点赞</button>
</div>

</template>
<script setup lang="ts"> 
const { $swal } = useNuxtApp()

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
  
}

</script>

<style lang="scss" scoped>
 
 .btn {
    width: 250px;
 }
 

</style>