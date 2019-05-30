import { select } from "d3-selection";
import { timeInterval , timeYear } from "d3-time";
import { timeParse,timeFormat } from "d3-time-format";
import { scaleTime, scaleLinear } from "d3-scale";
import { line, curveStepAfter } from "d3-shape";
import { axisBottom, axisLeft, axisRight } from 'd3-axis';
import { extent, max } from "d3-array";

export default {
  line: line,
  scaleTime: scaleTime,
  scaleLinear: scaleLinear,
  axisBottom: axisBottom,
  axisLeft: axisLeft,
  axisRight: axisRight,
  select: select,
  interval: timeInterval ,
  timeYear: timeYear,
  timeFormat: timeFormat,
  timeParse: timeParse,
  curveStepAfter: curveStepAfter,
  extent: extent,
  max: max
};
