import Vue from 'vue'
import App from './App.vue'
import VueI18n from 'vue-i18n'
import router from './router'
import store from './store'
import EN from './internalization/EN.json'
import RU from './internalization/RU.json'
import BY from './internalization/BY.json'

Vue.config.productionTip = false

Vue.use(VueI18n)

const userLanguage = localStorage.getItem('userLanguage') || 'en';

const i18n = new VueI18n({
  locale: userLanguage,
  messages: {
    en: EN,
    ru: RU,
    by: BY
  }
});

Vue.prototype.$changeLanguage = function(lang) {
  localStorage.setItem('userLanguage', lang);
  i18n.locale = lang;
};

console.log(i18n)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')