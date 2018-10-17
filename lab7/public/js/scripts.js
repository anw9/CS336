$(document).ready(function () {
//on button push a new div with italic text will be printed bellow the button
$('#btt').on('click', function () {

  $.ajax({
    url: "/hello",
    type: "GET",
    data: {
      name: "lab07-AJAX"
    }


  })
  .done(function(result){
    console.log('AJAX request succeeded...');
    $("#btt").next("div").html("<p>" + result.content + "</p>");
  })

  .fail(function(xhr, status) {
    alert( "Sorry, there was a problem!" );
    console.log( "Error: " + errorThrown );
  })
});
});
