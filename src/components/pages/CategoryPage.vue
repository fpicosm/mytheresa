<template>
  <div class="category">
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
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { Module } from "@/plugins/store/modules";
import { Getter } from "@/plugins/store/modules/categories/getters";
import { Action } from "@/plugins/store/modules/categories/actions";
import { Mutation } from "@/plugins/store/mutations";
import MovieLink from "../shared/MovieLink.vue";
import { getBreakpoints } from "@/utils/screen";
import { ImageType } from "@/constants/movie";

const props = defineProps({ id: { type: Number, required: true } });

const route = useRoute();
const router = useRouter();
const store = useStore();

const category = computed(() => {
  return store.getters[`${Module.CATEGORIES}/${Getter.FIND_BY_ID}`](props.id);
});

const loadPage = async (page) => {
  store.commit(Mutation.SET_LOADING, true);
  await store.dispatch(`${Module.CATEGORIES}/${Action.GET_MOVIES}`, {
    category: category.value,
    page,
  });
  store.commit(Mutation.SET_LOADING, false);
};

const currentPage = ref(
  (() => {
    const { page } = route.query;
    return page ? +page : 1;
  })()
);

onMounted(() => loadPage(currentPage.value));

watch(
  () => currentPage.value,
  (page) => router.push({ to: route.path, query: { page } })
);

const imageType = computed(() => {
  const breakpoints = getBreakpoints();
  return window.innerWidth >= breakpoints.lg
    ? ImageType.HORIZONTAL
    : ImageType.VERTICAL;
});

const page = computed(() => {
  return store.getters[`${Module.CATEGORIES}/${Getter.GET_MOVIES}`](
    category.value,
    currentPage.value
  );
});

const max = computed(() => page.value?.total_pages || 1);
const movies = computed(() => page.value?.results || []);
</script>

<style></style>
