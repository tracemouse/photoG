<template>

<div class="col">
<div class="card">
	<div class="card-header text-center">
		第{{ props.tableId }} 桌
	</div>
	<div class="card-body">
		<div class="d-flex justify-content-between mt-1 border-bottom" v-for="table in tables">
			<div>{{ table.seatId }}</div>
			<div>{{ table.name }}</div>
		</div>
	</div>
</div>
</div>

</template>

<script setup lang="ts">
import type { seatplan } from '~/types/table';
const { $swal } = useNuxtApp()

const props = defineProps({
  tableId: {
    type: String,
    required: true
  },
  item: {
    type: Object as PropType<seatplan[]>,
    required: true
  }
});

let tables = props.item.sort((a,b)=>{
	return parseInt(a.seatId) - parseInt(b.seatId);
})


</script>


<style lang="scss" scoped>
 
</style>