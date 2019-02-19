<template>
	<v-container grid-list>
		<div class="pb-5">
			<h2>Detail Produk</h2>
		</div>
		<v-layout row wrap justify-center>
			<v-flex xs12 sm5 md5 lg5 class="d-inline-block">
				<v-card>
					<v-img
						class="white--text"
						max-height="300px"
						:src="dataProduct.thumbnail" aspect-ratio="1.7"
					>
					</v-img>
				</v-card>
			</v-flex>
			<v-flex xs12 sm7 lg7>
				<div class="ma-2">
					<div class="mb-4">
						<div class="mb-2">
							<h2 class="detail">{{dataProduct.nama_barang}}</h2>
						</div>
						<div class="mb-2 d-inline-flex align-center">
							<div class="">
								<v-rating color="teal" :small="true" background-color="teal" :value="dataProduct.ratting"></v-rating>
							</div>
							<p class="mb-0">{{dataProduct.ratting}} ulasan</p>
						</div>
						
					<v-divider></v-divider>
					</div>

					<div class="mb-2">
						<h5 class="detail">Harga</h5>
						<h2 class="detail">{{dataProduct.price}}</h2>
					</div>
					<div class="mb-2">
						<h5 class="detail">Stock</h5>
						<h2 class="detail" v-if="dataProduct.stock == 0">Barang Habis</h2>
						<h2 class="detail" v-else>{{dataProduct.stock}} Barang</h2>
					</div>
					<v-flex d-flex xs12 sm12 lg3 class="ml-auto">
						<v-btn color="teal" dark @click="buy(dataProduct)">Beli Sekarang</v-btn>
					</v-flex>
					<v-flex d-flex xs12 sm12 lg3 class="ml-auto">
						<v-btn color="teal lighten -3" dark @click="showcart(dataProduct)">
						<v-icon>shopping_cart</v-icon>Add To Cart</v-btn>
					</v-flex>
				</div>
			</v-flex>
		</v-layout>
		<v-divider></v-divider>
	</v-container>
</template>

<script>
	import App from '../../App'
	export default {
		data(){
			return {
				img: require('../../assets/cloting1.jpg'),
				data: null,
				urlProductId: App.data().url.urlProductId,
				dataProduct: [],
				urlAddChart: App.data().url.urlCartId
			}
		},
		mounted(){
			this.data = this.$route.params.name
			this.getProductId();
		},
		methods: {
			buy(e){
				console.log(e)
				if(localStorage.getItem('token')){
					this.$router.push({
						name:'pembelian',
						path: '/pembelian/',
						params: {idBarang: this.data}
					})
				}else {
					this.$root.$emit('addCartShowPopular', e)
				}

			},
			getProductId(){
				var self = this;

				App.methods.getData(this.urlProductId + this.data, function(res){
					if(res.status == 200){
						self.dataProduct = res.data.result
						self.$root.$emit('description', self.dataProduct)
					}
				});
			},
			showcart(e){
				var self = this;

				var idUser = localStorage.getItem('id');
				var dataBarang = {
					id_barang : this.data
				}

				if(!localStorage.getItem('token')){
					this.$root.$emit('addCartShowPopular', e)
				}else {
					App.methods.postData(this.urlAddChart + idUser, dataBarang, function(res){
						if(res.status == 200){
							alert('Menambahkan Ke Keranjang Belanja')
							self.$root.$emit('addCart', self.countCart)
						}else {
							alert('Barang sudah ada di Keranjang yuk lanjutkan untuk pembelian')
						}

					});
				}
			}
		}
	}
</script>
<style scoped>
	.detail {
		font-weight: normal;
	}

</style>