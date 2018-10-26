//Arie Williams
//Oct. 24 2018

$(document).ready(function () {

$( '#addform' ).submit(function( event ) {
  event.preventDefault();

  var form = $( this );

  $.ajax({
    type: 'POST',
    url: '/people',
    data: form.serialize(),
    dataType: 'json',
    success: function( resp ) {
      console.log( resp );
    }
  });
});

$('#getform').submit(function(event ) {
  event.preventDefault();
  var form = $(this);

  $.ajax({
    url: "/person/" + $("#workID").val(),
    type: "GET",
    data: {
      name: "hw2-getPerson",
    },
    //if it runs than put the result data into a new <p> tag
    success: function(result){
      console.log('AJAX request succeeded...');
      $("#getform").next("div").html("<p>" + "Name: " +result.msg.firstName + " " + result.msg.lastName +" </p>" + "<p>" + "workID: " + result.msg.workID + "</p>" + "<p>" + " Start Date: " + result.msg.startDate + "</p>");
    }
  })
//if it fails send error message
  .fail(function(xhr, status){
    alert("Sorry couldn't retrieve this ID");
    console.console.log("Error: " + errorThrown);
  })
});

});
