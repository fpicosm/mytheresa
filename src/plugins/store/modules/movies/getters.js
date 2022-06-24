import { State } from "./state";

export const Getter = Object.freeze({
  FIND_BY_ID: "findById",
});

export default {
  [Getter.FIND_BY_ID]: (state) => (id) => {
    return state[State.DATA].find((item) => item.id === id);
  },
};
