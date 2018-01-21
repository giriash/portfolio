var window_width = $(window).width(),
    window_height = $(window).height();
var cw_index = 0.8,
    ch_index = 0.6;

var cause_width = window_width * cw_index,
    cause_height = window_height * ch_index;
var btnsize = cause_width* 0.04,
    btnmargin = cause_width* 0.005;
$(".cause-btn-style")
  .css("width",  btnsize)
  .css("height", btnsize )
  .css("background-size", btnsize)
  .css("margin-left",btnmargin )
  .css("margin-right",btnmargin )
  ;



var causes = ["mechanical","human_error","criminal","weather","unknown","replace"];
var classname = ["mechanical_style","human_style", "criminal_style", "weather_style","unknown_style","replace_style"];
var click_flag = ["true","true","true","true","true"];
var click1_flag = true, click2_flag = true, click3_flag = true, click4_flag = true, click5_flag = true;
var yearData = [], criminalData = [], human_errorData = [], mechanicalData =[], unknownData = [], weatherData =[];
//var parseDate = d3.time.format("%m/%Y").parse;

var margin = {top: 20, right: 50, bottom: 30, left: 20};

var xScale = d3.scale.ordinal().rangeRoundBands([0, cause_width]);
//var xScale = d3.scale.ordinal().domain(yearData).rangeRoundBands([0,cause_width-cause_padding]);
var yScale = d3.scale.linear().rangeRound([cause_height, 0]);


var svg2 = d3.select("#cause").append("svg")
    .attr("width", cause_width + margin.left + margin.right)
    .attr("height", cause_height + margin.top + margin.bottom)
    .attr("viewBox", "0 0 " + (cause_width + margin.left + margin.right) + " " + (cause_height + margin.top + margin.bottom))
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("data/cause0_data.csv", type, function(error, rows) {
  if (error) throw error;

  //load data
  cause_dataset = d3.map(rows,function (d) {return Number(d.year);});
  rows.forEach(function(d){
      var causeData = cause_dataset.get(d.year);
      if (causeData != null) {
        yearData.push(causeData.year);

      }
  });

  var layers;

  $("#unknown-btn").click(function(){

      if (click1_flag==true) {
        causes[4] = "replace";
        classname[4] = "replace_style";
        $("#unknown-btn").css("opacity", 0.4);
        removeAll();
        addCauseTag("unknown","cause-tag1");
        click1_flag = false;
      }

      else if (click1_flag==false) {

        causes[4] = "unknown";
        classname[4] = "unknown_style";
        $("#unknown-btn").css("opacity", 1);
        removeAll();
        removeCauseTag(".cause-tag1");
        click1_flag = true;
      }
      drawBars();
  });

  $("#weather-btn").click(function(){
      if (click2_flag==true) {
        causes[3] = "replace";
        classname[3] = "replace_style";
        $("#weather-btn").css("opacity", 0.4);
        addCauseTag("weather","cause-tag2");
        removeAll();
        click2_flag = false;
      }
      else if (click2_flag==false) {
        causes[3] = "weather";
        classname[3] ="weather_style";
        $("#weather-btn").css("opacity", 1);
        removeCauseTag(".cause-tag2");
        removeAll();
        click2_flag = true;
      }
      drawBars();
  });

  $("#criminal-btn").click(function(){

      if (click3_flag==true) {
        causes.splice(2,1,"replace");
        classname.splice(2,1,"replace_style");
        $("#criminal-btn").css("opacity", 0.4);
        addCauseTag("criminal","cause-tag3");
        removeAll();
        click3_flag = false;
      }
      else if (click3_flag==false) {
        causes.splice(2,1,"criminal");
        classname.splice(2,1,"criminal_style");
        $("#criminal-btn").css("opacity", 1);
        removeCauseTag(".cause-tag3");
        removeAll();
        click3_flag = true;
      }
      drawBars();
  });

  $("#human-error-btn").click(function(){

      if (click4_flag==true) {
        causes[1] = "replace";
        classname[1] = "replace_style";
        $("#human-error-btn").css("opacity", 0.4);
        addCauseTag("human-error","cause-tag4");
        removeAll();
        click4_flag = false;
      }
      else if (click4_flag==false) {
        causes[1] = "human_error";
        classname[1] ="human_style";
        $("#human-error-btn").css("opacity", 1);
        removeCauseTag(".cause-tag4");
        removeAll();
        click4_flag = true;
      }
      drawBars();
  });

  $("#mechanical-btn").click(function(){

      if (click5_flag==true) {
        causes[0] = "replace";
        classname[0] = "replace_style";
        $("#mechanical-btn").css("opacity", 0.4);
        addCauseTag("mechanical","cause-tag5");
        removeAll();
        click5_flag = false;
      }
      else if (click5_flag==false) {
        causes[0] = "mechanical";
        classname[0] = "mechanical_style";
        $("#mechanical-btn").css("opacity", 1);
        removeCauseTag(".cause-tag5");
        removeAll();
        click5_flag = true;
      }
      drawBars();
  });

  layers = d3.layout.stack()(causes.map(function(c) {
    //console.log("layres causes is " + causes);
    return rows.map(function(d) {
      return {x: d.year, y: d[c]};
    });
  }));

  xScale.domain(layers[0].map(function(d) { return d.x; }));
  yScale.domain([0, d3.max(layers[layers.length - 2], function(d) { return d.y0 + d.y; })]).nice();
  var xAxis = d3.svg.axis().scale(xScale).orient("bottom");//.tickFormat(d3.time.format("%b"));
  var yAxis = d3.svg.axis().scale(yScale).orient("right");

  svg2.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + (cause_height) + ")")
      .call(xAxis);

  svg2.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(" + cause_width + ",0)")
      .call(yAxis);
  svg2.append("text")
      //.attr("class", "axis")
      .attr("x", cause_width)
      .attr("y", "-10px")
      .style("text-anchor","middle")
      .text("Fatality")
      ;

  drawBars()

  function removeBars(){
    svg2.selectAll("rect").remove();
  }

  function drawBars(){

    layers = d3.layout.stack()(causes.map(function(c) {
      return rows.map(function(d) {
        return {x: d.year, y: d[c]};
      });
    }));

    var layer = svg2.selectAll(".layer")
        .data(layers)
        .enter().append("g")
        .attr("class", function(d, i) {
            return classname[i];
        });
        //.style("fill", function(d, i) { return color(d.name); });

    layer.selectAll("rect")
        .data(function(d) { return d; })
        .enter().append("rect")
        .attr("x", function(d) { return xScale(d.x); })
        .attr("y", function(d) { return yScale(d.y + d.y0); })
        .attr("height", function(d) { return yScale(d.y0) - yScale(d.y + d.y0); })
        .attr("width", xScale.rangeBand() - 1);

    }

});

