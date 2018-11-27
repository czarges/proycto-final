$.ajax({
	url: 'https://randomuser.me/api/?results=50',
	type: 'GET',
	dataType: 'json',
})
.done(function(data) {
	console.log(data);

	var user = $ ('user')
	var profile = data.results[0]

	user.children('.user_picture').attr('src',profile.picture.large)
	user.children ('.user_name').text(profile.name.first + ' ' + profile.name.last)
	user.children ('.user_email').attr ('href', 'mailto:' + profile.email).text(profile.email)
	user.children ('.user_phone').text(profile.phone)
})
.fail(function() {
	console.log("error");
})
.always(function(data) {
	console.log("data");
});
