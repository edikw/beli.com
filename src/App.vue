<template>
	<v-app>
		<v-toolbar height="80" color="light">
			<v-layout class="mt-0">
				<v-toolbar-side-icon class="hidden-md-and-up" @click.stop="drawer = !drawer">
				</v-toolbar-side-icon>
				<v-flex xs2 align-self-center>
					<router-link to ="/" class="logoNavbar hidden-sm-and-down">
						<div class="text-center">
				        	<h1>tukuLek.com</h1>
						</div>
					</router-link>
					<router-link to="/" class="logoNavbar hidden-md-and-up">
						<div class="text-center logoSmall">
				        	<h1>tL</h1>
						</div>
					</router-link>
				</v-flex>
				<v-menu class="mr-5 hidden-sm-and-down" offset-y >
		      <v-list-tile
		        slot="activator"
		      ><v-icon class="mr-2">menu</v-icon>
		        Category
		      </v-list-tile>
		      <v-list>
		        <v-list-tile
		          v-for="(item, index) in category"
		          :key="index"
		        >
		          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
		        </v-list-tile>
		      </v-list>
		    </v-menu>
				<v-layout class="justify-center">
					<v-flex xs8 lg12>
						<v-text-field
							class="m-0 pt-0"
							flat
							label="Search"
							prepend-inner-icon="search"
							color="teal">  
						</v-text-field>
					</v-flex>
				</v-layout>

				<v-layout align-center justify-center class="hidden-sm-and-down">
					<v-menu offset-y>
						<v-badge left color="teal" slot="activator" v-if ="!avatarLogin">
				    		<span slot="badge">0</span>
				    		<v-icon
				        	medium
				        	color="teal"
				    		>
				        	shopping_cart
				    		</v-icon>
				    	</v-badge>
						<v-badge left color="teal" slot="activator" v-else>
				    		<span slot="badge" v-for="badge in dataUser">{{badge.chart.length}}</span>
				    		<v-icon
				        	medium
				        	color="teal"
				    		>
				        	shopping_cart
				    		</v-icon>
				    	</v-badge>
						<v-card v-if="!avatarLogin">
							<v-list-tile>
								<v-list-tile-title>Total barang: 0</v-list-tile-title>
							</v-list-tile>
							<v-divider light></v-divider>
							<div class="px-5">
								<v-img :src="require('./assets/cart.png')"></v-img>
							</div>
							<v-list-tile>
								<v-list-tile-title>Belum ada barang yang ditambahkan</v-list-tile-title>
							</v-list-tile>
							<v-divider light></v-divider>
								<div class="text-center">
				        			<v-btn flat color="teal" @click="pageKeranjang">Lihat Keranjang</v-btn>
								</div>
						</v-card>

						<v-card v-for="keranjang in dataUser" v-else>
							<v-list-tile>
								<v-list-tile-title>Total barang: {{keranjang.chart.length}}</v-list-tile-title>
							</v-list-tile>
							<v-divider light></v-divider>
							<div v-if="keranjang.chart.length == 0">
								<div class="px-5">
									<v-img :src="require('./assets/cart.png')"></v-img>
								</div>
								<v-list-tile>
									<v-list-tile-title>Belum ada barang yang ditambahkan</v-list-tile-title>
								</v-list-tile>
							</div>
							<v-list-tile class="py-5 px-4" v-else>
								<v-list-tile-title>Anda Memiliki {{keranjang.chart.length}} barang di keranjang</v-list-tile-title>
							</v-list-tile>
							<v-divider light></v-divider>
								<div class="text-center">
				        			<v-btn flat color="teal" @click="pageKeranjang">Lihat Keranjang</v-btn>
								</div>
						</v-card>
					</v-menu>
				</v-layout>
				<v-layout class="hidden-sm-and-down justify-center align-center" id="account" v-if="avatarLogin">
						<div class="d-flex">
							<v-menu open-on-hover offset-y>
								<v-avatar slot="activator" v-if="avatarUser">
						    		<img
						        	:src="avatarUser"
						        	tile
						     		>
						    </v-avatar>
						    <v-list class="py-0">
							    <v-list-tile
									>
										<v-icon color="teal">account_circle</v-icon>
										<v-list-tile-content class="ml-2" v-on:click="profile" style="cursor: pointer;">
											<v-list-tile-title>Profile</v-list-tile-title>
										</v-list-tile-content>
									</v-list-tile>
									<v-list-tile
									>
										<v-icon color="teal">shopping_cart</v-icon>
										<v-list-tile-content class="ml-2">
											<v-list-tile-title>Keranjang</v-list-tile-title>
										</v-list-tile-content>
									</v-list-tile>

									<v-list-tile
									>
										<v-icon color="teal">history</v-icon>
										<v-list-tile-content class="ml-2">
											<v-list-tile-title>History pesanan</v-list-tile-title>
										</v-list-tile-content>
									</v-list-tile>

									<v-list-tile
									>
										<v-icon color="teal">settings</v-icon>
										<v-list-tile-content class="ml-2">
											<v-list-tile-title>Setting</v-list-tile-title>
										</v-list-tile-content>
									</v-list-tile>
									<v-divider light></v-divider>
									<v-list-tile v-on:click="logout">
										<v-icon color="red accent-4">logout</v-icon>
										<v-list-tile-content class="ml-2">
											<v-list-tile-title>Logout</v-list-tile-title>
										</v-list-tile-content>
									</v-list-tile>
								</v-list>
					    </v-menu>
					    <div class="d-inline-block ml-2" v-for="name in dataUser">
							<p caption class="mb-0">Hay,</p><p class="mb-0" style="color: teal;">{{name.username}}</p>
					    </div>
						</div>
				</v-layout>

				<div class="hidden-md-and-down justify-center" v-else>
					<v-dialog max-width="400px" v-model="dialog">
						<v-btn
							slot="activator"
							color="teal lighten -3"
							depressed
							outline
						>Login</v-btn>
						<v-card>
							<div class="text-center py-4 logo">
					        	<h1>tukuLek.com</h1>
							</div>
					        <v-card-title class="py-0 px-0" style="justify-content: center;">
					        	<span class="headline text-center">Login</span>
					        </v-card-title>
					        <v-card-text>
					        	<v-container grid-list py-0>
					            	<v-layout wrap>
					            		<v-flex lg12>
					                		<v-text-field label="Email" required  v-model="email" color="teal"></v-text-field>
					              		</v-flex>
					              		<v-flex xs12>
					                		<v-text-field
								            :append-icon="show2 ? 'visibility_off' : 'visibility'"
								            :type="show2 ? 'password' : 'text'"
								            name="input-10-2"
								            label="Password"
								            hint="At least 8 characters"
								            class="input-group--focused"
								            color="teal"
								            v-model="passwordLogin"
								            v-on:keyup.enter="loginUser"
								            @click:append="show2 = !show2"
									        ></v-text-field>
					            		</v-flex>
								        <v-card-title class="px-0 py-0">
								          <span style="color: #FF5252; cursor: pointer;">Lupa Password?</span>
								        </v-card-title>
					            	</v-layout>
					        	</v-container>
					        </v-card-text>

				          <v-spacer></v-spacer>
					        <v-card-title>
					          <v-btn color="teal lighten-3" dark block v-if="logingIn">Loging in</v-btn>
					          <v-btn color="teal" dark block @click="loginUser" v-else>Login</v-btn>
					        </v-card-title>
					        <v-card-title class="justify-center">
					          <p>Create your account in</p><p class="ml-1" style="color: teal; cursor: pointer;" @click="createSignup">Here</p>
					        </v-card-title>

					    </v-card>
					</v-dialog>

					<v-dialog max-width="400px" v-model="dialogDaftar">
						<v-btn
							color="teal"
							dark
							depressed
							slot="activator"
						>
						Daftar
						</v-btn>
						<v-card>
							<div class="text-center py-4 logo">
					        	<h1>tukuLek.com</h1>
							</div>
					        <v-card-title class="py-0 px-0" style="justify-content: center;">
					        	<span class="headline text-center">Daftar</span>
					        </v-card-title>
					        <v-card-text>
					        	<v-container grid-list py-0>
					            	<v-layout wrap>
					            		<v-flex lg12>
					                		<v-text-field 
							                label="User name" 
							                required  
							                v-model="username" 
							                color="teal"
							                :rules="nameRules">
					                		</v-text-field>
					              		</v-flex>
					            		<v-flex lg12>
					                		<v-text-field label="Email" required  v-model="email" color="teal" type="email" :rules="emailRules" required></v-text-field>
					            		</v-flex>
					            		<v-flex lg12>
					                		<v-text-field
								            :append-icon="show2 ? 'visibility_off' : 'visibility'"
								            :type="show2 ? 'password' : 'text'"
								            :rules="[rules.required, rules.min]"
								            name="input-10-2"
								            label="Password"
								            hint="At least 8 characters"
								            class="input-group--focused"
								            color="teal"
								            required
								            v-model="password"
								            v-on:keyup.enter="register"
								            @click:append="show2 = !show2"
								        	></v-text-field>
					              		</v-flex>
					            	</v-layout>
					        	</v-container>
					        </v-card-text>
				        	<v-spacer></v-spacer>
					        <v-card-title>
					        	<v-btn color="teal lighten-3" dark block v-if="mendaftar">Mendaftar</v-btn>
					        	<v-btn color="teal" dark block @click="register" v-else>Daftar</v-btn>
					        </v-card-title>
			      </v-card>
					</v-dialog>
				</div>
			</v-layout>
		</v-toolbar>
			<v-navigation-drawer
				v-model="drawer"
				:mini-variant="mini"
				absolute
				dark
				temporary
			>
				<v-layout justify-end>
					<v-list-tile @click.stop="mini = !mini">
						<v-icon>chevron_left</v-icon>
					</v-list-tile>
					<v-list-tile v-if="mini" @click.stop="mini = !mini">
						<v-list-tile-action>
							<v-icon>chevron_right</v-icon>
						</v-list-tile-action>
					</v-list-tile>
				</v-layout>
				<v-divider light></v-divider>
				<v-list class="py-3" v-show="!mini && showlogin" v-if="!avatarLogin">
					<v-list-tile >
						<v-btn 
							depressed 
							large 
							color="teal" @click="createLogin">
							Login
						</v-btn>
						<v-btn 
							depressed 
							large @click="createSignup">
							Daftar
						</v-btn>
					</v-list-tile>
				</v-list>
				<v-list v-if="avatarLogin">
					<v-list-tile avatar tag="div">
						<v-list-tile-avatar>
							<img :src="avatarUser">
						</v-list-tile-avatar>
						<v-list-tile-content v-for="name in dataUser">
							<v-list-tile-title>{{name.username}}</v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>
				</v-list>
				<v-list class="pt-0" dense  v-if="avatarLogin">
				<v-divider light></v-divider>
					<v-list-tile
					>
						<v-list-tile-action>
							<v-icon color="teal lighten-3">account_circle</v-icon>
						</v-list-tile-action>

						<v-list-tile-content>
							<v-list-tile-title>Profile</v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>
					<v-list-tile
					>
						<v-list-tile-action>
							<v-icon color="teal lighten-3">shopping_cart</v-icon>
						</v-list-tile-action>

						<v-list-tile-content>
							<v-list-tile-title>Keranjang</v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>

					<v-list-tile
					>
						<v-list-tile-action>
							<v-icon color="teal lighten-3">history</v-icon>
						</v-list-tile-action>

						<v-list-tile-content>
							<v-list-tile-title>History pesanan</v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>

					<v-list-tile
					>
						<v-list-tile-action>
							<v-icon color="teal lighten-3">settings</v-icon>
						</v-list-tile-action>

						<v-list-tile-content>
							<v-list-tile-title>Setting</v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>

					<v-list-tile
					>
						<v-list-tile-action>
							<v-icon color="teal lighten-3">settings</v-icon>
						</v-list-tile-action>

						<v-list-tile-content v-on:click="logout">
							<v-list-tile-title>Logout</v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>

				</v-list>
				<v-list v-show="!mini">
					<v-list-group
						value="true"
					>
						<v-list-tile slot="activator">
							<v-list-tile-title class="font-weight-bold">Kategori</v-list-tile-title>
						</v-list-tile>
						<v-list-tile 
						v-for=" cat in category" 
							:key ="cat.title">
								<v-list-tile-title class="px-5">{{cat.title}}</v-list-tile-title>
						</v-list-tile>
					</v-list-group>
				</v-list>
			</v-navigation-drawer>

		<router-view :key="$route.fullPath" />

		<v-card flat class="hidden-md-and-up">
			<v-bottom-nav
				:value="true"
				color="transparent"
			>
				<v-btn
					color="purple"
					flat
					value="home"
				>
					<span>Home</span>
					<v-icon>home</v-icon>
				</v-btn>

				<v-btn
					color="purple"
					flat
					value="pesanan"
				>
					<span>Pesanan</span>
					<v-icon>history</v-icon>
				</v-btn>

				<v-btn
					color="purple"
					flat
					value="keranjang"
				>
					<span>Keranjang</span>
					<v-icon>shopping_cart</v-icon>
				</v-btn>

				<v-btn
					color="purple"
					flat
					value="akun"
				>
					<span>Akun</span>
					<v-icon>account_circle</v-icon>
				</v-btn>
			</v-bottom-nav>
		</v-card>
		<v-footer
		    height="auto"
		    color="grey darken-4"
		    class="hidden-sm-and-down"
	  	>
	    <v-layout
	      justify-center
	      row
	      wrap
	    >
	      <v-btn
	        v-for="link in links"
	        :key="link"
	        color="white"
	        flat
	        round
	      >
	        {{ link }}
	      </v-btn>
	      <v-flex
	        
	        py-3
	        text-xs-center
	        white--text
	        xs12
	      >
	        &copy;2019 | <p class="d-inline-block">Edi kurniawan wibowo</p>
	      </v-flex>
	    </v-layout>
	  </v-footer>
	</v-app>
