// var padding = 20,
// 	width = 304,
// 	height = 100;

// // var svgtwocircles = d3.select("#two-circle")
// // 	.append("svg")
// // 	.attr("width", width)
// // 	.attr("height", height);

// var svgtwocircles = dimple.newSvg("#two-circle", width, height);
//     d3.csv("data/countyData.csv", function (error,rows) {
//     	if (error) {console.log(error);}

//         var usdaAtlas = d3.map(rows, function (state) { return Number(state.id); });
// 	      var myChart = new dimple.chart(svg, rows);
// 	      myChart.setBounds(95, 25, 475, 335)
// 	      myChart.addCategoryAxis("x", "Price Tier");
// 	      myChart.addCategoryAxis("y", "Pack Size");
// 	      myChart.addMeasureAxis("p", "Unit Sales");
// 	      var rings = myChart.addSeries("Channel", dimple.plot.pie);
// 	      rings.innerRadius = 15;
// 	      rings.outerRadius = 25;
// 	      myChart.addLegend(240, 10, 330, 20, "right");
// 	      myChart.draw();
//     });