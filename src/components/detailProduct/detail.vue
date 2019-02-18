<template>
	<v-container grid-list>
		<div class="pb-5">
			<h2>Detail Produk</h2>
		</div>
		<v-layout row wrap justify-center>
			<v-flex xs12 sm5 md8 lg5 class="d-inline-block">
		        <v-card>
		            <v-img
		              class="white--text"
		              max-height="300px"
		              :src="dataProduct.thumbnail" aspect-ratio="1.7"
		            >
		            </v-img>
		        </v-card>
		    </v-flex>
		    <v-flex xs12 sm7 lg7 class="d-inline-block">
		    	<div class="mx-4">
		    		<div class="mb-4">
				    	<div class="mb-2">
					    	<h1>{{dataProduct.nama_barang}}</h1>
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
			    		<h5>Harga</h5>
			    		<h1>{{dataProduct.price}}</h1>
			    	</div>
			    	<div class="mb-2">
			    		<h5>Stock</h5>
			    		<h2 v-if="dataProduct.stock == 0">Barang Habis</h2>
			    		<h2 v-else>{{dataProduct.stock}} Barang</h2>
			    	</div>
			    	<div>
			    		<v-card-text class="py-0 px-0">
				    		<v-text-field type="number" min="1" label="Masukkan Jumlah Barang" color="teal"></v-text-field>
			    		</v-card-text>
			    	</div>
			    	<div class="d-flex justify-center">
			    		<v-btn color="teal" dark @click="buy(dataProduct)">Beli Sekarang</v-btn>

		            	<v-btn color="teal lighten -3" dark @click="showcart(dataProduct)">
						<v-icon>shopping_cart</v-icon>Add To Cart</v-btn>
			    	</div>
		    		
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
				dataProduct: []
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
				if(!localStorage.getItem('token')){
					this.$root.$emit('addCartShowPopular', e)
				}
			}
		}
	}
</script>
<style scoped>

</style>