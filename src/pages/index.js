import React, { useContext } from "react";
import { Link } from "gatsby";

import { LocaleContext } from '../context/locale-context';

const Index = () => {
  const locale = useContext(LocaleContext);
  return (
    <div>
      INDEX PAGE
      <hr></hr>
      <Link to={`${locale}/investigations`}>
        Investigations
      </Link>
    </div>
  );
};

export default  Index;
