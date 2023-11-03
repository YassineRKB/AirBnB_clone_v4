$(document).ready(function() {
    $.get("http://localhost:5001/api/v1/status/", function(data, textStatus) {
        if (data.status === "OK")
            $("#api_status").addClass("available")
        else
            $("#api_status").removeClass("available")
    })

  let amenity_list = [];
  let states_list = [];
  let cities_list = [];
  let locations_list = [];

  $(document).on('change', ".amenities > .popover > li > input[type='checkbox']", function () {
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
  $(document).on('change', ".locations > .popover > li > input[type='checkbox']", function () {
      if (this.checked) {
          states_list[$(this).data('id')] = $(this).data('name');
          locations_list[$(this).data('id')] = $(this).data('name');
      } else {
          delete states_list[$(this).data('id')];
          delete locations_list[$(this).data('id')];
      }
      let list = Object.values(locations_list);
      if (list.length > 0) {
          $('div.locations > h4').text(list.join(', '));
      } else {
          $('div.locations > h4').html('&nbsp;');
      }
  });
  $(document).on('change', ".locations > .popover > li > ul > li > input[type='checkbox']", function () {
      if (this.checked) {
          cities_list[$(this).data('id')] = $(this).data('name');
          locations_list[$(this).data('id')] = $(this).data('name');
      } else {
          delete cities_list[$(this).data('id')];
          delete locations_list[$(this).data('id')];
      }
      let list = Object.values(locations_list);
      if (list.length > 0) {
          $('div.locations > h4').text(list.join(', '));
      } else {
          $('div.locations > h4').html('&nbsp;');
      }
  });

 /*  $("INPUT").change(function() {
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
    url: 'http://localhost:5001/api/v1/places_search/',
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
  $('.filters > button').click(function () {
    $('.places > article').remove();
    $.ajax({
      type: 'POST',
      url: 'http://localhost:5001/api/v1/places_search/',
      data: JSON.stringify({
        'amenities': Object.keys(amenity_list),
        'states': Object.keys(states_list),
        'cities': Object.keys(cities_list)
      }),
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
});
