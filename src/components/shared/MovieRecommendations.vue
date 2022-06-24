<template>
  <my-scroller v-if="recommendations.length" :title="t('title')">
    <template v-for="related in recommendations" :key="related.id">
      <movie-link :movie="related">
        <h6 class="leading-tight" v-text="related.title"></h6>
      </movie-link>
    </template>
  </my-scroller>
</template>

<script setup>
import { RECOMMENDATIONS_LIMIT } from "@/constants/movie";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import MovieLink from "./MovieLink.vue";

const props = defineProps({ movie: { type: Object, required: true } });

const { t } = useI18n({ useScope: "local" });

const recommendations = computed(() => {
  return (props.movie.recommendations || []).slice(0, RECOMMENDATIONS_LIMIT);
});
</script>

<i18n>
{
  "en": {
    "title": "Recommmendations"
  },
  "es": {
    "title": "Recomendaciones"
  }
}
</i18n>
