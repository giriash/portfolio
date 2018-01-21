var rectr = 25;
var beginX = 10, beginY = 20;

var format = d3.format(".1%");
var formatPercentage = d3.format("%1");
//var xScale1 = d3.scale.linear().domain([-0.15,0.15]).range([0, 5*rectr]);

// var xAxis1 = d3.svg.axis().scale(xScale1).orient("bottom").ticks(3).tickFormat(formatPercentage);
// var xScale2 = d3.scale.linear().domain([-0.15,0.15]).range([0, 5*rectr]);
// var xAxis2 = d3.svg.axis().scale(xScale2).orient("bottom").ticks(6).tickFormat(formatPercentage);
// var xScale3 = d3.scale.linear().domain([-15,25]).range([0, 4*rectr]);
// var xAxis3 = d3.svg.axis().scale(xScale3).orient("bottom").ticks(4);


var svg4 = d3.select("#circlelegend")
	.append("svg")
	.attr("width", 80)
	.attr("height", 80);

svg4.append("circle")
	.attr("cx",40)
	.attr("cy",40)
	.attr("r",30)
	.attr("fill", "none")
	.attr("stroke", "#387486"); //5DCFD9
svg4.append("text")
	.text("35%")
	.attr("transform", "translate(" + 34 + ", " + 20 + ")");

svg4.append("circle")
	.attr("cx",40)
	.attr("cy",50)
	.attr("r",21)
	.attr("fill", "none")
	.attr("stroke", "#387486");
svg4.append("text")
	.text("30%")
	.attr("transform", "translate(" + 34 + ", " + 42 + ")");

svg4.append("circle")
	.attr("cx",40)
	.attr("cy",59)
	.attr("r",12)
	.attr("fill", "none")
	.attr("stroke", "#387486");
svg4.append("text")
	.text("25%")
	.attr("transform", "translate(" + 34 + ", " + 60 + ")");

// poverty circles

var svg4 = d3.select("#poverty-circle-legend")
	.append("svg")
	.attr("width", 80)
	.attr("height", 80);

svg4.append("circle")
	.attr("cx",40)
	.attr("cy",40)
	.attr("r",30)
	.attr("fill", "none")
	.attr("stroke", "orange"); //5DCFD9
svg4.append("text")
	.text("35%")
	.attr("transform", "translate(" + 34 + ", " + 20 + ")");

svg4.append("circle")
	.attr("cx",40)
	.attr("cy",50)
	.attr("r",21)
	.attr("fill", "none")
	.attr("stroke", "orange");
svg4.append("text")
	.text("30%")
	.attr("transform", "translate(" + 34 + ", " + 42 + ")");

svg4.append("circle")
	.attr("cx",40)
	.attr("cy",59)
	.attr("r",12)
	.attr("fill", "none")
	.attr("stroke", "orange");
svg4.append("text")
	.text("25%")
	.attr("transform", "translate(" + 34 + ", " + 60 + ")");


// rect legend

var xScale1 = d3.scale.ordinal().domain(["<-15%", "-10%","0%", "10%",">15%"]).rangeRoundBands([0, 5*rectr]);
var xAxis1 = d3.svg.axis().scale(xScale1).orient("bottom");
var xScale2 = d3.scale.ordinal().domain(["<-15%", "-10%","0%", "10%",">15%"]).rangeRoundBands([0, 5*rectr]);
var xAxis2 = d3.svg.axis().scale(xScale2).orient("bottom");

var svg3 = d3.select("#legend1")
	.append("svg")
	.attr("width", 1000)
	.attr("height", 110);

svg3.append("text")
	.attr("x",beginX)
	.attr("y",3.2*beginY)
	.text("Fastfood Change")
	.attr("font-size", "12px");
svg3.append("g")
		.attr("class", "axis")
		.attr("transform","translate("+(beginX + 100)+","+(2.5*beginY + rectr + 1)+")")
		.call(xAxis1);
svg3.append("rect")
	.attr("x",beginX + 100 + xScale1("<-15%"))
	.attr("y",2.5*beginY)
	.attr("width",rectr)
	.attr("height",rectr)
	.attr("fill","#FECDD0");
svg3.append("rect")
	.attr("x",beginX + 100 + xScale1("-10%"))
	.attr("y",2.5*beginY)
	.attr("width",rectr)
	.attr("height",rectr)
	.attr("fill","#FC9793");
