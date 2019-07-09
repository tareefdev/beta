import React, {useState} from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import LocalizedLink from "../../components/localizedLink";
import useTranslations from '../../components/useTranslations';

const ListCollection = ({allUnits, units, updateUnits, setHoveredUnit}) => {
  
  const [queryTitle, setQueryTitle] = useState('');
  const tr = useTranslations();

  const query = {
//    title: '',
    dateBefore: undefined,
    dateAfter: undefined
  };
  
  const listItems = units.map((unit) =>
                              <div
                                key={unit["id"]}
                                className="unit"
                                onMouseEnter={() => setHoveredUnit(unit)}
                                onMouseLeave={() => setHoveredUnit({})}
                              >

                                <span>{unit["incident_date_time"]}</span>
                                <p>{unit["title"]}</p>
                                <LocalizedLink to={`database/units/${unit.id}`}>{tr('View')}</LocalizedLink>
                              </div>
                             );

  function filterByText(){
    let updatedList = allUnits.filter(function(item){
      return item.title.toLowerCase().search(
        queryTitle.toLowerCase()) !== -1;
    });
    if (query.dateBefore !== undefined) {
      updatedList = updatedList.filter(function (item) {
        const d1 = new Date(item.incident_date_time);
        const d2 = new Date(query.dateBefore);
        return d1 < d2;
      });
    }
    if (query.dateAfter !== undefined) {
      updatedList = updatedList.filter(function (item) {
        let d1 = new Date(item.incident_date_time);
        let d2 = new Date(query.dateAfter);
        return d1 > d2;
      });
    }
    updateUnits(updatedList);
  }

  return (
    <div>
        <input
          type="text"
          onChange={e => setQueryTitle(e.target.value)}
          placeholder={'Filter'}
        />
        <br/>
        Before
        <DayPickerInput onDayChange={day => {
          query.dateBefore = day;
        }} />
        <br/>
        After
        <DayPickerInput onDayChange={day => {
          query.dateAfter = day;
        }} />
        <br/>
        <button onClick={filterByText}>
          Search
        </button>
      {listItems}
    </div>
  );
};

export default ListCollection;
