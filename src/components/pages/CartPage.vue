<template>
  <div class="cart h-full">
    <main class="container mx-auto p-4 md:p-6 lg:p-8 h-full">
      <template v-if="cart.size">
        <h2 v-text="t('summary')"></h2>
        <div class="flex flex-col gap-y-4 mt-4">
          <template v-for="([id, item], index) in cart" :key="id">
            <my-separator v-if="index" />
            <cart-item v-bind="{ ...item, update, remove }" />
          </template>
        </div>
      </template>

      <template v-else>
        <div class="flex h-full w-full items-center justify-center">
          <h2 v-text="t('empty')"></h2>
        </div>
      </template>
    </main>
  </div>
</template>

<script setup>
import { Module } from "@/plugins/store/modules";
import { Action } from "@/plugins/store/modules/cart/actions";
import { State } from "@/plugins/store/modules/cart/state";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import CartItem from "../shared/CartItem.vue";

const store = useStore();
const { t } = useI18n({ useScope: "local" });
const cart = computed(() => store.state[Module.CART][State.DATA]);
const update = (item) => {
  return store.dispatch(`${Module.CART}/${Action.UPDATE_ITEM}`, item);
};
const remove = (item) => {
  return store.dispatch(`${Module.CART}/${Action.REMOVE_ITEM}`, item);
};
</script>

<i18n>
{
  "en": {
    "empty": "Your cart is empty. Please, add some items from the catalog",
    "summary": "Cart summary"
  },
  "es": {
    "empty": "Tu cesta está vacía. Por favor, añade algún ítem del catálogo",
    "summary": "Resumen de la cesta"
  }
}
</i18n>
