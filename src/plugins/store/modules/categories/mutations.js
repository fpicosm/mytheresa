import { State } from "./state";

export const Mutation = Object.freeze({
  SET_DATA: "setData",
});

export default {
  [Mutation.SET_DATA](state, data) {
    state[State.DATA] = data;
  },
};
