<template>
	<v-app>
		<v-toolbar height="80" color="light" v-on:click="exit" v-if="$route.name != 'pembelian' && $route.name != 'pembayaran'">
			<v-layout class="mt-0">
				<v-flex xs3 sm4 md2 lg2 class="d-inline-flex align-self-center">
					<v-toolbar-side-icon class="hidden-md-and-up" @click.stop="drawer = !drawer">
					</v-toolbar-side-icon>
					<v-flex align-self-center>
						<router-link to ="/" class="logoNavbar hidden-sm-and-down">
							<div class="text-center">
								<h2>Bakulanpedia</h2>
							</div>
						</router-link>
						<router-link to="/" class="logoNavbar hidden-md-and-up">
							<div class="text-center pl-2">
								<h2 class="ma-0" style="color: teal; font-size: 20px;">Bakulanpedia</h2>
							</div>
						</router-link>
					</v-flex>
				</v-flex>
				<v-flex md2 lg2 class="hidden-sm-and-down">
					<v-menu offset-y open-on-hover >
						<v-list-tile slot="activator">
							<v-icon class="mr-2">menu</v-icon>
							Kategori
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
				</v-flex>
					<v-flex xs8 sm6 md4 lg5 class="hidden-xs-only">
						<v-text-field
							solo
							label="Search"
							append-icon="search"
							color="teal darken-4"
							v-model="search"
							@click:append="searching"
							@keypress.13.prevent="searching"
						></v-text-field>
					</v-flex>
					<v-flex lg1 d-inline-flex align-center>
						<div class="text-xs-right text-sm-center text-md-right">
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
									<span slot="badge" v-for="(badge, i) in dataUser" :key="i">{{badge.chart.length}}</span>
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

								<v-card v-for="(keranjang, i) in dataUser" v-else :key="i">
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
						</div>
					</v-flex>
					<v-flex class="hidden-sm-and-down justify-center text-xs-center" id="account" v-if="avatarLogin" lg2>
						<div>
							<v-menu 
								open-on-hover
								origin="center center" 
								transition="scale-transition" 
								bottom>
								<v-avatar slot="activator" v-if="avatarUser">
									<v-flex d-flex class="text-lg-left">
										<p caption class="mb-0">Hay,</p>
										<p class="mb-0 ml-2" style="color: teal;" v-for="(name,i) in dataUser" :key="i">{{name.username}}</p>
									</v-flex>

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
										v-on:click="pageKeranjang"
									>
										<v-icon color="teal">shopping_cart</v-icon>
										<v-list-tile-content class="ml-2">
											<v-list-tile-title>Keranjang</v-list-tile-title>
										</v-list-tile-content>
									</v-list-tile>

									<v-list-tile
										v-on:click = "pageHistory"
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
						
						</div>
						</v-flex>
				<!-- </v-layout> -->

				<v-layout class="hidden-sm-and-down justify-center" v-else>
					<v-dialog max-width="400px" v-model="dialog">
						<v-btn
							slot="activator"
							color="teal lighten -3"
							depressed
							outline
						>Login</v-btn>
						<v-card>
							<div class="text-center py-4 logo">
								<h1 style="color:teal;">Bakulanpedia</h1>
							</div>
							<v-card-title class="py-0 px-0" style="justify-content: center;">
								<div class="text-center">
									<span class="headline text-center py-2">Login</span><br>
									<span class="pa-2" style="color: red;" v-if="loginGagal">Email atau Password yang anda masukkan salah</span>

								</div>
							</v-card-title>
							<v-card-text>
								<v-container grid-list py-0>
									<v-layout wrap>
										<v-flex lg12>
											<v-text-field 
												label="Email" 
												required  
												v-model="email" 
												color="teal">
											</v-text-field>
										</v-flex>
										<v-flex xs12>
											<v-text-field
												:append-icon="show2 ? 'visibility_off' : 'visibility'"
												:type="show2 ? 'password' : 'text'"
												name="input-10-2"
												label="Password"
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
								<h1 style="color:teal;">Bakulanpedia</h1>
							</div>
							<v-card-title class="py-0 px-0 text-lg-center" style="justify-content: center;">
								<span class="headline text-center">Daftar</span><br>
								<span class="px-4" style="color: red; text-align: center;" v-if="daftarGagal">Email yang Anda masukkan sudah ada. Silahkan ganti email anda</span>
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
											<v-text-field label="Email" v-model="email" color="teal" type="email" :rules="emailRules" required></v-text-field>
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
				</v-layout>
			</v-layout>
		</v-toolbar>
		<v-flex class="hidden-sm-and-up px-3 pt-2" v-if="$route.name == 'home' || $route.name == 'search'">
			<v-flex d-flex justify-center xs12>
				<v-text-field
					solo
					label="Search"
					append-icon="search"
					color="teal darken-4"
					background-color="teal lighten-3"
					v-model="search"
					@click:append="searching"
					@keypress.13.prevent="searching"
				></v-text-field>
			</v-flex>
		</v-flex>
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
				<v-list v-if="avatarLogin" class="pa-0" v-show="!mini && showlogin">
					<v-flex d-inline-flex class="py-3">
						<div class="px-3">
							<p class="ma-0" style="color: #fff; font-weight: bold;">Hai</p>
						</div>
						<div v-for="(name, i) in dataUser" :key="i">
							<p class="ma-0" style="color: #80cbc4; font-weight: bold;">{{name.username}}</p>
						</div>
					</v-flex>
				</v-list>
				<v-list class="pt-0" dense  v-if="avatarLogin">
				<v-divider light></v-divider>
					<v-list-tile
					>
						<v-list-tile-action>
							<v-icon color="teal lighten-3">account_circle</v-icon>
						</v-list-tile-action>

						<v-list-tile-content v-on:click="profile">
							<v-list-tile-title>Profile</v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>
					<v-list-tile
					>
						<v-list-tile-action>
							<v-icon color="teal lighten-3">shopping_cart</v-icon>
						</v-list-tile-action>

						<v-list-tile-content v-on:click="pageKeranjang">
							<v-list-tile-title>Keranjang</v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>

					<v-list-tile
						v-on:click="pageHistory"
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
							<v-icon color="red darken-3">logout</v-icon>
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

		<v-card flat class="hidden-md-and-up" style="position: fixed; bottom: 0; overflow: hidden; width: 100%; transition: bottom 0.3s;" id="nav">
			<v-bottom-nav
				:value="true"
				color="teal lighten-2"
			>
				<v-btn
					flat
					value="home"
					to="/"
					dark
				>
					<span>Home</span>
					<v-icon>home</v-icon>
				</v-btn>

				<v-btn
					dark
					flat
					value="pesanan"
					@click="pageHistory"
				>
					<span>Pesanan</span>
					<v-icon>history</v-icon>
				</v-btn>

				<v-btn
					dark
					flat
					value="keranjang"
					@click='pageKeranjang'
				>
					<span>Keranjang</span>
					<v-icon>shopping_cart</v-icon>
				</v-btn>

				<v-btn
					dark
					flat
					value="akun"
					@click="profile"
				>
					<span>Akun</span>
					<v-icon>account_circle</v-icon>
				</v-btn>
			</v-bottom-nav>
		</v-card>
		<v-container fluid class="pa-0 ma-0 hidden-sm-and-down" d-flex grid-list-md>
			<v-footer
				height="auto"
				color="teal">
				<v-layout class="py-3 ma-0" row wrap>
					<v-flex md3 lg3 text-lg-center text-md-center>
						<div class="pa-5">
							<h1 style="color: #fff;" class="">Bakulanpedia</h1>
						</div>
					</v-flex>
					<v-flex md2 lg2>
						<h5 class="title-footer">About Us</h5>
						<p class="title-footer-sub">privacy policy</p>
						<p class="title-footer-sub">Term</p>
						<p class="title-footer-sub">Ketentuan Pengguna</p>

					</v-flex>
					<v-flex md lg2 class="text-md-center">
						<h5 class="title-footer">Kategori</h5>
						<p class="title-footer-sub" v-for="(kategory, i) in category" :key="i">{{kategory.title}}</p>
					</v-flex>
					<v-flex md2 lg2>
						<h5 class="title-footer">connect with us</h5>
							<v-flex v-for="(img, i) in connect" d-inline-flex md2 lg2 :key="i">
								<v-img :src="img.image" width="50" class="ma-auto" />
							</v-flex>

					</v-flex>
					<v-flex lg2>
						<h5 class="title-footer">payment</h5>
						<v-flex v-for="(img ,i) in bank" d-inline-flex lg4 :key="i">
							<v-img :src="img.image" width="50" class="ma-auto" />
						</v-flex>
					</v-flex>
				</v-layout>
			</v-footer>
		</v-container>
	</v-app>
