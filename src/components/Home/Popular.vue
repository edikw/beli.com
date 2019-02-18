<template>
	<v-container class="px-0">
		<v-layout color="transparent" row justify-center>
			<v-flex xs10 sm11 md12 lg12>
				<v-divider light></v-divider>
				<p class="text-lg-left subheading pt-4 font-weight-bold" style="color: teal;">Jenis Wedang Rempah Terlaris</p>
				<v-container fluid grid-list-lg class="px-0 py-0">
				<v-layout>
					<v-flex xs12 lg12>
					<carousel :per-page-custom="[[320, 1],[480, 2], [768, 4], [1440, 5],[1441, 6]]" :paginationEnabled="false" :navigationEnabled="true" navigationNextLabel="<h1>&#8250;</h1>" navigationPrevLabel="<h1>&#8249;</h1>">
						<slide v-for="listData in product">
							<v-card
							class="mx-auto"
								max-width="185"
								>
								<v-img :src="listData.data_barang.thumbnail" aspect-ratio="1.5" contain v-on:click="detailPage(listData)" style="cursor: pointer;">
								</v-img>
								<v-card-title>
									<div>
										<h4 class="subheading mb-0">
											{{listData.data_barang.nama_barang}}
										</h4>
										<h4>{{listData.data_barang.price}}</h4>
										<div>
											<v-btn class="mx-0 mt-3" outline color="teal lighten -3" @click="showcart(listData)">
											<v-icon>shopping_cart</v-icon>Add To Cart</v-btn>
										</div>
									</div>
								</v-card-title>
							</v-card>
						</slide>
					</carousel>
				</v-flex>
				</v-layout>
				<v-flex class="text-xs-right text-lg-right">
					<v-btn color="teal" dark small class="mx-0" @click="pageShowProduct">Lihat Semua</v-btn>
				</v-flex>
				</v-container>
			</v-flex>
		</v-layout>
		<div class="py-3">
			<v-layout color="transparent" row justify-center>
				<v-flex xs10 sm11 md12 lg12>
					<v-divider light></v-divider>
					<p class="text-lg-left subheading pt-4 font-weight-bold" style="color: teal;">Jenis Wedang Kopi Terlaris</p>
					<v-container fluid grid-list-lg class="px-0 py-0">
					<v-layout>
						<v-flex xs12 lg12>
						<carousel :per-page-custom="[[320, 1],[480, 2], [768, 4], [1440, 5],[1441, 6]]" :paginationEnabled="false" :navigationEnabled="true" navigationNextLabel="<h1>&#8250;</h1>" navigationPrevLabel="<h1>&#8249;</h1>">
							<slide v-for="listData in product">
							<v-card
							class="mx-auto"
								max-width="185"
								>
								<v-img :src="listData.data_barang.thumbnail" aspect-ratio="1.5" contain v-on:click="detailPage(listData)" style="cursor: pointer;">
								</v-img>
								<v-card-title>
									<div>
										<h4 class="subheading mb-0">
											{{listData.data_barang.nama_barang}}
										</h4>
										<h4>{{listData.data_barang.price}}</h4>
										<div>
											<v-btn class="mx-0 mt-3" outline color="teal lighten -3" @click="showcart(listData)">
											<v-icon>shopping_cart</v-icon>Add To Cart</v-btn>
										</div>
									</div>
								</v-card-title>
							</v-card>
						</slide>
						</carousel>
					</v-flex>
					</v-layout>
					<v-flex class="text-xs-right text-lg-right">
						<v-btn color="teal" dark small class="mx-0">Lihat Semua</v-btn>
					</v-flex>
				</v-container>
				</v-flex>
			</v-layout>
		</div>
	</div>
</v-container>
</template>
<script>
	import App from'../../App'
	import router from '../../router'
	import { Carousel, Slide } from 'vue-carousel';
export default {
	components: {
		Carousel,
		Slide
	},
	data() {
		return {
			urlAddChart: App.data().url.urlCartId,
			product: null
		}
	},
	mounted(){
			this.product = this.$router.app.product
	},
	methods: {
		pageShowProduct(){
			this.$router.push({
				name:'show-product',
				path: '/product'
			});
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
		showcart(e){
			var self = this;

			var idUser = localStorage.getItem('id');
			var dataBarang = {
				id_pembeli : idUser,
				id_barang : e.id
			}
			if(!localStorage.getItem('token')){
				this.$root.$emit('addCartShowPopular', e)
				console.log('EMIT', e)
			}else {
				App.methods.postData(this.urlAddChart + idUser, dataBarang, function(res){
					if(res.status == 200){
						alert('Menambahkan Ke Keranjang Belanja')
						self.$root.$emit('addCart', self.countCart)
					}

				});
			}
		}
	}
};
</script>
<style scoped>
	div .VueCarousel-inner {
		flex-basis: 210.667px;
	}
</style>