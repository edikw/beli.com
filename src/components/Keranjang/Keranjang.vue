<template>
	<v-container>
		<div class="pb-5">
			<h2>Keranjang Belanja</h2>
			<h5 v-if="dataCart.length == 0">Keranjang Belanja Anda Kosong yuk cari Barang mu dan temukan potongan harga yang menarik</h5>
			<h5 style="font-weight: normal;" v-else>Anda Memiliki {{dataCart.length}} Barang Belanja yang Belum di bayar</h5>
		</div>
		<v-layout row wrap justify-start v-for="item in dataCart" class="py-2">
			<v-flex xs12 sm4 md6 lg3>
		        <v-card>
		            <v-img
		              class="white--text"
		              :src="item.data.thumbnail" aspect-ratio="1.7"
		            >
		            </v-img>
		        </v-card>
			</v-flex>
	        <v-flex xs12 sm5 lg4>
		    	<div class="mx-4">
		    		<div class="mb-2">
				    	<h3 class="py-2">{{item.data.nama_barang}}</h3>
				    	<v-divider></v-divider>
		    		</div>

			    	<div class="mb-2">
			    		<h5>Harga</h5>
			    		<h3>{{item.data.price}}</h3>
			    	</div>
			    	<div class="mb-2">
			    		<div>
				    		<h5>Jumlah Stock</h5>
				    		<h3>{{item.data.stock}} barang</h3>
			    		</div>
			    	</div>
			    	<div>
			    		 <v-btn small color="teal" dark @click="bayar(item)">Bayar</v-btn>
			    		 <v-btn outline small color="teal" dark @click="hapus">Hapus</v-btn>
			    	</div>
		    	</div>
	        </v-flex>
		</v-layout>
		<v-divider></v-divider>
	</v-container>
</template>

<script>
	import App from '../../App';

  export default {
  	data(){
  		return {
  			urlGetCartId: App.data().url.urlGetCartId,
  			dataCart: []
  		}
  	},
  	mounted(){
  		if(localStorage.getItem('token')){
  			this.getCartId();
  		}
  	},
  	methods: {
  		getCartId(){
  			var self = this;

  			var idUser = localStorage.getItem('id');
	  		App.methods.getData(this.urlGetCartId + idUser, function(res){
	  			self.dataCart = res.data.result
	  			console.log(res)
	  		})
  		},
  		bayar(e){
  			if(this.$route.name != 'detail'){
				this.$router.push({
					name: 'detail',
					path: '/detail-product',
					params: {name: e.id}
				});
			}
  		},
  		hapus(){
  			
  		}
  	}
  }
</script>