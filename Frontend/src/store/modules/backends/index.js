import state from "./state";
import * as getters from "./getters";
import * as mutations from "./mutations";
import actions from "./actions";
import createPersistedState from "vuex-persistedstate";

export default () => ({
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
	plugins: [createPersistedState()],
});
