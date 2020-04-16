<template>
	<v-container class="py-0">
		<v-layout row justify-center class="hidden-xs-only">
			<v-flex xs10 sm11 md12 lg12>
				<v-tabs
					color="teal lighten-3"
					slider-color="teal"
					:grow="true"
					:centered="true"
					:mandatory="false" fixed-tabs>
					<v-tab
						ripple
						v-if="product && product.length > 0"
					>
						Featured
					</v-tab>
					<v-tab-item
						class="my-2"
						color="transparent">
						<v-card flat>
							<carousel 
								:per-page-custom="[[200, 1],[400, 2], [580, 3],[700,4], [900,5], [1265,6],[1439,6]]"  
								:paginationEnabled="false" 
								:navigationEnabled="true" 
								:mouseDrag="true"
								navigationNextLabel="<h1>&#8250;</h1>" navigationPrevLabel="<h1>&#8249;</h1>">
								<slide v-for="(listData, i) in product" :key="i">
									<v-card
										class="mx-auto"
										max-width="185">
										<v-img 
											:src="listData.data_barang.thumbnail" 
											aspect-ratio="1.7" 
											contain 
											v-on:click="detailPage(listData)" style="cursor: pointer;">
										</v-img>
										<v-card-title>
											<div>
												<v-list-tile-sub-title v-html="listData.data_barang.nama_barang"></v-list-tile-sub-title>
												
												<h5>{{listData.data_barang.price}}</h5>
											</div>
										</v-card-title>
										<div class="pa-2 text-xs-right text-lg-right">
											<v-icon @click="showcart(listData)" small color="teal">shopping_cart</v-icon>
										</div>
									</v-card>
								</slide>
							</carousel>
						</v-card>
						<v-flex class=" text-xs-right text-lg-right">
							<v-btn color="teal" dark small class="mx-0" @click="pageShowProduct">Lihat Semua</v-btn>
						</v-flex>
					</v-tab-item>

					<v-tab
						ripple
						v-if="product && product.length > 0"
					>Hot Sale
					</v-tab>
					<v-tab-item
						color="transparent" class="my-2">
						<v-card flat>
							<carousel 
								:per-page-custom="[[200, 1],[400, 2], [580, 3],[700,4], [900,5], [1265,6],[1439,6]]"  
								:paginationEnabled="false" 
								:navigationEnabled="true"
								:mouseDrag="true"
								navigationNextLabel="<h1>&#8250;</h1>" 
								navigationPrevLabel="<h1>&#8249;</h1>">
								<slide v-for="(listData, i) in product" :key="i">
									<v-card
										class="mx-auto"
										max-width="185">
										<v-img 
											:src="listData.data_barang.thumbnail" 
											aspect-ratio="1.5" 
											contain 
											v-on:click="detailPage(listData)" 
											style="cursor: pointer;">
										</v-img>
										<v-card-title>
											<div>
												<v-list-tile-sub-title v-html="listData.data_barang.nama_barang"></v-list-tile-sub-title>
												
												<h5>{{listData.data_barang.price}}</h5>
											</div>
										</v-card-title>
										<div class="pa-2 text-xs-right text-lg-right">
											<v-icon @click="showcart(listData)" small color="teal">shopping_cart</v-icon>
										</div>
									</v-card>
								</slide>
							</carousel>
						</v-card>
						<v-flex class="text-xs-right text-lg-right">
							<v-btn color="teal" small dark class="mx-0" @click="pageShowProduct">Lihat Semua</v-btn>
						</v-flex>
					</v-tab-item>
					<v-tab
						ripple
						v-if="product && product.length > 0"
					>
						Best Offers
					</v-tab>
					<v-tab-item
						class="my-2"
						color="transparent" >
						<v-card flat>
							<carousel 
								:per-page-custom="[[200, 1],[400, 2], [580, 3],[700,4], [900,5], [1265,6],[1439,6]]"  
								:paginationEnabled="false" 
								:navigationEnabled="true"
								:mouseDrag="true" 
								navigationNextLabel="<h1>&#8250;</h1>" 
								navigationPrevLabel="<h1>&#8249;</h1>">
								<slide v-for="(listData, i) in product" :key="i">
									<v-card
										class="mx-auto"
										max-width="185"
									>
										<v-img 
											:src="listData.data_barang.thumbnail" 
											aspect-ratio="1.5" 
											contain 
											v-on:click="detailPage(listData)" 
											style="cursor: pointer;">
										</v-img>
										<v-card-title>
											<div>
												<v-list-tile-sub-title v-html="listData.data_barang.nama_barang"></v-list-tile-sub-title>
												
												<h5>{{listData.data_barang.price}}</h5>
											</div>
										</v-card-title>
										<div class="pa-2 text-xs-right text-lg-right">
											<v-icon @click="showcart(listData)" small color="teal">shopping_cart</v-icon>
										</div>
									</v-card>
								</slide>
							</carousel>
						</v-card>
						<v-flex class="text-xs-right text-lg-right">
							<v-btn color="teal" dark small class="mx-0" @click="pageShowProduct">Lihat Semua</v-btn>
						</v-flex>
					</v-tab-item>
				</v-tabs>
			</v-flex>
		</v-layout>
		<v-layout row justify-center class="hidden-sm-and-up">
			<v-flex xs11>
				<v-tabs
					color="teal lighten-3"
					slider-color="teal"
					:grow="true"
					:centered="true"
					:mandatory="false" fixed-tabs>
					<v-tab
						ripple
						v-if="product && product.length > 0"
					>
						Featured
					</v-tab>
					<v-tab-item
						class="my-2"
						color="transparent">
						<v-card flat>
							<carousel 
								:per-page-custom="[[200, 2],[400, 2], [580, 3],[700,4], [900,5], [1265,6],[1439,6]]"  
								:paginationEnabled="false" 
								:navigationEnabled="true" 
								:mouseDrag="true"
								navigationNextLabel="<h1 style='font-size:35px; color:teal;'>&#8250;</h1>" navigationPrevLabel="<h1 style='font-size:35px; color:teal;'>&#8249;</h1>">
								<slide v-for="(listData, i) in product" :key="i">
									<v-card
										class="mx-auto"
										max-width="180">
										<v-img 
											:src="listData.data_barang.thumbnail" 
											aspect-ratio="1.7" 
											contain 
											height="80"
											v-on:click="detailPage(listData)" style="cursor: pointer;">
										</v-img>
										<v-card-title>
											<div>
												<v-list-tile-sub-title v-html="listData.data_barang.nama_barang"></v-list-tile-sub-title>
												
												<h5>{{listData.data_barang.price}}</h5>
											</div>
										</v-card-title>
										<div class="pa-2 text-xs-right text-lg-right">
											<v-icon @click="showcart(listData)" small color="teal">shopping_cart</v-icon>
										</div>
									</v-card>
								</slide>
							</carousel>
						</v-card>
						<v-flex class=" text-xs-right text-lg-right">
							<v-btn color="teal" dark small class="mx-0" @click="pageShowProduct">Lihat Semua</v-btn>
						</v-flex>
					</v-tab-item>

					<v-tab
						ripple
						v-if="product && product.length > 0"
					>Hot Sale
					</v-tab>
					<v-tab-item
						color="transparent" class="my-2">
						<v-card flat>
							<carousel 
								:per-page-custom="[[200, 2],[400, 2], [580, 3],[700,4], [900,5], [1265,6],[1439,6]]"  
								:paginationEnabled="false" 
								:navigationEnabled="true" 
								:mouseDrag="true"
								navigationNextLabel="<h1 style='font-size:35px; color:teal;'>&#8250;</h1>" navigationPrevLabel="<h1 style='font-size:35px; color:teal;'>&#8249;</h1>">
								<slide v-for="(listData, i) in product" :key="i">
									<v-card
										class="mx-auto"
										max-width="180">
										<v-img 
											:src="listData.data_barang.thumbnail" 
											aspect-ratio="1.7" 
											contain 
											height="80"
											v-on:click="detailPage(listData)" style="cursor: pointer;">
										</v-img>
										<v-card-title>
											<div>
												<v-list-tile-sub-title v-html="listData.data_barang.nama_barang"></v-list-tile-sub-title>
												
												<h5>{{listData.data_barang.price}}</h5>
											</div>
										</v-card-title>
										<div class="pa-2 text-xs-right text-lg-right">
											<v-icon @click="showcart(listData)" small color="teal">shopping_cart</v-icon>
										</div>
									</v-card>
								</slide>
							</carousel>
						</v-card>
						<v-flex class="text-xs-right text-lg-right">
							<v-btn color="teal" small dark class="mx-0" @click="pageShowProduct">Lihat Semua</v-btn>
						</v-flex>
					</v-tab-item>
					<v-tab
						ripple
						v-if="product && product.length > 0"
					>
						Best Offers
					</v-tab>
					<v-tab-item
						class="my-2"
						color="transparent" >
						<v-card flat>
							<carousel 
								:per-page-custom="[[200, 2],[400, 2], [580, 3],[700,4], [900,5], [1265,6],[1439,6]]"  
								:paginationEnabled="false" 
								:navigationEnabled="true" 
								:mouseDrag="true"
								navigationNextLabel="<h1 style='font-size:35px; color:teal;'>&#8250;</h1>" navigationPrevLabel="<h1 style='font-size:35px; color:teal;'>&#8249;</h1>">
								<slide v-for="(listData, i) in product" :key="i">
									<v-card
										class="mx-auto"
										max-width="180">
										<v-img 
											:src="listData.data_barang.thumbnail" 
											aspect-ratio="1.7" 
											contain 
											height="80"
											v-on:click="detailPage(listData)" style="cursor: pointer;">
										</v-img>
										<v-card-title>
											<div>
												<v-list-tile-sub-title v-html="listData.data_barang.nama_barang"></v-list-tile-sub-title>
												
												<h5>{{listData.data_barang.price}}</h5>
											</div>
										</v-card-title>
										<div class="pa-2 text-xs-right text-lg-right">
											<v-icon @click="showcart(listData)" small color="teal">shopping_cart</v-icon>
										</div>
									</v-card>
								</slide>
							</carousel>
						</v-card>
						<v-flex class="text-xs-right text-lg-right">
							<v-btn color="teal" dark small class="mx-0" @click="pageShowProduct">Lihat Semua</v-btn>
						</v-flex>
					</v-tab-item>
				</v-tabs>
			</v-flex>
		</v-layout>
		<v-snackbar v-model="snackbar" :top="true" color="teal">
			{{ text_snackbar }}
		</v-snackbar>
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
				snackbar: false,
				text_snackbar: null
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
							self.snackbar = true
							self.text_snackbar = "Barang berhasil dimasukkan"
							self.$root.$emit('addCart', res)
						}else {
							self.snackbar = true
							self.text_snackbar = "Barang yang anda pilih sudah ada di keranjang"
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