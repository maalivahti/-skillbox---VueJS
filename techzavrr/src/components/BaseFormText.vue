<template>
  <base-form-field :title="title" :error="error">
    <!--  eslint-disable -->
    <input class="form__input" v-model="dataValue" :type="type" :placeholder="placeholder">
  </base-form-field>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin';

export default {
  mixins: [formFieldMixin],
  props: {
    type: {
      default: 'text',
    },
  },
};
</script>

<style scoped>

</style>
