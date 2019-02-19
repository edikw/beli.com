<template>
    <v-container>
        <v-tabs
            color="transparent"
            slider-color="teal">
            <v-tab
                v-for="(listTitle, n) in description"
                :key="n"
                ripple>
                {{listTitle.title}}
            </v-tab>
            <v-tab-item>
                <v-card flat>
                    <v-card-text>{{ dataDescription }}</v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                    <v-card-text>{{ informasi }}</v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                    <v-card-text>{{ ketentuan }}</v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs>
    </v-container>
</template>
    
<script>
    export default {
        data () {
            return {
                description: [{
                    title: 'Description'
                },
                {
                    title: 'Informasi'
                },
                {
                    title: 'Ketentuan'
                }],
                dataDescription: [],
                informasi: [],
                ketentuan: []
            }
        },
        mounted(){
            var self = this
          
            this.$root.$on('description', function(product) {
                self.filterData(product);
            });
        },
        methods: {
            filterData(data){
                this.dataDescription = data.description
                this.informasi = data.informasi
                this.ketentuan = data.ketentuan   
            }
        }
    }
</script>
