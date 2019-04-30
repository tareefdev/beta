import React, { useContext } from "react";
import { LocaleContext } from '../context/locale-context';
import translations from "../../config/translations/translations.json";

function tr(s) {
  const locale = useContext(LocaleContext);
  try {
    return translations[locale][s.toLowerCase()] ? translations[locale][s.toLowerCase()] : s;
  } catch (e) {
    return s;
  }
}

export default tr;
