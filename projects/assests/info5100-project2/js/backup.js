var //margin2 = {top: 50, right: 20, bottom: 10, left: 20},
    padding2 = 20,
    width2 = 900,
    height2 = 2000;

var formatPercentage = d3.format("%1");


// var color2 = d3.scale.ordinal().range(["#6B6FEC", "#F27342"]);
// color2.domain(["Obesity", "Poverty"]);


var svg2 = d3.select("#map2").append("svg")
    .attr("width", width2 )
    .attr("height", height2)
    //.attr("id", "d3-plot")
    .append("g");
    //.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var g = svg.append("g");

// read csv state level file
d3.csv("data/stateData.csv", function(error, rows) {
  if (error) {console.log(error);}

  var usdaAtlas = d3.map(rows, function (d) { return Number(d.id); });
  var stateNames = [];
  var stateObesity = [];
  var statePoverty = [];
  var rectwidth = 30; 
  rows.forEach(function(d){
    var stateData = usdaAtlas.get(d.id);
    if (stateData != null) {
      stateNames.push(stateData.state);
      stateObesity.push(stateData.obesity);
      statePoverty.push(stateData.poverty);

    }
  });

  // color scale
  // var colorScale = d3.scale.linear().domain(["", "San Francisco", "Austin"])
  //     .range(["#FF0000", "#009933" , "#0000FF"]);
  // var max_area = d3.max( rows, function(d) { return d['properties']['CENSUSAREA'] });
  // var color_scale = d3.scale.linear().domain([0, max_area]).range(['#6B6FEC', '#BFC1FA']);
  //draw axis

  var xScale2 = d3.scale.linear().domain([0.16,0.4]).range([padding2,width2-4*padding2]);
  var xScale21 = d3.scale.linear().domain([0.4,0]).range([padding2,width2/2-2*padding2]);
  var xScale22 = d3.scale.linear().domain([0,0.4]).range([width2/2-2*padding2,width2-4*padding2]);
  var yScale2 = d3.scale.ordinal().domain(stateNames).rangeRoundBands([0, height2], .3);
  //var yScaleObesity = d3.scale.ordinal().domain(stateObesity).rangeRoundBands([0, height2], .3);
  //var yScalePoverty = d3.scale.ordinal().domain(statePoverty).rangeRoundBands([0, height2], .3);


  //var xAxis2 = d3.svg.axis().scale(xScale2).orient("top").ticks(20).tickFormat(formatPercentage);
  var xAxis21 = d3.svg.axis().scale(xScale21).orient("top").ticks(10).tickFormat(formatPercentage);
  var xAxis22 = d3.svg.axis().scale(xScale22).orient("top").ticks(10).tickFormat(formatPercentage);
  
  var yAxis2 = d3.svg.axis().scale(yScale2).orient("left");
  //var yMiddle_right = d3.svg.axis().scale(yScale2).orient("right");
  //var yMiddle_left = d3.svg.axis().scale(yScale2).orient("left");

  var xScaleNew = 


  // svg2.append("g").attr("class","axis")
  //     .call(xAxis2)
  //     .attr("transform", "translate(" + 3*padding2 + ", "+padding2+")");
  svg2.append("g").attr("class","axis")
      .call(xAxis21)
      .attr("transform", "translate(" + 3*padding2 + ", "+padding2+")");
  svg2.append("g").attr("class","axis")
      .call(xAxis22)
      .attr("transform", "translate(" + 3*padding2 + ", "+padding2+")");
  svg2.append("g").attr("class","axis")
      .call(yAxis2)
      .attr("transform", "translate(" + 4*padding2 + ", " +padding2+ ")");


  // Draw Obesity histogram
  svg2.append("g")
      .selectAll("rect").data(rows).enter().append("rect")
      .attr("class","rect-style")
      .attr({
                //x: xScale21(0.45 ),
                x: function(d){
                  var stateData = usdaAtlas.get(d.id);
                  if (stateData != null){
                    var w = stateData.obesity;
                    //console.log("width is: " + w);
                    return xScale21(0.4) + xScale21(w/100);
                  } 
                  else return null; 
                },
                y: function(d){
                  var stateData = usdaAtlas.get(d.id);
                  if (stateData != null) {
                    var name = stateData.state;
                    //console.log("name is: " + name);
                    return yScale2(name);
                  }
                  else return null;  
                },
                height:rectwidth,
                width: function(d){
                  var stateData = usdaAtlas.get(d.id);
                  if (stateData != null){
                    var w = stateData.obesity;
                    //console.log("width is: " + w);
                    return xScale21(0) - xScale21(w/100);
                  } 
                  else return null; 
                }
              })
      .attr("transform", "translate(" + (2*padding2) + ", "+ (0.6*rectwidth) +") ")

      .on("mouseover", function(d){
              var stateData = usdaAtlas.get(d.id);
              var f = "obesity";
              over(stateData,f);
      });

      
      //Draw Poverty histogram
      svg2.append("g")
      .selectAll("rect")
      .data(rows)
      .enter()
      .append("rect")
      .attr({
                //x: xScale21(0.45 ),
                x: function(d){
                  var stateData = usdaAtlas.get(d.id);
                  if (stateData != null){
                    var w = stateData.obesity;
                    console.log("width is: " + w);
                    return xScale22(0);
                  }else return null; },

                y: function(d){
                  var stateData = usdaAtlas.get(d.id);
                  if (stateData != null) {
                    var name = stateData.state;
                    //console.log("name is: " + name);
                    return yScale2(name);
                  }else return null; },

                height:rectwidth,

                width: function(d){
                  var stateData = usdaAtlas.get(d.id);
                  if (stateData != null){
                    var w = stateData.poverty;
                    //console.log("width is: " + w);
                    return xScale21(w/100);
                  } else return null; }

              })
      .attr("transform", "translate(" + (3*padding2) + ", "+ (0.6*rectwidth) +") ")
      .attr("class","povertyrect-style")
      .on("mouseover", function(d){
              var stateData = usdaAtlas.get(d.id);
              var f = "poverty";
              over(stateData,f);
      });
  // svg2.append("g").attr("class","axis")
  //     .call(yMiddle_left)
  //     .attr("transform", "translate(" + (padding2+450 )+ ", " +padding2+ ")");
  // svg2.append("g").attr("class","axis")
  //     .call(yMiddle_right)
  //     .attr("transform", "translate(" + (padding2+450 )+ ", " +padding2+ ")");
  function over(data,flag){
      //var stateData = usdaAtlas.get(d.id);
      if (data != null){
      // load data      
          svg2.selectAll(".histogram-lable").remove();
          var obesity = data.obesity;
          var poverty = data.poverty;
          var stateName = data.state;
          var fastfood =  data.PCH_FFRPTH_07_12;
          var farmmarket = data.PCH_FMRKTPTH_09_13;
          var grocery = data.PCH_GROCPTH_07_12;
          var convenience = data.ConvenienceStores;
          var position = projection([data.lat,data.lon]);
                
          var output = document.getElementById("obesity-result");
          var stateoutput = document.getElementById("state-result");
          var povertyoutput = document.getElementById("poverty-result");
          output.innerHTML = obesity + "%";
          stateoutput.innerHTML = stateName;
          povertyoutput.innerHTML = poverty + "%";

          svg2.append("text")

          .text(function(d){
              if (flag == "obesity") {return obesity;}//xScale21(0.45) + xScale21(w/100);}
              if (flag == "poverty") {return poverty;}
          })
                //.attr("x",100)
                //.attr("y",200)
          .attr("x", function(d){
            //var stateData = usdaAtlas.get(d.id);
            if (data != null){
                var w = data.obesity;
                console.log("width is: " + w);
                if (flag == "obesity") {return (xScale21(0.0) + padding2 + 5);}//xScale21(0.45) + xScale21(w/100);}
                if (flag == "poverty") {return xScale22(0.075);}//xScale22(0.22) + xScale21(w/100);}
            } else return null;
          })
          .attr("y", function(d){
            //var stateData = usdaAtlas.get(d.id);
            if (data != null) {
                var name = data.state;
                console.log("name is: " + name);
                return (yScale2(name) + rectwidth +7);
            }else return null;
          })
          .attr("class","histogram-lable");
          // .attr("font-size","12px")
          // .attr("color","red")
          // .attr("text-align","center");
      
}}

});


