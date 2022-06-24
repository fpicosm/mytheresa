import { State } from "./state";

export const Mutation = Object.freeze({
  SET_LOADING: "setLoading",
  SET_CONFIG: "setConfig",
});

export default {
  [Mutation.SET_LOADING](state, value) {
    state[State.LOADING] = value;
  },
  [Mutation.SET_CONFIG](state, value) {
    state[State.CONFIG] = value;
  },
};
