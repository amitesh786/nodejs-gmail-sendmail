import Vue from 'vue';
import App from './App.vue';

// Vuex
import Vuex from "vuex";
Vue.use(Vuex);

//Router
import router from '@/router';

// Store
import store from '@/store';

// Bootstrap library
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

// Vuelidate
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

// Axios
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app');
