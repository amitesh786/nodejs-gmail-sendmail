export default () => ({
    token: localStorage.getItem('token') || false,
	name: "",
	id: "",
	contact: [],
	authResponse: {}
});
