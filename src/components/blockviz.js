import React, { Component } from 'react';
import d3 from '../utils/d3Importer';
import merge from "lodash";

class BlockViz extends Component {
  constructor(props){
    super(props);
    this.drawViz = this.drawViz.bind(this);
  }

  componentDidMount() {
    this.drawViz();
  }

  drawViz() {
    let data = [];
    const no = this.node;
    let numbers = this.props.numbers;
    let colors =  this.props.colors;

    const num = numbers[0];
    const color = colors[0];
    const num2 = numbers[1];
    const color2 = colors[1];
    const num3 = numbers[2];
    const color3 = colors[3];
    const width = this.props.width;


    const height = Math.floor(width / 10) * (Math.floor(num / 1000) + 1);
    let mainCanvas = d3.select(no)
        .classed('mainCanvas', true)
        .attr('width', width)
        .attr('height', height);

    let nodes = []; // map to track the colour of nodes

    // function to create new colours for the picking

    for (let i = 0; i < num; i++) {
      data.push({value: color});
    }

    if(num2) {

      for (let i = 0; i < num2; i++) {
        data.push({value: color2});
      }

    }

    if(num3) {

      for (let i = 0; i < num3; i++) {
        data.push({value: color3});
      }

    }

    // === Bind data to custom elements === //

    //    let customBase = document.createElement('custom');
    let custom = d3.select(no); // this is our svg replacement

    let u = Math.floor(width / 100);
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

      join.exit()
        .transition()
        .attr('width', 0)
        .attr('height', 0)
        .remove();

      return join
        .merge(enterSel)
        .transition()
        .attr('width', cellSize)
        .attr('height', cellSize)
        .attr('fillStyle', function(d) {
          return d.value;
        });

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

        nodes.push(merge(d, {
          x: node.attr('x'),
          y: node.attr('y'),
          w: node.attr('width'),
          h: node.attr('height')
        }));

        context.fillStyle = d.value;
        context.fillRect(node.attr('x'), node.attr('y'), node.attr('width'), node.attr('height'));

      });

    } // draw()



  }
  render() {
    return <div>
             <canvas ref={node => this.node = node}></canvas>
           </div>;
  }
}

export default BlockViz;
