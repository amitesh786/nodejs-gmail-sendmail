import Vue from 'vue';
import VueRouter from 'vue-router';

// Components
import Dashboard from "@/components/Dashboard";
import Login from "@/components/Login";

import AuthStore from "@/store";

Vue.use(VueRouter);

const routes = [
	{
		path: '*',
		redirect: '/login'
	},
	{
		path: "/home",
		name: "Dashboard",
		component: Dashboard,
		meta: { 
			requiresAuth: true 
		},
	},
	{
		path: "/login",
		name: "Login", 
		component: Login
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

// handle the acces to the routes check in all routes the meta requiresAuth
router.beforeEach((to, from, next) => {
	const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

	if (requiresAuth == true && AuthStore.state.token) {
		next();
	} else if (requiresAuth == true && AuthStore.state.token == false) {
		next({ path: "/login" });
	} else {
		next();
	}
});

export default router;
