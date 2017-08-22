$(function(){ // .ready() handler
	const APIKEY = "4b2610846efe448fa64e5bbfd561d517";

	// Topics array
	let topic = ["bye", "high five", "thumbs up", "clap", "shrug", "wink", "smh", "hugs", "dance", "sleepy", "hi"];

	// Function to create and display buttons on HTML
	function renderButtons() {
		$("#btn-list").empty();
		for(let i = 0; i < topic.length; i++){
		  let btn = $("<button>").addClass("btn btn-default btn-topic");
		  btn.text(topic[i]); 
		  btn.val(topic[i]);
		  // use prepend so most recent user input value is at top of button list
		  $("#btn-list").prepend(btn);
		}
	}

	// Function that updates HTML with the gifs of the selected topic
	function displayGifs(){
		$("#gif-content").empty();
		
		// update search term with clicked button value
		let searchTerm = $(this).val();

		// Query the api for selected content
		let queryURL = "https://api.giphy.com/v1/gifs/search?api_key="+APIKEY+"&q="+searchTerm+"&limit=10";    
	    $.ajax({
	      url: queryURL,
	      method: "GET"
	    }).done(function(response) {
	    	let results = response.data;

	    	// Loop through results array and construct HTML containing gifs
	    	for (let i = 0; i < results.length; i++){
	    		// Create Div to store elements of gif to be displayed
		        let gifDiv = $("<div>").addClass("thumbnail");

		        // Create p element to store the rating from API
		        let p = $("<p>").addClass("caption").text("Rating: " + results[i].rating);

		        // Create image element to store the still and animated gif url from API
		        let gifImage = $("<img>").addClass("gif");
		        gifImage.attr("src", results[i].images.fixed_width_still.url);
		        gifImage.attr("src-alt", results[i].images.fixed_width.url);

		        // Attach image and paragraph elements to the gifDiv and then to gif-content of HTML
		        gifDiv.append(gifImage).append(p);
		        $("#gif-content").prepend(gifDiv);
	    	};
	    });
	}

	// Function that toggles the source of the image between still and animated
	function togglePlay(){
		let temp = $(this).attr("src");
		$(this).attr("src", $(this).attr("src-alt"));
		$(this).attr("src-alt", temp);
	}

	// Function that returns true if topic already exists in topic array. False, otherwise.
	function topicExists(userInput){
		for(var i = 0; i < topic.length; i++){
			if(userInput === topic[i]){
				return true;
			}
		}
		return false;
	}

	// Event handler for user adding a topic from the form input
	$("#add-topic").on("click", function(event){
		// Prevent button from submitting the form
		event.preventDefault();
		let newTopic = $("#topic-input").val().trim();
		
		// Only add topic if it doesn't already exist or isn't empty
		if(newTopic !== "" && !topicExists(newTopic)) {
			topic.push(newTopic);
			renderButtons();
		}
	});

	// Delegated event handlers for displaying and playing gifs
	$(document).on("click", ".btn-topic", displayGifs);
	$(document).on("click", ".gif", togglePlay);

renderButtons();
}); // end .ready() handler
