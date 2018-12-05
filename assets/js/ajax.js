$.ajax({
	url: 'https://randomuser.me/api/?results=12',
	type: 'GET',
	dataType: 'json',
})
.done(function(data) {
	console.log(data.results);

	$.each( data.results, function( key, value ) {
		$('.user').append(`<li class="col-xs-12 col-sm-6 col-md-3">
	<img src="${value.picture.large}" class="user_picture" alt="">
	<h2 class="user_name">${value.name.first} ${value.name.last}</h2>

</li>`)
	});
})
.fail(function() {
	console.log("error");
});

var coords = {
 	valdivia: {
 		lat: -39.8142200,
 		lng: -73.2458900
 	},
 	frutillar: {
 		lat: -41.1267600,
 		lng: -73.0437200
 	},
 	santiago: {
 		lat: -33.4488897,
 		lng: -70.6692655
 	}
 };

var image = {
    'clear-day':'https://icons.wxug.com/i/c/v4/clear.svg',
    'clear-night':'https://icons.wxug.com/i/c/v4/nt_clear.svg',
    'partly-cloudy-day':'https://icons.wxug.com/i/c/v4/partlycloudy.svg',
    'partly-cloudy-night':'https://icons.wxug.com/i/c/v4/nt_hazy.svg',
    'cloudy':'https://icons.wxug.com/i/c/v4/cloudy.svg',
    'rain':'https://icons.wxug.com/i/c/v4/rain.svg'
  }

var map = null;
var marker = null;

function initMap() {
	var location = coords.santiago
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 13,
		center: location
	});

	marker = new google.maps.Marker({
		position: location,
		map: map
	});
}

var proxy = 'https://cors-anywhere.herokuapp.com/'
var url = 'https://api.darksky.net/forecast/';
var apiKey = 'e193913a8a2bab291b8999fae03fc8b7';
var queryParams = ['exclude=[minutely,flags]', 'lang=es', 'units=auto'];

$('#select').on('change', function() {
	map.setCenter(coords[$(this).val()]);
	marker.setMap(null);
	marker = new google.maps.Marker({
		position: (coords[$(this).val()]),
		map: map
	});

	$.ajax({
		url: proxy + url + apiKey + '/' + coords[$(this).val()].lat + ',' + coords[$(this).val()].lng + '?' + queryParams[0] + '&' + queryParams[1] + '&' + queryParams[2],
		method: 'GET',
		xhrFields: {cors: false}
	}).then(function(data) {
		console.log(data);
		$('#resumen').text(parseInt(data.currently.temperature) + '° ' + data.currently.summary);
		$('.img-responsive').attr('src',image[data.currently.icon]);
	});

});

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})


$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').focus()
})