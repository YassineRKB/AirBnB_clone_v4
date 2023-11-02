$(document).ready(function() {
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
