<template>

<div class="d-flex justify-content-center">
  <button class="btn btn-primary" @click="onClickBack()">返回首页</button>
</div>

<div class="d-flex justify-content-center mt-3">
  <button class="btn btn-danger" @click="open">选择照片</button>
</div>

<div class="cropper-content mt-3">
  <img class="u-img" :src="base64" />
</div>

</template>
<script setup lang="ts"> 
 
 const route = useRoute()
const id:number = parseInt(route.params.id as string)

// const snackbar = useSnackbar()
let loading = ref(false)
let cropper = ref()
let selected = ref(false)
let base64 = ref("")

const maxWidth = 2000;

let option = ref()
option.value = {
    img: '', // 裁剪图片的地址
    info: false, // 裁剪框的大小信息
    outputSize: 0.7, // 裁剪生成图片的质量
    outputType: 'jpeg', // 裁剪生成图片的格式
    canScale: true, // 图片是否允许滚轮缩放
    autoCrop: true, // 是否默认生成截图框
    autoCropWidth: 2000, // 默认生成截图框宽度
    autoCropHeight: 1500, // 默认生成截图框高度
    fixedBox: false, // 固定截图框大小 不允许改变
    fixed: false, // 是否开启截图框宽高固定比例
    fixedNumber: [1, 1], // 截图框的宽高比例
    full: false, // 是否输出原图比例的截图
    canMoveBox: false, // 截图框能否拖动
    canMove: true,
    original: false, // 上传图片按照原始比例渲染
    centerBox: true, // 截图框是否被限制在图片里面
    infoTrue: false, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
    mode: 'contain',    // cover  图片铺满容器
    maxImgSize: '1500',
}

const { files, open, reset, onChange } = useFileDialog({
  accept: 'image/*', // Set to accept only image files
  directory: false, // Select directories instead of files if set true
})


//上传图片并压缩
onChange((files) => {
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
      console.log(base64.value)
    }
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