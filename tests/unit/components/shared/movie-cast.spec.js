import { shallowMount } from "@vue/test-utils";
import { createI18n } from "vue-i18n";
import MovieCast from "@/components/shared/MovieCast.vue";
import movie from "../../mocks/movie.json";
import baseComponents from "@/plugins/base-components";
import { config } from "@vue/test-utils";
import { CAST_LIMIT } from "@/constants/movie";
import { createStore } from "vuex";

config.global.mocks.t = (key) => key;
const i18n = createI18n({
  legacy: false,
  locale: "en",
});

const store = createStore({});

describe("MovieCast.vue", () => {
  it("renders limited number of items", () => {
    const wrapper = shallowMount(MovieCast, {
      global: {
        plugins: [i18n, store, baseComponents],
      },
      props: { movie },
    });
    const size = Math.min(movie.cast.length, CAST_LIMIT);
    expect(wrapper.vm.cast.length).toBe(size);
  });
});
