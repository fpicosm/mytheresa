import { createApp } from "vue";
import App from "./App.vue";
import router from "./plugins/router";
import store from "./plugins/store";
import i18n from "./plugins/i18n";
import axios from "./plugins/axios";
import baseComponents from "./plugins/base-components";
import "./css/index.scss";

createApp(App)
  .use(i18n)
  .use(store)
  .use(router)
  .use(axios)
  .use(baseComponents)
  .mount("#app");
