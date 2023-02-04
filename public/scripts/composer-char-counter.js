$(document).ready(function () {
  $("#tweet-text").on("keyup", function () {
    let inputLength = $(this).val().length;
    let maxCount = 140;
    let charRemaining = maxCount - inputLength;

    $(".counter").html(charRemaining);
  });
});
