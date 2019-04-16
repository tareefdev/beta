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
//  const locale = locales[language];
//  const test = props.location;
  const contextValue = locale;
  console.log(`here is wrap page and location is ${pathname}`);
  console.log(`here is wrap page and locale is ${locale}`);
//  const renderHeader = props.pageContext.pageType !== "offerDisplay";

  return (
    <LocationContext.Provider value={props.location}>
      <LocaleContext.Provider value={contextValue}>
        <Layout>{element}</Layout>
      </LocaleContext.Provider>
    </LocationContext.Provider>
  );
};


// class LocaleProvider extends React.Component {
//   state = {
//     locale: 'en'
//   }
  
//   render() {
//     const { children } = this.props;
//     const { locale } = this.state;
//     return (
//       <LocaleContext.Provider value={{locale}} >
//         {children}
//       </LocaleContext.Provider>
//     );
//   }
// };

// const LocaleProvider = () => {
//   <StaticQuery
//   query={graphql`
//       query ContextQuery {
//         site {
//           siteMetadata {
//             title
//           }
//         }
//       }
//     `}
//     render= {data =>
//              (
//     <LocaleContext.Provider value={{locale}} >
//       {children}
//     </LocaleContext.Provider>
//   )}
//   />
// }

// export default LocaleContext;

// export { LocaleProvider }

export {
  wrapPageElement,
  LocaleConsumer,
  LocaleContext,
  languages,
  LocationContext,
  LocationConsumer,
};
