import React from 'react';
import LocalizedLink from '../components/localizedLink';
import tr from '../components/useTranslations';

const Index = () => {
  return (
    <div>
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
      <LocalizedLink to={'tech-advocacy'}>
        {tr('Tech Advocacy')}
      </LocalizedLink>
    </div>
  );
};

export default Index;
