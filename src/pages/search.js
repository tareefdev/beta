import React, { useContext, useState } from 'react';
import FlexSearch from 'flexsearch';
import { graphql } from 'gatsby';
import { LocaleContext } from '../context/locale-context';

import Layout from '../components/layout';

const Search = ({data}) => {
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
        field: "annotations:incident_date_time",
        query: queryCollections,
        bool: "or"
      },{
        field: "annotations:location_info:location",
        query: queryCollections,
        bool: "or"
      }]);
      setResults(unitsResult);
      return unitsResult;
    }
  }

  return(
    <Layout className={locale}>
      <div className="database">
        <div className="search-forum">
          <div className="filter">
            <span>Title:</span>
            <input
              className="search__input"
              type="text"
              onBlur={e => setQueryTitle(e.target.value)}
              placeholder={'Search'}
            />
          </div>
          <div className="filter">
            <span>Collection:</span>
            <input
              className="collection__input"
              type="text"
              onBlur={e => setQuerycollections(e.target.value)}
              placeholder={'Collections'}
            />
          </div>
          <div className="filter">
            <span>Before Date</span>            
          </div>
          <div className="filter">
            <button onClick={search}>
              Search
            </button>
          </div>
        </div>
        <div className="search-results">
          <ResultList />
        </div>
      </div>
    </Layout>
  );
};

export default Search;

export const pageQuery = graphql`
  query Units {
   allUnitsJson {
    edges {
     node {
        id
        annotations {
          online_title_en
          online_title_ar
          incident_date_time
          location_info {
           location
          }
        }
      }
    }
  }
  }
`;
