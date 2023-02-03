/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function () {
  const renderTweets = (tweets) => {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $("#tweets-container").append($tweet);
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
            ${data.content.text}
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
    event.preventDefault();
    const formData = $(this).serialize();
    $.post("/tweets", formData).done(function (data) {
      console.log(data);
    });
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
