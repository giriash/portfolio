//Click to zoom functionality was inspired by: https://bl.ocks.org/mbostock/2206590#index.html

var width = 900,
    height = 500,
    centered;

var projection = d3.geo.albersUsa()
    .scale(1070)
    .translate([width / 2, height / 2]);

var path = d3.geo.path().projection(projection);

var svg = d3.select("#map1").append("svg")
    .attr("width", width)
    .attr("height", height);


var g = svg.append("g");
var counties, states;
var dataset;
var countyId, stateId;
var clickReturnValue;
var color = [];
var selectFlag;

var div = d3.select("body")
    .append("div")   
    .attr("class", "tooltip")               
    .style("opacity", 0);

var radius = d3.scale.sqrt();

var output = document.getElementById("obesity-result");
var stateoutput = document.getElementById("state-result");
var povertyoutput = document.getElementById("poverty-result");
output.innerHTML = "*";
stateoutput.innerHTML = "*";
povertyoutput.innerHTML = "*";


d3.json("json/us-10m.json",function(error, us){
    if (error) throw error;

    counties = topojson.feature(us, us.objects.counties).features;
    states = topojson.feature(us, us.objects.states).features;

    //CountyPath and statePath are like two seperate layer. They need to zoom together 
    //Both CountPath and statepath need to add click function so they can both zoom. All zoom(transition) effects are achieved in statelevel
    //And since we want to zoom baesd on each state, statelayer has to be over countylevel. So create statePath after countyPath.
    //In statepath click function, countyPath also needs to zoom

    //county level
    if (clickFlag = true){
            var countyPaths = svg.append("g");
    countyPaths.selectAll("path").data(counties).enter()
    .append("path")
    .attr("d", path)
    .attr("id","counties")
    //click function (no zoom function)
    .on("click",function(d){
        
        var x, y, k;
        if (d && centered !== d) {
            var centroid = path.centroid(d);
            x = centroid[0];
            y = centroid[1];
            k = 4;
            centered = d;
            clickFlag = true;
            clickReturnValue = centered.id;
            console.log(clickReturnValue);
        }
        else{
            x= width / 2;
            y = height /2;
            k = 1;
            centered = null;
            clickFlag = false;
        }
    });
    }


    //state level
    var statePaths = svg.append("g");
    statePaths.append("g").selectAll("path").data(states).enter()
    .append("path")
    .attr("d", path)
    .attr("id","states")
    
    
    

    
    // click function for state level
    .on("click", function (d){
        var x, y, k;

        if (d && centered !== d) {
            var centroid = path.centroid(d);
            x = centroid[0];
            y = centroid[1];
            k = 4;
            centered = d;
            clickFlag = true;
            clickReturnValue = centered.id;

            console.log(clickReturnValue);
            //console.log("centered id: " + centered.id);
            //console.log("x is: " + x);
            //console.log("y is: " + y);
        }

        else{
            x= width / 2;
            y = height /2;
            k = 1;
            centered = null;
            clickFlag = false;
            //console.log("else-x is: " + x);
            //console.log("else-y is: " + y);
        }

       statePaths.transition()
          .duration(750)
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
          .style("stroke-width", 1.5 / k + "px");
        countyPaths.transition()
          .duration(750)
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
          .style("stroke-width", 1.5 / k + "px");
        
        

        read(); // read csv
        
        
    }); // end of click 
    
   

  // read csv file
    function read(d) {
        d3.csv("data/countyData.csv", function(error, rows){
            if (error) {console.log(error);}
            console.log("centered: " + clickReturnValue);
            dataset = d3.map(rows, function(county){ return Number(county.FIPS); });
                //counties
                countyPaths.selectAll("path").data(counties).enter()
                .append("path")
                .attr("d", path);

            countyPaths.selectAll("path")

            .style("fill",function (county){
                var StateId;
                var countyData = dataset.get(county.id);               

               if (countyData.StateId == clickReturnValue) {
                    if (!countyData) {
                        console.log("none countyData");
                        return "#DDD";
                    } 

                    //var feature = [countyData.ConvenienceStores,countyData.FastfoodGrowth,countyData.FarmMarketGrowth,countyData.GROCPTH_07_12];
                    var feature = [countyData.FastfoodGrowth,countyData.FarmMarketGrowth,countyData.GROCPTH_07_12];
                    //console.log("feature is: " + typeof(feature[0]));
                    //console.log("countyData.EducationPercentage is: " + typeof(countyData.EducationPercentage));
                    //console.log("select is:" + select());

                    if (select()==0) {
                        if (feature[0] == 0) { return "#DDD";}
                        else
                        {
                            if (feature[0] <= -15) { return "#FECDD0"; }
                            else if (feature[0] > -15 && feature[0] <= -5) {return "#FC9793"; }
                            else if (feature[0] > -5 && feature[0] <= 5) {return "#FA656C"; }
                            else if (feature[0] > 5 && feature[0] <= 15) {return "#F63038"; }
                            else if (feature[0] > 15) {return "#E80A02"; }
                        }
                        
                    }

                    //All growth value are added by "50". Cause it doesn't read negative value
                    if (select()==1) {
                        console.log("select1 is:" + select());
                        //console.log("feature1 is:" + feature[1]);
                        if (feature[1] >= 15) { return "#309670"; }
                        else if (feature[1] >= 5 && feature[1] < 15) {return "#3cbc8d"; }
                        else if (feature[1] > -5 && feature[1] <= 5) {return "#62c9a3"; }
                        else if (feature[1] > -15 && feature[1] <= -5 ) {return "#76d0af"; }
                        else if (feature[1] < -15) {return "#8ad6ba"; }
                        return "#DDD";
                    }

                    if (select()==2) {
                        console.log("feature2 is:" + feature[2]);
                        if (feature[2] >= 15) { return "#4837FF"; }
                        else if (feature[2] < 15 && feature[2] >= 5) {return "#6D5CF8"; }
                        else if (feature[2] < 5 && feature[2] >= -5) {return "#9486FF"; }
                        else if (feature[2] < -5 && feature[2] >= -15) {return "#B6ADFE"; }
                        else if (feature[2] < -15) {return "#DDD6FF"; }
                        return "#DDD";
                    }
                    // with convenience store
                    // if (select()==3) {
                    //     console.log("feature3 is:" + feature[3]);
                    //     if (feature[3] >= 15) { return "#95A697"; }
                    //     else if (feature[3] < 15 && feature[3] >= 5) {return "#D2CDA6"; }
                    //     else if (feature[3] < 5 && feature[3] >= -5) {return "#F6E5A8"; }
                    //     else if (feature[3] < -5 && feature[3] >= -15) {return "#FFAF88"; }
                    //     else if (feature[3] < -15) {return "#FF7E76"; }
                    //     return "#DDD";
                    // }
                 }
                
            })// end of fill

            // stroke function (doesn't work yet)
            .style("stroke",function(county){
                 var StateId;
                 var countyData = dataset.get(county.id);
                if (countyData.StateId == clickReturnValue) {
                    return "#fff";
                }
                else return "none";
            });
        });
    }//end of function read()

    // read obesity file
    d3.csv("data/stateData.csv",function(error, rows) {
        if (error) {console.log(error);}

        var usdaAtlas = d3.map(rows, function (state) { return Number(state.id); });
           
        
        statePaths.append("g").selectAll("path").data(states)
          .on("mouseover", function(state) { 
                var stateData = usdaAtlas.get(state.id);
                if (! stateData) {return 0;}
                var name = stateData.state;
                document.getElementById('state-result').innerText = name;
            });
       
        //Obesity Circles  
        statePaths.selectAll("circle").data(states).enter()
          .append("circle")
          .attr("cx", function(state){
            var stateData = usdaAtlas.get(state.id);
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
          .attr("class", "bubble")
          .on("mouseover", function(state) { 
                  var stateData = usdaAtlas.get(state.id);
                if (! stateData) {return 0;}
                var name = stateData.state;
                div.transition()        
                   .duration(200)
                 .ease("bounce")
                   .style("opacity", .9);   
                   div.text("State:"+ name + "         Obesity:" + stateData.obesity + "%")
                   .style("left", (d3.event.pageX) + "px")     
                   .style("top", (d3.event.pageY - 28) + "px");
            })
                   .on("mouseout", function(d) {       
                div.transition()        
                   .duration(100)
                    .ease("bounce")
                   .style("opacity", 0);   
            });

        //Poverty bubble  
        statePaths.append("g")
            .attr("class", "bubblePoverty")
            .selectAll("circle")
            .data(states)
            .enter()
            .append("circle")
            .attr("cx", function(state) {
                var stateData = usdaAtlas.get(state.id);
                if (! stateData) {return 0;}
                var coords = projection([stateData.lat, stateData.lon]);
                if (coords == null) { return null;}
                if (coords!=null) { 
                    var lat = coords[0];
                    
                }
                return lat;   
            })
            .attr("cy", function(state) {
                var stateData = usdaAtlas.get(state.id);
                if (! stateData) {return 0;}
                var coords = projection([stateData.lat, stateData.lon]);
                if (coords == null) { return null;}
                if (coords != null) { 
                    var lon = coords[1];
                }
                return lon;   
            })
            .attr("r", function (state) { 
                var stateData = usdaAtlas.get(state.id);
                if (! stateData) {return 0;}
                var size = stateData.poverty;
                var r = (size/15) * (size/15) * (size/15) *(size/15) *(size/15) ;
                return r;
            })
            .on("mouseover", function(state) { 
                  var stateData = usdaAtlas.get(state.id);
                if (! stateData) {return 0;}
                var name = stateData.state;
                div.transition()        
                   .duration(200)
                   .ease("bounce")
                   .style("opacity", .9);   
                div.text("State:"+ name + "            Poverty:" + stateData.poverty + "%")
                   .style("left", (d3.event.pageX) + "px")     
                   .style("top", (d3.event.pageY - 28) + "px");
            })
                   .on("mouseout", function(d) {       
                div.transition()        
                   .duration(100)
                    .ease("bounce")
                   .style("opacity", 0);   
            });

        //interactive chart
        //var statePaths = svg.append("g");
        statePaths.selectAll("path")
        .on("mouseover", function(state){
            //console.log("test hover state");
            var stateData = usdaAtlas.get(state.id);
            if (! stateData) {return null;}
            // load data
            var obesity = stateData.obesity;
            var poverty = stateData.poverty;
            var stateName = stateData.state;
            var fastfood =  stateData.PCH_FFRPTH_07_12;
            var farmmarket = stateData.PCH_FMRKTPTH_09_13;
            var grocery = stateData.PCH_GROCPTH_07_12;
            var convenience = stateData.ConvenienceStores;
            var position = projection([stateData.lat,stateData.lon]);


            //console.log("fastfood is " + fastfood);
            //console.log("farmmarket is " + farmmarket);
            //console.log("Grocery Store is " + grocery);
            
            var output = document.getElementById("obesity-result");
            var stateoutput = document.getElementById("state-result");
            var povertyoutput = document.getElementById("poverty-result");
            output.innerHTML = obesity + "%";
            stateoutput.innerHTML = stateName;
            povertyoutput.innerHTML = poverty + "%";
            
            //console.log("output is: " + output);
            drawlinechart(fastfood,farmmarket,grocery);

        });         
         
        
       

          
    });// end of read csv
  
});// end of json




 function select(){
     //selectFlag = 0;
     var obj = document.getElementsByName('feature');
     for (var i = 0; i <obj.length; i++) {
         if (obj[i].checked) {
            console.log(obj[i].value);
            return obj[i].value;
         }
     }
 }


// Interactive Linechart
var margin = {top: 10, right: 30, bottom: 30, left: 30};
var h = 280, w = 240, padding = 15;
var pathline = d3.geo.path().projection(projection);

var svgline = d3.select("#linechart").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

//var xAxiswidth = 200, yAxisheight = 200;
var bincount = 8;
var formatPercentage = d3.format("%1");
var format3f = d3.format(".3f");

var xScale = d3.scale.ordinal().domain(["Fast food","Farm market","Grocery Store"]).rangeRoundBands([0,w],1);//.rangePoints([0,w]);
var yScale = d3.scale.linear().domain([-0.40,0.40]).range([ h-padding,padding]);

var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
var yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(bincount).tickFormat(formatPercentage);

svgline.append("g").attr("class","axis")
            .attr("transform","translate(0,"+(yScale(0))+")")
            .call(xAxis)
            .attr("transform", "translate(" + margin.left + ", " + h/2 + ")");
svgline.append("g").attr("class","axis")
            //.attr("transform","translate("+(xScale(0))+",0)")
            .attr("transform","translate(0,0)")
            .call(yAxis)
            .attr("transform", "translate(" + margin.left + ", 0)");

function drawlinechart(y1,y2,y3){
    svgline.selectAll("rect").remove();
    svgline.selectAll(".data-format").remove();
    //svgline.select("text").remove();
    //console.log("yScale(y1) is: " + y1);
    //console.log("yScale(y2) is: " + y2);
    //console.log("yScale(y3) is: " + y3);
    //line chart
    svgline.append("rect")
            .attr("class","bar1")
            .attr({
                x: (xScale("Fast food") + 20),
                y: function(){return yScale(Math.max(0,y1/100));},
                width: 20,
                height: function(){return Math.abs(yScale(y1/100) - yScale(0));}
            });
    svgline.append("text")
            .attr("class","data-format")
            .attr({
                x: (xScale("Fast food") + 25),
                y: function(){
                    if (y1 >0) {return yScale(Math.max(0,y1/100)) - 5;}
                    else return yScale(Math.min(0,y1/100)) + 15;
                    //return yScale(Math.max(0,y1/100));
                }
            })
            .attr("font-size", "10px")
            .text(format3f(y1))
            ;


    svgline.append("text")
            .attr("class","data-format")
            .attr({
                x: function(){
                    return xScale("Farm market") + 20;
                },
                y: function(){
                    if (y2 >0 && y2 <40) {return yScale(Math.max(0,y2/100)) - 5;}
                    else if (y2 >= 40) {return yScale(Math.max(0,y2/100)) + 50;}
                    else return yScale(Math.min(0,y2/100 ) + 15);
                }
            })
            .attr("font-size", "10px")
            .text(format3f(y2));
    svgline.append("rect")
            .attr("class","bar2")
            .attr({
                x: (xScale("Farm market") + 20),
                y: function(){
                    return yScale(Math.max(0,y2/100));
                },
                width: 20,
                height: function(){return Math.abs(yScale(y2/100) - yScale(0));}
            });


    svgline.append("text")
            .attr("class","data-format")
            .attr({
                x: (xScale("Grocery Store") + 25),
                y: function(){
                    if (y3 >0) {return yScale(Math.max(0,y3/100)) - 5;}
                    else return yScale(Math.min(0,y3/100 )) + 15;
                }
            })
            .attr("font-size", "10px")
            .text(format3f(y3));
    svgline.append("rect")
            .attr("class","bar3")
            .attr({
                x: (xScale("Grocery Store") + 20),
                y: function(){return yScale(Math.max(0,y3/100) );},
                width: 20,
                height: function(){return Math.abs(yScale(y3/100) - yScale(0));}
            });
    


}

