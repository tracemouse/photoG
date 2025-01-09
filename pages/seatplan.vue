<template>

<div class="mb-2 d-flex justify-content-between align-items-center">
    <button type="button" class="d-flex align-items-center cursor-pointer btn btn-sm btn-outline-danger" @click="onClickTableplan">
      <Icon name="tabler:grid-dots" class="me-1" size="1.2rem"></Icon> 
      桌位分布图
    </button>
    <button type="button" class="d-flex align-items-center cursor-pointer btn btn-sm btn-outline-danger" @click="onClickSearchSeat()">
        <Icon name="tabler:search" class="me-1" size="1.2rem"></Icon> 查询座位
    </button>
</div>

<div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3 g-lg-3">
      <CardTable v-for="tableId in 31" :tableId="tableId + ''" :item="seatplans?.filter(table=>table.tableId.trim()==`Table ${tableId}`)" />
</div>

</template>
<script setup lang="ts">
import type { seatplan } from '~/types/table';

const { $swal } = useNuxtApp()

let seatplans = ref<seatplan[]>()
let totalCnt = ref<number>(0)

const { status, data } = await useFetch("/api/seatplan", {
    default() {
        return {count:0, items:[]};
    },
});

seatplans.value = data.value.items as seatplan[]
totalCnt.value = data.value.count as number

const showError = ()=>{

  $swal.fire({
    icon: "error",
    title: "Oops...",
    text: '抱歉，查询失败，请稍候再试！',
  });

}

const showSucc = (seat: string)=>{
  let text = '';
  let icon = '';
  if(seat){
    text = "您的座位位于"+ seat;
    icon = "success"
  }else {
    text = "抱歉，未查询到您座位，请联系活动组委！";
    icon = "error"
  }

  $swal.fire({
    icon: icon,
    title: text,
  });
}

const onClickSearchSeat = async () => {
  const { value: name } = await $swal.fire({
    title: "查询座位",
    input: "text",
    inputPlaceholder: "请输入姓名",
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
          resolve("请输入");
        }
      });
    }
  });
  if (name) {
    useLoading().value = true

    $fetch('/api/seat',{
      query:{
        searchValue: name
      }
    }).then((data)=>{
      if(data.items.length > 0){
        let items = data.items;
        let seat = `第${items[0].tableId.replace("Table", '').trim()}桌`
        showSucc(seat)
      }else {
        showSucc('');
      }
      useLoading().value = false

    }).catch((error)=>{
      console.log(error)
      useLoading().value = false
      showError()

    })
  }
}

const onClickTableplan = ()=>{
  $swal.fire({
    html: `
      <img style='max-width:95%;' src="/seatplan.webp" />
    `,
    showCloseButton: true,
    showCancelButton: false,
    focusConfirm: false,
    confirmButtonText: '确定',
  });
}
</script>

<style lang="scss" scoped>

img{
  max-width: 95%;
}
</style>