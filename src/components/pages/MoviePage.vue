<template>
  <section v-if="movie" class="movie">
    <my-fixed-button
      color="yellow-500"
      icon="fa-solid fa-plus fa-xl"
      @click="addToCart"
    />

    <header class="p-4 md:p-6 lg:p-8 relative">
      <div class="backdrop" :style="{ backgroundImage }"></div>
      <movie-header v-bind="{ movie }" />
    </header>

    <main class="container mx-auto p-4 md:p-6 lg:p-8 sm:mb-2">
      <div
        class="grid grid-cols-12 gap-6 lg:gap-8 overflow-hidden -mt-2 md:mt-0"
      >
        <div class="col-span-12 md:col-span-8 lg:col-start-2">
          <div class="flex flex-col gap-y-6">
            <movie-cast v-bind="{ movie }" />
            <movie-recommendations v-bind="{ movie }" />
          </div>
        </div>

        <div class="col-span-12 md:col-span-4 lg:col-span-2">
          <movie-details v-bind="{ movie }" />
        </div>
      </div>
    </main>
  </section>
</template>

<script setup>
import { computed, watch } from "vue";
import { useStore } from "vuex";
import { ImageType } from "@/constants/movie";
import { Module } from "@/plugins/store/modules";
import { Action as Movie } from "@/plugins/store/modules/movies/actions";
import { Getter as MovieGetter } from "@/plugins/store/modules/movies/getters";
import { Action as Cart } from "@/plugins/store/modules/cart/actions";
import { Getter } from "@/plugins/store/getters";
import { Mutation } from "@/plugins/store/mutations";
import MovieDetails from "@/components/shared/MovieDetails.vue";
import MovieCast from "@/components/shared/MovieCast.vue";
import MovieHeader from "@/components/shared/MovieHeader.vue";
import MovieRecommendations from "@/components/shared/MovieRecommendations.vue";

const props = defineProps({ id: { type: Number, required: true } });

const store = useStore();

const movie = computed(() => {
  return store.getters[`${Module.MOVIES}/${MovieGetter.FIND_BY_ID}`](props.id);
});

const loadMovie = async (id) => {
  store.commit(Mutation.SET_LOADING, true);
  await store.dispatch(`${Module.MOVIES}/${Movie.GET_ITEM}`, id);
  store.commit(Mutation.SET_LOADING, false);
};

watch(() => props.id, loadMovie, { immediate: true });

const backgroundImage = computed(() => {
  const path = movie.value?.backdrop_path;
  if (!path) return;

  const src = store.getters[Getter.GET_IMAGE_URL](ImageType.HORIZONTAL, path);
  return `url(${src})`;
});

const addToCart = () => {
  return store.dispatch(`${Module.CART}/${Cart.ADD_ITEM}`, movie.value);
};
</script>

<style lang="scss" scoped>
.backdrop {
  position: absolute;
  inset: 0;
  background-size: cover;
  filter: grayscale(1);
  opacity: 0.15;
  z-index: -1;
  background-color: black;
}
</style>
