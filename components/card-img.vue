<template>

 
	<div class="col">
		<div class="card-container rounded-1">
			<div class="img-box rounded-1">
				<img class="w-100 cursor-pointer mb-2" :src="getTemplateImg(props.item.id)" @click="onClickImg(props.item.id)"/>
				<NuxtImg :src="`${props.item.url}`" class="w-100 cursor-pointer" placeholder="/apple-icon.png" @click="onClickImg(props.item.id)"></NuxtImg>
			</div>
			<div class="d-flex justify-content-between pt-3 pb-2">
				<div class="title px-2">
					第{{ props.item.id }}桌
				</div>
				<div class="release_date px-2" @click="onClickVote(true)" v-if="!useStore().vote.includes(props.item.id)">
					<Icon name="ant-design:like-outlined" class="me-1" size="1.2rem"></Icon> {{ props.item.point }}
				</div>
				<div class="release_date px-2" @click="onClickVote(false)" v-if="useStore().vote.includes(props.item.id)">
					<Icon name="ant-design:like-filled" class="text-danger me-1" size="1.2rem"></Icon> {{ props.item.point }}
				</div>
			</div>
		</div>
	</div>
 

</template>

<script setup lang="ts">
import type { photo } from '~/types/table';
const { $swal } = useNuxtApp()

const props = defineProps({
  item: {
    type: Object as PropType<photo>,
    required: true
  }
});

const emit = defineEmits(['clickImg'])

const onClickImg = (id) => {
	emit('clickImg', {templateImg: getTemplateImg(id), id})
}

const showError = (likes: boolean)=>{

	let text = '抱歉，点赞失败，请稍候再试！'
	if(!likes) {
		let text = '抱歉，取消点赞失败，请稍候再试！'
	}

	$swal.fire({
		icon: "error",
		title: "Oops...",
		text: text,
	});
}

const showSucc = (likes: boolean)=>{

	let text = "点赞成功！"
	if(!likes) {
		text = "取消点赞成功！"
	}

	$swal.fire({
		icon: "success",
		title: text,
	});
}

const onClickVote = (likes: boolean)=>{
  useLoading().value = true

  $fetch('/api/vote',{
    query:{
      id: props.item.id,
      likes: likes
    }
  }).then((data)=>{
		let vote = useStore().vote
		if(likes){
			props.item.point = props.item.point + 1
			if(!vote) vote = []
			vote.push(props.item.id)
		}else {
			props.item.point = props.item.point - 1
			vote.splice(vote.indexOf(props.item.id),1)
		}
		useStore().setVote(vote)

    showSucc(likes)
    useLoading().value = false
  }).catch((error)=>{
    useLoading().value = false
    showError(likes)
  })
}

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
            templateImg = `/emoj/${item.join('.')}.jpg`
            return true;
        }
    })

    return templateImg;
}

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
		// height: 2.2rem;
		line-height: 1.1rem;
	}

	.release_date {
		font-size: 0.8rem;
		display: flex;
		align-items: center;
		overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
		color: var(--bs-secondary-color);
		cursor: pointer;
	}
}

</style>