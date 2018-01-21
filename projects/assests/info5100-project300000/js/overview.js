//var window_width = $(window).width(),
//	window_height = $(window).height();
//var ow_index = 0.7,
//	oh_index = 0.7;

// console.log(window_width);
// console.log(window_height);

//var overview_width = window_width * ow_index,
//	overview_height = window_height * oh_index;

var overview_width = 1000;
var overview_height = 350;
var barPadding = 10;
var gameCompleted = false;

var answers = new Array(transportation_types.length);
var correctAnswers = transportation_types.map(function(d) { return d.mode; });

var overviewSvg = d3.select("#transportation")
	.append("svg")
	.attr("width", overview_width)
	.attr("height", overview_height)
	.attr("viewBox", "0 0 " + overview_width + " " + overview_height);

var max_fatalities = 0;
for (var d in transportation_types) {
	max_fatalities = Math.max(transportation_types[d].fatalities, max_fatalities);
}

var dx = (overview_width-225) / max_fatalities;
var dy = (overview_height - transportation_types.length*barPadding) / (transportation_types.length + 1);

// bars
var bars = overviewSvg.selectAll(".bar")
	.data(transportation_types)
	.enter()
	.append("rect")
	.attr("class", "bar")
	.attr("x", function(d, i) {return 0;})
	.attr("y", function(d, i) {return (dy*i) + (i * barPadding)})
	.attr("width", function(d, i) {return dx*d.fatalities})
	.attr("height", dy)
	.attr("opacity", function(d,i) {return 1-((i+1)*0.1)});

// labels
var text = overviewSvg.selectAll("text")
	.data(transportation_types)
	.enter()
	.append("text")
	.attr("class", "barText")
	.attr("x", function(d, i) {return dx*d.fatalities + 5})
	.attr("y", function(d, i) {return dy*i + i*barPadding + 30;})
	.text( function(d) {return d.fatalities;})
	.attr("font-size", "15px")
	.style("font-weight", "bold");

var labelWidth = 100;
var labelPadding = 10;

// answer dropzones
var dropzones = overviewSvg.selectAll(".dropzone")
	.data(transportation_types)
	.enter()
	.append("rect")
	.attr("class", "dropzone")
	.attr("data-index", function(d, i) {return i})
	.attr("x", function(d, i) {return dx*d.fatalities + 50})
	.attr("y", function(d, i) {return (dy*i) + (i * barPadding)})
	.attr("width", labelWidth)
	.attr("height", dy);

// correct answers
var correctLabels = overviewSvg.selectAll(".correctLabel")
	.data(transportation_types)
	.enter()
	.append("text")
	.attr("class", "correctLabel hidden")
	.attr("data-index", function(d, i) {return i})
	.attr("x", function(d, i) {return dx*d.fatalities + 50 + labelWidth + 10})
	.attr("y", function(d, i) {return dy*i + i*barPadding + 30;})
	.text(function(d) {return d.mode});

// shuffle an array using the Fisher-Yates algorithm
function shuffle(array) {
	// Copy the array, so we don't modify the original
	array = array.slice();

	var currentIndex = array.length;
	while (currentIndex != 0) {
		// Pick a remaining element...
		var randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		var temp = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temp;
	}

	return array;
}

// transportation modes
var modes = overviewSvg.selectAll("g")
	.data(shuffle(transportation_types))
	.enter()
	.append("g")
	.attr("data-x", function(d, i) { return (labelPadding/2) + (i * labelWidth) + (i * labelPadding); })
	.attr("data-y", function(d, i) { return overview_height - dy; })
	.attr("data-start-x", function(d, i) { return (labelPadding/2) + (i * labelWidth) + (i * labelPadding); })
	.attr("data-start-y", function(d, i) { return overview_height - dy; })
	.attr("transform", function(d, i) { return "translate(" + ((labelPadding/2) + (i * labelWidth) + (i * labelPadding)) + "," + (overview_height - dy) + ")"; })
	.attr("class", "draggable")
	//.attr("class", function(d) { return "draggable " + d.mode; })
	.attr("data-answer", function(d) { return d.mode; });


modes.append("rect")
	.attr("width", labelWidth)
	.attr("height", dy - 1);

modes.append("text")
	.attr("x", labelWidth / 2)
	.attr("y", dy / 2)
	.attr("dy", ".35em")
	.text(function(d) { return d.mode; });

// make them draggable
interact('.draggable')
	.draggable({
		// keep the element within the area of it's parent
		restrict: {
		  restriction: "parent",
		  endOnly: true,
		  elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
		},

		// call this function on every dragmove event
		onmove: dragMoveListener,

		onend: function(event) {
			if (!event.target.classList.contains("can-drop")) {
				resetLocation(event.target);
				clearAnswer(event.target.getAttribute("data-answer"));
			}
		}
	});

