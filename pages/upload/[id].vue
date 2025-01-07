<template>

<div class="d-flex justify-content-center mt-1 title">
  第 {{id}} 桌
</div>

<div class="cropper-content mt-3" v-if="base64">
  <NuxtImg class="u-img" :src="base64" />
</div>

<div class="d-flex justify-content-center mt-3">
  <button class="btn btn-danger" @click="onClickSelect" v-if="!base64">选择照片</button>
  <button class="btn btn-danger" disabled v-if="base64">照片已上传</button>
</div>

<!-- <div class="d-flex justify-content-center mt-3">
  <button class="btn btn-dark" @click="onClickBack()">返回首页</button>
</div> -->

</template>
<script setup lang="ts"> 
const { $swal } = useNuxtApp()

const route = useRoute()
const id:number = parseInt(route.params.id as string)

// const snackbar = useSnackbar()
let loading = ref(false)
 
let selected = ref(false)
let base64 = ref("")

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


const maxWidth = 1500;
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

//上传图片并压缩
onChange((files) => {
    useLoading().value = true

    if(!files || files.length != 1){
        // popError("请选择有效的图片文件")
        // snackbar.add({type: 'error',text: "请选择有效的图片文件"})
        return
    }
    let file = files[0]
    // var reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onload = function (e:any) {
    //   console.log(e.target.result)
    // // 图片base64化
    //     option.value.img = e.target.result;    //图片路径
    //     // selected.value = true
    // }
  // };
  compress(file, maxWidth).then((blob) => {
    blob2Base64(blob)
  });
})

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
                    "image/jpeg",
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
      showSucc()
    }).catch((error)=>{
        // popApiError(error)
        useLoading().value = false
        showError()
    })
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