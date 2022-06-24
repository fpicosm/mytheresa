import { State } from "./state";

export const Mutation = Object.freeze({
  ADD_ITEM: "addItem",
});

export default {
  [Mutation.ADD_ITEM](state, item) {
    state[State.DATA].push(item);
  },
};
