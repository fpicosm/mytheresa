import { State } from "./state";

export const Getter = Object.freeze({
  FIND_BY_ID: "findById",
  GET_MOVIES: "getMovies",
});

export default {
  [Getter.FIND_BY_ID]: (state) => (id) => {
    return state[State.DATA].find((item) => item.id === id);
  },
  [Getter.GET_MOVIES]: () => (category, page) => {
    return (category.movies || []).find((item) => item.page === page);
  },
};
