<template>
	<v-layout justify-center teal lighten-4 class="hidden-sm-and-down">

		<v-flex xs12 lg9 d-inline-flex pa-5>
		<!-- <v-layout> -->
			<v-flex xs12 lg4 class="d-inline-block">
				<v-card dark color="transparent" flat>
					<v-img :src="require('../../assets/shield.png')" aspect-ratio="7" contain></v-img>
				</v-card>
				<v-card-title primary-title dark>
					<div>
						<h3 class="title mb-4  font-weight-bold text-center" style="color: #D50000;">Jaminan 100% Aman</h3>
						<div class="text-center">Payment system menjamin keamanan uang Anda dalam bertransaksi</div>
					</div>
				</v-card-title>
			</v-flex>
			<v-flex xs12 lg4 class="d-inline-block">
				<v-card dark color="transparent" flat>
					<v-img :src="require('../../assets/purse.png')" aspect-ratio="7" contain></v-img>
				</v-card>
				<v-card-title primary-title>
					<div>
						<h3 class="title mb-4  font-weight-bold text-center" style="color: #D50000;">Kemudahan Pembayaran</h3>
						<div class="text-center"> menyediakan berbagai metode pembayaran untuk bertransaks</div>
					</div>
				</v-card-title>
			</v-flex>
			<v-flex xs12 lg4 class="d-inline-block">
				<v-card dark color="transparent" flat>
					<v-img :src="require('../../assets/delivery-truck.png')" aspect-ratio="7" contain></v-img>
				</v-card>
				<v-card-title primary-title>
					<div>
						<h3 class="title mb-4  font-weight-bold text-center" style="color: #D50000;">Berbagai Jasa Pengiriman</h3>
						<div class="text-center">menyediakan berbagai pilihan jasa pengiriman dengan jangkauan nasional</div>
					</div>
				</v-card-title>
			</v-flex>
			<v-flex xs12 lg4 class="d-inline-block">
				<v-card dark color="transparent" flat>
					<v-img :src="require('../../assets/customer-service.png')" aspect-ratio="7" contain></v-img>
				</v-card>
				<v-card-title primary-title>
					<div>
						<h3 class="title mb-4  font-weight-bold text-center" style="color: #D50000;">Layanan Customer Service Responsive</h3>
						<div class="text-center"> siap membantu Anda melalui e-mail, media sosial dan call center (021-5081-3333)</div>
					</div>
				</v-card-title>
			</v-flex>
		<!-- </v-layout> -->
	</v-flex>
	</v-layout>
</template>