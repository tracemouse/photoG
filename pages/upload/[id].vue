<template>

<div class="d-flex justify-content-center mt-1 title">
  第 {{id}} 桌
</div>

<div class="cropper-content mt-3">
  <img class="u-img" :src="templateImg" @click="onClickShowImgPopup()"/>
</div>
<div class="cropper-content mt-3" v-if="base64">
  <img class="u-img" :src="base64" @click="onClickShowImgPopup()"/>
</div>
<div style="padding: 5rem 0 !important;"  class="upload-box mt-3 mx-auto d-flex flex-column justify-content-center align-items-center text-align-center fw-bold py-5 text-bg-light text-secondary" v-if="!base64" @click="onClickSelect" >
  <div>
    <Icon name="tabler:photo-up" class="me-1" size="3.5rem"></Icon>
  </div>
  <div>
    点击上传照片
  </div>
</div>

<!-- <div class="d-flex justify-content-center mt-3">
  <button class="btn btn-primary" @click="onClickSelect" v-if="!base64">选择照片</button>
  <button class="btn btn-primary" disabled v-if="base64">照片已上传</button>
</div> -->

<div class="d-flex justify-content-center mt-3">
  <button class="btn btn-danger" @click="onClickDel" v-if="base64">删除照片</button>
</div>

<div v-if="showImg" class="img-box position-fixed top-0 bottom-0 start-0 end-0 d-flex flex-column justify-content-center align-items-center">
  <Icon name="tabler:xbox-x" @click="onClickHideImgPopup()" class="me-1 text-white x-btn" size="3rem"></Icon>
  <img :src="templateImg" class="mb-2">
  <img :src="base64">
</div>

<!-- <div class="d-flex justify-content-center mt-3">
  <button class="btn btn-dark" @click="onClickBack()">返回首页</button>
</div> -->

<cropper :show="showCropper" :imgUrl="cropperImg" @hide="hideCropper()" @submit="cropperSubmit($event)"></cropper>

</template>
<script setup lang="ts">
import { useLoading } from '~/composables/useLoading';

 
const { $swal } = useNuxtApp()

const route = useRoute()
const id:number = parseInt(route.params.id as string)

// const snackbar = useSnackbar()
let loading = ref(false)
 
let selected = ref(false)
let base64 = ref("")
let showImg = ref(false)
let templateImg = ref("")
let showCropper = ref(false)
let cropperImg = ref('');

let template = [
  [1,2],
  [3,4,5,6],
  [7,8,9,10],
  [11,12,13,14],
  [15,16,17,18],
  [19,20,21,22],
  [23,24,25,26],
  [27,28,29,30,31]
]
template.find((item)=>{
  if(item.includes(id)){
    templateImg.value = `/emoj/${item.join('.')}.webp`
    return true;
  }
})

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

const maxWidth = 800;
const { files, open, reset, onChange } = useFileDialog({
  accept: 'image/*', // Set to accept only image files
  directory: false, // Select directories instead of files if set true
})


const onClickSelect = ()=>{
  $swal.fire({
    title: `确认桌号(${id})是否正确?`,
    text: `您正在为第${id}桌上传照片，请先检查确认是否选择了正确的桌号，每桌仅限上传一张照片，一旦上传成功之后将会无法更改或重新上传！`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "确定",
    cancelButtonText: "取消",
  }).then((result) => {
    if (result.isConfirmed) {
      open()
    }
  });
}