</template>

<script>
import router from './router'
import axios from 'axios'


const urlApi = 'http://192.168.2.230:3000/'

const url ={
	urlRegister : urlApi + 'register',
	urlLogin: urlApi + 'login',
	urlUserId: urlApi + 'users/',
	urlBanner: urlApi + 'banner',
	urlProduct: urlApi + 'product',
	urlProductId: urlApi + 'product/',
	urlCartId: urlApi + 'user/chart/',
	urlGetCartId: urlApi + 'chart/user/',
	urlPostPembayaran: urlApi + 'user/transaksi/',
	urlGetIdTransaksi: urlApi + 'transaksi/'
}

export default {
	name: 'App',
	data () {
		return {
			url : url,
			avatarLogin : false,
			showlogin: true,
			drawer: null,
			loader: null,
			loading1: false,
			loading2: false,
			items: [
				{ title: 'Profile', icon: 'account_circle' },
				{ title: 'Keranjang', icon: 'shopping_cart' },
				{ title: 'History pesanan', icon: 'history' },
				{ title: 'Setting', icon: 'settings' },
				{ title: 'Logout', icon: 'settings' }
			],
			mini: false,
			right: null,
			category: [
					{title: 'Memancing'},
					{title: 'Memasak'},
					{title: 'Menjahit'},
					{title: 'Melamun'},
					{title: 'Menggonggong'},
					{title: 'Mencangkul'},
			],
			dialog: false,
			dialogDaftar: false,
			nameUser: '',
			avatarUser: require('./assets/foto_size.png'),
			username: '',
			passwordLogin: '',
			nameRules: [
		        v => !!v || 'Name is required',
		        v => v.length <= 10 || 'Name must be less than 10 characters'
	      	],
			password: '',
			rules: {
	          required: value => !!value || 'Required.',
	          min: v => v.length >= 8 || 'Min 8 characters',
	          emailMatch: () => ('The email and password you entered don\'t match')
	        },
			email: '',
			emailRules: [
		        v => !!v || 'E-mail is required',
		        v => /.+@.+/.test(v) || 'E-mail must be valid'
	      	],
	        show2: true,
	        links: [
		        'Home',
		        'About Us',
		        'Services',
		        'Contact Us'
	      	],
	      	logingIn: false,
	      	mendaftar: false,
	      	jumlahCart: [],
	      	dataUser: []
		}
	},
	mounted(){
		var self = this;

		if(localStorage.getItem('token')){
			this.avatarLogin = true;
			this.getDataUserId()
		}
		
		this.$root.$on('addCartShow', function(a){
			if(self.dialog == false){
				self.dialog = true;
			}
		});
		this.$root.$on('addCartShowPopular', function(a){
			if(self.dialog == false){
				self.dialog = true;
			}
		});

		this.$root.$on('addCart', function(a){
			if(localStorage.getItem('token')){
				self.getDataUserId();
			}
		})
	},
	methods: {
		profile(){
			var id = localStorage.getItem('id')
			this.$router.push({
				name: 'profile',
				path: '/profile/',
				params: {idUser: id}
			});
		},
		register(){
			if(this.username !='' && this.email != '' && this.password != '') {
				this.mendaftar = true;

				var dataRegister = {
					username: this.username,
					email: this.email,
					password: this.password
				}

				axios.post(this.url.urlRegister, dataRegister).then(res => {
					if(res.status == 200){
						this.mendaftar = false;
						this.dialog = true;
						this.dialogDaftar = false;
						this.reset();
					}else {
						this.mendaftar = false;
					}
				}).catch(e => {
					this.mendaftar = false;
				})
			}
		},
		loginUser(){
			if(this.email != '' && this.passwordLogin != ''){
				this.logingIn = true;
				var dataLogin = {
					email: this.email,
					password: this.passwordLogin
				}
				axios.post(this.url.urlLogin, dataLogin).then(res => {
					if(res.status == 200){
						this.logingIn = false;
						localStorage.setItem('id', res.data.id)
						 localStorage.setItem('token', res.data.token);
						 this.avatarLogin = true;
						 this.getDataUserId();

					}else {
						this.logingIn = false;
					}
				}).catch(e => {
					this.logingIn = false;
				})
			}
		},
		createSignup(){
			this.dialog = false;
			this.dialogDaftar = true;
			this.reset();

		},
		createLogin(){
			this.dialog = true;
			this.reset();
		},
		logout(){
			localStorage.removeItem('token');
			localStorage.removeItem('id');
			this.avatarLogin = false;
			this.dialog = false;
			this.reset();
			this.$router.push('/')

		},
		getDataUserId(){
			this.dataUser = [];
			var id = localStorage.getItem('id')
			axios.get(this.url.urlUserId + id).then(res => {
				if(res.status == 200) {
					this.dataUser.push(res.data.result);
				}
			})
		},
		pageKeranjang(){
			var id = localStorage.getItem('id')
			
			if(localStorage.getItem('id')){
				if(this.$route.name != 'keranjang'){
					this.$router.push({
						name: 'keranjang',
						path: '/keranjang',
						params: {idUser: id}
					});
				}else {
					this.$router.push({
						params: {idUser: id}
					})
				}
			}else {
				this.createLogin();
			}
		},
		reset(){
			this.username = ''
			this.password = ''
			this.passwordLogin = ''
			this.email = ''
		},
		getData(url, callback){
			axios.get(url).then(res => {
				callback(res)
			});
		},
		postData(url, data, callback){
			var token = localStorage.getItem('token')

			var params = {
				headers: {
					'Content-Type': 'application/json',
					'x-access-token': token
				}
			}

			axios.post(url, data).then(res => {
				callback(res)
			}).catch(e => {
				callback(e);
			});
		},
		delete(url, callback){
			var token = localStorage.getItem('token')
			var params = {
				headers: {
					'Content-Type': 'application/json',
					'x-access-token': token
				}
			}
			axios.delete(url, params).then(res => {
				callback(res)
			}).catch(e => {
				callback(e)
			});
		},
		updateData(url, data, callback){
			var token = localStorage.getItem('token')
			var params = {
				headers: {
					'Content-Type': 'application/json',
					'x-access-token': token
				}
			}
			axios.put(url, data, params).then(res => {
				callback(res)
			}).catch(e => {
				callback(e)
			});
		}
	},
	watch: {
			loader () {
				const l = this.loader
				this[l] = !this[l]

				setTimeout(() => (this[l] = false), 3000)

				this.loader = null
			}
	}
}
</script>
<style>
* {
	font-family: sans-serif;
}
	.d {
		animation: loader 1s infinite;
		display: flex;
	}
	@-moz-keyframes loader {
		from {
			transform: rotate(0);
		}
		to {
			transform: rotate(360deg);
		}
	}
	@-webkit-keyframes loader {
		from {
			transform: rotate(0);
		}
		to {
			transform: rotate(360deg);
		}
	}
	@-o-keyframes loader {
		from {
			transform: rotate(0);
		}
		to {
			transform: rotate(360deg);
		}
	}
	@keyframes loader {
		from {
			transform: rotate(0);
		}
		to {
			transform: rotate(360deg);
		}
	}

	.d1 {
		animation: loader 1s infinite;
		display: flex;
	}
	@-moz-keyframes loader {
		from {
			transform: rotate(0);
		}
		to {
			transform: rotate(360deg);
		}
	}
	@-webkit-keyframes loader {
		from {
			transform: rotate(0);
		}
		to {
			transform: rotate(360deg);
		}
	}
	@-o-keyframes loader {
		from {
			transform: rotate(0);
		}
		to {
			transform: rotate(360deg);
		}
	}
	@keyframes loader {
		from {
			transform: rotate(0);
		}
		to {
			transform: rotate(360deg);
		}
	}
	aside{
		width: 282px;
	}
	.theme--light.v-input:not(.v-input--is-disabled) input, .theme--light.v-input:not(.v-input--is-disabled) textarea {
		font-size: small;
	}
	#account p{
		font-family: 'Montserrat', sans-serif;
	}
	div .text-center {
		text-align: center;
	}
	.logo h1{
		font-weight: bold;
		color: teal;
	}
	.logoNavbar h1 {
		margin-bottom: 5px;
		font-weight: bold;
		color: teal;
		font-size: 25px;
	}
	.logoNavbar{
		text-decoration: none;
	}
	a {
		text-decoration: none;
	}
	.logoSmall{
		border: 2px solid teal;
		background: teal;

	}
	.logoSmall h1 {
		margin: 0;
		color: #fff;
	}
</style>