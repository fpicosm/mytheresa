import { State } from "./state";

export const Getter = Object.freeze({
  COUNT_ITEMS: "countItems",
});

export default {
  [Getter.COUNT_ITEMS]: (state) => state[State.DATA].size,
};
