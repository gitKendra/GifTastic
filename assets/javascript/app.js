$(function(){ // .ready() handler
	const APIKEY = "4b2610846efe448fa64e5bbfd561d517";

	// Topics array
	let topic = ["bye", "high five", "thumbs up", "clap", "shrug", "wink", "smh", "hugs", "dance", "sleepy", "hi"];

	// Create and display buttons on HTML
	function renderButtons() {
		$("#btn-list").empty();
		for(var i = 0; i < topic.length; i++){
		  var btn = $("<button>");
		  btn.addClass("btn btn-default btn-topic");
		  btn.text(topic[i]); 
		  btn.val(topic[i]);
		  // use prepend so user input value is at top of list
		  $("#btn-list").prepend(btn);
		}
	}

	// Updates HTML with the gifs of the selected topic
	function displayGifs(){
		$("#gif-content").empty();
		
		// update search term with clicked button value
		let searchTerm = $(this).val();
		let queryURL = "https://api.giphy.com/v1/gifs/search?api_key="+APIKEY+"&q="+searchTerm+"&limit=10";
	    
	    // Call to the API to get content
	    $.ajax({
	      url: queryURL,
	      method: "GET"
	    })
	    .done(function(response) {
	    	let results = response.data;
	    	// Loop through results array and add each gif and rating to HTML
	    	for (var i = 0; i < results.length; i++){
		        var gifDiv = $("<div>");
		        gifDiv.addClass("thumbnail");
		        var p = $("<p>");
		        p.addClass("caption");
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

	// onClick or Enter for form input to add user-input topic to array
	$("#add-topic").on("click", function(event){
		event.preventDefault();
		let newTopic = $("#topic-input").val().trim();
		// Don't add topic if input is empty
		if(newTopic === "" || topicExists(newTopic)) {
			// Do nothing if user input nothing or an existing topic
		}
		else{
			topic.push(newTopic);
			renderButtons();
		}
	});

	// Returns boolean if topic already exists in topic array
	function topicExists(userInput){
		for(var i = 0; i < topic.length; i++){
			if(userInput === topic[i]){
				return true;
			}
		}
		return false;
	}

	// onClick functionality for topic buttons and gifs
	$(document).on("click", ".btn-topic", displayGifs);
	$(document).on("click", ".gif", togglePlay);

renderButtons();
}); // end .ready() handler
