$(document).ready(function () {
//on button push a new div with italic text will be printed bellow the button
$('#btt').on('click', function () {
 $("<em>", {html: "No data to display yet..."}).appendTo("body");
});
});
