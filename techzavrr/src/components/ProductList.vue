<template>
  <ul class="catalog__list">
    <ProductItem :product="product" v-for="product in products" :key="product.id"></ProductItem>
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
