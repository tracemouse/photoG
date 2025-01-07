<template>
  <div class="container-float">
    <button @click="isDark = !isDark" class="btn btn-dark d-flex align-items-center flex-column" type="button" v-if="!isDark">
        <Icon name="tabler:moon-stars" size="1.5rem"/>
        <span class="ps-1">深色</span>
    </button>
    <button @click="isDark = !isDark" class="btn btn-light d-flex align-items-center flex-column" type="button" v-if="isDark">
        <Icon name="tabler:sun-high" size="1.5rem"/>
        <span class="ps-1">浅色</span>
    </button>
    <div class="we-chat">
      <div class="mt-2 btn btn-primary d-flex align-items-center flex-column" type="button">
          <Icon name="tabler:qrcode" size="1.5rem"/>
          <span class="ps-1">手机</span>
      </div>
      <div class="qr-code">
        <Qrcode :value="url" color="#1677FF" bg-color="#f5f5f5" :size=130 tips="手机扫码打开当前页" />
      </div>
    </div>
    <button @click="backTop()" class="mt-2 btn btn-warning text-white d-flex align-items-center flex-column btn-backtotop" type="button" :class="{ 'show-backtotop':showBackToTop}">
        <Icon name="tabler:arrow-big-up-lines" size="1.5rem"/>
        <span class="ps-1">顶部</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useEventListener, useDark } from '@vueuse/core'
const route = useRoute()

let url = ref(location.href)

let showBackToTop = ref(false)
let isDark = useDark({
  selector: 'body',
  attribute: 'data-bs-theme',
  valueDark: 'dark',
  valueLight: 'light',
})

 const backTop = () => {
  window.scrollTo(0, 0)
}

const handleScroll = ()=>{
    if (window.scrollY > 300) {
      showBackToTop.value = true;
    } else {
      showBackToTop.value = false;
    }
}

onMounted(()=>{
  useEventListener(document, 'scroll', handleScroll)
  if(import.meta.client){
    watch(()=>route.fullPath, (to:any,from:any) => {
      url.value = location.href
    },{deep:true})
  }
})


</script>


<style lang="scss" scoped>

.container-float{
  position: fixed;
  bottom: 80px;
  right: 15px;
  z-index: 99;

  .btn {
    box-shadow: 0 2px 11px 0 rgba(0, 0, 0, .03);
  }

  @include media-breakpoint-down(lg) {
		display: none;
	}
}

.btn-backtotop{
  opacity: 0;
  transition: opacity .8s;
}

.show-backtotop{
  opacity: 1;
}

.we-chat{
  position: relative;

  &:hover{
    .qr-code{
      visibility: visible;
      opacity: 1;
      bottom: -10px;
    }
  }
 
  .qr-code{
    position: absolute;
    bottom: -100px;
    right: 68px;
    z-index: 1;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.6s, bottom 0.6s;
  }
}

</style>