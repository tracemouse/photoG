<template>
	<div class="popover-container px-3" :class="{'popover-container-remove':!props.show, 'popover-container-show': props.show}">
		<div class="crepper-box p-3 position-relative d-flex flex-column align-items-center gap-3" :class="{'container-hide': props.show == false}">
			<Icon name="tabler:xbox-x" @click="()=>{emit('hide')}" class="text-white x-btn" size="3rem"></Icon>

			<vueCropper
				ref="cropperBox"
				:img="imgUrl"
				:outputSize="1"
				outputType="webp"
				:autoCrop="true"
				:autoCropWidth="50"
				:fixed="true"
				:fixedNumber="[8,4.5]"
				:fixedBox="true"
				fillColor="#fff"
			></vueCropper>
			
			<div>
				<button type="button" class="btn btn-dark me-2" @click="onClickRotate()">旋转图片</button>
				<button type="button" class="btn btn-danger" @click="onClickUpload()">确认上传</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { VueCropper }  from "vue-cropper";
import 'vue-cropper/dist/index.css'

const props = defineProps({
  show: {
    type: Boolean,
    required: false,
  },
	imgUrl: {
		type: String,
		required: true
	}
})

let cropperBox = ref()

const emit = defineEmits(['hide', 'submit'])

const onClickUpload = () => {
	cropperBox.value.getCropData(data => {
  	emit('submit', data)
	})
}

const onClickRotate = () => {
	cropperBox.value.rotateRight();
}

</script>

<style lang="scss" scoped>
.popover-container {
	display: none;
	position: fixed;
	z-index: 99999;
	inset: 0;
	grid-template-areas:
		"top-start top top-end"
		"center-start center center-end"
		"bottom-start bottom-center bottom-end";
	grid-template-rows: minmax(min-content, auto) minmax(min-content, auto) minmax(min-content, auto);
	grid-template-columns: auto minmax(0, 1fr) auto;
	height: 100%;
	overflow-x: hidden;
	// background: rgba(0, 0, 0, .4);
	background-color: hsl(240 3.8% 46.1% / 33%);
	backdrop-filter: blur(10px);

}

.popover-container-show {
	display: grid;
}

.crepper-box {
	width: 45em;
	height: 40em;
	max-width: 100%;
	max-height: 60%;
	grid-area: center;
	grid-template-columns: minmax(0, 100%);
	grid-column: 2;
	grid-row: 2;
	place-self: center center;
	animation: show .3s;
	border: none;
	border-radius: 5px;
	background: #fff;
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

.x-btn {
	position: absolute;
	top: -1.1em;
	right: -1em;
	cursor: pointer;
	z-index: 99;
}

	@media (max-width: 810px) { 
		.x-btn {
			right: -.6rem;
		}
	}

</style>