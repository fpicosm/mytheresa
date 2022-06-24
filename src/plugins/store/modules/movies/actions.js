import i18n from "@/plugins/i18n";
import { axios } from "@/plugins/axios";
import { Getter } from "./getters";
import { Mutation } from "./mutations";

const language = i18n.global.locale.value;

export const Action = Object.freeze({
  GET_ITEM: "getItem",
  GET_MOVIE: "getMovie",
  GET_CREDITS: "getCast",
  GET_KEYWORDS: "getKeywords",
  GET_RECOMMENDATIONS: "getRecommendations",
});

export default {
  [Action.GET_KEYWORDS]: (c, id) => {
    const params = { language };
    const url = `movie/${id}/keywords`;
    return axios.get(url, { params }).then((r) => r.data?.keywords || []);
  },

  [Action.GET_CREDITS]: (c, id) => {
    const params = { language };
    const url = `movie/${id}/credits`;
    return axios.get(url, { params }).then((r) => r.data);
  },

  [Action.GET_MOVIE]: (c, id) => {
    const params = { language };
    return axios.get(`movie/${id}`, { params }).then((r) => r.data);
  },

  [Action.GET_RECOMMENDATIONS]: (c, id) => {
    const params = { language, page: 1 };
    return axios
      .get(`movie/${id}/recommendations`, { params })
      .then((res) => res.data?.results || []);
  },

  [Action.GET_ITEM]: async ({ commit, getters, dispatch }, id) => {
    const movie = getters[Getter.FIND_BY_ID](id);
    if (movie) return;

    const [info, keywords, { cast, crew }, recommendations] = await Promise.all(
      [
        dispatch(Action.GET_MOVIE, id),
        dispatch(Action.GET_KEYWORDS, id),
        dispatch(Action.GET_CREDITS, id),
        dispatch(Action.GET_RECOMMENDATIONS, id),
      ]
    );

    commit(Mutation.ADD_ITEM, {
      ...info,
      keywords,
      cast,
      crew,
      recommendations,
    });
  },
};
