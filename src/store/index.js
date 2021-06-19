import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth/';
import main from './main/';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    main,
  }
})
