const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,

  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "plugins/i18n/locales",
      enableLegacy: false,
      runtimeOnly: false,
      compositionOnly: false,
      fullInstall: true,
    },
  },

  chainWebpack: (config) => {
    config.plugin("html").tap(([args]) => {
      args.title = "MyTheresa | Coding test by Fernando Picos";
      return [args];
    });
  },
});
