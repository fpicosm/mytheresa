import { axios } from "@/plugins/axios";
import { Module } from "./modules";
import { Action as Categories } from "./modules/categories/actions";
import { Action as Cart } from "./modules/cart/actions";
import { Mutation } from "./mutations";

export const Action = Object.freeze({
  INIT: "init",
  GET_CONFIG: "getConfig",
});

export default {
  [Action.GET_CONFIG]: async ({ commit }) => {
    const { data } = await axios.get("configuration");
    commit(Mutation.SET_CONFIG, data);
  },

  [Action.INIT]: async ({ dispatch }) => {
    await Promise.all([
      dispatch(Action.GET_CONFIG),
      dispatch(`${Module.CATEGORIES}/${Categories.GET_ALL}`),
      dispatch(`${Module.CART}/${Cart.INIT}`),
    ]);
  },
};
