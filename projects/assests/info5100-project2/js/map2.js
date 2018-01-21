var padding2 = 20,
    width2 = 900,
    height2 = 600;

var formatPercentage = d3.format("%1");
var rows;

var svg2 = d3.select("#map2").append("svg")
    .attr("width", width2 )
    .attr("height", height2)
    .append("g");

var g = svg.append("g");



// read csv state level file
d3.csv("data/stateData.csv", function(error, rows) {
  if (error) {console.log(error);}

  var usdaAtlas = d3.map(rows, function (d) { return Number(d.id); });
  //var stateNames = [];
  var stateObesity = [];
  var statePoverty = [];
  var rectwidth = 10;//30; 

  // rows.forEach(function(d){
  //   var stateData = usdaAtlas.get(d.id);
  //   if (stateData != null) {
  //     stateNames.push(stateData.state);
  //     stateObesity.push(stateData.obesity);
  //     statePoverty.push(stateData.poverty);

  //   }
  // });

  var xScaleNew1 = d3.scale.ordinal()
  .domain(rows.map(function(d){return d.state}))
  .rangeRoundBands([0, width2]);
  var xScaleNew2 = d3.scale.ordinal()
  .domain(rows.map(function(d){return d.state}))
  .rangeRoundBands([0, width2]);
  // console.log("xScaleNew is: " + xScaleNew);
  var yScaleNew2 = d3.scale.linear().domain([0,0.4]).range([0,height2/2 - 3*padding2]);
  var yScaleNew1 = d3.scale.linear().domain([0.4,0]).range([0,height2/2 - 3*padding2]);
  
  var xAxisNew1 = d3.svg.axis().scale(xScaleNew1).orient("top");
  var xAxisNew2 = d3.svg.axis().scale(xScaleNew2).orient("bottom");
  var yAxisNew1 = d3.svg.axis().scale(yScaleNew1).orient("left").ticks(10).tickFormat(formatPercentage);
  var yAxisNew2 = d3.svg.axis().scale(yScaleNew2).orient("left").ticks(10).tickFormat(formatPercentage);

  svg2.append("g").attr("class","axis")
      .call(xAxisNew2)
      .attr("transform", "translate(" + 1.5 * padding2 + ", "+(-2*padding2  + height2/2)+")")
      .selectAll("text").remove();
      // .attr("transform",function(d,i){
      // return "rotate(-90,35,-30) translate("+(-20)+","+(-80)+")";});
  svg2.append("g").attr("class","axis")
      .call(xAxisNew1)
      .attr("transform", "translate(" + 1.5 * padding2 + ", "+( height2/2)+")")
      .selectAll("text").remove();

  svg2.append("g").attr("class","axis")
      .call(yAxisNew1)
      .attr("transform", "translate(" + 1.5 * padding2 + ", "+(padding2)+")");
  
  svg2.append("g").attr("class","axis")
      .call(yAxisNew2)
      .attr("transform", "translate(" + 1.5 * padding2 + ", " +(height2/2)+ ")");

  obesityHistogram();
  povertyHistogram();

  // Function draw Obesity histogram
  function obesityHistogram(){
    svg2.append("g")
      .selectAll("rect").data(rows).enter().append("rect")
      .attr({
                //x: xScale21(0.45 ),
                x: function(d){
                  var stateData = usdaAtlas.get(d.id);
                  if (stateData != null){
                    //var w = stateData.obesity;
                    var name = stateData.state;
                    return xScaleNew1(name);
                  } 
                  else return null; 
                },
                y: function(d){
                  var stateData = usdaAtlas.get(d.id);
                  if (stateData != null){
                    var w = stateData.obesity;
                    //console.log("width is: " + w);
                    return yScaleNew1(w/100) + 0.4*padding2;
                  } 
                  else return null; 
                },
                height:function(d){
                  var stateData = usdaAtlas.get(d.id);
                  if (stateData != null){
                    var w = stateData.obesity;
                    //console.log("width is: " + w);
                    return yScaleNew2(w/100) + 1;
                  } 
                  else return null; 
                },
                width: rectwidth
              })
      .attr("transform", "translate(" + (1.5 * padding2 + 2) + ", "+ (11) +") ")
      .attr("class","rect-style")
      .on("mouseover", function(d){
              var stateData = usdaAtlas.get(d.id);
              var f = "obesity";
              over(stateData,f);
      })
      ;
  }
  
  // Function Draw poverty Histogram
  function povertyHistogram(){
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
                    //var w = stateData.obesity;
                    var name = stateData.state;
                    return xScaleNew2(name);
                  } 
                  else return null; 
                },

                y: function(d){
                  var stateData = usdaAtlas.get(d.id);
                  if (stateData != null){
                    var w = stateData.obesity;
                    //console.log("width is: " + w);
                    return yScaleNew2(0.0) + height2/2 - 0.5*padding2;
                  } 
                  else return null; 
                },

                height:function(d){
                  var stateData = usdaAtlas.get(d.id);
                  if (stateData != null){
                    var w = stateData.poverty;
                    //console.log("width is: " + w);
                    return yScaleNew2(w/100);
                  } 
                  else return null; 
                },

                width: rectwidth

              })
      .attr("transform", "translate(" + (1.5 * padding2 + 2) + ", "+ (10) +") ")
      .attr("class","povertyrect-style")
      .on("mouseover", function(d){
              var stateData = usdaAtlas.get(d.id);
              var f = "poverty";
              over(stateData,f);
      });
  }

      
