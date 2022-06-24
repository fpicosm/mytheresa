import { createI18n } from "vue-i18n";

const files = require.context("./messages", true, /[A-Za-z0-9-_,\s]+\.json$/i);

const messages = files.keys().reduce((messages, file) => {
  const [, locale] = file.match(/([A-Za-z0-9-_]+)\./i);
  if (!locale) return messages;
  return Object.assign(messages, { [locale]: files(file) });
}, {});

export const datetimeFormats = {
  en: {
    year: {
      year: "numeric",
    },
  },
  es: {
    year: {
      year: "numeric",
    },
  },
};

export const numberFormats = {
  en: {
    currency: {
      style: "currency",
      currency: "USD",
      currencyDisplay: "symbol",
      maximumFractionDigits: 0,
    },
    decimal: {
      style: "decimal",
    },
  },
  es: {
    currency: {
      style: "currency",
      currency: "USD",
      currencyDisplay: "narrowSymbol",
      maximumFractionDigits: 0,
    },
    decimal: {
      style: "decimal",
    },
  },
};

export default createI18n({
  legacy: false,
  locale: process.env.VUE_APP_I18N_LOCALE || "en",
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "en",
  messages,
  numberFormats,
  datetimeFormats,
});
