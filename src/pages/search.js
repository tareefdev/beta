import React, { useContext, useState } from 'react';
import FlexSearch from 'flexsearch';
import { graphql } from 'gatsby';
import LocalizedLink from "../components/localizedLink";
import { LocaleContext } from '../context/locale-context';


const Search = ({data}) => {
  const units = data.allUnitsJson.edges.map(u => u.node);
  
  const locale = useContext(LocaleContext);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState('');

  const index = locale === 'en' ? FlexSearch.create() : FlexSearch.create({
    split: /\s+/,
    rtl: true
  });
  
  for(let i = 0; i < units.length; i++){
    index.add(units[i]["id"], units[i]["annotations"][`online_title_${locale}`]);
  }

  const ResultList = () => {
    if (results.length > 0) {
      return results.map((unit, i) => (
        <div className="item-search" key={i}>
          <LocalizedLink to={`/database/units/${unit["id"]}`} className="link">
            <h4>{unit["annotations"][`online_title_${locale}`]}</h4>
          </LocalizedLink>
        </div>
      ));
    } else if (query.length > 2) {
      return 'No results for ' + query;
    } else if (
      results.length === 0 &&
        query.length > 0
    ) {
      return 'Please insert at least 3 characters';
    } else {
      return '';
    }
  };

  function search (event) {
    const quer = event.target.value;
    if (query.length > 2) {
      const results = getSearchResults(quer);
      setQuery(quer);
      setResults(results);
    } else {
      setQuery(quer);
      setResults([]);
    }
  }

  function getSearchResults(query) {
    if (!query || !index) {
      return [];
    } else {
      setResults([]);
      setResults(index.search(query));
      const uintsResult = index.search(query);
      const nodes = units.filter(node => (uintsResult.includes(node["id"]) ? node : null));
      return nodes;
    }
  }
  
  return(
    <div>
      <input
        className="search__input"
        type="text"
        onChange={search}
        placeholder={'Search'}
      />
      <div>
        <ResultList />
      </div>
    </div>
  );
};

export default Search;

export const pageQuery = graphql`
  query Units{
 allUnitsJson {
    edges {
     node {
        id
        annotations {
          online_title_en
          online_title_ar
        }
      }
    }
  }
  }
`;
