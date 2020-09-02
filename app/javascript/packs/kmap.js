import * as d3 from "d3";

// Check for mobile
let mobile = false;
if((/iPhone|iPad|iPod|Android|webOS|BlackBerry|Opera Mini|IEMobile/i.test(navigator.userAgent) )) {
	let mobile = true;
};

// Canvas parameters
let canvas = {
	size: 1000,
	x0: 0, // X-axis' 0
	y0: 500, // Y-axis' 0
	// Radii for pages
	radii: [
		280,
		330,
		380,
		430,
		480
	]
};
// Page lines
let pageLine = {
	width: "0.2em",
	color: "lightgrey",
};
// Labels
let pageLabel = {
	fontSize: "0.9em",
	fill: "lightgrey",
	pointerEvents: "none"
};
// Category lines
let categoryLine = {
	width: "0.4em",
	opacity: "1.0"

};
// Article clusters
let cluster = {
	strokeWidth: "0.4em",
	radius: "1em",
	fill: "white"
};

window.drawKmap = function(kmap_object, append_to) {
	// Number of kmap categories
	let length = kmap_object.categories.length;	
	let halfLength = Math.floor(length/2);
	// Degree of puffer so no category line will go exactly on 90° or 270°
	let margin = 12;
	// Degrees between each category line to draw
	let degree = (180-(2*margin))/length;
	// Query
	let query = {
		fontSize: "1em",
		fill: "grey",
		pointerEvents: "none"
	};
	// Calculate the radial x coordinate for the half-radial coordinate system on the svg canvas
    function getX(input, identifier) {
		if (identifier < halfLength) {
		// It's above
			return input*Math.cos( ( (90-margin)-(identifier*degree) )*(Math.PI/180) )
		} else {
			// It's below
			return input*Math.cos( ( (360-margin)-( ( ( ( halfLength-identifier)*-1 )*degree) ) )*(Math.PI/180) )
		}   
    };
    //
    function getY(input, identifier) {
 		if (identifier < halfLength) {
			// It's above
			return canvas.y0 - ( input*Math.sin( ( (90-margin)-(identifier*degree) )*(Math.PI/180) ) )
		} else {
			// It's below
			return canvas.y0 - ( input*Math.sin( ( (360-margin)-( ( ( ( halfLength-identifier)*-1 )*degree) ) )*(Math.PI/180) ) )
		}
    };
	// The main svg canvas

	// Remove any previously generated svg (?!)
	d3.select("svg").remove();

	let svg = d3.select(append_to)
		.append("svg")
		.attr("preserveAspectRatio", "xMinYMin")
		.attr("viewBox", "0 0 " + canvas.size*0.5 + " " + canvas.size)
		.attr("id", "kmap");

	// Shadow
	let defs = svg.append("defs");
	let dropShadowFilter = defs.append("svg:filter")
	  .attr("id", "drop-shadow")
	  .attr("filterUnits", "userSpaceOnUse")
	  .attr("width", "350%")
	  .attr("height", "350%");
	dropShadowFilter.append("svg:feGaussianBlur")
	  .attr("in", "SourceGraphic")
	  .attr("stdDeviation", 2)
	  .attr("result", "blur-out");
	dropShadowFilter.append("svg:feColorMatrix")
	  .attr("in", "blur-out")
	  .attr("type", "hueRotate")
	  .attr("values", 180)
	  .attr("result", "color-out");
	dropShadowFilter.append("svg:feOffset")
	  .attr("in", "color-out")
	  .attr("dx", 3)
	  .attr("dy", 3)
	  .attr("result", "the-shadow");
	dropShadowFilter.append("svg:feBlend")
	  .attr("in", "SourceGraphic")
	  .attr("in2", "the-shadow")
	  .attr("mode", "normal");

	// Drawing the page lines
    svg.selectAll("page")
    	.data(canvas.radii)
    	.enter()
    	.append("circle")
    	.attr("class", "page")
    	.attr("id", function(d, i) {
        	return "page_" + i
    	})
    	.attr("cx", canvas.x0)
    	.attr("cy", canvas.y0)
    	.attr("r", function(d) {
        	return d
    	})
    	.attr("stroke", pageLine.color)
    	.attr("stroke-width", pageLine.width)
    	.attr("fill", "none")
    	.attr("data-clicked", "false")
    	.attr("filter", "none");
    // Writing the page labels
	// svg.selectAll("label")
	// 	.data(canvas.radii)
	// 	.enter()
	// 	.append("text")
	// 	.text(function(d, i) {
	// 		return "Page " + (i+1);
	// 	})
	// 	.attr("text-anchor", "middle")
	// 	.attr("class", "pageLabel")
	// 	.attr("id", function(d, i) {
	// 		return "pageLabel_" + i;
	// 		})
	// 	.attr("x", canvas.x0 + 22)
	// 	.attr("y", function(d) {
	// 		return canvas.y0 - (d+6);
	// 	})
	// 	.attr("font-size", pageLabel.fontSize)
	// 	.attr("fill", pageLabel.fill)
	// 	.attr("pointer-events", pageLabel.pointerEvents)
	// 	.attr("letter-spacing", "-1px");
    // Drawing the category lines
	svg.selectAll("category_line")
		.data(kmap_object.categories)
		.enter()
		.append("line")
		.attr("class", "category_line")
		.attr("id", function(d, i) {
        	return "category_line_" + d.id
    	})
    	.attr("x1", function(d, i) {
    		return getX(canvas.radii[0]*0.5, i);
    	})
    	.attr("y1", function(d, i) {
    		return getY(canvas.radii[0]*0.5, i);
    	})
    	.attr("x2", function(d, i) {
    		return getX(canvas.radii[d.radius], i);
    	})
    	.attr("y2", function(d, i) {
    		return getY(canvas.radii[d.radius], i);
    	})
    	.attr("stroke", function(d, i) {
        	return d.color
    	})
    	.attr("opacity", categoryLine.opacity)
    	.attr("stroke-width", categoryLine.width)
    	.attr("data-clicked", "false")
    	.attr("filter", "none");
	// Drawing the article clusters and writing the article counts
	for (let category of kmap_object.categories) {
		let id = category.id;
		let color = category.color;
		// Cluster groups
		let clusterGroup = svg.selectAll("cluster")
			.data(category.pages)
			.enter()
			.append("g")
			.attr("class", function(d) {
				let one = "cluster";
				let two = "c_page_" + d.page;
				let three = "c_category_" + id;
				return one + " " + two + " " + three;
			})
			.attr("id", function(d) {
				return "cluster_" + d.page + "_" + id;
			})
			.attr("cursor", "pointer")
			.attr("data-clicked", "false")
			.attr("filter", "none");
		// Clusters
		clusterGroup.append("circle")
			.attr("cx", function(d) {
					return getX(canvas.radii[d.page], id);
		       	})
		      .attr("cy", function(d) {
		       		return getY(canvas.radii[d.page], id);
		       	})
		     .attr("r", cluster.radius)
		     .attr("stroke", color)
		     .attr("stroke-width", cluster.strokeWidth)
		     .attr("fill", cluster.fill);
		// Counts
		clusterGroup.append("text")
			.text(function(d) {
				return d.article_ids.length;
			})
			.attr("text-anchor", "middle")
			.attr("class", "count")
			.attr("x", function(d) {
				return getX(canvas.radii[d.page], id);
			})
			.attr("y", function(d) {
				return getY(canvas.radii[d.page], id) +5;
			});
	};
	// Query
	svg.selectAll("query")
    	.data([kmap_object.query])
    	.enter()
    	.append("text")
    	.attr("class", "query")
    	.text(function(d) {
            return d;
        })
        .attr("x", canvas.x0 + 5)
        .attr("y", canvas.y0 + 5)
		.attr("font-size", query.fontSize)
		.attr("fill", query.fill)
		.attr("pointer-events", query.pointerEvents);
	
	// Reset kmap
	svg.selectAll("reset")
    	.data(["x reset"])
    	.enter()
    	.append("text")
    	.attr("class", "reset")
    	.attr("id", "resetKmap")
    	.text(function(d) {
            return d;
        })
        .attr("x", 420)
        .attr("y", 30)
		.attr("font-size", "1.1em")
		// .attr("fill", pageLabel.fill)
		.attr("cursor", "pointer");
};

