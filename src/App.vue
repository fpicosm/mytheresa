<template>
  <header class="px-4 py-2 bg-primary text-white">
    <div class="flex items-center justify-between">
      <router-link v-slot="{ navigate }" to="/" custom>
        <my-button icon="fa-solid fa-house fa-lg" round @click="navigate" />
      </router-link>

      <div class="flex items-center w-full justify-end">
        <div class="w-0 m-2 md:w-full"></div>
        <!-- search box -->
        <div class="flex w-full overflow-hidden justify-end">
          <transition
            enter-from-class="w-0"
            enter-to-class="w-full"
            leave-from-class="w-full"
            leave-to-class="w-0"
            @after-enter="() => searchBox.focus()"
          >
            <my-input
              v-show="showSearchInput"
              ref="searchBox"
              v-model="searchValue"
              clearable
              class="search-box mr-2"
              :placeholder="t('search_placeholder')"
              @keyup.enter="onSearch"
            />
          </transition>

          <my-button
            icon="fa-solid fa-search fa-lg"
            round
            @click="showSearchInput = !showSearchInput"
          />
        </div>

        <!-- update locale -->

        <router-link v-slot="{ navigate }" :to="{ name: Route.CART }" custom>
          <div class="relative">
            <my-button
              icon="fa-solid fa-basket-shopping fa-lg"
              round
              @click="navigate"
            />

            <div
              v-show="cartItems"
              class="cart-items absolute text-xs top-0 right-0"
            >
              <span v-text="cartItems"></span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </header>

  <main>
    <div
      class="loading absolute inset-0 flex justify-center items-center"
      :class="{ hidden: !loading }"
    >
      <div class="text-5xl text-primary">
        <i class="fa-solid fa-spinner fa-spin-pulse fa-xl"></i>
      </div>
    </div>

    <router-view v-show="!loading" />
  </main>

  <footer class="bg-primary text-white text-xs px-6 py-4">
    <div class="flex items-center justify-between">
      <span>
        Coding test activity by
        <a :href="mailAddress">Fernando Picos</a>
      </span>

      <div class="social-links flex items-center gap-x-4">
        <a :href="githubUrl" target="_blank">
          <i class="fa-brands fa-github fa-xl"></i>
        </a>
        <a :href="linkedInUrl" target="_blank">
          <i class="fa-brands fa-linkedin fa-xl"></i>
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { State } from "@/plugins/store/state";
import { Route } from "@/plugins/router";
import { Getter as Cart } from "@/plugins/store/modules/cart/getters";
import { Module } from "@/plugins/store/modules";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const { t } = useI18n({ useScope: "local" });
const searchBox = ref();
const searchValue = ref("");
const showSearchInput = ref(false);
const loading = computed(() => store.state[State.LOADING]);
const cartItems = computed(() => {
  return store.getters[`${Module.CART}/${Cart.COUNT_ITEMS}`];
});
const onSearch = async () => {
  router.push({ name: Route.SEARCH, query: { s: searchValue.value } });
  searchValue.value = "";
};
const linkedInUrl = process.env.VUE_APP_LINKED_IN_URL;
const githubUrl = process.env.VUE_APP_GITHUB_REPO_URL;
const mailAddress = process.env.VUE_APP_EMAIL_ADDRESS;
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: auto;
}
</style>

<style lang="scss" scoped>
header {
  position: sticky;
  top: 0;
  z-index: 9999;

  .search-box {
    will-change: width;
    transition: width 0.3s ease-in-out;
  }

  .cart-items {
    background: red;
    width: 1.25em;
    height: 1.25em;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;

    span {
      font-size: 0.8em;
      font-weight: 500;
    }
  }
}

main {
  flex: 1;
}

.loading {
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: #032541;
    opacity: 0.2;
  }
}
</style>

<i18n>
{
  "en": {
    "search_placeholder": "Insert title to search"
  },
  "es": {
    "search_placeholder": "Inserta el nombre a buscar"
  }
}
</i18n>
