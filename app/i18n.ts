"use client"
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend"; // <-- add this

i18n
  .use(HttpApi) 
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "km"],
    fallbackLng: "en",
    defaultNS: "translation",
    detection: {
      order: ["path", "cookie", "htmlTag", "localStorage", "subdomain"],
      caches: ["cookie"],
    },
    backend: {
  loadPath: "/locales/{{lng}}/{{ns}}.json", // path relative to public/
},
  });

export default i18n;
