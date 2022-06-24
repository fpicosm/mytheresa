import { get } from "lodash";
import resolveConfig from "tailwindcss/resolveConfig";
import config from "../../tailwind.config";
const { colors } = resolveConfig(config).theme;

/**
 * @see https://tailwindcss.com/docs/customizing-colors#default-color-palette
 * @param {string} name string name in tailwind
 * @returns {string} hex value
 */
export const getColor = (name) => {
  return get(colors, name.replace("-", "."));
};