function coolCluster(element) {
	let color = $(element).children("circle").attr("stroke");
	$(element).children("circle")
		.attr("fill", color)
        .attr("filter", "url(#drop-shadow)"),
    $(element).attr("data-clicked", "true")
}; 

function uncoolCluster(element) {
	$(element).children("circle")
        .attr("fill", "white")
        .attr("filter", "none"),
    $(element).attr("data-clicked", "false")
};

function showArticles() {
	let showArray = []; 
	let hideArray = [];
	$('.article[data-clicked="false"]').each(function(){
		hideArray.push(this);
	});
	$('.article[data-clicked="true"]').each(function(){
		showArray.push(this);
	});
	if (showArray.length == 0) {
		// Show all articles
		$(".article").slideDown(350)
		$("#resetKmap").css("visibility", "hidden")
	}
	else {
		let i;
		for (i = 0; i < showArray.length; ++i) {
			// Show this articles
			$(showArray[i])
				.slideDown(350)
		}
		let y;
		for (y = 0; y < hideArray.length; ++y) {
			// Hide this article
			$(hideArray[y])
				.slideUp(350)
		}
		$("#resetKmap").css("visibility", "visible")
	}
};

// Hover/click page line
window.mousePageLine = function() {
    $(document).ready(function() {
        $(".page").mouseover(function() {
			if (mobile == false) {
			    let page = $(this).attr("id").slice(5, 6);
			    let catArray = [];
			    $(".a_page_" + page).each(function() {
			    	catArray.push(this.id.slice(14, 17));
			    });
				let i;
				for (i = 0; i < catArray.length; ++i) {
				    let article = $(".a_page_" + page + ".a_category_" + catArray[i]);
				    let color = $("#category_line_" + catArray[i]).attr("stroke");
				    article
			    		.css({"border-left-color": color, 
			 		  		  "border-left-width":"1em", 
			 		  		  "border-left-style":"solid"}),
			        $("#circle_" + catArray[i])
			        	.attr("fill", color)
				};
			    $(this)
					.attr("stroke-width", "0.5em")
			        .attr("cursor", "pointer")
			    $("#pageLabel_" + page)
			    	.css("font-size", "1.1em")
			    	.attr("x", canvas.x0 + 32),
			   	$(".c_page_" + page).children("circle")
			   		.attr("r", "1.5em")
					.attr("stroke-width", "0.6em")
			}
	    }),
	    $(".page").click(function() {
	    	let page = $(this).attr("id").slice(5, 6);
	    	if ($(this).attr("data-clicked") == "false") {
				$(".c_page_" + page).each(function() {
					coolCluster(this);
				}),
				$(".a_page_" + page)
	    			.attr("data-clicked", "true"),
	    		$(this)
	    			.attr("data-clicked", "true")
	    	} 
	    	else {
	    		$(".c_page_" + page).each(function() {
					uncoolCluster(this);
				}),
				$(".a_page_" + page)
	    			.attr("data-clicked", "false"),
	    		$(this)
	    			.attr("data-clicked", "false")
	    	}
	    	showArticles();
	    }),
        $(".page").mouseout(function() {
			if (mobile == false) {
				let page = $(this).attr("id").slice(5, 6);
			    let catArray = [];
			    $(".a_page_" + page).each(function() {
			    	catArray.push(this.id.slice(14, 17));
			    });
				let i;
				for (i = 0; i < catArray.length; ++i) {
				    let article = $(".a_page_" + page + ".a_category_" + catArray[i]);
				    let color = $("#category_line_" + catArray[i]).attr("stroke");
				    article
			    		.css({"border-left-color": color, 
			 		  		  "border-left-width":"1em", 
			 		  		  "border-left-style":"solid"}),
			        $("#circle_" + catArray[i])
			        	.attr("fill", "white")
				};
			    $(this)
					.attr("stroke-width", pageLine.width)
			    $("#pageLabel_" + page)
			    	.css("font-size", "0.9em")
					.attr("x", canvas.x0 + 22),
			   	$(".c_page_" + page).children("circle")
			   		.attr("r", cluster.radius)
					.attr("stroke-width", cluster.strokeWidth),
				$(".a_page_" + page)
					.css({"border-left-color": "white", 
			    		  "border-left-width":"0"})
			}
		})
    })
};

