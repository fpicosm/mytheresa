import { State } from "./state";

export const Getter = Object.freeze({
  GET_IMAGE_URL: "getImageUrl",
});

export default {
  /**
   * @see https://developers.themoviedb.org/3/configuration/get-api-configuration
   */
  [Getter.GET_IMAGE_URL]: (state) => (key, path, size) => {
    if (!path) return;

    const sizes = state[State.CONFIG].images[`${key}_sizes`];
    if (!sizes || !sizes.length) return;

    const baseUrl = state[State.CONFIG].images?.secure_base_url;
    const images = sizes.map((size) => {
      const url = [baseUrl, size, path].join("");
      return { size, url };
    });

    const defaultSize = "original";
    const getUrl = (size) => {
      const item = images.find((i) => i.size === size);
      return item ? item.url : getUrl(defaultSize);
    };

    return getUrl(size ?? defaultSize);
  },
};
