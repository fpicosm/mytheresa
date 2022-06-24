<template>
  <transition
    class="animate__animated"
    leave-active-class="animate__backOutRight"
    @after-leave="remove(item)"
  >
    <article v-show="!isRemoved" class="grid grid-cols-5 p-4 items-center">
      <div class="col-span-5 sm:col-span-3 mb-6 sm:mb-0">
        <div class="flex items-center gap-x-4">
          <movie-link
            class="inline-flex"
            :movie="item"
            :type="ImageType.VERTICAL"
          />
          <h4 class="leading-tight" v-text="item.title"></h4>
        </div>
      </div>

      <div class="col-span-3 sm:col-span-1 flex justify-start sm:justify-end">
        <div class="flex flex-col items-center">
          <span v-text="t('units')"></span>
          <div class="flex items-center gap-x-4">
            <my-button
              :disabled="units === 1"
              inverted
              round
              size="1.5em"
              icon="fa-solid fa-minus"
              @click="decrement"
            />

            <span class="text-xl">{{ units }}</span>

            <my-button
              inverted
              round
              size="1.5em"
              icon="fa-solid fa-plus"
              @click="increment"
            />
          </div>
        </div>
      </div>

      <div class="col-span-2 sm:col-span-1 flex justify-end">
        <my-button
          color="red-800"
          inverted
          round
          icon="fa-solid fa-trash fa-lg"
          @click="isRemoved = true"
        />
      </div>
    </article>
  </transition>
</template>

<script setup>
// import { useStore } from "vuex";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
// import { Module } from "@/plugins/store/modules";
// import { Action } from "@/plugins/store/modules/cart/actions";
import MovieLink from "./MovieLink.vue";
import { ImageType } from "@/constants/movie";

const props = defineProps({
  item: { type: Object, required: true },
  units: { type: Number, required: true },
  update: { type: Function, default: () => {} },
  remove: { type: Function, default: () => {} },
});

const isRemoved = ref(false);
const { t } = useI18n({ useScope: "local" });

// const store = useStore();

// const removeItem = async () => {
//   await store.dispatch(`${Module.CART}/${Action.REMOVE_ITEM}`, props.item);
//   emit("remove");
// };

const setUnits = async (units) => {
  const { item } = props;
  return props.update({ item, units });
};
const decrement = () => setUnits(props.units - 1);
const increment = () => setUnits(props.units + 1);
</script>

<style lang="scss" scoped></style>

<i18n>
{
  "en": {
    "units": "Units"
  },
  "es": {
    "units": "Unidades"
  }
}
</i18n>
