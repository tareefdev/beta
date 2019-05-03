import React, { useContext } from "react";
import { Link } from "gatsby";

import { rhythm, scale } from "../utils/typography";
import { LocationContext } from '../context/locale-context';
import { LocaleContext } from '../context/locale-context';
//import useTranslations from "../components/useTranslations";

import style from '../style/main.scss';

const Layout = ({ title, children }) => {
  
  const locale = useContext(LocaleContext);
  const location = useContext(LocationContext);
  //  const { title } = useTranslations();
  
  const rootPath = `${__PATH_PREFIX__}/`;
  let header;

  if (location.pathname === rootPath) {
    header = (
      <h1
        style={{
          ...scale(1.5),
          marginBottom: rhythm(1.5),
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to={`${locale === 'ar'? locale : '/'}`}
        >
          {title}
        </Link>
      </h1>
    )
  } else {
    header = (
      <h3
        style={{
          fontFamily: `Montserrat, sans-serif`,
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to={`${locale === 'ar'? locale : '/'}`}
        >
          {title}
        </Link>
      </h3>
    );
  }
  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <header>{header}</header>
      <main className={locale}>{children}</main>
    </div>
  );
};

export default Layout;
