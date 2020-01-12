import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import BootstrapVue from 'bootstrap-vue'
import "./custom.scss";

import routes from './routes';

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(BootstrapVue);

const router = new VueRouter({ mode: 'history', routes });

new Vue({
  render: h => h(App),
  router
}).$mount('#app');