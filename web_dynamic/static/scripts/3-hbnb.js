$(document).ready(function () {
	$.ajax({
		type: 'POST',
		url: 'http://localhost:5001/api/v1/places_search',
		data: '{}',
		dataType: 'json',
		contentType: 'application/json',
		success: function (data) {
			for (let i = 0; i < data.length; i++) {
				let place = data[i];
				$('.places').append(`
				<article>
					<div class="title_box">
						<h2>${place.name}</h2>
						<div class="price_by_night">$${place.price_by_night}</div>
					</div>
					<div class="information">
						<div class="max_guest">${place.max_guest} Guest(s)</div>
							<div class="number_rooms">${place.number_rooms} Bedroom(s)</div>
							<div class="number_bathrooms">${place.number_rooms} Bathroom(s)</div>
					</div>
					<div class="description">${place.description}</div>
				</article>
			  `);
			}
		}
	})
	$.get("http://localhost:5001/api/v1/status/", function (data, textStatus) {
		if (data.status === "OK")
			$("#api_status").addClass("available")
		else
			$("#api_status").removeClass("available")
	})

	let amenity_list = [];
	$("INPUT").change(function () {
		if ($(this).is(":checked"))
			amenity_list.push($(this).attr("data-name"))
		else {
			let index = amenity_list.indexOf($(this).attr("data-name"));
			amenity_list.splice(index, 1)
		}
		let formatted = amenity_list.join(", ");
		if (amenity_list.length > 0)
			$(".amenities h4").text(formatted)
		else
			$(".amenities h4").html("&nbsp;")
	})
});
