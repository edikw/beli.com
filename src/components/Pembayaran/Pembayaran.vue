<template>
	<v-container>
		<h3>Pembayaran</h3>
			<v-flex d-flex class="py-4">
				<v-flex xs12 md7 lg7>
					<v-card>
						<div class="pa-3" style="background-color: #eee;">
							<h3 style="font-weight: normal;">Detail Pembeli</h3>
						</div>
						<v-card-title v-if="dataPembeli && dataBarang">
							<v-flex xs12 lg12>
								<div class="pb-2">
							    	<h5>Nama Penerima</h5>
							        <span>{{dataPembeli.nama_penerima}}</span>
								</div>
								<div class="pb-2">
							    	<h5>No Handphone</h5>
									<span>{{dataPembeli.no_handphone}}</span>
								</div>
								<div class="pb-2">
							    	<h5>Email</h5>
									<span>{{dataPembeli.email}}</span>
								</div>
								<div class="pb-2">
							    	<h5>Alamat</h5>
									<span>{{dataPembeli.alamat_penerima}}</span>
								</div>
								<div class="pb-2">
									<h5>Nama Barang</h5>
									<span>{{dataBarang.nama_barang}}</span>
								</div>
								<div class="pb-2">
									<h5>Jumlah Barang</h5>
									<span>{{dataPembeli.jumlah_barang}}</span>
								</div>
								<div class="pb-2">
									<h5>Kurir</h5>
									<span>{{dataPembeli.kurir}}</span>
								</div>
								<div class="pb-2">
									<h5>Bank Transfer</h5>
									<span>{{dataPembeli.bank}}</span>
								</div>
								<div class="pb-2">
									<h5>Total Harga</h5>
									<span>Rp.{{dataPembeli.total_harga}}</span>
								</div>
							</v-flex>
						</v-card-title>
					</v-card>
					<v-flex xs12 md5 lg5 class="pt-3 hidden-sm-and-up">
						<v-card>
							<div class="pa-3" style="background-color: #eee;">
								<h3 style="font-weight: normal;">Status Pembayaran</h3>
							</div>
							<v-card-title v-if="dataPembeli">
								<v-flex>
									<div class="pb-3">
										<h4>STATUS TAGIHAN</h4>
										<span style="color: red;">MUNUNGGU PEMBAYARAN</span>
									</div>
									<div class="pb-3">
										<h4>METODE PEMBAYARAN</h4>
										<span>{{dataPembeli.bank}}</span>
									</div>
									<div class="pb-3">
										<h4>TOTAL PEMBAYARAN</h4>
										<span>Rp.{{dataPembeli.total_harga}}</span>
									</div>
									<v-btn block color="teal" dark @click="sudahBayar">Sudah bayar?</v-btn>
								</v-flex>
							</v-card-title>
						</v-card>
					</v-flex>
				</v-flex>
				<v-flex xs12 md5 lg5 class="ml-2 hidden-xs-only">
					<v-card>
						<div class="pa-3" style="background-color: #eee;">
							<h3 style="font-weight: normal;">Status Pembayaran</h3>
						</div>
						<v-card-title v-if="dataPembeli">
							<v-flex>
								<div class="pb-3">
									<h4>STATUS TAGIHAN</h4>
									<span style="color: red;">MUNUNGGU PEMBAYARAN</span>
								</div>
								<div class="pb-3">
									<h4>METODE PEMBAYARAN</h4>
									<span>{{dataPembeli.bank}}</span>
								</div>
								<div class="pb-3">
									<h4>TOTAL PEMBAYARAN</h4>
									<span>Rp.{{dataPembeli.total_harga}}</span>
								</div>
								<v-btn block color="teal" dark @click="sudahBayar">Sudah bayar?</v-btn>
							</v-flex>
						</v-card-title>
					</v-card>
				</v-flex>
			</v-flex>
		<template>
			<div class="text-xs-center">
		    	<v-dialog
		      	v-model="dialog"
		     	width="500"
		    	>
		    		<v-card>
		        		<v-card-title class="grey lighten-5">
		        			<h2 style="font-weight: normal;">Upload Bukti Transfer</h2>
		        			<h5 style="font-weight: normal;">*Pastikan Bukti Pembayaran Anda Sudah Benar</h5>
		        		</v-card-title>
					        <v-card-text class="pa-0">
					        	
					        	<v-img :src="image"></v-img>
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
		data(){
			return {
				dataPembeli: null,
				id_transaksi: null,
				dataBarang: null,
				urlGetIdTransaksi: App.data().url.urlGetIdTransaksi,
				urlGetBarangId: App.data().url.urlProductId,
				dialog: false,
				image: require('../../assets/our.png')
			}
		},
		mounted(){
			this.id_transaksi = this.$route.params.idTransaksi

			if(this.id_transaksi){
				this.getDataTransaksi();
			}
			
		},
		methods: {
			sudahBayar(){
				this.dialog = true
			},
			getDataTransaksi(){
				var self = this;
				App.methods.getData(this.urlGetIdTransaksi + this.id_transaksi, function(res){
					if(res.status == 200){
						self.dataPembeli = res.data.result
						self.getDataBarang(res.data.result.id_barang);
					}
				})
			},
			getDataBarang(idBarang){
				var self = this;
				App.methods.getData(this.urlGetBarangId + idBarang, function(res){
					self.dataBarang = res.data.result;
				})

			}
		}
	}
</script>

<style scoped>
	h5{
		font-size: 13px;
	}
	span {
		font-size: 12px;
		font-weight: normal;
	}
</style>