$(function(){ // .ready() handler

// Topics array
let topic = ["bacon", "fail", "applause"];

// Create buttons for topics array


// onClick functionality for buttons


// onClick functionality for gifs


// form input to add to topics array


// remake buttons based on form input

	const API = "https://api.giphy.com"
    let search = topic[0];
    let queryURL = API+"/v1/gifs/search?q" + search ;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      console.log(response);
    
    });


}); // end .ready() handler