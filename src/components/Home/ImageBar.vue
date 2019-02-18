<template>
  <v-container grid-list>
    <v-layout row wrap justify-center>
        <v-flex xs12 sm12 md8 class="d-inline-block pb-1 pb-lg-0">
         <v-card>
            <v-img
              class="white--text"
              max-height="250px"
              :src="require('../../assets/bannerimg.jpg')" aspect-ratio="2"
            >
            <v-layout fill-height align-end pa-3>
              <v-flex xs12 flexbox class="d-block">
                <span class="headline">Top 10 Australian beaches</span>
                <div class="m-0">
                  <v-btn outline color="teal" class="mx-0">View Colections</v-btn>
                </div>
              </v-flex>
            </v-layout>
            </v-img>
          </v-card>
        </v-flex>
        <v-flex xs12 sm12 md4 lg4 class="d-inline-block pl-lg-1">
          <v-layout row wrap>
            <v-flex d-flex class="pb-1">
             <v-card>
                <v-img
                  class="white--text"
                  max-height="124px"
                  :src="require('../../assets/bannerimg2.jpg')" aspect-ratio="2"
                >
                <v-layout fill-height align-end pa-3>
                  <v-flex xs12 flexbox class="d-block">
                    <span class="headline">Top 10 Australian beaches</span>
                    <div class="m-0">
                      <v-btn outline color="teal" class="mx-0">View Colections</v-btn>
                    </div>
                  </v-flex>
                </v-layout>
                </v-img>
              </v-card>
            </v-flex>
            <v-flex d-flex>
              <v-card>
                <v-img
                  class="white--text"
                  max-height="124px"
                  :src="require('../../assets/gambar1.jpg')" aspect-ratio="2"
                >
                <v-layout fill-height align-end pa-3>
                  <v-flex xs12 flexbox class="d-block">
                    <span class="headline">Top 10 Australian beaches</span>
                    <div class="m-0">
                      <v-btn outline color="teal" class="mx-0">View Colections</v-btn>
                    </div>
                  </v-flex>
                </v-layout>
                </v-img>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    data: () => ({
      lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`
    })
  }
</script>