$(function(){ // .ready() handler

const API = "https://api.giphy.com"
const APIKEY = "4b2610846efe448fa64e5bbfd561d517";

// Topics array
let topic = ["high five", "fail", "applause"];

// Create buttons for topics array append to btn-list
// https://www.w3schools.com/howto/howto_css_button_group_vertical.asp
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

function displayGifs(){
	event.preventDefault();
	console.log(this);
	// update search term with clicked button value
	let search = $(this).val();
	let queryURL = "https://api.giphy.com/v1/gifs/search?api_key="+APIKEY+"&q="+search+"&limit=10";
    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .done(function(response) {
    	console.log(response);
    	let results = response.data;
    	// loop through results array and add each gif to screen
    	for (var i = 0; i < results.length; i++){
	        // Make a div with jQuery and store it in a variable named animalDiv.
	        // Make a paragraph tag with jQuery and store it in a variable named p.
	        // Set the inner text of the paragraph to the rating of the image in results[i].
	        // Make an image tag with jQuery and store it in a variable named animalImage.
	        // Set the image's src to results[i]'s fixed_height.url.
	        // Append the p variable to the animalDiv variable.
	        // Append the animalImage variable to the animalDiv variable.
	        // Prepend the animalDiv variable to the element with an id of gifs-appear-here.
            // var animalDiv = $("<div>");
            // var p = $("<p>");
            // p.text(results[i].rating);
            // var animalImage = $("<img>");
            // animalImage.attr("src", results[i].images.fixed_height.url);
            // animalDiv.append(p);
            // animalDiv.append(animalImage);
            // $("#gifs-appear-here").prepend(animalDiv);

    	};

    });
}


// form input to add to topics array
	$("#add-topic").on("click", function(event){
	// Preventing the submit button from trying to submit the form
    // We're optionally using a form so the user may hit Enter to search instead of clicking the button
    event.preventDefault();
    // Here we grab the text from the input box and trim off any white space
    let newTopic = $("#topic-input").val().trim();
    topic.push(newTopic);
    // remake buttons based on form input
    
	renderButtons();
	});


// onClick functionality for topic buttons
$(document).on("click", ".btn-topic", displayGifs);

// onClick functionality for gifs
$("#gif-content").on("click", function(){});

renderButtons();
}); // end .ready() handler
