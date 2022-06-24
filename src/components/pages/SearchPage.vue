<template>
  <div class="search">
    <div class="container mx-auto flex flex-col items-center gap-y-8 p-8">
      <div
        class="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
      >
        <template v-for="movie in movies" :key="movie.id">
          <movie-link class="text-center" v-bind="{ movie }" :type="imageType">
            <h6 class="leading-tight" v-text="movie.title"></h6>
          </movie-link>
        </template>
      </div>

      <my-pagination v-model="currentPage" v-bind="{ max }" @input="loadPage" />
    </div>
  </div>
</template>

<script setup>
import { ImageType } from "@/constants/movie";
import { Mutation } from "@/plugins/store/mutations";
import { getBreakpoints } from "@/utils/screen";
import { computed, inject, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import MovieLink from "../shared/MovieLink.vue";

const query = computed(() => route.query.s);
const route = useRoute();
const store = useStore();
const axios = inject("axios");
const currentPage = ref(1);
const movies = ref([]);
const max = ref(1);

const loadPage = async (page) => {
  currentPage.value = page;
  const params = { page, query: query.value };
  store.commit(Mutation.SET_LOADING, true);
  const { results, total_pages } = await axios
    .get(`search/movie`, { params })
    .then((r) => r.data);
  store.commit(Mutation.SET_LOADING, false);

  movies.value = results;
  max.value = total_pages;
};

watch(() => currentPage.value, loadPage, { immediate: true });
watch(
  () => query.value,
  () => loadPage(1)
);

const imageType = computed(() => {
  const breakpoints = getBreakpoints();
  return window.innerWidth >= breakpoints.lg
    ? ImageType.HORIZONTAL
    : ImageType.VERTICAL;
});
</script>
