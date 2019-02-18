<template>
	<v-container>
		<h2>Profile</h2>
		<v-card>
			<div class="pa-3" style="background-color: #eee;">
				<h3 style="font-weight: normal;">Akun Saya</h3>
			</div>
			<v-card-title>
				<v-flex xs12 class="text-center py-5">
					<v-avatar
			          size="100"
			        >
			          <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png" alt="avatar">
			        </v-avatar>
				</v-flex>
				<v-layout row justify-center>
				<v-flex xs12 lg4 class="text-center">
					<v-flex>
				        <v-text-field
				           outline
				           disabled
				        ></v-text-field>
					</v-flex>
			    	<v-flex>
			          <v-text-field
			            label="Solo"
			            solo
			          ></v-text-field>
			        </v-flex>
			    	<v-flex>
			          <v-text-field
			            label="Solo"
			            solo
			          ></v-text-field>
			        </v-flex>
			    	<v-flex>
			          <v-text-field
			            label="Solo"
			            solo
			          ></v-text-field>
			        </v-flex>
					<v-flex>
			          <v-text-field
			            label="Solo"
			            solo
			          ></v-text-field>
			        </v-flex>
				</v-flex>
				</v-layout>
			</v-card-title>
		</v-card>
	</v-container>
</template>