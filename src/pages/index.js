import React from "react";
import LocalizedLink from "../components/localizedLink";

const Index = () => {
  return (
    <div>
      INDEX PAGE
      <hr></hr>
      <LocalizedLink to={`investigations`}>
        Investigations
      </LocalizedLink>
      <br/>
      <LocalizedLink to={`about`}>
        About
      </LocalizedLink>
    </div>
  );
};

export default Index;
