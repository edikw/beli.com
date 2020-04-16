import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import DetailProduct from './views/detailProduct.vue'
import Keranjang from './views/Keranjang.vue'
import ShowProduct from './views/ShowProduct.vue'
import Pembayaran from './views/Pembayaran.vue'
import Pembelian from './views/Pembelian.vue'
import Profile from './views/Profile.vue'
import History from './views/History.vue'
import Search from './views/Search.vue'
 
Vue.use(Router)

var sitename = 'Beli';

function sitetitle(route){
  return sitename + ' - ' + route;

}

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: sitetitle('Home')
      }
    },
    {
      path: '/detail-product/:name',
      name: 'detail',
      component: DetailProduct,
      meta: {
        title: sitetitle('Detail-Produk')
      }
    },
    {
      path: '/keranjang/:idUser',
      name: 'keranjang',
      component: Keranjang,
      meta: {
        title: sitetitle('Keranjang')
      }
    },
    {
      path: '/product',
      name: 'show-product',
      component: ShowProduct,
      meta: {
        title: sitetitle('Produk')
      }
    },
    {
      path: '/pembelian/:idBarang',
      name: 'pembelian',
      component: Pembelian,
      meta: {
        title: sitetitle('Pembelian')
      }
    },
    {
      path: '/pembayaran/:idTransaksi',
      name: 'pembayaran',
      component: Pembayaran,
      meta: {
        title: sitetitle('Pembayaran')
      }
    },
    {
      path: '/profile/:idUser',
      name: 'profile',
      component: Profile,
      meta: {
        title: sitetitle('Profile')
      }
    },
    {
      path: '/histori-pesanan/:idUser',
      name: 'history',
      component: History,
      meta: {
        title: sitetitle('Histori')
      }
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
      meta: {
        title: sitetitle('Search')
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
  // const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
  if(nearestWithTitle) document.title = nearestWithTitle.meta.title;
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));
  if(!nearestWithMeta) return next();
  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta');
    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key]);
    });
    tag.setAttribute('data-vue-router-controlled', '');
    return tag;
  })
  .forEach(tag => document.head.appendChild(tag));

  next();
});

export default router
