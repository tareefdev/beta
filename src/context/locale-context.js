import React from 'react';

import Layout from '../components/layout';
const locales = require(`../../config/i18n`);

const languages = Object.keys(locales);

const defaultLocale = 'en';
const LocaleContext = React.createContext(defaultLocale);
const LocaleConsumer = LocaleContext.Consumer;

const defaultLocation = {};
const LocationContext = React.createContext(defaultLocation);
const LocationConsumer = LocationContext.Consumer;

const wrapPageElement = ({ element, props }) => {
  const { pathname } = props.location;
  const locale = pathname.startsWith("/ar") ? "ar" : "en";
  const contextValue = locale;

  return (
    <LocationContext.Provider value={props.location}>
      <LocaleContext.Provider value={contextValue}>
        <Layout>{element}</Layout>
      </LocaleContext.Provider>
    </LocationContext.Provider>
  );
};

export {
  wrapPageElement,
  LocaleConsumer,
  LocaleContext,
  languages,
  LocationContext,
  LocationConsumer,
};