</template>

<script>
	import axios from 'axios'

	// const urlApi = 'http://192.168.2.230:3000/'
	const urlApi = 'https://backend-beli.herokuapp.com/'

	const url ={
		urlRegister : urlApi + 'register',
		urlLogin: urlApi + 'login',
		urlUserId: urlApi + 'users/',
		urlBanner: urlApi + 'banner',
		urlProduct: urlApi + 'product',
		urlProductId: urlApi + 'product/',
		urlCartId: urlApi + 'user/chart/',
		urlGetCartId: urlApi + 'chart/user/',
		urlDeleteCartId: urlApi + 'chart/user/',
		urlPostPembayaran: urlApi + 'user/transaksi/',
		urlGetIdTransaksi: urlApi + 'transaksi/',
		urlgetUserTransaksiId: urlApi + 'user/transaksi/',
		urlSearch: urlApi + 'search',
		urlProfile: urlApi + 'profile/users/'
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
				connect: [
					{image: require('./assets/facebook.png')},
					{image: require('./assets/instagram.png')},
					{image: require('./assets/twitter.png')},
					{image: require('./assets/google-plus.png')}
				],
				bank:[
					{image: require('./assets/BRI.png')},
					{image: require('./assets/mandiri.jpg')},
					{image: require('./assets/bni.png')}
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
				logingIn: false,
				mendaftar: false,
				jumlahCart: [],
				dataUser: [],
				loginGagal: false,
				search: '',
				dataResultSearch: [],
				daftarGagal: false
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
			});

			var prevScrollpos = window.pageYOffset;
			window.onscroll = function() {
			var currentScrollPos = window.pageYOffset;
				if (prevScrollpos > currentScrollPos) {
					document.getElementById("nav").style.bottom = "0";
				} else {
					document.getElementById("nav").style.bottom = "-55px";
				}
				prevScrollpos = currentScrollPos;
			}
		},
		methods: {
			searching(){
				if(this.search.length > 0){
					if(this.$route.path != '/search/'){
						this.$router.push({ name: "search", query: {keyword: this.search}});
					}else {
						this.$router.push({
							query: {keyword: this.searching}
						})
					}
				}
			},
			exit(){
				this.search = ''
			},
			pageAkun(){
				var id = localStorage.getItem('id')
				
				if(localStorage.getItem('token')){
					this.$router.push({
						name:'profile',
						path: '/profile',
						params: {idUser: id}
					})
				}else {
					this.createLogin();
				}
			},
			pageHistory(){
				var id = localStorage.getItem('id')
				
				if(localStorage.getItem('token')){
					this.$router.push({
						name:'history',
						path: '/histori-pesanan',
						params: {idUser: id}
					})
				}else {
					this.createLogin();
				}
			},
			profile(){
				var id = localStorage.getItem('id')
				if(localStorage.getItem('token')){
					this.$router.push({
						name: 'profile',
						path: '/profile/',
						params: {idUser: id}
					});
				}else {
					this.createLogin();
				}
			},
			register(){
				if(this.username !='' && this.email != '' && this.password != '') {
					this.mendaftar = true;
					this.daftarGagal = false;

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
							this.daftarGagal = false;
							this.reset();
						}else {
							this.mendaftar = false;
							this.daftarGagal = true;
						}
					}).catch(e => {
						this.mendaftar = false;
						this.daftarGagal = true;
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
							this.loginGagal = false;
							this.logingIn = false;
							localStorage.setItem('id', res.data.id)
							localStorage.setItem('token', res.data.token);
							this.avatarLogin = true;
							this.getDataUserId();

						}else {
							this.logingIn = false;
							this.loginGagal = true;
						}
					}).catch(e => {
						this.logingIn = false;
						this.loginGagal = true;
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

				axios.post(url, data, params).then(res => {
					callback(res)
				}).catch(e => {
					callback(e);
				});
			},
			deleteData(url, data, callback){
				var token = localStorage.getItem('token')
				var params = {
					headers: {
						'Content-Type': 'application/json',
						'x-access-token': token
					}
				}
				axios.delete(url, data, params).then(res => {
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
	.logo h2{
		font-weight: bold;
		color: teal;
	}
	.logoNavbar h2 {
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
	/*.logoSmall{
		border: 2px solid teal;
		background: teal;

	}
	.logoSmall h1 {
		margin: 0;
		color: #fff;
	}*/
	.title-footer{
		text-align: left;
		color: #fff;
		font-weight: normal;
		font-size: 17px
	}
	.title-footer-sub{
		text-align: left;
		color: #fff;
		font-size: 12px;
		font-style: italic;
		margin: 0px;
	}
</style>