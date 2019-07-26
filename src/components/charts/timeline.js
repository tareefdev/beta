import React, { Component } from 'react';
import d3 from '../../utils/d3Importer';
import {filter, includes, groupBy, find} from 'lodash';
import moment from 'moment';
import axios from 'axios';

class Timeline extends Component {
  constructor(props){
    super(props);
    this.drawChart = this.drawChart.bind(this);
    this.units = [];
    this.data = [];
  }
  
  componentDidMount() {
    axios.get('https://api.syrianarchive.org/incidents/')
      .then(response => {
        this.units = [...response.data.units];
        this.drawChart();
      });
  }

  drawChart () {
    const node = this.node;
    let units = this.units;
    let data = this.data;
    const collectionName = this.props.collectionName;
    const lang = this.props.lang || 'en';
    const isEnglish = lang == 'en';
    
    units = filter(units, u => includes(u.clusters.collections,collectionName));
    units = filter(units, u => u.annotations.incident_date !== undefined);
    // setting up the data in this.props.units to the chart.
    units.forEach((d) => {
      const formatedDate = moment(d.annotations.incident_date).format('YYYY-MM-DD');
      if (formatedDate === 'Invalid date') {
        d.annotations.incident_date = moment(d.annotations.incident_date, 'DD-MM-YYYY').format('YYYY-MM-DD'); // eslint-disable-line
      } else {
        d.annotations.incident_date = formatedDate; // eslint-disable-line
      }
    });

    units = groupBy(units, (value) =>
                      value.annotations.incident_date
                     );

    const formatDate = d3.timeParse('%Y-%m-%d');

    for (const d in units) { // eslint-disable-line
      data.push({
        date: formatDate(d),
        counts: Object.values(units[d]).length,
        incidents: Object.values(units[d])
      });
    }
    
    // add dates which don't have incidents
    const dates = [];
    const findDate = data.map((d) => moment(d.date, 'YYYY-MM-DD'));
    const startDate = moment.min(findDate);
    const endDate = moment.max(findDate);

    for (let date = moment(startDate); date.diff(endDate) < 0; date.add(1, 'days')) {
      let d = moment(date).format('YYYY-MM-DD');
      d = formatDate(d);
      dates.push(d);
    }

    const margin = {top: 5, right: 20, bottom: 30, left: 20};
    const width = this.props.width - margin.right - margin.left;
    const height = this.props.height - margin.top - margin.bottom;

    const x = d3.scaleTime();
    isEnglish ? x.range([0, width]): x.range([width,0 ]);

    const y = d3.scaleLinear()
          .range([height, 0]);

    const line = d3.line()
          .x((d) => x(d.date))
          .y((d) => y(d.counts))
          .curve(d3.curveStepAfter);

    const xAxis = d3.axisBottom(x).ticks(d3.timeYear.every(1)).tickFormat(d3.timeFormat('%Y'));

    const yAxis = isEnglish ? d3.axisLeft(y).ticks(4) : d3.axisRight(y).ticks(4);
    
    const chart = d3.select(node)
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom);


    const g = chart.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')'); // eslint-disable-line

    x.domain(d3.extent(data, (d) => d.date));
    y.domain([0, d3.max(data, (d) => d.counts)]);

    const newData = dates.map((d) => find(data, {date: d}) || {date: d, counts: 0});

    g.append('g')
      .attr('transform', 'translate(0,' + height + ')') // eslint-disable-line
      .call(xAxis)
      .select('.domain');


    const t = isEnglish ? g.append('g') : g.append('g').attr("transform",'translate(' + width + ', 0)') ;
      t.call(yAxis)
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em');

    g.append('path')
      .data([data])
      .attr('fill', 'none')
      .attr('stroke', 'red')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 3)
      .attr('d', line(newData));
  }
  render() {
    return <div>
             <div ref={pop => this.pop = pop}></div>
             <svg ref={node => this.node = node}
                  width={500} height={500}>
             </svg>
           </div>;
  }
}

export default Timeline;


