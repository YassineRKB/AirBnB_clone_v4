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
	$("INPUT#at").change(function () {
		if ($(this).is(":checked")) {
			amenity_list_names.push($(this).attr("data-name"))
			amenity_list_ids.push($(this).attr("data-id"))
		}
		else {
			let index_am = amenity_list_names.indexOf($(this).attr("data-name"));
			amenity_list_names.splice(index_am, 1)
			amenity_list_ids.splice(index_am, 1)
		}
		h4_setter(amenity_list_names, 'amenities')
	})

	let state_city_list_names = [];
	let state_list_ids = [];
	$("INPUT#st").change(function () {
		console.log($(this).attr("data-name"))
		if ($(this).is(":checked")) {
			state_city_list_names.push($(this).attr("data-name"))
			state_list_ids.push($(this).attr("data-id"))
		}
		else {
			let index_st = state_city_list_names.indexOf($(this).attr("data-name"));
			state_city_list_names.splice(index_st, 1)
			index_st = state_list_ids.indexOf($(this).attr("data-name"));
			state_list_ids.splice(index_st, 1)
		}
		h4_setter(state_city_list_names, 'locations')
	})

	let city_list_ids = [];
	$("INPUT#ct").change(function () {
		if ($(this).is(":checked")) {
			state_city_list_names.push($(this).attr("data-name"))
			city_list_ids.push($(this).attr("data-id"))
		}
		else {
			let index_ct = state_city_list_names.indexOf($(this).attr("data-name"));
			state_city_list_names.splice(index_ct, 1)
			index_ct = city_list_ids.indexOf($(this).attr("data-name"));
			city_list_ids.splice(index_ct, 1)
		}
		h4_setter(state_city_list_names, 'locations')
	})

	$("button").click(function() {
		$.ajax({
			type: 'POST',
			url: 'http://localhost:5001/api/v1/places_search',
			data: JSON.stringify({states: state_list_ids, cities: city_list_ids, amenities: amenity_list_ids}),
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
function h4_setter(list, where) {
		let formatted = list.join(", ");
		if (list.length > 0)
			$("." + where + " h4").text(formatted)
		else
			$("." + where + " h4").html("&nbsp;")

}