// Hover/click category line
window.mouseCategoryLine =  function() {
	$(document).ready(function() {
		$(".category_line").mouseover(function() {
			if (mobile == false) {
				let cat = $(this).attr("id").slice(14, 17),
					color = $(this).attr("stroke");
				$(this)
					.attr("stroke-width", "0.6em")
					.attr("cursor", "pointer"),
				$(".c_category_" + cat).children("circle")
				    .attr("r", "1.5em")
					.attr("stroke-width", "0.6em"),
				$("#circle_" + cat)
					.attr("fill", color),
				$(".a_category_" + cat)
					.css({"border-left-color": color, 
				 		  "border-left-width":"1em", 
				 		  "border-left-style":"solid"})
			}
		}),
		$(".category_line").click(function() {
			let cat = $(this).attr("id").slice(14, 17),
				color = $(this).attr("stroke");
	    	if ($(this).attr("data-clicked") == "false") {
				$(".c_category_" + cat).each(function() {
					coolCluster(this);
				}),
				$(".a_category_" + cat)
	    			.attr("data-clicked", "true"),
	    		$("#item_" + cat)
	    			.attr("data-clicked", "true"),
	    		$("#circle_" + cat)
	    			.attr("fill", color)
	    			.css("filter", "url(#drop-shadow)"),
	    		$(this)
	    			.attr("data-clicked", "true")
	    			.attr("filter", "url(#drop-shadow)")
	    	} 
	    	else {
	    		$(".c_category_" + cat).each(function() {
					uncoolCluster(this);
				}),
				$(".a_category_" + cat)
	    			.attr("data-clicked", "false"),
	    		$("#item_" + cat)
	    			.attr("data-clicked", "false"),
	    		$("#circle_" + cat)
	    			.attr("fill", "white")
	    			.css("filter", "none"),
	    		$(this)
	    			.attr("data-clicked", "false")
	    			.attr("filter", "none")
	    	}
	    	showArticles();
		}),
		$(".category_line").mouseout(function() {
			if (mobile == false) {
				let cat = $(this).attr("id").slice(14, 17);
				$(this)
					.attr("stroke-width", categoryLine.width),
				$(".c_category_" + cat).children("circle")
				    .attr("r", cluster.radius)
					.attr("stroke-width", cluster.strokeWidth),
				$(".a_category_" + cat)
				    .css({"border-left-color": "white", 
				    	"border-left-width":"0"})
				if ($(this).attr("data-clicked") == "false") {
					$("#circle_" + cat)
						.attr("fill", "white")
					// $(".c_category_" + cat).children("circle")
					// 	.attr("fill", "white")
				} else {
					$("#circle_" + color)
						.attr("fill", "white")
					// $(".c_category_" + cat).children("circle")
					// 	.attr("fill", color)
				}
			}
		})
	})
};

