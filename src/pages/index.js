import React, { useContext } from "react";
import { Link } from "gatsby";

const Index = () => {
  return (
    <div>
      INDEX PAGE
      <Link to={`investigations`}>
        Investigations
      </Link>
    </div>
  );
};

export default  Index;
