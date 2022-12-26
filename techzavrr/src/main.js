import Vue from 'vue';
import { ignat, marat } from '@/persons';
import greetings from '@/greetings';
import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');

greetings(ignat);
greetings(marat);
