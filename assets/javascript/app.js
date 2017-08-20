$(function(){ // .ready() handler

	const API = "https://api.giphy.com"
	const APIKEY = "4b2610846efe448fa64e5bbfd561d517";

	// Topics array
	let topic = ["high five", "thumbs up", "applause", "shrug", "wink", "smh", "hugs", "bye", "hi", "dance", "sleepy"];

	// Create and display buttons on HTML
	function renderButtons() {
		$("#btn-list").empty();
		for(var i = 0; i < topic.length; i++){
		  var btn = $("<button>");
		  btn.addClass("btn btn-default btn-topic");
		  btn.text(topic[i]);
		  btn.val(topic[i]);
		  $("#btn-list").append(btn);
		}
	}

	// Updates HTML with the gifs of the selected topic
	function displayGifs(){
		$("#gif-content").empty();
		// update search term with clicked button value
		let searchTerm = $(this).val();
		let queryURL = "https://api.giphy.com/v1/gifs/search?api_key="+APIKEY+"&q="+searchTerm+"&limit=10";
	    $.ajax({
	      url: queryURL,
	      method: "GET"
	    })
	    .done(function(response) {
	    	let results = response.data;
	    	// Loop through results array and add each gif and rating to HTML
	    	for (var i = 0; i < results.length; i++){
		        var gifDiv = $("<div>");
		        gifDiv.addClass("gif-div");
		        var p = $("<p>");
		        p.text("Rating: " + results[i].rating);
		        var gifImage = $("<img>");
		        gifImage.addClass("gif");
		        gifImage.attr("src", results[i].images.fixed_width_still.url);
		        gifImage.attr("src-alt", results[i].images.fixed_width.url);
		        gifDiv.append(gifImage);
		        gifDiv.append(p);
		        $("#gif-content").prepend(gifDiv);
	    	};

	    });
	}
	// Toggles the source of the image between still and animated
	function togglePlay(){
		var temp = $(this).attr("src");
		$(this).attr("src", $(this).attr("src-alt"));
		$(this).attr("src-alt", temp);
	}

	// Form input to add user-input topic to array
	$("#add-topic").on("click", function(event){
		event.preventDefault();
		// Here we grab the text from the input box and trim off any white space
		let newTopic = $("#topic-input").val().trim();
		topic.push(newTopic);
		// remake buttons based on form input
		renderButtons();
	});


	// onClick functionality for topic buttons
	$(document).on("click", ".btn-topic", displayGifs);
	$(document).on("click", ".gif", togglePlay);

renderButtons();
}); // end .ready() handler
