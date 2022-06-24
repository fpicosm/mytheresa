import { mount } from "@vue/test-utils";
import MovieDetails from "@/components/shared/MovieDetails.vue";
import { config } from "@vue/test-utils";
import { createI18n } from "vue-i18n";
import baseComponents from "@/plugins/base-components";
import { omit } from "lodash";

config.global.mocks.t = (key) => key;
config.global.mocks.n = (key) => key;

const i18n = createI18n({
  legacy: false,
  locale: "en",
});

const movie = {
  id: 1,
  title: "The title",
  original_title: "The original title",
  spoken_languages: [
    { name: "English" },
    { name: "Spanish" },
    { name: "French" },
  ],
  budget: 40,
  revenue: 50,
  keywords: [{ name: "keyword 1" }, { name: "keyword 2" }],
};

describe("MovieDetails.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(MovieDetails, {
      global: {
        plugins: [i18n, baseComponents],
      },
      props: { movie },
    });
  });

  it("renders original title box only if exists and is distinct to title", async () => {
    let box = wrapper.find("[data-test='original-title']");
    expect(box.exists()).toBeTruthy();
    expect(box.find("p").text()).toBe("The original title");

    await wrapper.setProps({
      movie: { ...movie, original_title: movie.title },
    });

    box = wrapper.find("[data-test='original-title']");
    expect(box.exists()).toBeFalsy();

    await wrapper.setProps({
      movie: { ...movie, original_title: "" },
    });

    box = wrapper.find("[data-test='original-title']");
    expect(box.exists()).toBeFalsy();
  });

  it("renders languages box only if exists and there are some spoken_languages", async () => {
    let box = wrapper.find("[data-test='languages']");
    expect(box.exists()).toBeTruthy();
    expect(box.find("p").text()).toBe("English, Spanish, French");

    await wrapper.setProps({
      movie: { ...movie, spoken_languages: [] },
    });

    box = wrapper.find("[data-test='languages']");
    expect(box.exists()).toBeFalsy();

    await wrapper.setProps({
      movie: omit(movie, "spoken_languages"),
    });

    box = wrapper.find("[data-test='languages']");
    expect(box.exists()).toBeFalsy();
  });

  it("renders budget box only if exists and is greather than zero", async () => {
    let box = wrapper.find("[data-test='budget']");
    expect(box.exists()).toBeTruthy();
    expect(box.find("p").text()).toBe("40");

    await wrapper.setProps({
      movie: { ...movie, budget: 0 },
    });

    box = wrapper.find("[data-test='budget']");
    expect(box.exists()).toBeFalsy();

    await wrapper.setProps({
      movie: omit(movie, ["budget"]),
    });

    box = wrapper.find("[data-test='budget']");
    expect(box.exists()).toBeFalsy();
  });

  it("renders incomes box only if exists and is greather than zero", async () => {
    let box = wrapper.find("[data-test='incomes']");
    expect(box.exists()).toBeTruthy();
    expect(box.find("p").text()).toBe("50");

    await wrapper.setProps({
      movie: { ...movie, revenue: 0 },
    });

    box = wrapper.find("[data-test='incomes']");
    expect(box.exists()).toBeFalsy();

    await wrapper.setProps({
      movie: omit(movie, ["revenue"]),
    });

    box = wrapper.find("[data-test='incomes']");
    expect(box.exists()).toBeFalsy();
  });

  it("renders keywords box only if exists and there are some keywords", async () => {
    let box = wrapper.find("[data-test='keywords']");
    expect(box.exists()).toBeTruthy();
    expect(box.findAll(".my-tag").length).toBe(2);

    await wrapper.setProps({
      movie: { ...movie, keywords: [] },
    });

    box = wrapper.find("[data-test='keywords']");
    expect(box.exists()).toBeFalsy();

    await wrapper.setProps({
      movie: omit(movie, ["keywords"]),
    });

    box = wrapper.find("[data-test='keywords']");
    expect(box.exists()).toBeFalsy();
  });
});
