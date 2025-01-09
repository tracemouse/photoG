<template>
	<div class="img-box position-fixed top-0 bottom-0 start-0 end-0 d-flex flex-column justify-content-center align-items-center">
		<Icon name="tabler:xbox-x" @click="()=>{emit('hide')}" class="me-1 text-white x-btn" size="3rem"></Icon>

		<div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
			<div class="carousel-inner">
				<div class="carousel-item text-center" :class="{'active': index == props.active}" v-for="(item, index) in props.list">
					<div>
						<div class="d-flex flex-column align-items-center">
							<div class="text-center mb-2 h3 fw-bold text-white">第 {{ index +1 }} 名</div>
							<img class="mb-2" :src="getTemplateImg(item.id)"/>
							<img :src="item.url" :alt="item.id">
							<div class="d-flex justify-content-between mt-2 w-100 px-2 text-white">
								<div class="fw-bold">第 {{item.id}} 桌</div>
								<div class="d-flex align-items-center fw-bold"><Icon name="ant-design:like-outlined" class="mx-1" size="1.2rem"></Icon>{{ item.point }}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
				<span class="carousel-control-prev-icon" aria-hidden="true"></span>
				<span class="visually-hidden">Previous</span>
			</button>
			<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
				<span class="carousel-control-next-icon" aria-hidden="true"></span>
				<span class="visually-hidden">Next</span>
			</button>
		</div>
				
	</div>
</template>

<script setup lang="ts">

const props = defineProps({
  list: {
    type: Array,
    required: true,
  },
  show: {
    type: Boolean,
    required: false,
  },
	active: {
		type: Number,
		required: false,
		default: 0
	}
})

const emit = defineEmits(['hide'])

const getTemplateImg = (id: any) => {
	let templateImg = '';
	let template = [
		[1,2],
		[3,4,5,6],
		[7,8,9,10],
		[11,12,13,14],
		[15,16,17,18,19],
		[20,21,22,23],
		[24,25,26,27],
		[28,29,30,31]
	]
	template.find((item)=>{
		if(item.includes(id)){
			templateImg = `/emoj/${item.join('.')}.webp`
			return true;
		}
	})

	return templateImg;
}

</script>

<style lang="scss" scoped>

.img-box { 
    background-color: rgba(113, 113, 113, 0.33);
    backdrop-filter: blur(10px);
    
    .x-btn {
        position: absolute;
        top: 2%;
        right: 2%;
        cursor: pointer;
				z-index: 99;
    }

    img {
			max-width: 85%;
			max-height: 45vh;
    }
}

</style>