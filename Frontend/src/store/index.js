import Vue from 'vue';
import Vuex from 'vuex';
import backends from './modules/backends';

Vue.use(Vuex);

let store =  new Vuex.Store({
	namespaced: true,
	modules: {
		backends
	}
});

global.store = store;
export default store;
