<template>
  <div class="form__counter">
    <button type="button" aria-label="Убрать один товар" @click.prevent="decrement">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>
    <!--eslint-disable-next-line-->
    <input type="text" v-model="amount" @change="changeAmount">

    <button type="button" aria-label="Добавить один товар" @click.prevent="increment">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'ProductCount',
  props: ['productAmount'],
  data() {
    return {
      amount: this.productAmount,
    };
  },
  methods: {
    changeAmount() {
      this.$emit('update:productAmount', +this.amount);
    },

    increment() {
      this.amount += 1;
      this.changeAmount();
    },
    decrement() {
      this.amount -= 1;
      this.changeAmount();
    },
  },
};
</script>
