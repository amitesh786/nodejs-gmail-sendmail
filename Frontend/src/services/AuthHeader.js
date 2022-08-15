export function authHeader() {
	let user = {
		accessToken: localStorage.getItem('token') || false
	};
	console.log(user.accessToken);

	if (user && user.accessToken) {
		return user.accessToken;
	}
	else {
		return null;
	}
}
