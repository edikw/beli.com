<template>
	<v-container>
		<div class="hidden-sm-and-down" v-if="banner && banner.length > 0">
			<v-img :src="banner[3].banner.thumbnail"  height="200">
				<v-layout fill-height align-center pa-3>
            		<v-flex style="color: #000;">
                		<span class="headline font-weight-bold">Temukan Barang mu disini</span>
            		</v-flex>
            		<v-flex class="text-lg-right" style="color: #000;">
            			<span class="headline d-block font-weight-bold">HARGA MULAI</span>
            			<span class="headline font-weight-bold">RP.10.000</span>
            		</v-flex>
            	</v-layout>
			</v-img>
		</div>
	</v-container>
</template>

<script>
	export default {
    data () {
		return {
			banner: null
		}
    },
    mounted(){
    	this.banner = this.$router.app.banner
    }
  }
</script>