const onClickDel = ()=>{
  $swal.fire({
    title: `是否确认要删除照片?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "确定",
    cancelButtonText: "取消",
  }).then((result) => {
    if (result.isConfirmed) {
      $fetch('/api/del',{
        query:{
          id: id,
        }
      }).then((data)=>{
        base64.value = ""
        $swal.fire({
          icon: "success",
          title: "删除成功！",
        });
      }).catch((error)=>{
        showError()
      })
    }
  });
  
}

//上传图片进行截图
onChange((files) => {
    // useLoading().value = true

    if(!files || files.length != 1){
        // popError("请选择有效的图片文件")
        // snackbar.add({type: 'error',text: "请选择有效的图片文件"})
        return
    }
    let file = files[0]
    var reader = new FileReader();
    useLoading().value = true;
    reader.readAsDataURL(file);
    reader.onload = function (e:any) {
      showCropper.value = true;
      cropperImg.value = e.target.result
      document.body.style.overflow = 'hidden'
      useLoading().value = false;
    }
  // compress(file, maxWidth).then((blob) => {
  //   blob2Base64(blob)
  // });
})

//提交截图，传回来的base64进行一次maxWidth的缩放，然后在blob2Base64后上传
const cropperSubmit = (cropData: string) => {
  useLoading().value = true
  base64Compress(cropData, maxWidth).then((blob) => {
    blob2Base64(blob)
  })
}

const base64Compress = (base64, scaleWidth, quality = 0.5) => {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.src = base64;
      img.onload = function () {
          // 等比例缩放图片
          const [width, height] = imageScale(
              scaleWidth,
              img.width,
              img.height
          );
          console.log(width, height)
          let canvas = document.createElement("canvas");
          img.width = canvas.width = width;
          img.height = canvas.height = height;
          let ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, img.width, img.height);
          canvas.toBlob(
              (blob) => {
                  resolve(blob);
              },
              "image/webp",
              quality
          );
      };

      img.onerror = function () {
          reject();
      };
    });
}

const imageScale = (width, originWidth, originHeight) => {
    const scaleRatio = width / originWidth;
    const scaleHeight = scaleRatio * originHeight;
    return [width, scaleHeight];
}

const compress = (file, scaleWidth, quality = 0.5) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            let img = new Image();
            img.src = e.target.result;
            img.onload = function () {
                // 等比例缩放图片
                const [width, height] = imageScale(
                    scaleWidth,
                    img.width,
                    img.height
                );
                let canvas = document.createElement("canvas");
                img.width = canvas.width = width;
                img.height = canvas.height = height;
                let ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, img.width, img.height);
                canvas.toBlob(
                    (blob) => {
                        resolve(blob);
                    },
                    "image/webp",
                    quality
                );
            };

            img.onerror = function () {
                reject();
            };
        };
    });
}

const blob2Base64 = (blob:any)=>{
    var reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = function (e) {
      // console.log(base64.value)
      uploadBase64(this.result as string)
    }
}


//upload binary
const uploadBlob = (blob:Blob) =>{
    const formData = new FormData();
    formData.append('file', blob);
    $fetch('/api/upload', {
        method: 'POST',
        body: formData
    }).then((data)=>{
 
        useLoading().value = false
 
    }).catch((error)=>{
        // popApiError(error)
        useLoading().value = false
        // snackbar.add(snackbarApiError(error))
        showError()
        base64.value = ""
    })
}

//upload base64
const uploadBase64 = (base64String:string) =>{
    $fetch('/api/upload', {
        method: 'POST',
        body: {
            id: id,
            fileData: base64String
        }
    }).then((data)=>{
 
      useLoading().value = false
      base64.value = base64String
      hideCropper()
      showSucc()
    }).catch((error)=>{
      // popApiError(error)
      useLoading().value = false
      hideCropper()
      showError()
    })
}

const showError = ()=>{
  $swal.fire({
    icon: "error",
    title: "Oops...",
    text: "抱歉，操作失败，请稍候再试！",
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

const onClickShowImgPopup = () => {
  showImg.value = true
  document.body.style.overflow = 'hidden'
  
}

const onClickHideImgPopup = () => {
  showImg.value = false
  document.body.style.overflow = ''
}

const hideCropper = () => {
  showCropper.value = false;
  cropperImg.value = '';
  document.body.style.overflow = ''
  reset();
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
  width: 800px;
  cursor: pointer;
 }
 
 .cropper-content{
    width: 100%;
    display: flex;
    justify-content: center;
} 

.upload-box {
  border: dashed 1px;
  max-width: 95%;
  width: 800px;
}

.img-box { 
  background-color: rgba(113, 113, 113, 0.33);
  backdrop-filter: blur(10px);
  
  .x-btn {
    position: absolute;
    top: 2%;
    right: 2%;
    cursor: pointer;
  }

  img {
    max-width: 85%;
    max-height: 45%;
  }
}

</style>