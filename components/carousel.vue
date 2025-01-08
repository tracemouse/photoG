<template>
	<div class="popover-container" :class="{'popover-container-remove':!props.show, 'popover-container-show': props.show}">
		<Icon name="tabler:xbox-x" @click="()=>{emit('hide')}" class="me-1 text-white x-btn" :class="{'hide': !props.show}" size="3rem"></Icon>
		<div class="py-5 container-md fs-6" :class="{'container-hide': props.show == false}">
			<div class="card">
				<div class="card-body">
					<div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
						<div class="carousel-inner">
							<div class="carousel-item" :class="{'active': index == 0}" v-for="(item, index) in props.list">
								<div class="text-center mb-2">第 {{ index +1 }} 名</div>
								<img :src="item.url" class="d-block w-100" :alt="item.id">
								<div class="d-flex justify-content-between mt-2">
									<div>第 {{item.id}} 桌</div>
									<div class="release_date px-2" v-if="!useStore().vote.includes(item.id)">
										<Icon name="ant-design:like-outlined" class="me-1" size="1.2rem"></Icon> {{ item.point }}
									</div>
									<div class="release_date px-2" v-if="useStore().vote.includes(item.id)">
										<Icon name="ant-design:like-filled" class="text-danger me-1" size="1.2rem"></Icon> {{ item.point }}
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
			</div>
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
  }
})

const emit = defineEmits(['hide'])

</script>

<style lang="scss" scoped>

.carousel-item img{
	max-height: 60vh;
}
.x-btn {
	position: absolute;
	top: 2%;
	right: 2%;
	cursor: pointer;

	&.hide {
		display: none;
	}
}

.popover-container {
	display: none;
	position: fixed;
	z-index: 99999;
	inset: 0;
	grid-template-areas:
		"top-start top top-end"
		"center-start center center-end"
		"bottom-start bottom-center bottom-end";
	height: 100%;
	overflow-x: hidden;
	// background: rgba(0, 0, 0, .4);
	background-color: hsl(240 3.8% 46.1% / 33%);
	backdrop-filter: blur(10px);

}

.popover-container-show {
	display: grid;
}

.container-md {
	grid-area: center;
	animation: show .3s;
}

.container-hide {
	animation: hide .3s forwards;
}

.popover-container-remove {
	animation: remove 0.3s forwards;
}

.card {
	border-radius: 10px;
	border: none;
}

@keyframes show {
	// 0% {
	// 	opacity: 0;
	// 	transform: translate(0, -50%) scale(0.9);
	// }

	// 100% {
	// 	opacity: 1;
	// 	transform: translate(0, 0) scale(1);
	// }

	0% {
		transform: scale(0.7);
	}

	45% {
		transform: scale(1.05);
	}

	80% {
		transform: scale(0.95);
	}

	100% {
		transform: scale(1);
	}
}

@keyframes hide {
	0% {
		transform: scale(1);
		opacity: 1;
	}

	100% {
		transform: scale(0.5);
		opacity: 0;
	}
}


@keyframes remove {
	0% {
		display: grid;
	}

	100% {
		background-color: hsl(240 3.8% 46.1% / 0%);
		backdrop-filter: blur(0);
		display: none;
	}
}

</style>