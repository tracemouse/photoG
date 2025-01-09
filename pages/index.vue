<template>
<div class="i-container">

  <div class="py-3 px-3 title">
    GSC IT Development & Test Center<br>2025 Annual Dinner
  </div>

  <div class="my-2 px-3 d-flex justify-content-between align-items-center gap-3">
      <a class="d-flex align-items-center" href="https:////uri.amap.com/marker?name=佳宁娜广场4楼&position=114.119464,22.536823" target="_blank">
        <Icon name="tabler:map-pin-filled" size="1.5rem"></Icon>深圳市罗湖区人民南路佳宁娜广场4楼
      </a>
      <a class="d-flex align-items-center cursor-pointer flex-shrink-0" href="https://uri.amap.com/navigation?from=&to=114.119464,22.536823,佳宁娜广场4楼&mode=walk&src=&callnative=0" target="_blank">
        <Icon name="tabler:walk" size="1.5rem"></Icon>导航
      </a>
  </div>

  <div class="d-flex justify-content-center mt-5">
    <button class="btn btn-primary" @click="onClickUpload">上传照片</button>
  </div>
  
  <div class="d-flex justify-content-center mt-3">
    <button class="btn btn-danger" @click="onClickVote">点赞照片</button>
  </div>
  
  <div class="d-flex justify-content-center mt-3">
    <button class="btn btn-info" @click="onClickHot">排行榜</button>
  </div>

  <div class="d-flex justify-content-center mt-3">
    <button class="btn btn-warning" @click="onClickSeatplan">座位表</button>
  </div>

  <div class="d-flex justify-content-center mt-3 mb-5">
    <button class="btn btn-success" @click="onClickSearchSeat">查询座位</button>
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

</script>

<style lang="scss" scoped>
 .i-container{
    min-height: 100vh;
    min-width: 100vw;
    color: white;

    .title{
      background: url("/bg.jpg");
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