/**
 * @author v4 <lucky6616888@163.com>
 * Created by v4 on 2019-07-04 10:20
 */
import Vue from 'vue';
import Vuex from 'vuex';
import { LoadingBar } from 'iview';

Vue.use(Vuex);

const state = {
  title: '',
  isLoading: false
};

const mutations = {
  setTitle (state, str) {
    state.title = str;
  },
  setLoading (state, boolean) {
    boolean ? LoadingBar.start() : LoadingBar.finish();
    state.isLoading = boolean;
  }
};

export default new Vuex.Store({
  state,
  mutations
});
