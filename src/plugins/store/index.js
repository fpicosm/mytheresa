import { createStore } from "vuex";
import modules from "./modules";
import state from "./state";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

export default createStore({
  modules,
  state,
  getters,
  mutations,
  actions,
});
