// var width = 960,
//     height = 500,
//     centered;

// var projection = d3.geo.albersUsa()
//     .scale(1070)
//     .translate([width / 2, height / 2]);

// var path = d3.geo.path().projection(projection);

// var svg = d3.select("#map1").append("svg")
//     .attr("width", width)
//     .attr("height", height);

// svg.append("rect")
//     .attr("class", "background")
//     .attr("width", width)
//     .attr("height", height);
// var g = svg.append("g");
// var counties, states;
// var education, income, poverty;
// var countyId, stateId;
// var clickFlag = false; 
// var clickReturnValue;

// d3.json("json/us-10m.json",function(error, us){
//     if (error) throw error;

//     counties = topojson.feature(us, us.objects.counties).features;
//     states = topojson.feature(us, us.objects.states).features;

//     var countyPaths = g;
//     countyPaths.selectAll("path").data(counties).enter()
//     .append("path")
//     .attr("d", path)
//     .attr("id","counties");
    
//     console.log(g);
//     //states
//     var statePaths = g;
//     statePaths.append("g").selectAll("path").data(states).enter()
//     .append("path")
//     .attr("d", path)
//     .attr("id","states")


//     // click function
//     .on("click", function (d){ 
//         var x, y, k;

//         if (d && centered !== d) {
//             var centroid = path.centroid(d);
//             x = centroid[0];
//             y = centroid[1];
//             k = 4;
//             centered = d;
//             clickFlag = true;
//             clickReturnValue = centered.id;

//             //console.log(centered);
//             //console.log("centered id: " + centered.id);
//             //console.log("x is: " + x);
//             //console.log("y is: " + y);
//         }

//         else{
//             x= width / 2;
//             y = height /2;
//             k = 1;
//             centered = null;
//             clickFlag = false;
//             //console.log("else-x is: " + x);
//             //console.log("else-y is: " + y);
//         }

//         g.selectAll("path")
//         .style("stroke", function(d){
//             if (centered!=null && d===centered) {return "#fff";}
//         });


//         g.transition()
//           .duration(750)
//           .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
//           .style("stroke-width", 1.5 / k + "px");
//     });// end of click 


//     //load csv data
//     d3.csv("data/cleanedData.csv", function(error, rows){
//         if (error) {console.log(error);}
//         console.log("test");
//         education = d3.map(rows, function(county){ return Number(county.FIPS); });
//             //counties

//         countyPaths.selectAll("path")
//         // fill function
//         .style("fill",function (county){

//             if (county.id < 100) {
//                 console.log("smaller 100:" + county.id); 
//                 stateId = county.id; 
//             }
//             else if (county.id > 100) {
//                 console.log("bigger 100:" + county.id); 
//                 countyId= county.id;
//             }
//             var countyData = education.get(county.id);

//             console.log("countyData is: " + countyData);
//             //console.log("county id is: " +countyId); 
//             //console.log("centered id in fill: " + centered.id);
//            // console.log(countyId);
//             //console.log("clickFlagis" + clickFlag);
//             if (countyData.StateId == 22) {
//                 if (!countyData) {
//                 console.log("none countyDate");
//                 return "#DDD";
//                 }
//                 else if (countyData.EducationPercentage <= 20) {return "#77C6C0"; }
//                 else if (countyData.EducationPercentage > 20 && countyData.EducationPercentage <= 40) {return "#3EB6B4"; }
//                 else if (countyData.EducationPercentage > 40 && countyData.EducationPercentage <= 60) {return "#308EA7"; }
//                 else if (countyData.EducationPercentage > 60 && countyData.EducationPercentage <= 80) {return "#2A699C"; }
//                 else if (countyData.EducationPercentage > 80 && countyData.EducationPercentage <= 100) {return "#363E53"; }
//                 return "#DDD";
//             }
            
//         })
//     });

// });

// var width = 960,
//     height = 500,
//     centered;

// var projection = d3.geo.albersUsa()
//     .scale(1070)
//     .translate([width / 2, height / 2]);

// var path = d3.geo.path()
//     .projection(projection);

// var svg = d3.select("#map1").append("svg")
//     .attr("width", width)
//     .attr("height", height);

// svg.append("rect")
//     .attr("class", "background")
//     .attr("width", width)
//     .attr("height", height);

// var g = svg.append("g");

// var counties, states;

// var education, income, poverty;

// var windowFlag = true;

// d3.json("json/us-10m.json", function(error, us) {
//   if (error) throw error;

//   counties = topojson.feature(us, us.objects.counties).features;
//   states = topojson.feature(us, us.objects.states).features;

//   //state
//   //var statePath = g;
//   g.selectAll("path").data(states).enter()
//   .append("path")
//   .attr("d", path)
//   .attr("id","states")
//   .on("click", function (d){ 
//     var x, y, k;
//     if (d && centered !== d) {
//       var centroid = path.centroid(d);
//       x = centroid[0];
//       y = centroid[1];
//       k = 4;
//       centered = d;
//       console.log("x is: " + x);
//       console.log("y is: " + y);
//     } 
//     else {
//       x = width / 2;
//       y = height / 2;
//       k = 1;
//       centered = null;
//       console.log("else-x is: " + x);
//       console.log("else-y is: " + y);
//     }

//     //var countyPath = g; //if use var countyPath = g; zoomin mistake but show

//     g.selectAll("path")
//     .style("fill", function(d){
//     if (centered!=null && d === centered){
//     //return "#ff0000"
//     console.log(path);
//     console.log(centered.id);
//     var stateId = centered.id;
//     var countyPath = g;
//     // load data
//     d3.csv("data/cleanedData.csv", function(error, data){
//     if (error) {console.log(error);}
//     education = d3.map(data, function(county){ return Number(county.FIPS); });
//     console.log("path");

//     g.selectAll("path").data(counties).enter()
//     .append("path")
//     .attr("d",path)
//     .attr("class", "hidden-county-borders")
//     .style("fill", function(county){
      
//       var countyData = education. get(county.id);
//       //var stateFipsCode = countyData.StateId;
//       //console.log(county.id);
//       //console.log("StateId is: " + countyData.StateId);

//       if (!countyData.StateId) { console.log("no state id"); return "#fff";} 
//       else if (countyData.StateId == stateId) {  
//         if (! countyData) { return "#DDD";}
//         else if (countyData.EducationPercentage <= 20) {return "#77C6C0"; }
//         else if (countyData.EducationPercentage > 20 && countyData.EducationPercentage <= 40) {return "#3EB6B4"; }
//         else if (countyData.EducationPercentage > 40 && countyData.EducationPercentage <= 60) {return "#308EA7"; }
//         else if (countyData.EducationPercentage > 60 && countyData.EducationPercentage <= 80) {return "#2A699C"; }
//         else if (countyData.EducationPercentage > 80 && countyData.EducationPercentage <= 100) {return "#363E53"; }
//       }
//       else {return "#DDD";}
//     });
//   });

//   }
//   }); // end of fill function
//   /**
//   g.transition()
//   .duration(750)
//   .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
//   .style("stroke-width", 1.5 / k + "px");**/
// }); // end of click function

// });


