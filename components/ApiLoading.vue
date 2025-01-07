<template>
	<div class="loading-box">
		<div class="loading-box-content d-flex justify-content-center align-items-center">
		<div class="loading-container text-center text-dark">
			<div class="spinner-border"></div>
			<div class="mt-2">请稍等片刻...</div>
		</div>
	</div>
	</div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
	.loading-box {
		display: grid;
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

	.loading-box-content {
		grid-area: center;
	}

	.loading-container{

		font-weight: 600;

		.spinner-border {
			--bs-spinner-width: 3rem;
			--bs-spinner-height: 3rem;
		}
	}

</style>