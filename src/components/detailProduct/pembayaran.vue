<template>
	<v-container>
		<v-layout row justify-center>
			<v-flex xs10 lg12>
				<div class="pb-4">
					<h3 style="color: teal;">Bank Transfer</h3>
				</div>
				<v-flex d-flex>
					<v-card v-for="img in images" max-width="100">
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