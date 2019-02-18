<template>
	<div class="d-block">
		<Carousel />
		<ImageBar />
		<MenuTab />
		<Popular />
		<Informasi />
	</div>
</template>

<script>
	import Carousel from '../components/CarouselBanner/CarouselBanner.vue'
	import ImageBar from '../components/Home/ImageBar.vue'
	import MenuTab from '../components/Home/MenuTab.vue'
	import Popular from '../components/Home/Popular.vue'
	import Informasi from '../components/Home/Informasi.vue'

	export default {
		components: {
			Carousel,
			ImageBar,
			MenuTab,
			Popular,
			Informasi
	}
  }
</script>
