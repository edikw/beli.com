<template>
	<div>
		<detail />
		<description />
		<detailTerkait />
		<pembayaran />
	</div>
</template>

<script>
	import detail from '../components/detailProduct/detail.vue'
	import description from '../components/detailProduct/description.vue'
	import detailTerkait from '../components/detailProduct/detailTerkait.vue'
	import pembayaran from '../components/detailProduct/pembayaran.vue'

	export default {
		components : {
			detail,
			description,
			detailTerkait,
			pembayaran
		}
	}
</script>