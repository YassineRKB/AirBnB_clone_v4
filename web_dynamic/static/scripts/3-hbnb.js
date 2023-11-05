$(document).ready(function() {
	$.get("http://localhost:5001/api/v1/status/", function(data, textStatus) {
		if (data.status === "OK")
			$("#api_status").addClass("available")
		else
			$("#api_status").removeClass("available")
	})

  let amenity_list = [];
  $(document).on('change', ".amenities > .popover > ul > li > input[type='checkbox']", function () {
    if (this.checked) {
        amenity_list[$(this).data('id')] = $(this).data('name');
    } else {
        delete amenity_list[$(this).data('id')];
    }
    let list = Object.values(amenity_list);
    if (list.length > 0) {
        $('div.amenities > h4').text(Object.values(amenity_list).join(', '));
    } else {
        $('div.amenities > h4').html('&nbsp;');
    }
});
  /* $("INPUT").change(function() {
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
  }) */
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search',
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
                <div class="price_by_night">
                  <p>$${place.price_by_night}</p>
                </div>
            </div>
            <div class="information">
              <div class="max_guest">
                ${place.max_guest} Guest(s)
              </div>
              <div class="number_rooms">
                ${place.number_rooms} Bedroom(s)
              </div>
              <div class="number_bathrooms">
                ${place.number_rooms} Bathroom(s)
              </div>
            </div>
            <div class="description">
              <p>${place.description}</p>
            </div>
          </article>
        `);
      }
    }
  });
});