function dragMoveListener(event) {
	if (gameCompleted) {
		return false;
	}

	var target = event.target,
		// keep the dragged position in the data-x/data-y attributes
		x = (parseFloat(target.getAttribute('data-x')) || 0) + svgScale(event.dx),
		y = (parseFloat(target.getAttribute('data-y')) || 0) + svgScale(event.dy);

	// translate the element
	target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

	// update the posiion attributes
	target.setAttribute('data-x', x);
	target.setAttribute('data-y', y);
}

var svgElement = document.querySelector("#transportation svg");
function svgScale(x) {
	var actualSize = svgElement.getBoundingClientRect();
	var xScale = actualSize.width / overviewSvg.attr("width");
	var yScale = actualSize.height / overviewSvg.attr("height");
	return x / Math.min(xScale, yScale);
}

// enable draggables to be dropped into the dropzones
interact('.dropzone').dropzone({
	accept: '.draggable',

	// Require a 75% element overlap for a drop to be possible
	overlap: 0.5,

	ondropactivate: function (event) {
		// add active dropzone feedback
		event.target.classList.add('drop-active');
	},

	ondragenter: function (event) {
		var draggableElement = event.relatedTarget;
		var dropzoneElement = event.target;

		// feedback the possibility of a drop
		dropzoneElement.classList.add('drop-target');
		draggableElement.classList.add('can-drop');
	},

	ondragleave: function (event) {
		// remove the drop feedback style
		event.target.classList.remove('drop-target');
		event.relatedTarget.classList.remove('can-drop');
	},

	ondrop: function (event) {
		clearAnswer(event.relatedTarget.getAttribute("data-answer"));

		var x = event.target.getAttribute("x");
		var y = event.target.getAttribute("y");
		event.relatedTarget.setAttribute("data-x", x);
		event.relatedTarget.setAttribute("data-y", y);
		event.relatedTarget.style.transform = "translate(" + x + "px," + y + "px)";

		var index = event.target.getAttribute("data-index");
		var oldAnswer = answers[index];
		if (oldAnswer) {
			var oldLabel = document.querySelector("g[data-answer='" + oldAnswer + "']");
			resetLocation(oldLabel);
		}

		answers[index] = event.relatedTarget.getAttribute("data-answer");

		var answerCount = 0;
		for (var i = 0; i < answers.length; i++) {
			if (answers[i]) {
				answerCount++;
			}
		}
		if (answerCount == answers.length) {
			document.getElementById("checkAnswers").disabled = false;
		}
		else {
			document.getElementById("checkAnswers").disabled = true;
		}
	},

	ondropdeactivate: function(event) {
		// remove active dropzone feedback
		event.target.classList.remove('drop-active');
		event.target.classList.remove('drop-target');
	}
});

document.getElementById("checkAnswers").addEventListener("click", function() {
	var numberCorrect = checkAnswers();
	var message;
	if (numberCorrect == correctAnswers.length) {
		message = "Congratulations! You got them all correct.";
	}
	else {
		message = "You got " + numberCorrect + "/" + correctAnswers.length + " correct.";
	}
	document.querySelector("#message").innerText = message;
});

document.getElementById("resetAnswers").addEventListener("click", function() {
	for (var i = 0; i < answers.length; i++) {
		if (answers[i]) {
			resetLocation(document.querySelector("g[data-answer='" + answers[i] + "']"));
			answers[i] = null;
			document.querySelector(".correctLabel[data-index='" + i + "']").classList.add("hidden");
		}
	}
	gameCompleted = false;
	document.querySelector("#message").innerText = "";
});

function resetLocation(draggable) {
	var x = draggable.getAttribute("data-start-x");
	var y = draggable.getAttribute("data-start-y");
	draggable.style.transform = "translate(" + x + "px," + y + "px)";
	draggable.setAttribute("data-x", x);
	draggable.setAttribute("data-y", y);
	draggable.classList.remove("correct");
	draggable.classList.remove("incorrect");
	document.getElementById("checkAnswers").disabled = true;
}

function clearAnswer(answer) {
	for (var i = 0; i < answers.length; i++) {
		if (answers[i] == answer) {
			answers[i] = null;
		}
	}
}

function checkAnswers() {
	var correct = 0;

	for (var i = 0; i < correctAnswers.length; i++) {
		if (answers[i] != null) {
			var answerLabel = document.querySelector("g[data-answer='" + answers[i] + "']");
			var correctLabel = document.querySelector(".correctLabel[data-index='" + i + "']");
			if (answers[i] == correctAnswers[i]) {
				answerLabel.classList.remove("incorrect");
				answerLabel.classList.add("correct");
				correctLabel.classList.add("hidden");
				correct++;
			}
			else {
				answerLabel.classList.remove("correct");
				answerLabel.classList.add("incorrect");
				correctLabel.classList.remove("hidden");
			}
		}
	}

	gameCompleted = true;

	return correct;
}
