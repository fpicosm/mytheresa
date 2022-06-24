import resolveConfig from "tailwindcss/resolveConfig";
import config from "../../tailwind.config";
const { screens } = resolveConfig(config).theme;

export const ScreenSize = Object.freeze({
  XXL: "2xl",
  XL: "xl",
  LG: "lg",
  MD: "md",
  SM: "sm",
  XS: "xs",
});

/**
 * sm = 640px / md = 768px / lg = 1024px / xl = 1280px / 2xl = 1536px
 * @see https://tailwindcss.com/docs/responsive-design#overview
 * @returns {object}
 */
export const getBreakpoints = () => {
  return Object.entries(screens).reduce((items, [key, value]) => {
    return Object.assign(items, { [key]: Number.parseFloat(value) });
  }, {});
};

/**
 * @param {number} width
 * @returns {string}
 */
export const getScreenSize = (width = window.innerWidth) => {
  if (!width) return;
  const breakpoints = getBreakpoints();
  const name = Object.values(ScreenSize).find((name) => {
    return width >= breakpoints[name];
  });
  return name ?? ScreenSize.XS;
};
