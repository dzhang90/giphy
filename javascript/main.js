

var keyword;
var inputBar;
var goButton;
var mainContainer;

inputBar = document.querySelector("input.js-userinput");
goButton = document.querySelector("button.js-go");
mainContainer = document.querySelector("div.js-container");

/* 1. Grab the input */


inputBar.addEventListener("keyup", pressEnter);
goButton.addEventListener("click", pressButton);

function pressEnter (e) {
	
	//13 = keycode for "enter"; if enter pressed, then...
	if (e.which === 13) {
		pressButton();
	}
}

function pressButton () {
	keyword = inputBar.value;
	clearContainer();
	callAPI (keyword);
}

/* 2. do the data stuff with the API */

function callAPI (keyword) {
	var replacedKeyword = keyword.replace (/ /g, "+");
	console.log(replacedKeyword);

	var url = "http://api.giphy.com/v1/gifs/search?q="+replacedKeyword+"&api_key=KTd7v1IMEny3trJNUogMzmiGVsykxksY";
	
	// AJAX request
	var GiphyAJAXCall = new XMLHttpRequest();
	GiphyAJAXCall.open ("GET", url);
	GiphyAJAXCall.send ();

	GiphyAJAXCall.addEventListener("load", function (e) {
		var data = e.target.response;
		pushTVToDOM(data);
	});

}


/* 3. Show me the GIFs */

function pushToDOM (value) {
	var response = JSON.parse(value);

	for (i = 0; i < response.data.length; i++) {
		var imageURL = response.data[i].images.fixed_height.url;
		var currentImage = document.createElement("IMG");
		currentImage.src = imageURL;
		currentImage.className = "container-image";
		mainContainer.appendChild(currentImage);
	}

}

function clearContainer () {
	var images = document.getElementsByTagName("img");
	var l = images.length;
	for (i = 0; i < l; i++) {
		images[0].parentNode.removeChild(images[0]);
	}
}


function pushToDOMAlt (value) {
	var response = JSON.parse(value);

	response.data.forEach (function (images) {
		var src = images.images.fixed_height.url;
		mainContainer.innerHTML += "<img src=\"" + src + "\" class=\"container-image\">"
	});
	
}


function pushTVToDOM (value) {
	var response = JSON.parse(value);
	var currentImage = document.createElement("IMG");
	currentImage.className = "container-TV";	

	for (let i = 0; i < response.data.length; i++) {		
		
		setTimeout (function () {
			clearContainer();
			var imageURL = response.data[i].images.fixed_height.url;
			console.log(i);
			console.log(response.data[i].images.fixed_height.url);
			currentImage.src = imageURL;
			mainContainer.appendChild(currentImage);	
			
			
		}, 3000*i);

		
	}


}