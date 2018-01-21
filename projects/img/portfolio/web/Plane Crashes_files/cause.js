
var window_width = $(window).width(),
	window_height = $(window).height();
var cw_index = 0.7, 
	ch_index = 0.8;

var cause_width = window_width * cw_index,
	cause_height = window_height * ch_index;
var margin = {top: 20, right: 50, bottom: 30, left: 20};
var causes = ["criminal","human_error","mechanical","unknown","weather"];

// var parseDate = d3.time.format("%m/%Y").parse;


var xScale = d3.scale.ordinal().rangeRoundBands([0, cause_width]);

var yScale = d3.scale.linear().rangeRound([cause_height, 0]);

var z = d3.scale.category10();

var xAxis = d3.svg.axis().scale(xScale).orient("bottom").tickFormat(d3.time.format("%b"));

var yAxis = d3.svg.axis().scale(yScale).orient("right");

var svg2 = d3.select("#cause").append("svg")
   	.attr("width", cause_width + margin.left + margin.right)
    .attr("height", cause_height + margin.top + margin.bottom)
  	.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("data/cause0_data.csv", type, function(error, crimea) {
  if (error) throw error;

  var layers = d3.layout.stack()(causes.map(function(c) {
    return crimea.map(function(d) {
      return {x: d.year, y: d[c]};
    });
  }));

  xScale.domain(layers[0].map(function(d) { return d.x; }));
  yScale.domain([0, d3.max(layers[layers.length - 1], function(d) { return d.y0 + d.y; })]).nice();

  var layer = svg2.selectAll(".layer")
      .data(layers)
      .enter().append("g")
      .attr("class", "layer")
      .style("fill", function(d, i) { return z(i); });

  layer.selectAll("rect")
      .data(function(d) { return d; })
      .enter().append("rect")
      .attr("x", function(d) { return xScale(d.x); })
      .attr("y", function(d) { return yScale(d.y + d.y0); })
      .attr("height", function(d) { return yScale(d.y0) - yScale(d.y + d.y0); })
      .attr("width", xScale.rangeBand() - 1);

  svg2.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + cause_height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "axis axis--y")
      .attr("transform", "translate(" + cause_height + ",0)")
      .call(yAxis);
});

function type(d) {
  causes.forEach(function(c) { d[c] = +d[c]; });
  return d;
}
