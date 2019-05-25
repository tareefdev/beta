import React, { Component } from 'react';
import { graphql } from "gatsby";
import style from "../../src/global.scss";

class ObservationDatabase extends Component {
  constructor(props){
    super(props);
//    this.buildDatabase = this.buildDatabase.bind(this);
  }

  componentDidMount() {

  }

  
  render() {
    let { allUnitsJson } = this.props.data;
    const units = allUnitsJson.edges.map(u => u.node); 
    console.log(units[1]);
    const listItems = units.map((unit) =>
                                <div
                                  key={unit["id"]}
                                  className="unit"
                                >
                                  <span>{unit["incident_code"]}</span>
<span>{unit["annotations"]["upload_date"]}</span>
                                  <p>{unit["annotations"]["online_title_en"]}</p>
<a></a>
                                </div>
                                      );
    
    return <div>
             {listItems}
           </div>;
  }
}

export default ObservationDatabase;

export const pageQuery = graphql`
  query {
 allUnitsJson {
    edges {
     node {
        id
        aid
       incident_code
        annotations {
          upload_date
          online_title_en
          location
          online_link
        }
      }
    }
  }
  }
`;
