import React from 'react';
import Layout from '../components/layout';
import LocalizedLink from '../components/localizedLink';
import tr from '../components/useTranslations';

const Index = () => {
  return (
    <Layout>
      INDEX PAGE
      <hr></hr>
      <LocalizedLink to={'investigations'}>
        {tr('Investigations')}
      </LocalizedLink>
      <br/>
      <LocalizedLink to={'about'}>
        {tr('About')}
      </LocalizedLink>
      <br/>
      <LocalizedLink to={'tools-methods'}>
        {tr('Tools and Methods')}
      </LocalizedLink>
      <br/>
      <LocalizedLink to={'collections'}>
        {tr('Collections')}
      </LocalizedLink>
      <br/>
      <LocalizedLink to={'database'}>
        {tr('Database')}
      </LocalizedLink>
      <br/>
      <LocalizedLink to={'tech-advocacy'}>
        {tr('Tech Advocacy')}
      </LocalizedLink>
    </Layout>
  );
};

export default Index;
