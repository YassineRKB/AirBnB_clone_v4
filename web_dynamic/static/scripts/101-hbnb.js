$(document).ready(function() {
  //// vars ////
  let amenity_list = [];
  let states_list = [];
  let cities_list = [];
  let locations_list = [];

  //// event handlers ////
  // api status
  $.get("http://localhost:5001/api/v1/status/", function(data, textStatus) {
      if (data.status === "OK")
          $("#api_status").addClass("available")
      else
          $("#api_status").removeClass("available")
  })
  // evenet listner for amenities checkboxes
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
  // evenet listner for locations checkboxes: states
  $(document).on('change', ".locations > .popover > ul > li > h2 > input[type='checkbox']", function () {
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
  // evenet listner for locations checkboxes: cities
  $(document).on('change', ".locations > .popover > ul > li > ul > li > input[type='checkbox']", function () {
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
  // evenet listner for show/hide reviews span button
  $(document).on('click', '.toggle-review', function () {
    const aplaceId = $(this).closest('.reviews').data('place');
    fetchReviews(aplaceId);
  });

  //// ajax requests and functions ////
  // loading default content
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
            <div class="reviews" data-place="${place.id}">
                <h2 class="article_subtitle">
                  Reviews
                  <span class="article_subtitle_span toggle-review">Show</span>
                </h2>
                <ul></ul>
            </div>
            </article>
        `);
      }
    }
  });
  // loading filtered content
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
            <div class="reviews" data-place="${place.id}">
                <h2 class="article_subtitle">
                  Reviews
                  <span class="article_subtitle_span toggle-review">Show</span>
                </h2>
                <ul></ul>
            </div>
          </article>
        `);
        }
      }
    });
  });
  // function to fetch reviews, triggered by event handler
  function fetchReviews(placeId) {
    const $reviews = $(`.reviews[data-place="${placeId}"]`);
    const $toggleReview = $reviews.find('.toggle-review');

    if ($toggleReview.text() === 'Show') {
      $.getJSON(
        `http://localhost:5001/api/v1/places/${placeId}/reviews`,
        (data) => {
          $reviews.find('h2').html(`${data.length} Reviews<span class="article_subtitle_span toggle-review">Hide</span>`);
          const $ul = $reviews.find('ul');
          data.forEach((r) => {
            $.getJSON(
              `http://localhost:5001/api/v1/users/${r.user_id}`,
              (u) => {
                $ul.append(`
                  <li>
                    <h3>From ${u.first_name} ${u.last_name} on ${r.created_at}</h3>
                    <p>${r.text}</p>
                  </li>`);
              },
              'json'
            );
          });
        },
        'json'
      );
    } else {
      $reviews.find('h2').html('Reviews<span class="article_subtitle_span toggle-review">Show</span>');
      $reviews.find('ul').empty();
    }
  }
  
});

