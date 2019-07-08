import React, { useContext } from "react";
import { LocaleContext } from '../context/locale-context';
import translations from "../../config/translations/translations.json";

export default function useTranslations() {
  
  const locale = useContext(LocaleContext);

  return function tr(s) {
    try {
      return translations[locale][s.toLowerCase()] ? translations[locale][s.toLowerCase()] : s;
    } catch (e) {
      return s;
    }
  };
}
