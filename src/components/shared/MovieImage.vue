<template>
  <my-image :src="imageUrl" v-bind="{ width, height }" />
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { Getter } from "@/plugins/store/getters";
import { ImageType, ApiSize, WebSizes } from "@/constants/movie";

const props = defineProps({
  movie: { type: Object, required: true },
  type: {
    type: String,
    default: ImageType.HORIZONTAL,
    validator: (type) => Object.values(ImageType).includes(type),
  },
  width: {
    type: [Number, String],
    default: ({ type }) => WebSizes[type].width,
  },
  height: {
    type: [Number, String],
    default: ({ type }) => WebSizes[type].height,
  },
});

const store = useStore();

const imageUrl = computed(() => {
  const size = ApiSize[props.type];
  const path = {
    [ImageType.HORIZONTAL]: props.movie.backdrop_path,
    [ImageType.VERTICAL]: props.movie.poster_path,
  }[props.type];

  return store.getters[Getter.GET_IMAGE_URL](props.type, path, size);
});
</script>