// Hover/click legend item
window.mouseLegendItem =  function() {
	$(document).ready(function() {
		$(".legend_item").mouseover(function() {
			if (mobile == false) {
				let cat = $(this).attr("id").slice(5, 8),
				color = $("#category_line_" + cat).attr("stroke");
				$("#circle_" + cat)
					.attr("fill", color)
					.css("cursor", "pointer"),
				$("#label_" + cat)
					.css("cursor", "pointer"),
				$(".c_category_" + cat).children("circle")
				    .attr("r", "1.5em")
					.attr("stroke-width", "0.6em"),
				$("#category_line_" + cat)
					.attr("stroke-width", "0.6em"),
				$(".a_category_" + cat)
					.css({"border-left-color": color, 
				 		"border-left-width":"1em", 
				 		"border-left-style":"solid"})
			}
		}),
		$(".legend_item").click(function() {
			let cat = $(this).attr("id").slice(5, 8),
				color = $("#category_line_" + cat).attr("stroke");
	    	if ($(this).attr("data-clicked") == "false") {
				$(".c_category_" + cat).each(function() {
					coolCluster(this);
				}),
				$(".a_category_" + cat)
	    			.attr("data-clicked", "true"),
	    		$("#category_line_" + cat)
	    			.attr("data-clicked", "true")
	    			.attr("filter", "url(#drop-shadow)")
	    		$("#circle_" + cat)
	    			.attr("data-clicked", "true")
	    			.attr("fill", color)
	    			.css("filter", "url(#drop-shadow)"),
	    		$(this)
	    			.attr("data-clicked", "true")
	    	} 
	    	else {
	    		$(".c_category_" + cat).each(function() {
					uncoolCluster(this);
				}),
				$(".a_category_" + cat)
	    			.attr("data-clicked", "false"),
	    		$("#category_line_" + cat)
	    			.attr("data-clicked", "false")
	    			.attr("filter", "none"),
	    		$("#circle_" + cat)
	    			.attr("data-clicked", "false")
	    			.attr("fill", "white")
	    			.css("filter", "none"),
	    		$(this)
	    			.attr("data-clicked", "false")
	    	}
	    	showArticles();
		}),
		$(".legend_item").mouseout(function() {
			let cat = $(this).attr("id").slice(5, 8);
			if (mobile == false) {

				$(".c_category_" + cat).children("circle")
					.attr("r", cluster.radius)
					.attr("stroke-width", cluster.strokeWidth),
				$("#category_line_" + cat)
					.attr("stroke-width", categoryLine.width),
				$(".a_category_" + cat)
					   .css({"border-left-color": "white", 
					    	"border-left-width":"0"});

				if ($(this).attr("data-clicked") == "false") {
					$("#circle_" + cat)
						.attr("fill", "white")
				}
			}
		})
	})
};

