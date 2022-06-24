import { axios } from "@/plugins/axios";
import i18n from "@/plugins/i18n";
import { Getter } from "./getters";
import { Mutation } from "./mutations";
import { State } from "./state";

const language = i18n.global.locale.value;

export const Action = Object.freeze({
  GET_ALL: "getAll",
  GET_MOVIES: "getMovies",
});

// due to api limitation
const MAX_ALLOWED_PAGE = 500;

export default {
  [Action.GET_ALL]: async ({ state, commit }) => {
    if (state[State.DATA].length) return;

    const params = { language };
    const { genres } = await axios
      .get("/genre/movie/list", { params })
      .then((r) => r.data);

    commit(Mutation.SET_DATA, genres);
  },

  [Action.GET_MOVIES]: async ({ getters }, { category, page }) => {
    const item = getters[Getter.GET_MOVIES](category, page);
    if (item) return;

    const url = `/genre/${category.id}/movies`;
    const params = { language, page };
    const { data } = await axios.get(url, { params });

    data.total_pages = Math.min(data.total_pages, MAX_ALLOWED_PAGE);
    category.movies = [...(category.movies || []), data];
  },
};
