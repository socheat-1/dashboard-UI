import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";  // <-- add this ✅

i18n
  .use(HttpApi) // load translations from /public/locales
  .use(LanguageDetector) // detect user language
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "fr", "km"],
    fallbackLng: "en",
    defaultNS: "common",
    detection: {
      order: ["path", "cookie", "htmlTag", "localStorage", "subdomain"],
      caches: ["cookie"],
    },
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json", // loads translations
    },
  });

export default i18n;
