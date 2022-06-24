<template>
  <article class="movie-link">
    <router-link class="inline-flex" v-bind="{ to }">
      <movie-image v-bind="$props" />
    </router-link>

    <slot></slot>
  </article>
</template>

<script>
import { Route } from "@/plugins/router";
import MovieImage from "./MovieImage.vue";
import { computed } from "vue";

export default {
  components: { MovieImage },
  extends: MovieImage,
  setup(props) {
    const to = computed(() => ({
      name: Route.MOVIE_DETAIL,
      params: props.movie,
    }));
    return { to };
  },
};
</script>

<style lang="scss" scoped>
.my-image {
  transition: all 0.3s;

  &:hover {
    filter: grayscale(1);
    opacity: 0.5;
  }
}
</style>
