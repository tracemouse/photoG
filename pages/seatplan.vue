<template>

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



</script>

<style lang="scss" scoped>

img{
  max-width: 95%;
}
</style>