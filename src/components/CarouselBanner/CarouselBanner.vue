<template>
	<v-container class="pb-0">
		<v-flex d-flex justify-center class="hidden-sm-and-up">
			<v-text-field
            	solo
            	label="Search"
            	append-icon="search"
            	color="teal darken-4"
            	background-color="teal lighten-3"
        	></v-text-field>
		</v-flex>
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