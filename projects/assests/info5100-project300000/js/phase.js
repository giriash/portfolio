var window_width = $(window).width(),
	window_height = $(window).height();
var pw_index = 0.7,
	ph_index = 0.7;

// console.log(window_width);
// console.log(window_height);

var phase_width = window_width * pw_index,
	phase_height = window_height * ph_index;

	var width = 960;
	var height =600;
	var margin =50;
	var padding=200;
	//] var width = window_width * pw_index;
	// var height = window_height * ph_index;
	// var margin = 0.1 * width;
	// var padding= 0.2 * height;
	var point=[];
	var phase_data;
	var airlineData=[];
	var xlength=14;
	var bar=5;
	var phase=[
			{"phase":"TakeOff","fat":1452, "scale": 1.24},
			{"phase":"InitialClimb","fat":1318,"scale": 2.2},
			{"phase":"Route","fat":11099,"scale": 7.21},
			{"phase":"Approach","fat":6626, "scale": 11.83},
			{"phase":"Landing","fat":1571, "scale": 13.9}
		];
	// LineData();
	// var phaseId = ["takeoff", "climb", "route", ""]
	d3.csv("data/phase_data.csv", function(error,data){
		var phase_dataset = d3.map(data,function (d) {return Number(d.phase);});
		var data=data;
		//console.log(data);
		var y=[0,2,6,9,10,9,4];
		var value=data[24];
		// percentage for different phase,
		//you can refer to the last line in csv

		//the data for rect
		var point=[{y:1,x:value.grounded},
			{y:1,x:value.take_off},
			{y:1,x:value.initial_climb},
			{y:1,x:value.en_route},
			// {y:10,x:value.en_route},
			{y:1,x:value.approach},
			{y:1,x:value.landing},
			];

		// the data for airline path but the path is hidden in css
		var point2=[{y:0,x:0},
			{y:0.3,x:1},
			{y:2.5,x:1.5},
			{y:10,x:2.3},
			{y:11,x:6},
			{y:10,x:8},
			// {y:5,x:10.5},
			{y:3,x:10},
			{y:0.5,x:13},
			{y:0.1,x:14},
			{y:0,x:14.1}];

		//console.log(point2);
		//console.log(phase);



		svg = d3.select("#phase").append("svg")
			.attr("width",width)
			.attr("height",height)
			.attr("viewBox", "0 0 " + width + " " + height);

		var xScale = d3.scale.linear()
			.domain(d3.extent(point2,function(d){return d.x;}))
			.range([margin,width-margin]);
		var xBarScale = d3.scale.ordinal()
			.domain(phase.map(function(d){return d.phase;}))
			.rangeRoundBands([margin,width-margin],0.1);
		var yBarScale = d3.scale.linear()
			.domain([0,d3.max(phase,function(d){return d.fat;})])
			.range([height-margin,margin]);
		var yScale = d3.scale.linear()
			.domain([0,1+d3.max(point2,function(d){return d.y;})])
			// .domain(d3.extent(airlineData,function(d){return d.y;}))
			.range([height-margin,margin]);
		var xLineScale = d3.scale.ordinal()
  			.domain(data.map(function(d){return d.phase}))
  			.rangeRoundBands([0, 0.45*width]);
  		var yLineScale = d3.scale.linear().domain([20,0]).range([0, 0.3*height]);
		//d3.scale.linear().domain([0.4,0]).range([0,height2/2 - 3*padding2]);

		var xAxis = d3.svg.axis().scale(xScale).ticks(0)
			.orient("bottom");
		var yAxis = d3.svg.axis().scale(yScale).orient("left");
		var xBarAxis=d3.svg.axis().scale(xBarScale).orient("bottom");
		var yBarAxis=d3.svg.axis().scale(yBarScale).orient("left");
		var xLineAxis = d3.svg.axis().scale(xLineScale).orient("bottom");
		var yLineAxis = d3.svg.axis().scale(yLineScale).orient("left");


		svg.append("g").attr("class","axis")
		.attr("transform","translate(0,"+(height-margin)+")")
   		.call(xAxis);
		// svg.append("g").attr("class","yAxis").attr("transform","translate("+ margin +",0)")
		// .call(yAxis);

		// svg.append("g").attr("class","xBarAxis").attr("transform","translate(0,"+(height-margin)+")")
  // 		.call(xBarAxis);
		svg.append("g").attr("class","axis").attr("transform","translate("+ margin +",0)")
			.call(yBarAxis);

				function drawBarChart(){
		// draw bar chart
		svg.selectAll("rect")
			.data(phase)
			.enter().append("rect")
			.attr("class","initialRect")
			.attr("id", function(d){ return d.phase; })
		   	.on("click", function(d){
		   		//var
		   		drawline(d.phase, data);
		   	})
			.attr("x", function(d) { return xBarScale(d.phase); })
		    .attr("y", function(d) { return yBarScale(d.fat); })
		    .attr("width", 30)
		    //.attr("width", function(d) {return xScale(d.scale)/3;})
		    .attr("fill","#9D1134")
		    .transition().delay(function (d,i){ return i * 300;}).duration(300)
		    .attr("height", function(d) { return height-margin-yBarScale(d.fat); })
		   	.attr("opacity", function (d,i){
					return d.fat/10000;
		    });
		};


		//draw line chart
		$("#Route").click(function (){
			console.log("test click take off");
		});

		function drawline(rectid,data) {
			console.log("test click rect" + rectid);
			svg.selectAll(".lineaxis").remove();
			svg.selectAll(".phaseLineHight").remove();
			svg.selectAll(".linechartbg").remove();
			svg.selectAll(".phaseLines").remove();
			var px = event.screenX;//$("#" + rectid).position().left;
      		var py = event.screenY;//$("#" + rectid).position().top;
      		function translateX(){
      			if (px < 700) {return (px - 200);}
      			else if (px >= 700 && px < 900) {return (px - 240);}
      			else if (px >= 900) {return (px - 400);}

      		}

      		console.log("position is: x: " + px + "y: " + py);
      		console.log("window is: width: " + window_width + "height: " + window_height);

      		svg.append("rect")
      			.attr("x", (translateX() - 40))
      			.attr("y", (py - 0.3*height - 140))
      			.attr("width", 0.5*width)
      			.attr("height", 0.4*height)
      			.attr("class","linechartbg")
      			// .attr("fill","black")
      			;

			var phaseLineHight = d3.svg.line()
  				.x(function(d) { return xLineScale(d.phase); })
  				.y(function(d) {
  					//return yLineScale(d.take_off)
  					if (rectid == "TakeOff") {
							console.log("test id" + rectid);
							return yLineScale(d.take_off); }

					else if (rectid == "InitialClimb") { return yLineScale(d.initial_climb);}
					else if (rectid == "Route") { return yLineScale(d.en_route);}
					else if (rectid == "Approach") { return yLineScale(d.approach);}
					else if (rectid == "Landing") { return yLineScale(d.landing);};
  				});

  			var phaseLine1 =
  			d3.svg.line()
  				.x(function(d) { return xLineScale(d.phase); })
  				.y(function(d) {
  					return yLineScale(d.take_off);
  				});
  			var phaseLine2 = d3.svg.line()
  				.x(function(d) { return xLineScale(d.phase); })
  				.y(function(d) {
  					return yLineScale(d.initial_climb);
  				});
  			var phaseLine3 = d3.svg.line()
  				.x(function(d) { return xLineScale(d.phase); })
  				.y(function(d) {
  					return yLineScale(d.en_route);
  				});
  			var phaseLine4 = d3.svg.line()
  				.x(function(d) { return xLineScale(d.phase); })
  				.y(function(d) {
  					return yLineScale(d.approach);
  				});
  			var phaseLine5 = d3.svg.line()
  				.x(function(d) { return xLineScale(d.phase); })
  				.y(function(d) {
  					return yLineScale(d.landing);
  				});

  			//.interpolate('monotone');
  			var path1 = svg.append('path')
  				.attr('class', 'phaseLines')
  				.attr('d', phaseLine1(data))
  				.attr("transform","translate("+ translateX() +","+ (py - 0.3*height - 120) +")")
  				;
  			var path2 = svg.append('path')
  				.attr('class', 'phaseLines')
  				.attr('d', phaseLine2(data))
  				.attr("transform","translate("+ translateX() +","+ (py - 0.3*height - 120) +")")
  				;
  			var path3 = svg.append('path')
  				.attr('class', 'phaseLines')
  				.attr('d', phaseLine3(data))
  				.attr("transform","translate("+ translateX() +","+ (py - 0.3*height - 120) +")")
  				;
  			var path4 = svg.append('path')
  				.attr('class', 'phaseLines')
  				.attr('d', phaseLine4(data))
  				.attr("transform","translate("+ translateX() +","+ (py - 0.3*height - 120) +")")
  				;
  			var path5 = svg.append('path')
  				.attr('class', 'phaseLines')
  				.attr('d', phaseLine5(data))
  				.attr("transform","translate("+ translateX() +","+ (py - 0.3*height - 120) +")")
  				;
  			var path = svg.append('path')
  				.attr('class', 'phaselineHight')
  				.attr('d', phaseLineHight(data))
  				.attr("transform","translate("+ translateX() +","+ (py - 0.3*height - 120) +")")
  				;

  			svg.append("g")
				.attr("class","lineaxis")
				.attr("transform","translate("+ translateX() +","+ (py - 120) +")")
				.call(xLineAxis);
			svg.append("g")
				.attr("class","lineaxis")
				.attr("transform","translate("+ translateX() +","+ (py - 0.3*height - 120) +")")
				.call(yLineAxis);
		}

	function clickGetId(){

		}


		// draw text labels
		svg.append("text")
			.attr("x",(width-margin)/2)
			.attr("y",height-10)
			.style("text-anchor","middle")
			.text("Flying Phase")
			.style("font-size",20)
			.style("font-weight","bold")



		// draw the rect background
		// svg.append("rect")
  //   		.attr("x",margin)
  //   		.attr("y",margin)
  //   		.attr("width",xScale(value.grounded)-margin)
  //   		.attr("height",height-margin*2)
  //   		.attr("fill","rgba(232,232,240,1)")

		// svg.append("rect")
		// 	.attr("x",xScale(value.grounded)+bar)
		// 	.attr("y",margin)
		// 	.attr("width",xScale(value.take_off_percent)-margin-bar)
		// 	.attr("height",height-margin*2)
		// 	.attr("fill","rgba(70,165,229,0.2)")
		// 	// .attr("fill","rgba(70,165,229,0.5)")
		// svg.append("rect")
		// 	.attr("x",xScale(value.take_off)+bar)
		// 	.attr("y",margin)
		// 	.attr("width",xScale(value.climb_percent)-margin-bar)
		// 	.attr("height",height-margin*2)
		// 	.attr("fill","rgba(70,165,229,0.2)")

		// svg.append("rect")
		// 	.attr("x",xScale(value.initial_climb)+bar)
		// 	.attr("y",margin)
		// 	.attr("width",xScale(value.route_percent)-margin-bar)
		// 	.attr("height",height-margin*2)
		// 	.attr("fill","rgba(70,165,229,0.2)")
		// svg.append("rect")
		// 	.attr("x",xScale(value.en_route)+bar)
		// 	.attr("y",margin)
		// 	.attr("width",xScale(value.approach_percent)-margin-bar)
		// 	.attr("height",height-margin*2)
		// 	.attr("fill","rgba(70,165,229,0.2)")
		// svg.append("rect")
		// 	.attr("x",xScale(value.approach)+bar)
		// 	.attr("y",margin)
		// 	.attr("width",xScale(value.landing_percent)-margin-bar)
		// 	.attr("height",height-margin*2)
		// 	.attr("fill","rgba(70,165,229,0.2)")

		// set airplane path
	var path, airline;

	$("#play-btn").click(function() {
		svg.selectAll("rect").remove();
		airline = d3.svg.line().interpolate("cardinal")
			.x(function(d){return xScale(d.x);})
			.y(function(d){return yScale(d.y);})

		path = svg.append("path")
			.attr("class","airlinepath")
			.attr("d",airline(point2))
			.attr("stroke","rgba(0,0,0,0.8)")
			.attr("stroke-width","4")
			.attr("fill","none")
			.call(transition);
		svg.append("text")
      			.attr("x", width - 7 * margin)
      			.attr("y", "20px")
      			.attr("class", "phaseMessage")
      			.text("Click each bar to explore more");
	});


		// add the picture of plane

		var marker = svg.append("image")
			.attr("xlink:href","images/plane1.png")
			.attr("id","marker")
			.attr("transform","translate("+point2[0].x+","+point2[0].y+")")
			.attr("width",64)
			.attr("height",64);

		function transition(path){
			path.transition()
			.duration(10000)
			.attrTween("stroke-dasharray",tweenDash)
			.each("end",drawBarChart);

		}

    	function tweenDash(){
    		var l=path.node().getTotalLength();
    		var i = d3.interpolateString("0,"+l,l+","+l);
    		return function(t){
    			var marker=d3.select("#marker");
    			var p=path.node().getPointAtLength(t*l);
    			var centerX=p.x-24,
    			centerY=p.y-45;
    			marker.attr("transform", "translate(" + centerX + "," + centerY + ")");
    			return i(t);
    		};
    	}

  //   	function draw


		// // svg.selectAll(".dot").data(point).enter()
		// 	.append("circle")
		// 	.attr("class","dot")
		// 	.attr("r",3)
		// 	.attr("cx",function(d){return xScale(d.x);})
		// 	.attr("cy",function(d){return yScale(d.y);})
		// 	.style("fill","red");

		// draw the phase description
		svg.append("text")
		.attr("x",xScale(value.grounded)+bar+(xScale(value.take_off_percent)-margin-bar)/2)
		.attr("y",height-30)
		.attr("transform","translate(-315,160) rotate(-35)")
		.style("text-anchor","middle")
		.text("Take Off")
		.style("font-size",10)

		svg.append("text")
		.attr("x",xScale(value.grounded)+bar+(xScale(value.take_off_percent)-margin-bar)/2)
		.attr("y",height-30)
		.attr("transform","translate(-255,160) rotate(-35)")
		.style("text-anchor","middle")
		.text("Climb")
		.style("font-size",10)

		svg.append("text")
		.attr("x",xScale(value.grounded)+bar+(xScale(value.take_off_percent)-margin-bar)/2)
		.attr("y",height-30)
		.attr("transform","translate(-85,160) rotate(-35)")
		.style("text-anchor","middle")
		.text("Route")
		.style("font-size",10)

		svg.append("text")
		.attr("x",xScale(value.grounded)+bar+(xScale(value.take_off_percent)-margin-bar)/2)
		.attr("y",height-30)
		.attr("transform","translate(205,160) rotate(-35)")
		.style("text-anchor","middle")
		.text("Approach")
		.style("font-size",10)

		svg.append("text")
		.attr("x",xScale(value.grounded)+bar+(xScale(value.take_off_percent)-margin-bar)/2)
		.attr("y",height-30)
		.attr("transform","translate(405,160) rotate(-35)")
		.style("text-anchor","middle")
		.text("Landing")
		.style("font-size",10)
	})
