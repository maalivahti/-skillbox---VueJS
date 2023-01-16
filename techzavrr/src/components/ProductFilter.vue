<template>
  <aside class="filter">
        <h2 class="filter__title">Фильтры</h2>

        <form class="filter__form form" action="#" method="get" @submit.prevent="filterSubmit">
          <fieldset class="form__block">
            <legend class="form__legend">Цена</legend>
            <!--eslint-disable-next-line-->
            <label class="form__label form__label--price">
              <input class="form__input"
                     type="text"
                     name="min-price"
                     v-model.number="currentPriceFrom">
              <span class="form__value">От</span>
            </label>
            <!--eslint-disable-next-line-->
            <label class="form__label form__label--price">
              <input class="form__input"
                     type="text"
                     name="max-price"
                     v-model.number="currentPriceTo">
              <span class="form__value">До</span>
            </label>
          </fieldset>

          <fieldset class="form__block">
            <legend class="form__legend">Категория</legend>
            <!--eslint-disable-next-line-->
            <label class="form__label form__label--select">
              <select class="form__select"
                      type="text"
                      name="category"
                      v-model.number="currentCategoryId">
                <option value="0">Все категории</option>
                <option
                  v-for="category in categories"
                  :value="category.id"
                  :key="category.id"
                >
                  {{ category.title }}
                </option>
              </select>
            </label>
          </fieldset>

          <fieldset class="form__block">
            <legend class="form__legend">Цвет</legend>
            <ul class="colors">
              <li class="colors__item" v-for="filterColor in filterColors" :key="filterColor.id">
                <!--eslint-disable-next-line-->
                <label class="colors__label">
                  <input class="colors__radio sr-only"
                         type="radio"
                         name="color"
                         :value="filterColor.color"
                         v-model="currentColor">
                  <span class="colors__value" :style="{ backgroundColor: filterColor.color }">
                  </span>
                </label>
              </li>
            </ul>
          </fieldset>

          <fieldset class="form__block">
            <legend class="form__legend">Объемб в ГБ</legend>
            <ul class="check-list">
              <li class="check-list__item">
                <!--eslint-disable-next-line-->
                <label class="check-list__label">
                  <input class="check-list__check sr-only"
                         type="checkbox"
                         name="volume"
                         value="8"
                         checked="">
                  <span class="check-list__desc">
                    8
                    <span>(313)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <!--eslint-disable-next-line-->
                <label class="check-list__label">
                  <input class="check-list__check sr-only" type="checkbox" name="volume" value="16">
                  <span class="check-list__desc">
                    16
                    <span>(461)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <!--eslint-disable-next-line-->
                <label class="check-list__label">
                  <input class="check-list__check sr-only" type="checkbox" name="volume" value="32">
                  <span class="check-list__desc">
                    32
                    <span>(313)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <!--eslint-disable-next-line-->
                <label class="check-list__label">
                  <input class="check-list__check sr-only" type="checkbox" name="volume" value="64">
                  <span class="check-list__desc">
                    64
                    <span>(313)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <!--eslint-disable-next-line-->
                <label class="check-list__label">
                  <input class="check-list__check sr-only"
                         type="checkbox"
                         name="volume"
                         value="128">
                  <span class="check-list__desc">
                    128
                    <span>(313)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <!--eslint-disable-next-line-->
                <label class="check-list__label">
                  <input class="check-list__check sr-only"
                         type="checkbox"
                         name="volume"
                         value="264">
                  <span class="check-list__desc">
                    264
                    <span>(313)</span>
                  </span>
                </label>
              </li>
            </ul>
          </fieldset>

          <button class="filter__submit button button--primery" type="submit">
            Применить
          </button>
          <button class="filter__reset button button--second"
                  type="button"
                  @click.prevent="filterReset">
            Сбросить
          </button>
        </form>
      </aside>
</template>

<script>
import categories from '@/data/categories';
import filterColors from '@/data/filterColors';

export default {
  data() {
    return {
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: 0,
      currentColor: '#73B6EA',
    };
  },
  name: 'ProductFilter',
  props: ['priceFrom', 'priceTo', 'categoryId', 'color'],
  watch: {
    priceFrom(value) {
      this.currentPriceFrom = value;
    },
    priceTo(value) {
      this.currentPriceTo = value;
    },
    categoryId(value) {
      this.currentCategoryId = value;
    },
    color(value) {
      this.currentColor = value;
    },
  },
  computed: {
    categories() {
      return categories;
    },
    filterColors() {
      return filterColors;
    },
  },
  methods: {
    filterSubmit() {
      this.$emit('update:priceFrom', this.currentPriceFrom);
      this.$emit('update:priceTo', this.currentPriceTo);
      this.$emit('update:categoryId', this.currentCategoryId);
      this.$emit('update:color', this.currentColor);
    },
    filterReset() {
      this.$emit('update:priceFrom', 0);
      this.$emit('update:priceTo', 0);
      this.$emit('update:categoryId', 0);
      this.$emit('update:color', '#73B6EA');
    },
  },
};
</script>
