import axios from 'axios';
import "es6-promise/auto";
import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
// import backends from './modules/backends';

Vue.use(Vuex);

// STATE
let state = {
	token: false,
	name: "",
	id: "",
	contact: [],
};

// MUTATIONS
const mutations = {
	setAddedToken: (state, token) => {
		state.token = token;
	},
	
	setDeleteToken: (state) => {
		state.token = false;
		state.name = "";
		state.id = "";
	},
	
	setAddedName: (state, name) => {
		state.name = name;
	},
	
	setAddedId: (state, id) => {
		state.id = id;
	},
	
	getContacts: (state, contact) => {
		state.contact = contact;
	},
	
	setDeleteContacts: (state) => {
		state.contact = [];
	},
	
	authResponse: (state, authResponse) => {
		state.authResponse = authResponse;
	},
};

// GETTERS
const getters = {
	contactList: (state) => {
		return state.contact;
	},
	authResponse: (state) => {
		return state.authResponse;
	}
};

// ACTIONS
const actions = {
	setAddToken: (context, token) => {
		context.commit("setAddedToken", token);
	},

	getDeleteToken: (context) => {
		context.commit("setDeleteToken");
	},

	getDeleteContact: (contect) => {
		contect.commit("setDeleteContacts");
	},

	setAddName: (context, name) => {
		context.commit("setAddedName", name);
	},

	setAddId: (context, id) => {
		context.commit("setAddedId", id);
	},

	getContact: (context, contact) => {
		context.commit("getContacts", contact);
	},
	
	getContacts: async ({ state, commit }) => {
		let header = headers(state.token);

		return await axios.get(`${process.env.VUE_APP_BASE_URL}/contacts`, {headers: header})
			.then( (response) => {
				console.log("Get contact getContacts", response.data);
				commit("getContacts", response.data);
			})
			.catch( (error) => {
				console.log("Error call failed getContacts", error);
			});
	},

	getContactId: async ({state, commit}, id) => {
		let header = headers(state.token);

		console.log(process.env.BASE_URL);
		console.log(process.env.VUE_APP_BASE_URL);

		return await axios.get(`${process.env.VUE_APP_BASE_URL}/contact/${id}`, {headers : header})
			.then( (response) => {
				console.log("Get contact by Id getContactId", response.data);
				commit("getContacts", response.data);
			})
			.catch( (error) => {
				console.log("Error call failed getContactId", error);
			});
	},

	postAddcontact: async ({state, commit}, payload) => {
		let header = headers(state.token);

		return await axios.post(`${process.env.VUE_APP_BASE_URL}/contact/addNewContact`, payload, {headers : header})
			.then((response) => {
				console.log("Post add contact postAddcontact", response);
				console.log(commit);
			})
			.catch( (error) => {
				console.log("Error call failed postAddcontact", error);
			});
	},

	getUserId: async ({state, commit }, id) => {
		let header = headers(state.token);

		return await axios.get(`${process.env.VUE_APP_BASE_URL}/users/${id}`, {headers : header})
			.then( (response) => {
				console.log("Get user by id getUserId", response);
				commit("getContacts", response.data);
			})
			.catch( (error) => {
				console.log("Error call failed getUserId", error);
			});
	},

	putUserId: async ({state, commit}, content) => {
		let header = headers(state.token);

		let payloadData = {
			id : content.prevMail,
			payload : content.specify
		};

		return await axios.put(`${process.env.VUE_APP_BASE_URL}/users/${payloadData.id}`, payloadData.payload, {headers : header})
			.then( (response) => {
				console.log("Put user id putUserId", response);
				console.log(commit)
			})
			.catch( (error) => {
				console.log("Error call failed putUserId", error);
			});
	},

	deleteUserId: async ({state, commit}, id) => {
		let header = headers(state.token);

		return await axios.delete(`${process.env.VUE_APP_BASE_URL}/users/${id}`, {headers : header})
			.then((response) => {
				console.log("delete user by id deleteUserId ", response);
				console.log(commit);
			})
			.catch( (error) => {
				console.log("Error call failed deleteUserId", error);
			});
	},

	signUp: async ({commit}, payload) => {
		return await axios.post(`${process.env.VUE_APP_BASE_URL}/auth/signUp`, payload)
			.then((response) => {
				console.log("signup response ", response);
				localStorage.setItem('token', response.token);
				commit('authResponse', response)
			})
			.catch( (error) => {
				console.log("Error call failed signUp", error);
			});
	},
	
	signIn: async ({state, commit}, payload) => {
		// header auth create token
		let header = headers(state.token);

		return await axios.post(`${process.env.VUE_APP_BASE_URL}/auth/signIn`, payload, {headers : header})
			.then((response) => {
				console.log("signIn response ", response);
				console.log(commit);
			})
			.catch( (error) => {
				console.log("Error call failed signin", error);
			});
	},

	sendMail: async({state, commit}, payload) => {
		// header auth create token
		let header = headers(state.token);
		
		return await axios.post(`${process.env.VUE_APP_BASE_URL}/sendMail`, payload, {headers : header})
			.then((response) => {
				console.log("sendMail response ", response);
				console.log(commit);
			})
			.catch( (error) => {
				console.log("Error call failed sendMail", error);
			});
	},
};

const headers = (token) => {
	return {
		'Authorization': 'Bearer ' + token,
		'Content-type': 'application/json'
	}
};

// STORE
let store = new Vuex.Store({
	state: state,
	mutations: mutations,
	getters: getters,
	actions: actions,
	plugins: [createPersistedState()],
});

global.store = store;
export default store;
