<template>
	<v-container class="pa-0">
	<div class="px-4">
		<v-divider></v-divider>
	</div>
	<v-container class=py-0 d-flex>
	    <v-flex xs12 sm9 lg10 align-end justify-end class="border py-4">
	          <v-layout row wrap>
	            <div
	              v-for="data in product"

	            >
	              <v-card class="ma-1" max-width="185">
	                <v-img
	                  :src="data.data_barang.thumbnail"
	                  aspect-ratio="1.5" contain v-on:click="detailPage(data)" style="cursor: pointer;"
	                ></v-img>
	                <v-card-title>
						<div>
							<h4 class="subheading mb-0">
								{{data.data_barang.nama_barang}}
							</h4>
							<h4>{{data.data_barang.price}}</h4>
							<div>
								<v-btn class="mx-0 mt-3" outline color="teal lighten -3" @click="showcart(data)">
								<v-icon>shopping_cart</v-icon>Add To Cart</v-btn>
							</div>
						</div>
					</v-card-title>
	              </v-card>
	            </div>
	          </v-layout>
	    </v-flex>
	    <v-flex lg2>
	    	<div class="py-3 detail">
		    	<span>Cari Lebih Detail</span>
	    	</div>
	    	<div class="mx-3 py-3 listKategori">
	    		<span class="font-weight-bold">Kategori</span>
		    	<div class="kategori">
		    		<ul v-for="cat in category">
		    			<li class="pa-1">{{cat.title}}</li>
		    		</ul>
		    	</div>
	    	</div>
	    </v-flex>
</v-container>
</v-container>
</template>
<script>
	import App from '../../App'

	export default {
		data() {
			return {
				product: null,
				category: [
					{title: 'Memancing'},
					{title: 'Memasak'},
					{title: 'Menjahit'},
					{title: 'Melamun'},
					{title: 'Menggonggong'},
					{title: 'Mencangkul'},
				],
				urlAddChart: App.data().url.urlCartId
			}
		},
		mounted(){
			this.product = this.$router.app.product
		},
		methods: {
			showcart(e){
				var self = this;
				var idUser = localStorage.getItem('id');
				var dataBarang = {
					id_pembeli : idUser,
					id_barang : e.id
				}
				
				if(!localStorage.getItem('token')){
					this.$root.$emit('addCartShow', e)
				}else {

					App.methods.postData(this.urlAddChart + idUser, dataBarang, function(res){
						if(res.status == 200){
							alert('Menambahkan Ke Keranjang Belanja')
							self.$root.$emit('addCart', self.countCart)
							
						}

					});
				}
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
</style>