<template>
  <ul class="catalog__list">
    <ProductItem :product="product" v-for="(product, index) in products" :key="index"></ProductItem>
  </ul>
</template>

<script>
import ProductItem from '@/components/ProductItem.vue';

export default {
  name: 'ProductList',
  props: ['products'],
  components: { ProductItem },
};
</script>

<style scoped>

</style>
