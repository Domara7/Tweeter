$(document).ready(function () {
  $("#tweet-text").on("keyup", function () {
    let inputLength = $(this).val().length;
    let maxCount = 140;
    let countLimit = maxCount - inputLength;

    $(".counter").html(countLimit);

    if (countLimit < 0) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "black");
    }
  });
});
