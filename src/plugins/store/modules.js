import cart from "./modules/cart";
import categories from "./modules/categories";
import movies from "./modules/movies";

export const Module = {
  CART: "cart",
  CATEGORIES: "categories",
  MOVIES: "movies",
};

export default {
  [Module.CART]: cart,
  [Module.CATEGORIES]: categories,
  [Module.MOVIES]: movies,
};
