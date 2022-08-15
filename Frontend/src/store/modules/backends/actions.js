import axios from 'axios';
import "es6-promise/auto";
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default () => {
	return {
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
			// header auth create token
			const headers = {
				'Authorization': 'Bearer ' + state.token,
				'Content-type': 'application/json'
			};
	
			return await axios.get(`${process.env.VUE_APP_BASE_URL}/contact`, headers)
				.then( (response) => {
					console.log("Get contact getContacts", response.data);
					commit("getContacts", response.data);
				})
				.catch( (error) => {
					console.log("Error call failed getContacts", error);
				});
		},
	
		getContactId: async ({state, commit}, id) => {
			// header auth create token
			const headers = {
				'Authorization': 'Bearer ' + state.token,
				'Content-type': 'application/json'
			};
	
			return await axios.get(`${process.env.VUE_APP_BASE_URL}/contact/${id}`, {headers : headers})
				.then( (response) => {
					console.log("Get contact by Id getContactId", response.data);
					commit("getContacts", response.data);
				})
				.catch( (error) => {
					console.log("Error call failed getContactId", error);
				});
		},
	
		postAddcontact: async ({state, commit}, payload) => {
			// header auth create token
			const headers = {
				'Authorization': 'Bearer ' + state.token,
				'Content-type': 'application/json'
			};
			return await axios.post(`${process.env.VUE_APP_BASE_URL}/contact/addNewContact`, payload, {headers : headers})
				.then((response) => {
					console.log("Post add contact postAddcontact", response);
					console.log(commit);
				})
				.catch( (error) => {
					console.log("Error call failed postAddcontact", error);
				});
		},
	
		getUserId: async ({state, commit }, id) => {
			// header auth create token
			const headers = {
				'Authorization': 'Bearer ' + state.token,
				'Content-type': 'application/json'
			};
			return await axios.get(`${process.env.VUE_APP_BASE_URL}/users/${id}`, {headers : headers})
				.then( (response) => {
					console.log("Get user by id getUserId", response);
					commit("getContacts", response.data);
				})
				.catch( (error) => {
					console.log("Error call failed getUserId", error);
				});
		},
	
		putUserId: async ({state, commit}, content) => {
			// header auth create token
			const headers = {
				'Authorization': 'Bearer ' + state.token,
				'Content-type': 'application/json'
			};
	
			let payloadData = {
				id : content.prevMail,
				payload : content.specify
			};
	
			return await axios.put(`${process.env.VUE_APP_BASE_URL}/${payloadData.id}`, payloadData.payload, {headers : headers})
				.then( (response) => {
					console.log("Put user id putUserId", response);
					console.log(commit)
				})
				.catch( (error) => {
					console.log("Error call failed putUserId", error);
				});
		},
	
		deleteUserId: async ({state, commit}, id) => {
			// header auth create token
			const headers = {
				'Authorization': 'Bearer ' + state.token,
				'Content-type': 'application/json'
			};
			return await axios.delete(`${process.env.VUE_APP_BASE_URL}/${id}`, {headers : headers})
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
			const headers = {
				'Authorization': 'Bearer ' + state.token,
				'Content-type': 'application/json'
			};
			return await axios.post(`${process.env.VUE_APP_BASE_URL}/auth/signIn`, payload, {headers : headers})
				.then((response) => {
					console.log("signIn response ", response);
					console.log(commit);
				})
				.catch( (error) => {
					console.log("Error call failed signin", error);
				});
		}

	};
};