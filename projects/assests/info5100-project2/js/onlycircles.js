d3.csv("data/stateData.csv",function(error, rows) {
  if (error) {console.log(error);}

  usdaAtlas = d3.map(rows, function (state) { return Number(state.id); });
  // var stateData = usdaAtlas.get(states.id);
  
  // console.log("stateid is: " + states.id);
  // console.log("stateData is: " + stateData);

  statePaths.selectAll("circle").data(states).enter()
  .append("circle")
  .attr("cx", function(state){
    var stateData = usdaAtlas.get(state.id);
    //console.log("stateid is: " + state.id);
    //console.log("stateData is: " + stateData);

    if (! stateData) {return null;}
    var position = projection([stateData.lat,stateData.lon]);
    if (position == null) {return null;}
    if (position!=null) {
      var lat = position[0];
      //console.log( position);//[1];//projection(stateData.lat);
      //console.log( lat);
    }

    return lat;
    
  })
  .attr("cy",function(state){
    var stateData = usdaAtlas.get(state.id);
     if (! stateData) {return 0;}
    var position = projection([stateData.lat,stateData.lon]);
    if (position == null) {return null;}
    if (position!=null) {
      var lon = position[1];
    }

    return lon;
  })
  .attr("r",function(state){

    var stateData = usdaAtlas.get(state.id);
    if (! stateData) {return 0;}
    var size = stateData.obesity;
    var r = (size/15) * (size/15) * (size/15) *(size/15) ;
    //if (r == 32.81049315753086 || r == 16.43095232790123) {return 0;}
    return r;
    
  })
  .attr("class", 
    "bubble")

  statePaths.selectAll("paths").data(states)
  .on("mousever",function(state){
    var output = document.getElementById("aqi-display");
    console.log("output is: " + output);
    var stateData = usdaAtlas.get(state.id);
    console.log("obesity is " + obesity);
    if (! stateData) {return null;}
    var obesity = stateData.obesity;
    var position = projection([stateData.lat,stateData.lon]);

    output.innerHTML = obesity;
    console.log("obesity is " + obesity);
  })
  ;
});// end of read csv
  