<template>
  <aside class="movie-details flex flex-col gap-y-6">
    <template v-if="movie.original_title">
      <div
        v-if="movie.original_title !== movie.title"
        data-test="original-title"
        class="original-title"
      >
        <h5 v-text="t('original_title')"></h5>
        <p v-text="movie.original_title"></p>
      </div>
    </template>

    <template v-if="movie.spoken_languages?.length">
      <div data-test="languages">
        <h5 v-text="t('languages', movie.spoken_languages.length)"></h5>
        <p>{{ movie.spoken_languages.map((l) => l.name)?.join(", ") }}</p>
      </div>
    </template>

    <div v-if="movie.budget" data-test="budget">
      <h5 v-text="t('budget')"></h5>
      <p>
        {{ n(movie.budget, "currency") }}
      </p>
    </div>

    <div v-if="movie.revenue" data-test="incomes">
      <h5 v-text="t('incomes')"></h5>
      <p>
        {{ n(movie.revenue, "currency") }}
      </p>
    </div>

    <div v-if="movie.keywords?.length" data-test="keywords">
      <h5 v-text="t('keywords')"></h5>
      <p class="flex flex-wrap gap-2 mt-1">
        <template v-for="keyword in movie.keywords" :key="keyword.id">
          <my-tag :label="keyword.name" color="zinc-300" text-color="black" />
        </template>
      </p>
    </div>
  </aside>
</template>

<script setup>
import { useI18n } from "vue-i18n";

defineProps({ movie: { type: Object, required: true } });
const { t } = useI18n({ useScope: "local" });
const { n } = useI18n({ useScope: "global" });
</script>

<i18n>
{
  "en": {
    "budget": "Budget",
    "incomes": "Incomes",
    "keywords": "Keywords",
    "languages": "Language|Languages",
    "original_title": "Original title"
  },
  "es": {
    "budget": "Presupuesto",
    "incomes": "Ingresos",
    "keywords": "Palabras clave",
    "languages": "Idioma|Idiomas",
    "original_title": "Título original"
  }
}
</i18n>
