<template>
	<v-container class="py-0">
		<v-carousel hide-delimiters class="hidden-sm-and-down" v-if="banner" flat height="350">
		    <v-carousel-item
		      v-for="(item,i) in banner"
		      :key="i"
		      :src="item.banner.thumbnail"
		    ></v-carousel-item>
		</v-carousel>
	</v-container>
</template>

<script>
	import App from'../../App'
	import router from '../../router'

  export default {
    data () {
		return {
			banner: null
		}
    },
    mounted(){
    	this.banner = this.$router.app.banner
    }
  }
</script>
<style scoped>
</style>