import Vue from 'vue'
import App from './App.vue'
import './plugins/vuetify'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import VueCarousel from 'vue-carousel';
 
 
Vue.use(VueCarousel,VueAxios, axios);


Vue.component('font-awesome-icon', FontAwesomeIcon)
library.add(fas)

Vue.config.productionTip = false


var url = App.data().url

var data = {
	banner: null,
	product: null
}

var dataCount = 0;
var dataLength = 2;

function checkData(){
	if(dataCount === dataLength){
		renderApp();
	}
}

window.onload = (()=> {
	getBanner();
	getProduct();
})();

function getBanner(){
	App.methods.getData(url.urlBanner, function(res){
		if(res.status == 200){
			data.banner = res.data
			dataCount++;
			checkData();
		}
	});
}

function getProduct(){
	App.methods.getData(url.urlProduct, function(res){
		if(res.status == 200){
			data.product = res.data;
			dataCount++;
			checkData();
		}
	})
}


function renderApp(){
	new Vue({
	  router,
	  data: () => {return data},
	  render: h => h(App)
	}).$mount('#app')
}

