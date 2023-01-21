<template>
  <li class="catalog__item">
    <router-link class="catalog__pic" href="#" :to="{name: 'product', params: {id: product.id}}">
      <img :src="product.image" :alt="product.title">
    </router-link>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
        {{ product.price | numberFormat }} ₽
    </span>

    <ul class="colors colors--black">
      <li class="colors__item" v-for="color in product.colors" :key="color">
        <!--eslint-disable-next-line-->
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio"
                 :value="color"
                  v-model="activeColor">
          <span class="colors__value" :style="{backgroundColor: color, }"></span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
import gotoPage from '@/helpers/gotoPage';
import numberFormat from '@/helpers/numberFormat';

export default {
  name: 'ProductItem',
  props: ['product'],
  data() {
    return {
      activeColor: '#73B6EA',
    };
  },
  filters: {
    numberFormat,
  },
  methods: {
    gotoPage,
  },
};
</script>