function type(d) {
  //d.date = parseDate(d.date);
  causes.forEach(function(c) {
    d[c] = +d[c];
  });
  return d;
}

function removeAll(){
    svg2.selectAll("rect").remove();
    svg2.selectAll(".mechanical_style").remove();
    svg2.selectAll(".human_style").remove();
    svg2.selectAll(".criminal_style").remove();
    svg2.selectAll(".weather_style").remove();
    svg2.selectAll(".unknown_style").remove();
    svg2.selectAll(".replace_style").remove();
  }

Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] == val) return i;
    }
    return -1;
  };

  Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
      this.splice(index, 1);
    }
  };

  Array.prototype.replace = function(val) {
    var index = causes.indexOf(val);
    if (~index) {
      causes[index] = "replace";
    }
  }

  function getId(){
    $(document).click(function(val) {
        //console.log($(val.target).attr("id"));
        return $(val.target).attr("id");
    })
  }

  function addCauseTag(tag,tagclass) {
      var btnx = $("#" + tag + "-btn").position().left;
      var btny = $("#" + tag + "-btn").position().top;
      var a;

      // if (tag == "unknown") { a = 1;}
      // else if (tag == "weather") { a = 2;}
      // else if (tag == "weather") { a = 2;}
      // console.log("btnx is " + btnx);
      // console.log("btny is " + btny);

      svg2.append("text")
          .attr("class", tagclass)
          .attr("x", btnx - btnsize + 5)
          .attr("y", btny - 6)
          .text(tag);
  }

  function removeCauseTag(tagclass){
      svg2.selectAll(tagclass).remove();
  }
