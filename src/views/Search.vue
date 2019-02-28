<template>
	<div>
		<ImageHero />
		<Search />

	</div>
</template>
<script>
	import Search from '../components/Search/Search.vue'
	import ImageHero from '../components/ShowProduct/ImageHero.vue'

	export default {
		components: {
			Search,
			ImageHero
		}
	}
</script>