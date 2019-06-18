import React, { useContext } from "react";
import { Link } from "gatsby";

import { rhythm, scale } from "../utils/typography";
import { LocationContext } from '../context/locale-context';
import { LocaleContext } from '../context/locale-context';
import LocalizedLink from '../components/localizedLink';
import tr from '../components/useTranslations';

import '../style/main.scss';

const Layout = ({ children }) => {
  
  const locale = useContext(LocaleContext);
  const location = useContext(LocationContext);
  
  const rootPath = `${__PATH_PREFIX__}/`;
  const header = (
    <div className="site-header">
      <div className="logo">
        <LocalizedLink to={''}>SYRIAN ARCHIVE</LocalizedLink>
      </div>
      <nav className="header-menu">
          <ul>
            <li>
              <LocalizedLink to={'investigations'}>
                {tr('Investigations')}
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink to={'collections'}>
                {tr('Collections')}
              </LocalizedLink>
            </li>            
            <li>
              <LocalizedLink to={'database'}>
                {tr('Database')}
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink to={'tech-advocacy'}>
                {tr('Tech Advocacy')}
              </LocalizedLink>
            </li>            
            <li>
              <LocalizedLink to={'tools-methods'}>
                {tr('Tools and Methods')}
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink to={'about'}>
                {tr('About')}
              </LocalizedLink>
            </li>
          </ul>
      </nav>
      <div className="social-buttons">
        <ul>
          <li><a>T</a></li>
          <li><a>F</a></li>
          <li><a>A</a></li>
          <li><a>Donate</a></li>
        </ul>
      </div>
    </div>
  );

  return (
    <div>
      <header>{header}</header>
      <main
        className={locale}
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(42),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        {children}</main>
    </div>
  );
};

export default Layout;
