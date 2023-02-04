/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.

$(document).ready(function () {
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  const renderTweets = (tweets) => {
    $("#tweets-container").empty();

    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $("#tweets-container").prepend($tweet);
    }
  };

  const createTweetElement = (data) => {
    return `
        <article>
          <header class="profile">
            <div class="picture-name">
              <img src=${data.user.avatars} />
              <p>${data.user.name}</p>
            </div>
            <div class="name-handle">${data.user.handle}</div>
          </header>
          <p class="tweet-body">
            ${escape(data.content.text)}
          </p>
          <footer class="footer">
            <div class="days">${timeago.format(data.created_at, "en_US")}</div>
            <div class="icons">
              <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-heart"></i>
            </div>
          </footer>
        </article>
  `;
  };

  $("#tweet-form").submit(function (event) {
    const formData = $(this).serialize();

    let inputLength = $(".counter").val();

    if (inputLength < 0) {
      alert("Cannot sumbit form");
    } else {
      $.post("/tweets", formData).done(function (data) {
        console.log(data);
        $("#tweet-text").val("");
        $(".counter").val("140");
        loadTweets();
      });
    }
    event.preventDefault();
  });

  const loadTweets = () => {
    $.ajax({
      url: "/tweets",
      method: "get",
      success: function (data) {
        renderTweets(data);
      },
    });
  };
  loadTweets();
});
