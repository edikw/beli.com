<template>
		<v-container class="py-0">
			<v-layout row justify-center>
			<v-flex xs10 sm11 md12 lg12>
				<v-tabs
					color="teal lighten-3"
					slider-color="teal"
					:grow="true"
					:centered="true"
				>
					<v-tab
						ripple
					>
						Featured
					</v-tab>
					<v-tab-item
						class="my-2"
						color="transparent" >
						<v-card flat v-if="product && product.length > 0">
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
												<h4 class="subheading mb-0">{{listData.data_barang.nama_barang}}</h4>
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
							<!-- </v-flex> -->
						</v-card>
						<v-flex class=" text-xs-right text-lg-right">
							<v-btn color="teal" dark small class="mx-0" @click="pageShowProduct">Lihat Semua</v-btn>
						</v-flex>
					</v-tab-item>

					<v-tab
						ripple
					>Hot Sale
					</v-tab>
					<v-tab-item
					 color="transparent">
						<v-card flat v-if="product && product.length > 0">
							<v-flex
								xs12
								class="my-2"
							>
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
													<h4 class="subheading mb-0">{{listData.data_barang.nama_barang}}</h4>
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
						</v-card>
						<v-flex class="text-xs-right text-lg-right">
								<v-btn color="teal" small dark class="mx-0" @click="pageShowProduct">Lihat Semua</v-btn>
						</v-flex>
					</v-tab-item>
					<v-tab
						ripple
					>
						Best Offers
					</v-tab>
					<v-tab-item
						class="my-2"
						color="transparent" >
						<v-card flat v-if="product && product.length > 0">
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
												<h4 class="subheading mb-0">{{listData.data_barang.nama_barang}}</h4>
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
							<!-- </v-flex> -->
						</v-card>
						<v-flex class="text-xs-right text-lg-right">
							<v-btn color="teal" dark small class="mx-0" @click="pageShowProduct">Lihat Semua</v-btn>
						</v-flex>
					</v-tab-item>

				</v-tabs>
			</v-flex>
		</v-layout>
		</v-container>
</template>
<script>
	import App from '../../App';
	import { Carousel, Slide } from 'vue-carousel';
export default {
	components: {
		Carousel,
		Slide
	},
	data() {
		return {
			product: null,
			urlAddChart: App.data().url.urlCartId,
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
		}
	}
};
</script>
<style scoped>
	.poto{
		height: 200px;
		position: relative;
		overflow: hidden;   
	}
	.poto img{
		height: auto;
		width: auto;
		max-width: 100%;
		max-height: 100%;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
</style>