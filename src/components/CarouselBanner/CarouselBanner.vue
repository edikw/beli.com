<template>
	<v-container class="pb-0">
		<v-flex d-flex justify-center class="hidden-sm-and-up">
			<v-text-field
				solo
				label="Search"
				append-icon="search"
				color="teal darken-4"
				background-color="teal lighten-3"
				v-model="search"
				@click:append="searching"
				v-on:keyup="searching"
				@keypress.13.prevent="searching"
			></v-text-field>
		</v-flex>

		<div v-if="dataResultSearch.length > 0">
			<p style="font-size: 12px;" class="ma-0">{{dataResultSearch.length}} hasil dari ' {{search}} '</p>
			<v-list two-line v-bind:class="[search ? 'd-block' : 'd-none']" light class="pa-0">
				<div class="text-xs-right">
					<v-icon class="px-2" v-on:click="exit" small color="teal">close</v-icon>
				</div>
				<template v-for="(item, i) in dataResultSearch">
					<v-list-tile
					color="teal" :key="i">
						<v-list-tile-avatar>
							<img :src="item.thumbnail">
						</v-list-tile-avatar>
						<v-list-tile-content>
							<v-list-tile-title v-html="item.nama_barang"></v-list-tile-title>
							<v-list-tile-sub-title v-html="item.price"></v-list-tile-sub-title>
						</v-list-tile-content>
					</v-list-tile>
				</template>
			</v-list>
		</div>
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
	import App from '../../App'
	export default {
		data () {
			return {
				banner: null,
				search: '',
				urlSearch: App.data().url.urlSearch,
				dataResultSearch: [],
				showResult: false
			}
		},
		mounted(){
			this.banner = this.$router.app.banner
		},
		methods: {
			searching(){
				this.dataResultSearch = []
				var self =this;

				if(this.search.length >= 3 && this.search.length <=5){
					var datasearch = {
						search: this.search
					}

					App.methods.postData(this.urlSearch, datasearch, function(res){
						if(res.status == 200){
							self.dataResultSearch = res.data.result
							self.showResult = true;
						}
					})
				}
			},
			exit(){
				this.search = ''
				this.dataResultSearch = []
			}
		}

	}
</script>
<style scoped>
	.result {
		background-color: transparent;
	}
</style>