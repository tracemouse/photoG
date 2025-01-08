<template>

 
	<div class="col">
		<div class="card-container rounded-1">
			<div class="img-box rounded-1">
				<NuxtImg :src="`${props.item.url}`" class="w-100" placeholder="/poster.jpg"></NuxtImg>
			</div>
			<div class="title mt-2 px-2">
				第{{ props.item.id }}桌
			</div>
			<div class="release_date mt-2 mb-1 px-2">
				<Icon name="ant-design:like-outlined" class="me-1" size="1.2rem"></Icon> {{ props.item.point }}
			</div>
		</div>
	</div>
 

</template>

<script setup lang="ts">
import type { photo } from '~/types/table';

const props = defineProps({
  item: {
    type: Object as PropType<photo>,
    required: true
  }
});

</script>


<style lang="scss" scoped>

.card-container{
	background-color: var(--bs-body-bg);
	// border-radius: 10px;
	overflow: hidden;
	border: 4px solid transparent;

	@include media-breakpoint-down(sm) {
		background-color: var(--bs-body-bg);
    }

	&:hover{
		box-shadow: 0 1rem 3rem rgba(31, 45, 61, .125);
		// transform: translateY(-5px);
		border: 4px solid var(--bs-body-bg);
		background-color: var(--bs-body-bg);
	}

	.img-box {
		height: 0;
		overflow: hidden;
		padding-bottom: 127%;
	}

	.title{
		display: -webkit-box;
		font-size: 1rem;
		font-weight: 700;
        color: var(--bs-emphasis-color);
        overflow: hidden;
		-webkit-line-clamp: 2;
    	-webkit-box-orient: vertical;
    	white-space: normal;
		word-break: break-word;
		height: 2.2rem;
		line-height: 1.1rem;
	}

	.release_date {
		font-size: 0.8rem;
		display: block;
		overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
		color: var(--bs-secondary-color);
	}
}

</style>