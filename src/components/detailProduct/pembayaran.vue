<template>
	<v-container>
		<v-layout row justify-center class="hidden-xs-only">
			<v-flex sm12 lg12>
				<div class="pb-4">
					<h3 style="color: teal;">Bank Transfer</h3>
				</div>
				<v-flex d-flex>
					<v-card v-for="(img, i) in images" max-width="100" :key="i">
						<v-img :src="img.image" aspect-ratio="1.5" contain />
					</v-card>
				</v-flex>
			</v-flex>
		</v-layout>
		<!-- MOBILE -->
		<v-layout row justify-center class="hidden-sm-and-up">
			<v-flex xs12>
				<div class="pb-3">
					<p class="text-lg-left subheading ma-0" style="color: teal;">Bank Transfer</p>
				</div>
				<v-flex d-flex>
					<v-card v-for="(img, i) in images" max-width="100" :key="i">
						<v-img :src="img.image" aspect-ratio="1.5" contain />
					</v-card>
				</v-flex>
			</v-flex>
		</v-layout>
	</v-container>
</template>
<script>
	export default {
		data(){
			return {
				images: [{
					image: require('../../assets/BRI.png')
				},
				{
					image: require('../../assets/mandiri.jpg')
				},
				{
					image: require('../../assets/bni.png')
				}
				]
			}
		}
	}
</script>