<template>
    <v-container>
      <v-tabs
        color="transparent"
        slider-color="teal"
      >
        <v-tab
          v-for="(listTitle, n) in description"
          :key="n"
          ripple
        >
          {{listTitle.title}}

        </v-tab>
        <v-tab-item
        >
          <v-card flat>
            <v-card-text>{{ dataDescription }}</v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item
        >
          <v-card flat>
            <v-card-text>{{ informasi }}</v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item
        >
          <v-card flat>
            <v-card-text>{{ ketentuan }}</v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>

      <v-flex class="text-center text-lg-right">
        <p class="mb-0 d-inline-block mr-2">Anda Berminat?</p>
        <v-btn color="teal" dark class="mx-0">Beli Sekarang</v-btn>
      </v-flex>
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
        }
        ],
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
      },
      // next () {
      //   const active = parseInt(this.active)
      //   this.active = (active < 2 ? active + 1 : 0)
      // }
    }
  }
</script>
