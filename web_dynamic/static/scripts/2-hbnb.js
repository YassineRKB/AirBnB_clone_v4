$(document).ready(function() {
	$.get("http://localhost:5001/api/v1/status/", function(data, textStatus) {
		if (data.status === "OK")
			$("#api_status").addClass("available")
		else
			$("#api_status").removeClass("available")
	})

  let amenity_list = [];
  $("INPUT").change(function() {
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
