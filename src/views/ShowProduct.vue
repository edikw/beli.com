<template>
	<div>
		<ImageHero />
		<ShowProduct />
	</div>
</template>
<script>
	import ImageHero from '../components/ShowProduct/ImageHero.vue'
	import ShowProduct from '../components/ShowProduct/ShowProduct.vue'

	export default {
		components : {
			ImageHero,
			ShowProduct
		}
	}
</script>