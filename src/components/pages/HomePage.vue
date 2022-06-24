<template>
  <div class="home w-full h-full flex justify-center items-center p-8">
    <div class="container mx-auto text-center">
      <h1 class="mb-8 leading-none" v-text="t('title')"></h1>

      <div class="flex selector">
        <my-select
          v-model="category"
          clearable
          :options="categories"
          option-label="name"
          :placeholder="t('placeholder')"
        />

        <my-button
          :disabled="!category"
          icon="fa-solid fa-search"
          @click="navigate"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { Module } from "@/plugins/store/modules";
import { State } from "@/plugins/store/modules/categories/state";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { Route } from "@/plugins/router";

const { t } = useI18n({ useScope: "local" });
const store = useStore();
const router = useRouter();
const category = ref(null);
const categories = computed(() => store.state[Module.CATEGORIES][State.DATA]);
const navigate = () => {
  const id = +category.value;
  router.push({
    name: Route.CATEGORY_MOVIES,
    params: { id },
  });
};
</script>

<style lang="scss" scoped>
.selector {
  max-width: 600px;
  margin: 0 auto;
}
</style>

<i18n>
{
  "en": {
    "title": "Choose the category",
    "placeholder": "Select from the list below"
  },
  "es": {
    "title": "Elige una categoría",
    "placeholder": "Selecciona un elemento de la lista"
  }
}
</i18n>
