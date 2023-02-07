<template>
  <main class="content container spinner spinner-page" v-if="cartLoading"></main>
  <main class="content container" v-else-if="cartLoadFailed">Не удалось загрузить корзину!</main>
  <main class="content container" v-else>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" href="#" :to="{ name: 'main' }">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" href="#" :to="{ name: 'cart' }">
            Корзина
          </router-link>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{ products.length }} товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <CartItem v-for="item in products" :key="item.productId" :item="item"/>
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ totalPrice | numberFormat }} ₽</span>
          </p>
          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
      </form>
    </section>
  </main>
</template>

<script>

import CartItem from '@/components/CartItem.vue';
import numberFormat from '@/helpers/numberFormat';
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      cartLoading: false,
      cartLoadFailed: false,
    };
  },
  name: 'CartPage',
  components: { CartItem },
  filters: {
    numberFormat,
  },
  computed: {
    ...mapGetters({ products: 'cartDetailProducts', totalPrice: 'cartTotalPrice' }),
  },
  methods: {
    ...mapActions(['loadCart']),

    displayCartPagePreloader() {
      this.cartLoading = true;
      this.cartLoadFailed = false;

      this.loadCart()
        .then(() => {
          this.cartLoading = false;
        });
    },
  },
  created() {
    this.displayCartPagePreloader();
  },
};
</script>

<style scoped>

</style>
