<template>
	<v-container>
		<div>
			<h3>Data Pembelian</h3>
			<h5 style="font-weight: normal;">Pastikan Data yang kamu masukkan sudah benar</h5>
		</div>
		<v-flex xs12 class="py-4" d-flex>
			<v-flex sm7 md7 lg7>
			<v-card>
				<div class="pa-3" style="background-color: #eee;">
					<h3 style="font-weight: normal;">Detail Pembeli</h3>
				</div>
				<v-card-title>
					<v-flex xs12 lg4 class="mr-5">
				        <v-text-field
				            label="Nama Penerima"
				            required
				            color="teal"
				            v-model="namaPenerima"
				            :rules="nameRules"
				          ></v-text-field>
					</v-flex>				        
					<v-flex xs12 lg4>
			        	<v-text-field
			            	label="No Handphone/Telepon"
			            	required
			            	color="teal"
			            	v-model="noHp"
			            	:rules="nameRules"
			        	></v-text-field>
					</v-flex>
					<v-flex xs12 lg4>
			        	<v-text-field
			            	label="Email"
			            	required
			            	color="teal"
			            	:rules="nameRules"
			            	v-model="email"
			        	></v-text-field>
					</v-flex>

					<v-flex xs12>
				        <v-textarea
				          name="input-7-1"
				          label="Alamat Lengkap Dan Kode Pos"
				          value=""
				          color="teal"
				          v-model="alamat"
				          :rules="nameRules"
				        ></v-textarea>
				    </v-flex>
				</v-card-title>
			</v-card>
			</v-flex>
			<v-flex lg5 class="pl-3 hidden-xs-only">
				<v-card>
					<div class="pa-3" style="background-color: #eee;">
						<h3 style="font-weight: normal;">Ringkasan Belanja</h3>
					</div>
					<v-card-title>
						<v-flex d-flex>
							<v-flex>
								<h5 class="pa-2">Total harga Barang</h5>
								<h5 class="pa-2">Biaya Kirim</h5>
							</v-flex>
							<v-flex class="text-lg-right" v-if="jumlah.length > 0">
								<h5 class="pa-2">Rp.{{total}}.000</h5>
								<h5 class="pa-2">Rp.10.000</h5>
							</v-flex>
						</v-flex>
					</v-card-title>
					<v-divider></v-divider>
					<v-card-title>
						<v-flex d-flex>
							<v-flex>
								<h3 class="pa-2">Total Belanja</h3>
							</v-flex>
							<v-flex class="text-lg-right" v-if="jumlah.length > 0">
								<h3 class="pa-2">Rp.{{totalBarang}}.000</h3>
							</v-flex>
						</v-flex>
					</v-card-title>
					<h5 class="px-3" style="font-weight: normal;">*Cek terlebih dahulu data anda sebelum melanjutkan</h5>
					<v-btn color="teal" dark block @click="bayar">Bayar</v-btn>
				</v-card>
			</v-flex>
		</v-flex>
		<v-flex xs12 sm7 md7 lg7>
			<v-card>
				<div class="pa-3" style="background-color: #eee;">
					<h3 style="font-weight: normal;">Detail Belanja</h3>
				</div>
				<v-card-title v-if="dataBarang">
					<v-flex xs12 sm4 md6 lg4>
				        <v-card>
				            <v-img :src="dataBarang.thumbnail"
				              class="white--text"
				               aspect-ratio="1.7"
				            >
				            </v-img>
				        </v-card>
					</v-flex>
			        <v-flex xs12 sm5 lg5>
				    	<div class="mx-2">
					    	<h5 class="pb-2">{{dataBarang.nama_barang}}</h5>
				    		<h5>{{dataBarang.price}}</h5>
					    	<div>
					    		<v-card-text class="py-0 px-0">
						    		<v-text-field 
						    		type="number"
						    		min="1" 
						    		v-model="jumlah" 
						    		label="Jumlah Barang" 
						    		color="teal"
						    		:rules="nameRules"
						    		></v-text-field>
					    		</v-card-text>
					    	</div>
				    	</div>
			        </v-flex>
				</v-card-title>
				<v-flex xs12 lg8 class="px-3">
			        <div class="pb-3" v-if="jumlah.length > 0">
			        	<h4>Total Harga:</h4>
			        	<h4>Rp.{{total}}.000</h4>
			        </div>
			        <div>
				        <v-textarea
				          name="input-7-1"
				          label="Catatan contoh: ukuran, warna dll"
				          v-model="catatan"
				          color="teal"
				          :rules="nameRules"
				        ></v-textarea>
			        </div>
			        <v-flex xs12 sm12 lg12 d-flex>
				        <v-select
				          :items="items"
				          box
				          label="Pilih Bank Transfer"
				          color="teal"
				          v-model="bank"
				          :rules="nameRules"
				        ></v-select>
				    </v-flex>
				     <v-flex xs12 sm12 lg12 d-flex>
				        <v-select
				          :items="kurirPaket"
				          box
				          label="Pilih Kurir"
				          color="teal"
				          v-model="kurir"
				          :rules="nameRules"
				        ></v-select>
				    </v-flex>
				</v-flex>
			</v-card>
		</v-flex>
		<v-flex lg5 class=" pt-3 hidden-sm-and-up">
				<v-card>
					<div class="pa-3" style="background-color: #eee;">
						<h3 style="font-weight: normal;">Ringkasan Belanja</h3>
					</div>
					<v-card-title>
						<v-flex d-flex>
							<v-flex>
								<h5 class="pa-2">Total harga Barang</h5>
								<h5 class="pa-2">Biaya Kirim</h5>
							</v-flex>
							<v-flex class="text-lg-right" v-if="jumlah.length > 0">
								<h5 class="pa-2">Rp.{{total}}.000</h5>
								<h5 class="pa-2">Rp.10.000</h5>
							</v-flex>
						</v-flex>
					</v-card-title>
					<v-divider></v-divider>
					<v-card-title>
						<v-flex d-flex>
							<v-flex>
								<h3 class="pa-2">Total Belanja</h3>
							</v-flex>
							<v-flex class="text-lg-right" v-if="jumlah.length > 0">
								<h3 class="pa-2">Rp.{{totalBarang}}.000</h3>
							</v-flex>
						</v-flex>
					</v-card-title>
					<h5 class="px-3" style="font-weight: normal;">*Cek terlebih dahulu data anda sebelum melanjutkan</h5>
					<v-btn color="teal" dark block @click="bayar">Bayar</v-btn>
				</v-card>
			</v-flex>
		</v-flex>
		<v-dialog
			v-model="dialog"
			persistent
			width="300"
	    	>
	    	<v-card
	        	color="teal"
	        	dark
	        	height="100"
	    	>
	        	<v-card-text>
	        		Sedang Memproses Pembelian Anda
	        		<v-progress-linear
	            		indeterminate
	            		color="white"
	            		class="mb-0"
	        		></v-progress-linear>
	        	</v-card-text>
	    	</v-card>
	    </v-dialog>
	</v-container>
