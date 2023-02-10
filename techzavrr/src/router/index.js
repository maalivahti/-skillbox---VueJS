import Vue from 'vue';
import VueRouter from 'vue-router';
import MainPage from '@/Pages/MainPage.vue';
import ProductPage from '@/Pages/ProductPage.vue';
import CartPage from '@/Pages/CartPage.vue';
import NotFoundPage from '@/Pages/NotFoundPage.vue';
import OrderPage from '@/Pages/OrderPage.vue';
import OrderInfoPage from '@/Pages/OrderInfoPage.vue';

Vue.use(VueRouter);

const routes = [
  { name: 'main', component: MainPage, path: '/' },
  { name: 'product', component: ProductPage, path: '/product/:id' },
  { name: 'cart', component: CartPage, path: '/cart/' },
  { name: 'order', component: OrderPage, path: '/order/' },
  { name: 'orderInfo', component: OrderInfoPage, path: '/order/:id' },
  { name: 'notFound', component: NotFoundPage, path: '*' },
];

const router = new VueRouter({
  routes,
});

export default router;
