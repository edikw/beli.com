<template>
	<v-container>
		<div class="pb-3">
			<h2>Keranjang Belanja</h2>
			<h5 style="font-weight: normal;" v-if="dataCart.length >0" >Anda Memiliki {{dataCart.length}} Barang Belanja yang Belum di bayar</h5>
			<h5 v-else style="font-weight: normal;">Keranjang Belanja Anda Kosong yuk cari Barang mu dan temukan potongan harga yang menarik</h5>
			<div class="py-1">
				<v-divider></v-divider>
			</div>
		</div>
		<v-container class="py-2 px-0" d-flex grid-list-md>
			<v-layout row wrap>
				<v-flex
					v-for="(item, i) in dataCart" :key="i"
					xs6 sm3 lg2 class="pa-0">
					<v-card class="ma-1" max-width="185">
						<v-img
							:src="item.data.thumbnail"
							aspect-ratio="1.7"
							contain
							v-on:click="detailPage(data)" 
							style="cursor: pointer;"
						></v-img>
						<v-card-title class="text-xs-left">
							<v-list-tile-sub-title v-html="item.data.nama_barang"></v-list-tile-sub-title>
							<v-list-tile-sub-title v-html="item.data.price"></v-list-tile-sub-title>
							<div>
								<h5 style="font-weight: normal;">Jumlah Stock</h5>
								<h5 style="font-weight: normal;">{{item.data.stock}} barang</h5>
							</div>
						</v-card-title>
							<div class="pa-2 text-xs-right text-lg-right d-flex">
								<v-btn outline small dark @click="bayar(item)" color="teal">Beli</v-btn>
								<v-icon color="teal" @click="hapus(item)">delete</v-icon>
							</div>
					</v-card>
				</v-flex>
			</v-layout>
		</v-container>
		<v-snackbar v-model="snackbar" :top="true" color="teal">
			{{ text_snackbar }}
		</v-snackbar>
	</v-container>
</template>

<script>
	import App from '../../App';

	export default {
		data(){
			return {
				urlGetCartId: App.data().url.urlGetCartId,
				urlDeleteCartId: App.data().url.urlDeleteCartId,
				dataCart: [],
				snackbar: false,
				text_snackbar: null
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
			hapus(e){
				var self = this;
				var idUser = localStorage.getItem('id')
				var dataBarang = {
					id_barang: e.id
				}

				App.methods.updateData(this.urlDeleteCartId + idUser, dataBarang, function(res){
					if(res.status == 200){
						self.snackbar = true
						self.text_snackbar = "Barang berhasil dihapus"
						self.getCartId();
					}else {
						self.snackbar = true
						self.text_snackbar = "Gagal"
					}
				})

			}
		}
	}
</script>