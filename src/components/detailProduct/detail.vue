<template>
	<v-container grid-list>
		<div class="pb-3">
			<h2>Detail Produk</h2>
			<div class="py-1">
				<v-divider></v-divider>
			</div>
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
		<v-snackbar v-model="snackbar" :top="true" color="teal">
			{{ text_snackbar }}
		</v-snackbar>
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
				urlAddChart: App.data().url.urlCartId,
				snackbar: false,
				text_snackbar: null
			}
		},
		mounted(){
			this.data = this.$route.params.name
			this.getProductId();
			window.scrollTo(0, 0);
		},
		methods: {
			buy(e){
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
							self.snackbar = true
							self.text_snackbar = "Barang berhasil dimasukkan"
							self.$root.$emit('addCart', res)
						}else {
							self.snackbar = true
							self.text_snackbar = "Barang yang anda pilih sudah ada di keranjang"
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