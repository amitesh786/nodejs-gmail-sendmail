import axios from 'axios';
import "es6-promise/auto";
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

// Header content
const headers = (token) => {
	return {
		'Authorization': 'Bearer ' + token,
		'Content-type': 'application/json'
	}
};

export default {

	setAddToken: async ({ commit }, token) => {
		commit("setAddedToken", token);
	},

	getDeleteToken: async ({ commit }) => {
		commit("setDeleteToken");
	},

	getDeleteContact: async ({ commit }) => {
		commit("setDeleteContacts");
	},

	setAddName: async ({ commit }, name) => {
		commit("setAddedName", name);
	},

	setAddId: async ({ commit }, id) => {
		commit("setAddedId", id);
	},

	getContact: async ({ commit }, contact) => {
		commit("getContacts", contact);
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
	}
};
