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

	let amenity_list_names = [];
	let amenity_list_ids = [];
	$("INPUT").change(function () {
		if ($(this).is(":checked")) {
			amenity_list_names.push($(this).attr("data-name"))
			amenity_list_ids.push($(this).attr("data-id"))
		}
		else {
			let index = amenity_list_names.indexOf($(this).attr("data-name"));
			amenity_list_names.splice(index, 1)
			amenity_list_ids.splice(index, 1)
		}
		let formatted = amenity_list_names.join(", ");
		if (amenity_list_names.length > 0)
			$(".amenities h4").text(formatted)
		else
			$(".amenities h4").html("&nbsp;")
	})
	$("button").click(function() {
		$.ajax({
			type: 'POST',
			url: 'http://localhost:5001/api/v1/places_search',
			data: JSON.stringify({amenities: amenity_list_ids}),
			dataType: 'json',
			contentType: 'application/json',
			success: function (data) {
				$('.places').empty()
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
		
})});
