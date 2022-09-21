import React, { useRef, useEffect } from 'react';

import * as d3 from 'd3';
import { allAssets } from '../../utils/AssetUtils';

const CircleGraph = (props) => {
  const ref = useRef();

  useEffect(() => {
    // Adapted by https://codepen.io/zhaoyi0113/pen/PEgYZX
    // Get the SVG container, and apply a transform such that the origin is the
    // center of the canvas. This way, we don’t need to position arcs individually.
    const svg = d3.select(ref.current);
    const width = +svg.attr('width');
    const height = +svg.attr('height');
    const g = svg.append('g').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    // An arc function with all values bound except the endAngle. So, to compute an
    // SVG path string for a given angle, we pass an object with an endAngle
    // property to the `arc` function, and it will return the corresponding string.
    const arc = d3.arc().innerRadius(85).outerRadius(100).cornerRadius(10);

    const dataInput = props.data.map((market) => parseFloat(market.borrow));
    const totalBorrow = dataInput.reduce((accumululator, current) => accumululator + current, 0);
    const formatedData = dataInput.map((d) => d / totalBorrow).map((d) => (d < 0.03 ? 0.03 : d));
    const dataWithGaps = [];
    formatedData.forEach((d) => {
      dataWithGaps.push(d, 0.01);
    });

    const dataColors = props.data.map((market) => allAssets[market.symbol].color);
    const c = d3.scaleOrdinal(dataColors.slice(0, 1).concat(['#0D0F27']).concat(dataColors.slice(1)));
    const pie = d3
      .pie()
      .sort(null)
      .value(function (d) {
        return d;
      });
    // Add the foreground arc in orange, currently showing 12.7%.
    const foreground = g
      .selectAll('.arc')
      .data(pie(dataWithGaps))
      .enter()
      .append('path')
      .attr('class', 'arc')
      .style('fill', function (d) {
        return c(d.value);
      })
      .attr('d', arc);
  }, []);
  return <svg ref={ref} width="300" height="300" />;
};

export default CircleGraph;
