import React from 'react';
import LocalizedLink from "../../components/localizedLink";
import tr from '../../components/useTranslations';

const ListCollection = ({allUnits, units, updateUnits, setHoveredUnit}) => {
  
//  const [queryTitle, setQueryTitle] = useState('');
  let queryTitle = '';
  
  const listItems = units.map((unit) =>
                              <div
                                key={unit["id"]}
                                className="unit"
                                onMouseEnter={e => setHoveredUnit(unit)}
                                onMouseLeave={e => setHoveredUnit({})}
                              >

                                <span>{unit["incident_date_time"]}</span>
                                <p>{unit["title"]}</p>
                                <LocalizedLink to={`/database/units/${unit.id}`}>{tr('View')}</LocalizedLink>
                              </div>
                             );

  function filter(){
    let updatedList = allUnits.filter(function(item){
      return item.title.toLowerCase().search(
        queryTitle.toLowerCase()) !== -1;
    });
    updateUnits(updatedList);
  }

  return (
    <div>
      <input
        type="text"
        onBlur={e => queryTitle = e.target.value}
        placeholder={'Filter'}
      />
      <br/>
      <button onClick={filter}>
        Search
      </button>
      {listItems}
    </div>
  );
};

export default ListCollection;