svg3.append("rect")
	.attr("x",beginX + 100 + xScale1("0%"))
	.attr("y",2.5*beginY)
	.attr("width",rectr)
	.attr("height",rectr)
	.attr("fill","#FA656C");
svg3.append("rect")
	.attr("x",beginX + 100 + xScale1("10%"))
	.attr("y",2.5*beginY)
	.attr("width",rectr)
	.attr("height",rectr)
	.attr("fill","#F63038");
svg3.append("rect")
	.attr("x",beginX + 100 + xScale1(">15%"))
	.attr("y",2.5*beginY)
	.attr("width",rectr)
	.attr("height",rectr)
	.attr("fill","#E80A02");






svg3.append("text")
	.attr("x",beginX + 9.5*rectr)
	.attr("y",3.2*beginY)
	.text("Farm Market Change")
	.attr("font-size", "12px");

svg3.append("g")
		.attr("class", "axis")
		.attr("transform","translate("+(beginX + 110 + 10*rectr)+","+(2.6*beginY + rectr)+")")
		.call(xAxis2)
		;
svg3.append("rect")
	.attr("x",beginX + 110 + 10*rectr + xScale2("<-15%"))
	.attr("y",2.5*beginY)
	.attr("width",rectr)
	.attr("height",rectr)
	.attr("fill","#8ad6ba");
svg3.append("rect")
	.attr("x",beginX + 110 + 10*rectr + xScale2("-10%"))
	.attr("y",2.5*beginY)
	.attr("width",rectr)
	.attr("height",rectr)
	.attr("fill","#76d0af");
svg3.append("rect")
	.attr("x",beginX + 110 + 10*rectr + xScale2("0%"))
	.attr("y",2.5*beginY)
	.attr("width",rectr)
	.attr("height",rectr)
	.attr("fill","#62c9a3");
svg3.append("rect")
	.attr("x",beginX + 110 + 10*rectr + xScale2("10%"))
	.attr("y",2.5*beginY)
	.attr("width",rectr)
	.attr("height",rectr)
	.attr("fill","#3cbc8d");
svg3.append("rect")
	.attr("x",beginX + 110 + 10*rectr + xScale2(">15%"))
	.attr("y",2.5*beginY)
	.attr("width",rectr)
	.attr("height",rectr)
	.attr("fill","#309670");



// svg3.append("text")
// 	.attr("x",beginX + xScale1(0.37))
// 	.attr("y",2*rectr + 7*beginY-6)
// 	.text("Farm Market Growth:")
// 	.attr("font-size", "12px");

// svg3.append("g")
// 		.attr("class", "axis")
// 		.attr("transform","translate("+(beginX + rectr)+","+(6*beginY + 3*rectr)+")")
// 		.call(xAxis2)
//		;

svg3.append("text")
	.attr("x",beginX + 20*rectr)
	.attr("y",3.2 *beginY)
	.text("Grocery Store Change")
	.attr("font-size", "12px");

svg3.append("g")
		.attr("class", "axis")
		.attr("transform","translate("+(beginX + 100 + 21*rectr)+","+(2.6*beginY + rectr - 1)+")")
		.call(xAxis2)
		;
svg3.append("rect")
	.attr("x",beginX + 100 + 21*rectr + xScale2("<-15%"))
	.attr("y",2.5*beginY)
	.attr("width",rectr)
	.attr("height",rectr)
	.attr("fill","#DDD6FF");
svg3.append("rect")
	.attr("x",beginX + 100 + 21*rectr + xScale2("-10%"))
	.attr("y",2.5*beginY) 
	.attr("width",rectr)
	.attr("height",rectr)
	.attr("fill","#B6ADFE");
svg3.append("rect")
	.attr("x",beginX + 100 + 21*rectr + xScale2("0%"))
	.attr("y",2.5*beginY)
	.attr("width",rectr)
	.attr("height",rectr)
	.attr("fill","#9486FF");
svg3.append("rect")
	.attr("x",beginX + 100 + 21*rectr + xScale2("10%"))
	.attr("y",2.5*beginY)
	.attr("width",rectr)
	.attr("height",rectr)
	.attr("fill","#6D5CF8");
svg3.append("rect")
	.attr("x",beginX + 100 + 21*rectr + xScale2(">15%"))
	.attr("y",2.5*beginY)
	.attr("width",rectr)
	.attr("height",rectr)
	.attr("fill","#4837FF");






