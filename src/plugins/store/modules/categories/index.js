import state from "./state";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

const modules = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
  modules,
};
