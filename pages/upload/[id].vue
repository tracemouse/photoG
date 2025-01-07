<template>
  <nav aria-label="breadcrumb" class="border-bottom">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><NuxtLink to="/">首页</NuxtLink ></li>
      <li class="breadcrumb-item">照片上传</li>
      <li class="breadcrumb-item">第 {{id}} 桌</li>
    </ol>
  </nav>

<!-- <div class="d-flex justify-content-center mt-3">
  <button class="btn btn-primary" @click="onClickBack()">返回首页</button>
</div> -->

<div class="d-flex justify-content-center mt-3">
  <button class="btn btn-danger" @click="open">选择照片</button>
</div>

<div class="cropper-content mt-3">
  <img class="u-img" :src="base64" />
</div>

</template>
<script setup lang="ts"> 
const { $swal } = useNuxtApp()

const route = useRoute()
const id:number = parseInt(route.params.id as string)

// const snackbar = useSnackbar()
let loading = ref(false)
 
let selected = ref(false)
let base64 = ref("")

const maxWidth = 500;
const { files, open, reset, onChange } = useFileDialog({
  accept: 'image/*', // Set to accept only image files
  directory: false, // Select directories instead of files if set true
})


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
      base64.value = this.result as string
      // console.log(base64.value)
      uploadBase64(base64.value)
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
    })
}

//upload base64
const uploadBase64 = (base64:string) =>{
    $fetch('/api/upload', {
        method: 'POST',
        body: {
            id: id,
            fileData: base64
        }
    }).then((data)=>{
 
      useLoading().value = false
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
 
 .btn {
    width: 250px;
 }

 .u-img{
  max-width: 80%;
 }
 
 .cropper-content{
    width: 100%;
    display: flex;
    justify-content: center;
} 

</style>