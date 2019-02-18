import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import DetailProduct from './views/detailProduct.vue'
import Keranjang from './views/Keranjang.vue'
import ShowProduct from './views/ShowProduct.vue'
import Pembayaran from './views/Pembayaran.vue'
import Pembelian from './views/Pembelian.vue'
import Profile from './views/Profile.vue'
 
Vue.use(Router)

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/detail-product/:name',
      name: 'detail',
      component: DetailProduct
    },
    {
      path: '/keranjang/:idUser',
      name: 'keranjang',
      component: Keranjang
    },
    {
      path: '/product',
      name: 'show-product',
      component: ShowProduct
    },
    {
      path: '/pembelian/:idBarang',
      name: 'pembelian',
      component: Pembelian
    },
    {
      path: '/pembayaran/:idTransaksi',
      name: 'pembayaran',
      component: Pembayaran
    },
    {
      path: '/profile/:idUser',
      name: 'profile',
      component: Profile
    }
  ]
});

export default router
