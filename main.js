//Part 1 -----> Step 1: Load Google Map
var currentLat = 36.05178307933835;
var currentLng = 42.49737373046878;
var currentLocation = new google.maps.LatLng(currentLat,currentLng);
var myOptions = {
				zoom: 3,
				center: currentLocation,
				mapTypeId: google.maps.MapTypeId.ROADMAP
};

var map = new google.maps.Map(document.getElementById("map"), myOptions);

var marker = new google.maps.Marker({
	position: currentLocation,
	title: "Current Location",
	icon: "blue_dot_circle.png"
});

marker.setMap(map);	

//Part 1 -----> Step 2: JSONP request to Eventful API
var script = document.createElement('script');
var key = "mGPb7CR5tNmWZtzK";
script.src = "http://api.eventful.com/json/events/search?c=music&app_key="+key+"&page_number=1&date=Future&keywords=linkin+park&callback=processJSONP"
document.getElementsByTagName('head')[0].appendChild(script);


var templateString = document.getElementById('page-template').innerHTML;
var templateFunction = Handlebars.compile(templateString);
var html = '';

function processJSONP(eventData){
	console.log(eventData);

	//Part 1 -----> Step 3: Plot map marker point for each event
	for(var i=0;i<eventData.events.event.length;i++){
		var markerLat = eventData.events.event[i].latitude;
		var markerLong = eventData.events.event[i].longitude;
		var markerLatLong = new google.maps.LatLng(markerLat,markerLong);
		var marker = new google.maps.Marker({
			position: markerLatLong,
			title: eventData.events.event[i].city_name
		});
		marker.setMap(map);

		var infowindow = new google.maps.InfoWindow({
					content: "<p><strong>City: </strong>" + eventData.events.event[i].city_name + "<p><strong> Time: </strong>" + eventData.events.event[i].start_time
		});
		google.maps.event.addListener(marker, 'click', function() {
					infowindow.open(map, marker);
		});


	//Part 3 ---> Client Template
		html = html + templateFunction(eventData.events.event[i]);
	};

		document.getElementById('concertList').innerHTML = html;
};

//Part 2 ---> part c) AJAX part
(function(){
	$('#feed').html('<img src="ajax-loader.gif">');
	$.ajax({
        url: 'load_tweets.php',
        success: function(response) {
        	$('#feed').html(response)
        },
        error: function(err1, err2, err3) {
			console.log(err1, err2, err3);
		}
	   });
})();