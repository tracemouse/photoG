<template>
    <div class="px-2 py-3 bg-body border rounded-2">

      <div class="d-flex">
        <div class="left">
          <div>
            <Icon name="tabler:flower" class="me-1" size="1.2rem"></Icon>桌号:</div>
          </div>
        <div class="d-flex flex-wrap gap-2">
          <template v-for="item in 31">
            <button class="btn btn-sm btn-page" :class="{'active': route1 == `/photo/${item}` }" 
              @click="()=>{navigateTo(`/photo/${item}`)}"
            >
              {{ item }}
            </button>
          </template>
        </div>
      </div>
    </div>
</template>


<script setup lang="ts">

const route = useRoute()
const route1 = route.fullPath.split("?")[0]


const props = defineProps({
});


</script>

<style lang="scss" scoped>
 
 .active{
    pointer-events: none;
  }

  .left{
    width: 80px;
    min-width: 80px;

    // font-weight: bold;

    div {
      line-height: 28px;
      display: flex;
      align-items: center;
    }
  }

  .btn{
    display: flex;
    align-items: center;
  }

</style>