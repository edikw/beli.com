<template>
	<v-container class="pa-0">
		<div class="px-4 hidden-sm-and-down">
			<v-divider></v-divider>
		</div>
		<v-flex xs12 class="px-3 hidden-md-and-up">
			<v-layout row wrap class="ul-small">
				<ul v-for="(cat, i) in category" :key="i" class="pa-0 px-1">
					<li class="pa-1">{{cat.title}}</li>
				</ul>
			</v-layout>
		</v-flex>
		<v-container class=py-0 d-flex grid-list-md text-xs-center>
			<v-flex xs2 class="hidden-sm-and-down" style="border-right: 1px solid #ddd;">
				<div class="pr-3 pt-3">
					<div class="detail">
						<span>Cari Lebih Detail</span>
					</div>
					<div class="py-3 listKategori">
						<div class="text-xs-left">
							<span class="font-weight-bold">Kategori</span>
						</div>
						<div class="kategori">
							<ul v-for="(cat, i) in category" :key="i">
								<li class="pa-1">{{cat.title}}</li>
							</ul>
						</div>
					</div>
					
				</div>
			</v-flex>

				<v-layout row wrap class="ma-0">
					<div class="pa-3" v-if="tersedia">
						<p style="font-size: 17px;">Barang yang kamu cari belum tersedia</p>
					</div>
					<v-flex v-for="(data, i) in dataResultSearch" 
						:key="i" 
						 xs6 sm3 lg2 class="pl-2 pt-2">
						<v-card class="ma-1" max-width="185">
							<v-img
								:src="data.data.thumbnail"
								aspect-ratio="1.7"
								v-on:click="detailPage(data)"
								contain
								style="cursor: pointer;"
							></v-img>
							<v-card-title class="text-xs-left">
								<v-list-tile-sub-title v-html="data.data.nama_barang"></v-list-tile-sub-title>
								<h5>{{data.data.price}}</h5>
							</v-card-title>
								<div class="pa-2 text-xs-right text-lg-right">
									<v-icon small  color="teal" @click="showcart(data)">shopping_cart</v-icon>
								</div>
						</v-card>
					</v-flex>
				</v-layout>
		</v-container>
	</v-container>
</template>

<script>
	import App from '../../App'
	export default {
		data () {
			return {
				urlSearch: App.data().url.urlSearch,
				dataResultSearch: [],
				search: '',
				category: [
					{title: 'Memancing'},
					{title: 'Memasak'},
					{title: 'Menjahit'},
					{title: 'Melamun'},
					{title: 'Menggonggong'},
					{title: 'Mencangkul'},
				],
				tersedia: false,
				urlAddChart: App.data().url.urlCartId,
			}
		},
		mounted(){
			this.search = this.$route.query.keyword
			this.searching(this.search)
		},
		methods: {
			searching(search){
				this.dataResultSearch = []
				var self =this;

				var datasearch = {
					search: search
				}

				App.methods.postData(this.urlSearch, datasearch, function(res){
					if(res.status == 200){
						self.tersedia = false;
						self.dataResultSearch = res.data.result
						console.log("RESULT", self.dataResultSearch)
					}else{
						self.tersedia = true;
					}
				})
			},
			detailPage(e){
				if(this.$route.name != 'detail'){
					this.$router.push({
						name: 'detail',
						path: '/detail-product',
						params: {name: e.id}
					});
				}
			},
			showcart(e){
				var self = this;

				var idUser = localStorage.getItem('id');
				var dataBarang = {
					id_pembeli : idUser,
					id_barang : e.id
				}
				if(!localStorage.getItem('token')){
					this.$root.$emit('addCartShowPopular', e)
					console.log('EMIT', e)
				}else {
					App.methods.postData(this.urlAddChart + idUser, dataBarang, function(res){
						if(res.status == 200){
							alert('Menambahkan Ke Keranjang Belanja')
							self.$root.$emit('addCart', res)
						}else {
							alert('Barang yang anda pilih sudah tersedia di Keranjang')
						}

					});
				}
			}
		}

	}
</script>
<style scoped>
	.border {
		border-right: 1px solid #ccc;
	}
	.detail {
		text-align: center;
	}
	.detail span {
		color: teal;
		font-weight: bold;
	}
	.listKategori {
		border-top: 3px solid teal;
		border-top-right-radius: 5px;
		border-top-left-radius: 5px; 
		border-bottom: 3px solid teal;
		border-bottom-right-radius: 5px;
		border-bottom-left-radius: 5px;
	}
	.kategori ul {
		cursor: pointer;
	}
	.kategori ul:hover {
		color: teal;
	}
	.ul-small ul{
		text-decoration: none;
		list-style: none;
		color: teal;
	}
</style>