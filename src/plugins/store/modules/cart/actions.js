import { toMap } from "@/utils/array";
import { Mutation } from "./mutations";
import { State } from "./state";

const STORAGE_KEY = "cart";

export const Action = Object.freeze({
  INIT: "init",
  ADD_ITEM: "addItem",
  REMOVE_ITEM: "removeItem",
  UPDATE_ITEM: "updateItem",
});

const updateStorage = (map) => {
  const cart = [...map.values()];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
};

export default {
  [Action.INIT]: async ({ commit }) => {
    const storage = localStorage.getItem(STORAGE_KEY);
    const cart = storage ? JSON.parse(storage) : [];
    const map = toMap(cart, ({ item }) => item.id);
    commit(Mutation.SET_DATA, map);
    updateStorage(map);
  },

  [Action.ADD_ITEM]: async ({ state, commit }, item) => {
    const map = state[State.DATA];
    if (!map.has(item.id)) {
      map.set(item.id, { units: 0, item });
    }
    const prop = map.get(item.id);
    prop.units++;
    commit(Mutation.SET_DATA, map);
    updateStorage(map);
  },

  [Action.REMOVE_ITEM]: async ({ state, commit }, item) => {
    const map = state[State.DATA];
    if (!map.has(item.id)) return;

    map.delete(item.id);
    commit(Mutation.SET_DATA, map);
    updateStorage(map);
  },

  [Action.UPDATE_ITEM]: async ({ state, commit }, { item, units }) => {
    const map = state[State.DATA];
    map.set(item.id, { units, item });
    commit(Mutation.SET_DATA, map);
    updateStorage(map);
  },
};
