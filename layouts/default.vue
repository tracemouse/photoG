<template>
  <Header/>

    <div class="container-xxl mt-3 ">
        <slot></slot>
    </div>

  <Footer/>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
  .container-xxl {
    min-height: calc(100vh - 100px);
    // padding-top: 80px;
  }

</style>