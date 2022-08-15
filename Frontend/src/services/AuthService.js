import http from '@/services/CommonService';

export default {
	async signUp(payload) {
		let response = await http.post(`${process.env.VUE_APP_BASE_URL}/auth/signUp`, payload);
		return response;
	},
	async signIn(payload) {
		let response = await http.post(`${process.env.VUE_APP_BASE_URL}/auth/signIn`, payload);
		return response;
	}
};
