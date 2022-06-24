import VueAxios from "vue-axios";
import Axios from "axios";

export const axios = Axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.VUE_APP_API_TOKEN}`,
  },
});

export default {
  install: (app) => {
    app.use(VueAxios, axios);
    app.provide("axios", app.config.globalProperties.axios);
  },
};
