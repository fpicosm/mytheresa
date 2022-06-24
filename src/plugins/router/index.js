import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/components/pages/HomePage.vue";
import store from "@/plugins/store";
import { Action } from "@/plugins/store/actions";

export const Route = Object.freeze({
  HOME: "home",
  CATEGORY_MOVIES: "category",
  MOVIE_DETAIL: "movie",
  CART: "cart",
  SEARCH: "search",
});

const routes = [
  {
    path: "/category/:id",
    name: Route.CATEGORY_MOVIES,
    component: () => import("@/components/pages/CategoryPage.vue"),
    props: (route) => ({ id: Number.parseFloat(route.params.id) }),
  },
  {
    path: "/movie/:id",
    name: Route.MOVIE_DETAIL,
    component: () => import("@/components/pages/MoviePage.vue"),
    props: (route) => ({ id: Number.parseFloat(route.params.id) }),
  },
  {
    path: "/cart",
    name: Route.CART,
    component: () => import("@/components/pages/CartPage.vue"),
  },
  {
    path: "/search",
    name: Route.SEARCH,
    component: () => import("@/components/pages/SearchPage.vue"),
  },
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeResolve(async (to, from, next) => {
  await store.dispatch(Action.INIT);
  next();
});

export default router;
