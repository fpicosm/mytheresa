<template>
  <my-scroller v-if="cast.length" :title="t('title')">
    <template v-for="person in cast" :key="person.id">
      <article class="person-preview flex flex-col gap-y-2">
        <my-image v-bind="imageProps(person)" />
        <div>
          <h6 class="leading-tight" v-text="person.name"></h6>
          <p class="text-xs mt-px" v-text="person.character"></p>
        </div>
      </article>
    </template>
  </my-scroller>
</template>

<script setup>
import { CAST_LIMIT } from "@/constants/movie";
import { ImageType, ApiSize, WebSizes } from "@/constants/person";
import { Getter } from "@/plugins/store/getters";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";

const props = defineProps({ movie: { type: Object, required: true } });

const { t } = useI18n({ useScope: "local" });

const cast = computed(() => {
  return (props.movie.cast || [])
    .filter((p) => p.known_for_department === "Acting")
    .sort((a, b) => a.order - b.order)
    .slice(0, CAST_LIMIT);
});

const store = useStore();
const imageProps = (person) => {
  const path = person.profile_path;
  const type = ImageType.VERTICAL;
  const src = store.getters[Getter.GET_IMAGE_URL](type, path, ApiSize[type]);
  const { width, height } = WebSizes[type];
  return { width, height, src };
};
</script>

<style></style>

<i18n>
{
  "en": {
    "title": "Cast"
  },
  "es": {
    "title": "Reparto"
  }
}
</i18n>
