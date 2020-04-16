<template>
	<v-container>
		<h2 class="pb-5">Profile</h2>
			<v-flex d-flex xs12 sm8 lg7 class="ma-auto">
					<form>
						<div class="text-center pb-3">
							<h3>Akun Saya</h3>
						</div>
						<label for="username">Username</label>
						<input type="text" id="username" name="Username" v-model="dataUser.username">

						<label for="fullname">Fullname</label>
						<input type="text" id="fullname" name="Fullname" v-model="dataUser.fullname">

						<v-dialog
							ref="dialog"
							v-model="modal"
							:return-value.sync="dataUser.birthday"
							persistent
							lazy
							full-width
							width="290px">
							<v-text-field
								slot="activator"
								v-model="dataUser.birthday"
								label="Birthday"
								prepend-icon="event"
								readonly
							></v-text-field>
							<v-date-picker v-model="dataUser.birthday" scrollable color="teal">
								<v-spacer></v-spacer>
								<v-btn flat color="teal" @click="modal = false">Cancel</v-btn>
								<v-btn flat color="teal" @click="$refs.dialog.save(dataUser.birthday)">OK</v-btn>
							</v-date-picker>
						</v-dialog>

						<label for="alamat">Alamat</label>
						<input type="text" id="alamat" name="Alamat" v-model="dataUser.alamat">

						<label for="email">Email</label><br>
						<span style="font-size: 10px; color: red;" v-if="alertEmail">email sudah ada</span>
						<input type="email" id="email" name="Email" v-model="dataUser.email" ref="email">

						<label for="password">Password</label>
						<input type="password" id="password" name="Password" v-model="dataUser.password">
						<div class="text-xs-right text-lg-right">
							<v-btn color="teal" dark class="ma-0" v-if="prosesSimpan">Menyimpan</v-btn>
							<v-btn color="teal" dark class="ma-0" @click="simpan" v-else>Simpan</v-btn>
						</div>
					</form>
			</v-flex>
	</v-container>
</template>

<script>
	import App from '../../App';
	export default {
		data () {
			return {
				menu: false,
				modal: false,
				urlUserId: App.data().url.urlUserId,
				dataUser: [],
				urlProfile: App.data().url.urlProfile,
				prosesSimpan: false,
				alertEmail: false
			}
		},
		mounted(){
			if(localStorage.getItem('token')){
				this.getUserId();
			}
		},
		methods: {
			async getUserId (){
				var self = this;
				var idUser = localStorage.getItem('id');

				await App.methods.getData(this.urlUserId + idUser, function(res){
					if (res.status ==200){
						self.dataUser = res.data.result
						self.dataUser.password = res.data.password
					}
				})
			},
			simpan(){
				this.prosesSimpan = true;
				var self = this;
				var id = localStorage.getItem('id');

				var dataUser = {
					username: this.dataUser.username,
					fullname: this.dataUser.fullname,
					birthday: this.dataUser.birthday,
					alamat: this.dataUser.alamat,
					email: this.dataUser.email,
					password: this.dataUser.password
				}
				App.methods.updateData(this.urlProfile + id, dataUser, function(res){
					if(res.status == 200){
						self.alertEmail = false;
						self.prosesSimpan = false;
						self.$refs.email.style.border = '1px solid #ddd'
						self.getUserId();
					}else {
						self.prosesSimpan = false
						self.$refs.email.style.border = '1px solid red'
						self.alertEmail = true;
					}
				})
			}
		}

	}
</script>

<style scoped>
input[type=text],input[type=email],input[type=password], select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type=submit] {
  width: 100%;
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=submit]:hover {
  background-color: #45a049;
}
input:focus {
	color: teal;
	outline: none;
}
</style>