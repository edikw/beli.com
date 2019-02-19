<template>
	<v-container>
		<div class="pb-5">
			<h2>Histori Pesanan Anda</h2>
			<p style="font-weight: normal;">Anda Memiliki {{dataHistori.length}} Histori Pesanan </p>
		</div>
		<v-layout row wrap justify-start v-for="(data,i) in dataHistori" :key="i" class="pb-2">
			<v-flex xs12 sm4 md6 lg2>
				<v-card>
					<v-img
						class="white--text"
						aspect-ratio="1.7"
						:src="data.data.id_barang.barang.thumbnail"
					>
					</v-img>
				</v-card>
			</v-flex>
			<v-flex xs12 sm5 lg10>
				<div class="mx-4">
					<div>
						<p class="ma-0">{{data.data.id_barang.barang.nama_barang}}</p>
						<v-divider></v-divider>
					</div>

					<div>
						<p class="ma-0">{{data.data.id_barang.barang.price}}</p>
					</div>
					<div v-if="data.data.verified == false">
						<p class="ma-0" style="color: red">MENUNGGU PEMBAYARAN</p>
					</div>
					<div>
						<v-btn small color="teal" dark @click="sudahBayar">sudah bayar</v-btn>
						<v-btn outline small color="teal" dark @click="detail(data)">detail</v-btn>
					</div>
				</div>
			</v-flex>
		</v-layout>
		<v-divider></v-divider>
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
				var self = this
				const image = event.target.files[0];
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