var sortFlag;
//sort obesity
d3.selectAll("#sort-obesity")
  .on("change", function(){
      sortFlag = "obesity";
      var xScaleTemp2 = xScaleNew1
      .domain(rows.sort(sortChoice(sortFlag)).map(function(d){return d.state}))
      .copy();

      d3.selectAll(".rect-style")
      .transition()
      .duration(1000)
      .delay(function(d,i){
        return i*10;
      })
      .attr("x", function(d){
        return xScaleTemp2(d.state);});
});

//sort Poverty
d3.selectAll("#sort-poverty")
    .on("change", function(){
      sortFlag = "poverty";
      var xScaleTemp = xScaleNew2
      .domain(rows.sort(sortChoice(sortFlag)).map(function(d){return d.state}))
      .copy();

      d3.selectAll(".povertyrect-style")
      .transition()
      .duration(1000)
      .delay(function(d,i){
        return i*10;
      })
      .attr("x", function(d){
        console.log("testtest");
        return xScaleTemp(d.state);});
});

//sort function
function sortChoice(feature){
  if (feature == "obesity") {var sort = d3.selectAll("#sort-obesity");}
  if (feature == "poverty") {var sort = d3.selectAll("#sort-poverty");}
  //var sort = d3.selectAll("#sort-obesity");
  if (sort[0][0].checked) {
      var out;
      if (feature == "obesity") {
        out = function(a,b){return b.obesity - a.obesity;}
      }

      if (feature == "poverty") {
        out = function(a,b){return b.poverty - a.poverty;}
      }
      return out;
  }
  else{
      var out = function(a,b){return d3.ascending(a.state, b.state);}
      return out;
  }
}

function over(data,flag){
      //var stateData = usdaAtlas.get(d.id);
      if (data != null){
      // load data      
          svg2.selectAll(".histogram-lable").remove();
          var obesity = data.obesity;
          var poverty = data.poverty;
          var stateName = data.state;
          var convenience = data.ConvenienceStores;
          var position = projection([data.lat,data.lon]);
                
          var output = document.getElementById("obesity-result");
          var stateoutput = document.getElementById("state-result-map2");
          var povertyoutput = document.getElementById("poverty-result");
          output.innerHTML = obesity + "%";
          stateoutput.innerHTML = stateName;
          povertyoutput.innerHTML = poverty + "%";

          svg2.append("text")

          .text(function(d){
              if (flag == "obesity") {return (obesity + "%");}//xScale21(0.45) + xScale21(w/100);}
              if (flag == "poverty") {return poverty  + "%";}
          })
                //.attr("x",100)
                //.attr("y",200)
          .attr("x", function(d){
            //var stateData = usdaAtlas.get(d.id);

            if (data != null) {
                var name = data.state;
                //console.log("name is: " + name);
                if (flag == "obesity") {return (xScaleNew1(name) + 25);}
                if (flag == "poverty") {return (xScaleNew2(name) + 25);}
                
            }else return null;
            
          })
          .attr("y", function(d){
            //var stateData = usdaAtlas.get(d.id);
            if (data != null){
                var o = data.obesity;
                var p = data.poverty;
                //console.log("width is: " + w);
                if (flag == "obesity") {return (yScaleNew1(o/100) + 15);}//xScale21(0.45) + xScale21(w/100);}
                if (flag == "poverty") {return (yScaleNew2(p/100) + height2/2 + 15);}//xScale22(0.22) + xScale21(w/100);}
            } else return null;
           
          })
          .attr("class","histogram-lable");
      
  }}

});


