import Vue from 'vue'
import Vuex from 'vuex'

import auth from '@/store/modules/auth'
import feed from '@/store/modules/feed'
import article from '@/store/modules/article'
import like_book from '@/store/modules/like_book'
import user_book from '@/store/modules/user_book'
import admin_book from '@/store/modules/admin_book'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {

  },
  actions: {
  },
  modules: {
    auth,
    feed,
    article,
    like_book,
    user_book,
    admin_book
  }
})
