import React from "react";
import LocalizedLink from "../components/localizedLink";
import tr from "../components/useTranslations";

const Index = () => {
  return (
    <div>
      INDEX PAGE
      <hr></hr>
      <LocalizedLink to={`investigations`}>
        {tr('Investigations')}
      </LocalizedLink>
      <br/>
      <LocalizedLink to={`about`}>
        {tr('About')}
      </LocalizedLink>
    </div>
  );
};

export default Index;
