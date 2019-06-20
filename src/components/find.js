import React, { useContext, useState } from 'react';
import FlexSearch from 'flexsearch';
import { useStaticQuery, graphql } from 'gatsby';
import { LocaleContext } from '../context/locale-context';

const Find = () => {
  const data = useStaticQuery(graphql`
  query FindUnits {
   allUnitsJson {
    edges {
     node {
        id
        annotations {
          online_title_en
          online_title_ar
        }
        clusters {
          collections
          locations
        }
      }
    }
  }
  }
`);
  
  const units = data.allUnitsJson.edges.map(u => u.node);
  
  const locale = useContext(LocaleContext);
  const [queryTitle, setQueryTitle] = useState('');
  const [queryCollections, setQuerycollections] = useState('');
  const [results, setResults] = useState('');

  const index = new FlexSearch({
    depth: 3,
    split: /\s+/,
    doc: {
      id: "id",
      field: [
        `annotations:online_title_${locale}`,
        "clusters:locations",
      ]
    }
  });

  index.add(units);
  
  const ResultList = () => {
    if (results.length > 0) {
      return results.map((unit, i) => (
        <div className="item-search" key={i}>
          <a href={`/${locale}/database/units/${unit["id"]}`} className="link" rel="noopener noreferrer" target="_blank">
            <h4>{unit["annotations"][`online_title_${locale}`]}</h4>
          </a>
        </div>
      ));
    } else if (queryTitle.length > 2) {
      return 'No results for ' + queryTitle;
    } else if (
      results.length === 0 &&
        queryTitle.length > 0
    ) {
      return 'Please insert at least 3 characters';
    } else {
      return '';
    }
  };

  function search () {
    if (queryTitle.length > 2) {
      const results = getSearchResults();
      setResults(results);
    } else {
      setQueryTitle(queryTitle);
      setResults([]);
    }
  }

  function getSearchResults() {
    if (!queryTitle || !index) {
      return [];
    } else {
      setResults([]);
      const unitsResult = index.search([{
        field: `annotations:online_title_${locale}`,
        query: queryTitle,
        bool: "and"
      },{
        field: "clusters:locations",
        query: queryCollections,
        bool: "or"
      }]);
      setResults(unitsResult);
      return unitsResult;
    }
  }

  return(
    <div>
      Title:
      <input
        className="search__input"
        type="text"
        onBlur={e => setQueryTitle(e.target.value)}
        placeholder={'Search'}
      />
      <br/>
      Collection:
      <input
        className="collection__input"
        type="text"
        onBlur={e => setQuerycollections(e.target.value)}
        placeholder={'Collections'}
      />
      <button onClick={search}>
        Search
      </button>
      <div>
        <ResultList />
      </div>
    </div>
  );
};

export default Find;


