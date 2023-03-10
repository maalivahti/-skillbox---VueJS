<template>
    <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" href="#" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" href="#" :to="{name: 'cart'}">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" href="#" :to="{name: 'order'}">
            Оформление заказа
          </router-link>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{ cartProductsData.length }} товара
      </span>
    </div>
    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">
            <base-form-text title="ФИО"
                            placeholder="Введите ваше полное имя"
                            :error="formError.name"
                            v-model="formData.name"/>

            <base-form-text title="Адрес доставки"
                            placeholder="Введите ваш адрес"
                            :error="formError.address"
                            v-model="formData.address"/>
            <base-form-text type="tel"
                            title="Телефон"
                            placeholder="Введите ваш телефон"
                            :error="formError.phone"
                            v-model="formData.phone"/>

            <base-form-text type="email"
                            title="Email"
                            placeholder="Введи ваш Email"
                            :error="formError.email"
                            v-model="formData.email"/>
            <base-form-textarea title="Комментарий к заказу"
                                placeholder="Ваши пожелания"
                                :error="formError.comment"
                                v-model="formData.comment" />
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
<!--                eslint-disable-next-line -->
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="0" checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
<!--                eslint-disable-next-line -->
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
<!--                eslint-disable-next-line -->
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
<!--                eslint-disable-next-line -->
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders" v-for="item in cartProductsData" :key="item.id">
            <li class="cart__order">
              <h3>{{ item.product.title }}</h3>
              <b>{{ (item.product.price * item.quantity) | numberFormat }} ₽</b>
              <span>Артикул: {{ item.id }}</span>
            </li>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>{{ cartProductsData.length }}</b> товара на сумму <b>{{ totalPrice | numberFormat }} ₽</b></p>
          </div>

          <button class="cart__button button button--primery" type="submit" :disabled="orderSending">
            Оформить заказ
            <div class="spinner spinner-button" v-show="orderSending"></div>
          </button>
          <div class="spinner spinner-button" v-show="orderSending"></div>
        </div>
        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import BaseFormText from '@/components/BaseFormText.vue';
import BaseFormTextarea from '@/components/BaseFormTextarea.vue';
import numberFormat from '@/helpers/numberFormat';
import { mapGetters } from 'vuex';
import axios from 'axios';
import { API_BASE_URL } from '@/config';

export default {
  name: 'OrderPage',
  components: { BaseFormText, BaseFormTextarea },
  data() {
    return {
      cartProductsData: this.$store.state.cartProductsData,
      formData: {},
      formError: {},
      orderSending: false,
      formErrorMessage: '',
    };
  },
  filters: { numberFormat },
  computed: {
    ...mapGetters({ totalPrice: 'cartTotalPrice' }),
  },
  methods: {
    order() {
      this.formError = {};
      this.formErrorMessage = '';
      this.orderSending = true;

      new Promise((resolve) => {
        setTimeout(resolve, 2000);
      })
        .then(() => {
          axios
            .post(`${API_BASE_URL}/api/orders`, {
              ...this.formData,
            }, {
              params: {
                userAccessKey: this.$store.state.userAccessKey,
              },
            })
            .catch((error) => {
              this.formError = error.response.data.error.request || {};
              this.formErrorMessage = error.response.data.error.message;
            })
            .then((response) => {
              this.$store.commit('resetCart');
              this.$store.commit('updateOrderInfo', response.data);
              this.$router.push({ name: 'orderInfo', params: { id: response.data.id } });
            })
            .finally(() => {
              this.orderSending = false;
            });
        });
    },
  },
};
</script>
<style scoped>
  .spinner-button {
    left: -33px;
    width: 35px;
    height: 35px;
  }

  .cart__button {
    position: relative;
  }
</style>
