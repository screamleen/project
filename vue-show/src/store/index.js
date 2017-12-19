import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import exhibitors from './modules/exhibitors';

Vue.use(Vuex);
const store = new Vuex.Store({
  actions,
  getters,
  mutations,
  modules: {
    exhibitors
  }
});

export default store;
