<template>
	<v-container>
		<div class="pb-3">
			<h2>Histori Pesanan Anda</h2>
			<p style="font-weight: normal;" class="ma-0">Anda Memiliki {{dataHistori.length}} Histori Pesanan </p>
			<div class="py-1">
				<v-divider></v-divider>
			</div>
		</div>
		<v-container class="py-2 px-0" d-flex grid-list-md>
			<v-layout row wrap>
				<v-flex
					v-for="(item, i) in dataHistori" :key="i"
					xs6 sm3 lg2 class="pa-0">
					<v-card class="ma-1" max-width="185">
						<v-img
							:src="item.data.id_barang.barang.thumbnail"
							aspect-ratio="1.7"
							contain
							style="cursor: pointer;"
						></v-img>
						<v-card-title class="text-xs-left">
							<v-list-tile-sub-title v-html="item.data.id_barang.barang.nama_barang"></v-list-tile-sub-title>
							<v-list-tile-sub-title v-html="item.data.id_barang.barang.price"></v-list-tile-sub-title>
							<div v-if="item.data.verified == false">
								<p class="ma-0" style="color: red; font-size: 11px;">MENUNGGU PEMBAYARAN</p>
							</div>
							<div v-if="item.data.verified == true">
								<p class="ma-0" style="color: teal; font-size: 11px;">Pembayaran Diterima</p>
							</div>
						</v-card-title>
							<div class="pa-2 text-xs-right text-lg-right d-flex" v-if="item.data.verified == false">
								<v-btn outline small color="teal" dark @click="sudahBayar">bayar</v-btn>
								<v-icon color="teal" @click="detail(item)">list</v-icon>
							</div>
							<div class="pa-2 text-lg-right text-xs-right" v-else>
							    <v-icon color="teal">check_circle</v-icon>
							</div>
					</v-card>
				</v-flex>
			</v-layout>
		</v-container>

		<template>
			<div class="text-xs-center">
				<v-dialog
					v-model="dialog"
					width="500"
				>
					<v-card>
						<v-card-title class="grey lighten-5">
							<h2 style="font-weight: normal;">Upload Bukti Transfer</h2><br>
							<h5 style="font-weight: normal;">*Pastikan Bukti Pembayaran Anda Sudah Benar</h5>
						</v-card-title>
							<v-card-text class="pa-0">
								<input type="file" name="upload" id="workIMG" @click="onFilePicked">
								<v-img v-bind:src="image"  @click="openUpload"></v-img>
								<!-- <v-img :src="image"></v-img> -->
							</v-card-text>
							<v-divider></v-divider>

						<v-card-actions class="pa-3">
							<v-btn block @click="dialog = false">Batal</v-btn>
							<v-btn
								color="teal lighten-3"
								block
							>
								Kirim
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</div>
		</template>
	</v-container>
</template>

<script>
	import App from '../../App'

	export default {

		data() {
			return {
				urlgetUserTransaksiId: App.data().url.urlgetUserTransaksiId,
				dataHistori: [],
				dialog: false,
				image: require('../../assets/our.png')
			}
		},
		mounted(){
			if(localStorage.getItem('token')){
				this.getUserId();
			}else {
				this.$router.push('/')
			}
		},
		methods: {
			sudahBayar(){
				this.dialog = true;
			},
			getUserId(){
				var self = this;
				var idUser = localStorage.getItem('id');

				App.methods.getData(this.urlgetUserTransaksiId + idUser, function(res){
					if(res.status == 200){
						console.log(res.data.result)
						self.dataHistori = res.data.result;
					}
				})
			},
			detail(e){
				var id_transaksi = e.id_transaksi;
				var id_barang = e.data.id_barang.id_barang;
				console.log(id_barang, id_transaksi)
				this.$router.push({
					name: 'pembayaran',
					path: '/pembayaran/',
					params: {idTransaksi: id_transaksi, idBarang: id_barang}
				});
			},
			openUpload() {
				document.getElementById("workIMG").click()
			},
			onFilePicked(event) {
				console.log(event)

				// let data = new FormData();
				// data.append('images', image);

				// let request = new XMLHttpRequest();
				// request.open('POST', this.ourworkPostFile);
				// request.send(data);
				// request.onreadystatechange = function () {
				// 	if(request.readyState === 4 && request.status === 200) {
				// 		var res = JSON.parse(request.responseText);
				// 		res.uploaded_image.map(data => {
				// 			self.addWork = data.size.medium
							
				// 		})
				// 		self.proses = true;
				// 		console.log('RES POST IMAGE', self.addWork);
				// 	}
				// }
			}
		}
	}
</script>
<style scoped>
	h5{
		font-size: 13px;
	}
	input[type=file] {
		display: none;
	}
	img {
		width: 35%;
		border-radius: 15px; 
	}
</style>