</template>
<script>
	import App from '../../App'
	export default{
		data(){
			return {
				idBarang: null,
				urlGetBarangId: App.data().url.urlProductId,
				urlPostPembayaran: App.data().url.urlPostPembayaran,
				dataBarang: null,
				jumlah: '',
				total:'',
				totalBarang: '',
				items: ['BRI 2345454', 'BNI 76457477', 'MANDIRI 567867', 'BCA 5667668'],
				namaPenerima: '',
				kurirPaket: ['JNE'],
				noHp: '',
				email: '',
				alamat: '',
				catatan: '',
				bank:'',
				nameRules: [
			        v => !!v || 'Field must not be empty'
			    ],
			    kurir: '',
			     dialog: false
			}
		},
		mounted(){
			this.idBarang = this.$route.params.idBarang
			if(localStorage.getItem('token')){
				if(this.idBarang){
					this.getData()
				}
			}
			
			
		},
		methods: {
			bayar(){
				var self = this;


				var idUser = localStorage.getItem('id');
				if(this.namaPenerima !='' &&
					this.noHp !='' &&
					this.email !='' &&
					this.alamat !='' &&
					this.jumlah !='' && 
					this.catatan !='' &&
					this.bank != ''){

					this.dialog = true

					var dataPembeli = {
						id_barang: this.idBarang,
						id_user: idUser,
						jumlah_barang: this.jumlah,
						total_harga: this.totalBarang + '000',
						bank: this.bank,
						kurir: this.kurir,
						alamat_penerima: this.alamat,
						email: this.email,
						no_handphone: this.noHp,
						catatan: this.catatan,
						nama_penerima: this.namaPenerima

					}
					console.log("YANG DIKIRM", dataPembeli);

					App.methods.postData(this.urlPostPembayaran + idUser, dataPembeli, function(res){
						if(res.status == 200){

							var id_transaksi = res.data.id_transaksi
							console.log('HASIL POST',res);

							self.dialog = false;

							self.$router.push({
								name: 'pembayaran',
								path: '/pembayaran/',
								params: {idTransaksi: id_transaksi}
							});
						}else {
							self.dialog = false;
						}
					})


				}else {
					alert('ISI DONG')
					this.dialog = false;
				}
			},
			getData(){
				var self = this;

				App.methods.getData(this.urlGetBarangId + this.idBarang, function(res){
					self.dataBarang = res.data.result
					console.log(self.dataBarang.price);
				});
			}
		},
		watch: {
			jumlah:function(val){
				var self = this;
				if(self.dataBarang){
					var price = self.dataBarang.price.slice(3)
					console.log(price)
				}
				self.jumlah = val
				self.total = val * price

				if(self.jumlah.length > 0){
					self.totalBarang = self.total + 10.000
				}

			},

		}
	}
</script>