// Hover/click cluster
window.mouseCluster = function() {
    $(document).ready(function() {
        $(".cluster").mouseover(function() {
			if (mobile == false) {
			    let page = $(this).attr("id").slice(8, 9),
			        cat = $(this).attr("id").slice(10, 13),
			        color = $(this).children("circle").attr("stroke");
			    $(this).children("circle")
			    	.attr("fill", color)
			    	// .attr("r", "1.5em")
					// .attr("stroke-width", "0.6em")
			        .attr("cursor", "pointer"),
			    $("#circle_" + cat)
			    	.attr("fill", color),
			    $(".article_" + page + "_" + cat)
			    	.css({"border-left-color": color, 
			     		  "border-left-width":"1em", 
			     		  "border-left-style":"solid"})
			}
        }),
        $(".cluster").mouseout(function() {
       		if (mobile == false) {
			    let page = $(this).attr("id").slice(8, 9),
			        cat = $(this).attr("id").slice(10, 13);
				$(this).children("circle")
					.attr("fill", "white"),
				   	// .attr("r", cluster.radius)
					// .attr("stroke-width", cluster.strokeWidth)
			    $(".article_" + page + "_" + cat)
			    	.css({"border-left-color": "white", 
			     		  "border-left-width":"0"})

			    if ($("#item_" + cat).attr("data-clicked") == "false") {
					$("#circle_" + cat)
		    			.attr("fill", "white")
				}
			}
        }),
        $(".cluster").click(function() {
        	let page = $(this).attr("id").slice(8, 9),
        		cat = $(this).attr("id").slice(10, 13),
        		color = $(this).attr("stroke");
        	if ($(this).attr("data-clicked") == "false") {
        		coolCluster(this);
        		$(".article_" + page + "_" + cat)
        			.attr("data-clicked", "true")
            }
        	else {
        		uncoolCluster(this);
        	    $(".article_" + page + "_" + cat)
        			.attr("data-clicked", "false"),
        		$("#item_" + cat)
        			.attr("data-clicked", "false"),
        		$("#page_" + page)
        			.attr("data-clicked", "false")
        			.attr("filter", "none"),
        		$("#category_line_" + cat)
        			.attr("data-clicked", "false")
        			.attr("filter", "none"),
        		$("#circle_" + cat)
        			.attr("fill", "white")
        			.css("filter", "none")
        	}
        	showArticles();
        })
	})
};

// Hover/click article
window.mouseArticle = function() {
    $(document).ready(function() {
        $(".article").mouseover(function() {
		    let page = $(this).attr("id").slice(12, 13),
		        cat = $(this).attr("id").slice(14, 17),
		        color = $("#category_line_" + cat).attr("stroke");
		    $(this)
		    	.css({"border-left-color": color, 
		     		"border-left-width":"1em", 
		     		"border-left-style":"solid"}),
		    $("#circle_" + cat)
		    	.attr("fill", color),
		    $("#cluster_" + page + "_" + cat).children("circle")
		    	.attr("r", "1.5em")
				.attr("stroke-width", "0.6em")
        }),
        $(".article").mouseout(function() {
		    let page = $(this).attr("id").slice(12, 13),
		        cat = $(this).attr("id").slice(14, 17);
		    $(this)
		    	.css({"border-left-color": "white", 
		     		"border-left-width":"0"}),
		    $("#cluster_" + page + "_" + cat).children("circle")
		    	.attr("r", cluster.radius)
				.attr("stroke-width", cluster.strokeWidth)

			if ($("#item_" + cat).attr("data-clicked") == "false") {
				$("#circle_" + cat)
		    		.attr("fill", "white")
			}

        })
	})
};

// Reset kmap
window.resetKmap = function() {
    $(document).ready(function() {
        $("#resetKmap").click(function() {
        	uncoolCluster(".cluster");
        	$(".article, .cluster, .category_line, .page, .legend_item")
        		.attr("data-clicked", "false")
	    		.attr("filter", "none"),
	    	$(".category_circle")
	    		.attr("fill", "white")
	    		.attr("data-clicked", "false")
	    		.css("filter", "none");
        	showArticles();
        })
	})
};
