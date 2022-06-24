<template>
  <div class="container mx-auto md:px-8 lg:px-32 xl:px-40">
    <div class="flex flex-wrap items-center gap-8 md:flex-nowrap">
      <div class="mx-auto">
        <movie-image v-bind="{ movie, ...imageSize }" :type="imageType" />
      </div>

      <div class="flex flex-col gap-y-3 w-full">
        <h1 class="leading-none" v-text="movie.title"></h1>

        <template v-if="movie.tagline">
          <my-blockquote>
            {{ movie.tagline }}
          </my-blockquote>
        </template>

        <div class="flex items-center">
          <template v-if="movie.release_date">
            <span data-test="release-date">
              {{ d(movie.release_date, "year") }}
            </span>
            <my-separator class="border-black mx-2 self-stretch" />
          </template>

          <template v-if="movie.genres?.length">
            <span data-test="genres">
              {{ movie.genres?.map((g) => g.name).join(", ") }}
            </span>
          </template>

          <template v-if="movie.runtime">
            <my-separator class="border-black mx-2 self-stretch" />

            <span data-test="duration">
              {{ t("duration", duration, duration.hours) }}
            </span>
          </template>
        </div>

        <template v-if="movie.vote_count">
          <div data-test="votes" class="flex items-center gap-x-4">
            <my-progress-bar :value="movie.vote_average * 10">
              <template #label>
                <b>
                  <span class="text-xl mr-1">{{ movie.vote_average }}/10</span>
                </b>
                ({{ n(props.movie.vote_count, "decimal") }}
                {{ t("vote_count", props.movie.vote_count) }})
                <span></span>
              </template>
            </my-progress-bar>
          </div>
        </template>

        <template v-if="movie.overview">
          <div data-test="summary" class="overview mt-4">
            <h2 v-text="t('summary')"></h2>
            <p v-text="movie.overview"></p>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { format, MINUTE } from "@/utils/time";
import { computed } from "vue";
import { getScreenSize, ScreenSize } from "@/utils/screen";
import { ImageType } from "@/constants/movie";
import MovieImage from "./MovieImage.vue";

const props = defineProps({ movie: { type: Object, required: true } });

const { t } = useI18n({ useScope: "local" });
const { d, n } = useI18n({ useScope: "global " });

const duration = computed(() => format(props.movie.runtime * MINUTE));

const showPoster = getScreenSize() !== ScreenSize.SM;

const imageType = computed(() => {
  return showPoster ? ImageType.VERTICAL : ImageType.HORIZONTAL;
});

const imageSize = computed(() => {
  return {
    [ImageType.VERTICAL]: {
      width: 300,
      height: "auto",
    },
    [ImageType.HORIZONTAL]: {
      width: "100%",
      height: "auto",
    },
  }[imageType.value];
});
</script>

<i18n>
{
  "en": {
    "duration": "{minutes}m|1h {minutes}m|{hours}h {minutes}m",
    "summary": "Summary",
    "vote_count": "vote|votes"
  },
  "es": {
    "duration": "{minutes}m|1h {minutes}m|{hours}h {minutes}m",
    "summary": "Resumen",
    "vote_count": "voto|votos"
  }
}
</i18n>
