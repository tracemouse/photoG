<template>
  <div class="header">

    <div class="title py-3 px-2">
      GSC IT Development & Test Center - 2025 Annual Dinner
    </div>
    <div class="d-flex justify-content-center pb-3">
      <button class="btn btn-dark btn-back px-3" @click="onClickBack()"><Icon name="tabler:chevron-left" class="me-1" size="1.2rem"></Icon>返回首页</button>
    </div>
  </div>

 
</template>

<script setup lang="ts">
 
const route = useRoute()
const config = useRuntimeConfig()


const onClickBack = ()=>{
  navigateTo("/")
}
 
</script>

<style lang="scss" scoped> 

.header{
  background: url("/bg1.jpg");
  background-size: cover;
  min-width: 100vw;

  .title{
    font-size: 1.5rem;
    font-weight: 700;
    display: flex;
    justify-content: center;
    color: white;
    text-align: center;
  }

  .btn-back{
    // border-radius: 15px;
    display: flex;
    align-items: center;
  }
}
</style>