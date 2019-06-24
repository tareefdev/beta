import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { geoMercator } from 'd3-geo';
import * as d3 from 'd3';
import { sources, syriaDistrictsTopoJson } from './data/map-sources';
import * as topojson from 'topojson';
import { mapConstants } from "./data/map-constants"; 

class SyriaMap extends Component {
  constructor (props) {
    super(props);
    this.drawMap = this.drawMap.bind(this);
    this.projection = geoMercator()
      .center(mapConstants.syriaCenter)
      .scale(this.props.width * [mapConstants.mapRatio + mapConstants.mapRatioAdjuster]);
    this.sources = null;
    this.syr = null;
    this.window = undefined;
  }

  componentDidMount () {
    const sourcesJSON = sources();
    this.sources = sourcesJSON;
    const topoJson = syriaDistrictsTopoJson();
    this.syr = topoJson;
    this.window = window;
    this.drawMap();
  }

 

  drawMap () {
    const propsWidth = this.props.width;
    const sources = this.sources;
    const gov = this.gov;
    const dis = this.dis;
    const num = this.num;
    const viz = this.viz;
    const projection = this.projection;
    const govNode = d3.select(gov);
    const disNode = d3.select(dis);
    const numNode = d3.select(num);


     // adjust map size when browser window size changes
    d3.select(this.window).on('resize', resize);
  


    const path = d3.geoPath().projection(projection);
    const svg = d3
      .select(viz)
      .append('svg')
      .attr('width', this.props.width)
      .attr('height', this.props.height);

    const features = svg.append('g').attr('transform', 'translate(-200,70)');

    // It's better to use css's filter rule with contrast, although there is a bug with it in chrome https://stackoverflow.com/questions/32567156/why-dont-css-filters-work-on-svg-elements-in-chrome
    // https://bugs.chromium.org/p/chromium/issues/detail?id=109224

    function resize () {
      const path = d3.geoPath().projection(projection);
      const svg = d3
        .select(viz)
        .append('svg')
        .attr('width', propsWidth);

      let width = parseInt(d3.select(viz).style('width'), 10);
      width = width - mapConstants.margin.left - mapConstants.margin.right;
      let height = width * mapConstants.mapRatio;
 
      // update projection
      projection
        .center(mapConstants.syriaCenter)
        .scale(width * mapConstants.resizeScale * [mapConstants.mapRatio + mapConstants.mapRatioAdjuster]);

      // resize map container
      svg.style('width', width + 'px').style('height', height + 'px');

      // resize map
      svg.selectAll('path').attr('d', path);
    }
    function mouseout () {
      d3.selectAll('.district').attr('fill', d => colorize(d, 'original'));
      d3.select(gov)
        .transition()
        .duration(mapConstants.mouseoutDuration)
        .style('opacity', 0);
        disNode
        .transition()
        .duration(mapConstants.mouseoutDuration)
        .style('opacity', 0);
      numNode
        .transition()
        .duration(mapConstants.mouseoutDuration)
        .style('opacity', 0);
      d3.select(this).style('stroke-width', 0.3);
    }

    function mouseover(d) {
      const Ocolor = d3.select(viz).attr('Ocolor');
      const governorate = d.properties.NAME_1;
      const district = d.properties.NAME_2;
      const result = sources.filter(obj => obj.governorate === governorate);
      const districtSources = result[0].districts[district];
      govNode.transition().style('opacity', 1);
      govNode.html(d.properties.NAME_1);
      disNode.transition().style('opacity', 1);
      disNode.html(d.properties.NAME_2);
      numNode.transition().style('opacity', 1);
      numNode.html(districtSources);
      d3.selectAll('.district').attr('fill', d => colorize(d, 'dim'));
      d3.select(this).attr('fill', Ocolor);
      d3.select(this).style('stroke-width', 1.5);
    }
    function colorize (d, type) {
      const governorate = d.properties.NAME_1;
      const district = d.properties.NAME_2;
      const result = sources.filter(obj => obj.governorate === governorate);
      const numberOfSources = result[0].districts[district];
      if (numberOfSources > 17) return mapConstants.colorLegend[type].first;
      else if (numberOfSources > 12) return mapConstants.colorLegend[type].second;
      else if (numberOfSources > 9) return mapConstants.colorLegend[type].third;
      else if (numberOfSources > 7) return mapConstants.colorLegend[type].fourth;
      else if (numberOfSources > 5) return mapConstants.colorLegend[type].fifth;
      else if (numberOfSources > 3) return mapConstants.colorLegend[type].sixth;
      return mapConstants.colorLegend[type].seventh;
    }
    features
    .selectAll('path')
    .data(topojson.feature(this.syr, this.syr.objects.SYR_adm2).features)
    .enter()
    .append('path')
    .attr('class', 'district')
    .attr('d', path)
    .attr('fill', d => colorize(d, 'original'))
    .attr('Ocolor', d => colorize(d, 'original'))
    .attr('district', d => d.properties.NAME_2)
    .attr('stroke', '#404040')
    .attr('stroke-width', 0.3)
    .on('mouseover', mouseover)
    .on('mouseout', mouseout);
  }

  render () {
    return (
      <div>
        <div ref={viz => (this.viz = viz)} >
        <h3>From 2700 Sources distributed as follows:</h3>
        <div className='info'>
          <img src='../../content/collections/chemical-weapons/data/location2.svg' alt='loc' className='pointer' />
          <h5>District Name: </h5>
          <div className='tip' ref={dis => (this.dis = dis)} />
          <br />
          <h5>Governorate Name: </h5>
          <div className='tip' ref={gov => (this.gov = gov)} />
          <br />
          <h5>{`Number of Sources: `}</h5>
          <div className='tip' ref={num => (this.num = num)} />
        </div>
        </div>
      </div>
    );
  }
}

SyriaMap.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number
};

export default SyriaMap;
