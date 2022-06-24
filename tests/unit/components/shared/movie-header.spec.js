import { mount } from "@vue/test-utils";
import MovieHeader from "@/components/shared/MovieHeader.vue";
import { config } from "@vue/test-utils";
import { createI18n } from "vue-i18n";
import baseComponents from "@/plugins/base-components";
import { omit } from "lodash";
import { createStore } from "vuex";
import { Getter } from "@/plugins/store/getters";

config.global.mocks.t = (key) => key;
config.global.mocks.n = (key) => key;

const i18n = createI18n({
  legacy: false,
  locale: "en",
});

const store = createStore({
  getters: {
    [Getter.GET_IMAGE_URL]: () => () => "",
  },
});

const movie = {
  id: 1,
  title: "The title",
  tagline: "The tagline",
  spoken_languages: [
    { name: "English" },
    { name: "Spanish" },
    { name: "French" },
  ],
  genres: [
    { name: "Drama" },
    { name: "Comedy" },
    { name: "Action" },
    { name: "Romance" },
  ],
  runtime: 121,
  budget: 40,
  revenue: 50,
  keywords: [{ name: "keyword 1" }, { name: "keyword 2" }],
  overview: "This is the summary",
};

describe("MovieHeader.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(MovieHeader, {
      global: {
        plugins: [i18n, baseComponents, store],
      },
      props: { movie },
    });
  });

  it("renders movie title", () => {
    const text = wrapper.find("h1").text();
    expect(text).toBe("The title");
  });

  it("renders poster always", () => {
    const picture = wrapper.find("picture");
    expect(picture.exists()).toBeTruthy();
  });

  it("renders tagline only if exists and is not empty", async () => {
    let box = wrapper.find(".my-blockquote");
    expect(box.exists()).toBeTruthy();
    expect(box.text()).toBe("The tagline");

    await wrapper.setProps({
      movie: { ...movie, tagline: "" },
    });

    box = wrapper.find("[data-test='tagline']");
    expect(box.exists()).toBeFalsy();

    await wrapper.setProps({
      movie: omit(movie, ["tagline"]),
    });

    box = wrapper.find("[data-test='tagline']");
    expect(box.exists()).toBeFalsy();
  });

  it("renders release date only if exists and is not empty", async () => {
    let box = wrapper.find("[data-test='release-date']");
    expect(box.exists()).toBeFalsy();

    await wrapper.setProps({
      movie: { ...movie, release_date: new Date() },
    });

    box = wrapper.find("[data-test='release-date']");
    expect(box.exists()).toBeTruthy();
    expect(box.text()).toBe("" + new Date().getFullYear());
  });

  it("renders genres only if exists and is not empty", async () => {
    let box = wrapper.find("[data-test='genres']");
    expect(box.exists()).toBeTruthy();
    expect(box.text()).toBe("Drama, Comedy, Action, Romance");

    await wrapper.setProps({
      movie: { ...movie, genres: [] },
    });

    box = wrapper.find("[data-test='genres']");
    expect(box.exists()).toBeFalsy();

    await wrapper.setProps({
      movie: omit(movie, ["genres"]),
    });

    box = wrapper.find("[data-test='genres']");
    expect(box.exists()).toBeFalsy();
  });

  it("renders duration only if exists and is not empty", async () => {
    let box = wrapper.find("[data-test='duration']");
    expect(box.exists()).toBeTruthy();

    await wrapper.setProps({
      movie: { ...movie, runtime: 0 },
    });

    box = wrapper.find("[data-test='duration']");
    expect(box.exists()).toBeFalsy();

    await wrapper.setProps({
      movie: omit(movie, ["runtime"]),
    });

    box = wrapper.find("[data-test='duration']");
    expect(box.exists()).toBeFalsy();
  });

  it("renders summary only if exists and is not empty", async () => {
    let box = wrapper.find("[data-test='summary']");
    expect(box.exists()).toBeTruthy();
    expect(box.find("p").text()).toBe("This is the summary");

    await wrapper.setProps({
      movie: { ...movie, overview: "" },
    });

    box = wrapper.find("[data-test='summary']");
    expect(box.exists()).toBeFalsy();

    await wrapper.setProps({
      movie: omit(movie, ["overview"]),
    });

    box = wrapper.find("[data-test='summary']");
    expect(box.exists()).toBeFalsy();
  });

  it("renders votes only if exists and is not empty", async () => {
    let box = wrapper.find("[data-test='votes']");
    expect(box.exists()).toBeFalsy();

    await wrapper.setProps({
      movie: { ...movie, vote_count: 5840 },
    });

    box = wrapper.find("[data-test='votes']");
    expect(box.exists()).toBeTruthy();

    await wrapper.setProps({
      movie: { ...movie, vote_count: 0 },
    });

    box = wrapper.find("[data-test='votes']");
    expect(box.exists()).toBeFalsy();
  });
});
