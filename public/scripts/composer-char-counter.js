$(document).ready(function() {
  console.log('document loaded!!!')
})

const textarea = document.getElementById("tweet-text-area")

$(textarea).on("input", function() {
  let tweetCharsLeft = 140 - $(this).val().length;
  let characterCounter = $(this).closest('.tweet-input').next('.submit-counter').find('output');

  if (tweetCharsLeft < 0) {
    characterCounter.addClass('no-chars-left');
  } else if (tweetCharsLeft >= 0) {
    characterCounter.removeClass('no-chars-left');
  }

  characterCounter.text(tweetCharsLeft);
});


