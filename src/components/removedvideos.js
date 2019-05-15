import React, { Component } from 'react';
import * as d3 from 'd3';
import _ from 'lodash/fp';
const ChRemovedVidoes = require('./data/ChRemovedVidoes');

class RemovedVideos extends Component {
  constructor(props){
    super(props);
    this.drawViz = this.drawViz.bind(this);
  }

  componentDidMount() {
    this.drawViz();
  }

  drawViz() {
    let width = this.props.width;
    let height = Math.floor(width / 8);
    const ids = [...ChRemovedVidoes["ids"]];
    const removed = [...ChRemovedVidoes["removed"]];
    const no = this.node;
    let data = [];

    let mainCanvas = d3.select(no)
	.classed('mainCanvas', true)
	.attr('width', width)
	.attr('height', height);

    let nodes = []; // map to track the colour of nodes

    // function to create new colours for the picking


    // new -----------------------------------------------------

    // === Load and prepare the data === //

    _.each(i => data.push({
      value: removed.includes(i)
	? i.includes('CW_')
	? '#999'
	: 'orange'
      : 'teal',
      removed: removed.includes(i)
	? i.includes('CW_')
	? null
	: true
      : false,
      id: i
    }), ids);


    // === Bind data to custom elements === //

    //   let customBase = document.createElement('custom');
    let custom = d3.select(no); // this is our svg replacement

    let u = Math.floor(width / 88);
    // settings for a grid with 40 cells in a row and 2x5 cells in a group
    let groupSpacing = u;
    let cellSpacing = Math.floor(.2 * u);
    let cellSize = Math.floor(.8 * u);


    // === First call === //

    databind(data); // ...then update the databind function

    let t = d3.interval(function(elapsed) {
      draw(mainCanvas, false); // <--- new insert arguments
      if (elapsed > 10000) t.stop();
    }, 1000); // start a timer that runs the draw function for 300 ms (this needs to be higher than the transition in the databind function)

    // === Bind and draw functions === //

    function databind(data) {

      let join = custom.selectAll('custom.rect')
          .data(data);

      let enterSel = join.enter()
          .append('custom')
          .attr('class', 'rect')
          .attr('x', function(d, i) {
            let x0 = Math.floor(i / 100) % 10, x1 = Math.floor(i % 10);
            return groupSpacing * x0 + (cellSpacing + cellSize) * (x1 + x0 * 10);
          })
          .attr('y', function(d, i) {
            let y0 = Math.floor(i / 1000), y1 = Math.floor(i % 100 / 10);
            return groupSpacing * y0 + (cellSpacing + cellSize) * (y1 + y0 * 10);
          })
          .attr('width', 0)
          .attr('height', 0);

      join
	.merge(enterSel)
	.transition()
	.attr('width', cellSize)
	.attr('height', cellSize)
	.attr('fillStyle', function(d) {
          return d.value;
	});

      join.exit()
	.transition()
	.attr('width', 0)
	.attr('height', 0)
	.remove();

    } // databind()


    // === Draw canvas === //

    function draw(canvas) { // <---- new arguments

      // build context
      let context = canvas.node().getContext('2d');


      // clear canvas
      context.clearRect(0, 0, width, height);


      // draw each individual custom element with their properties

      let elements = custom.selectAll('custom.rect'); // this is the same as the join letiable, but used here to draw

      elements.each(function(d) { // for each virtual/custom element...

	let node = d3.select(this);

	nodes.push(_.merge(d, {
          x: node.attr('x'),
          y: node.attr('y'),
          w: node.attr('width'),
          h: node.attr('height')
	}));

	context.fillStyle = d.value;
	context.fillRect(node.attr('x'), node.attr('y'), node.attr('width'), node.attr('height'));

      });

    } // draw()





    // d3.select('.mainCanvas').on('mousemove', function() {

    //   // get mousePositions from the main canvas
    //   let mouseX = d3.event.layerX || d3.event.offsetX;
    //   let mouseY = d3.event.layerY || d3.event.offsetY;

    //   // get the data from our map !
    //   let nodeData = _.find(n => {
    // 	if ((mouseX < parseInt(n.x) + parseInt(n.w)) && (mouseX > parseInt(n.x)) && (mouseY < parseInt(n.y) + parseInt(n.h)) && (mouseY > parseInt(n.y))) {
    // 	  return true;
    // 	}
    // 	return false;
    //   })(nodes)



    //   if (nodeData) {

    // 	// Show the tooltip only when there is nodeData found by the mouse

    // 	const message = `
    // 					Video ${nodeData.id} <br />
    // 					 ${nodeData.removed === true ? 'Removed from YouTube <br />': ''}
    // 					 ${nodeData.removed === null ? 'Status unknown <br />': ''}
    // 					 ${nodeData.removed === false ? 'Online': ''}
    // 				`;

    // 	d3.select('#tooltip')
    // 	  .style('opacity', 0.8)
    // 	  .style('top', d3.event.pageY + 5 + 'px')
    // 	  .style('left', d3.event.pageX + 5 + 'px')
    // 	  .html(message);

    //   } else {

    // 	// Hide the tooltip when there our mouse doesn't find nodeData

    // 	d3.select('#tooltip')
    // 	  .style('opacity', 0);

    //   }


    // }); // canvas listener/handler


  }
  render() {
    return <div>
           <canvas ref={node => this.node = node}></canvas>
         </div>;
  }
  
}

export default RemovedVideos;
