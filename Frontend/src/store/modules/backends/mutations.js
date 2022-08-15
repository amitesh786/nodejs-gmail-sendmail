export const setAddedToken = (state, token) => {
	state.token = token;
}

export const setDeleteToken = (state) => {
	state.token = false;
	state.name = "";
	state.id = "";
}

export const setAddedName = (state, name) => {
	state.name = name;
}

export const setAddedId = (state, id) => {
	state.id = id;
}

export const getContacts = (state, contact) => {
	state.contact = contact;
}

export const setDeleteContacts = (state) => {
	state.contact = [];
}

export const authResponse = (state, authResponse) => {
	state.authResponse = authResponse;
}
