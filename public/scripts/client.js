/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const { render } = require("timeago.js")


$(document).ready( function() {
  
  // const tweetData = {
  //   user: {
  //     name: "Newton",
  //     avatars: "https://i.imgur.com/73hZDYK.png",
  //     handle: "@SirIsaac"
  //   },
  //   content: {
  //     text: "If I have seen further it is by standing on the shoulders of giants"
  //   },
  //   created_at: 1461116232227

  // }

  // const tweetPostTime = format(Date.now() - 11 * 1000 * 60 * 60)
  
  
  // const renderNewTweet = (tweetObj) => {
    //   const $tweetElement = createTweetElement(tweetObj)
    //   $('.all-tweets-container').prepend($tweetElement)
    // }

    const renderTweets = (tweetObjArr) => {
      $('.all-tweets-container').empty()
      for (tweeterUserObj of tweetObjArr) {
        const $tweetElement = createTweetElement(tweeterUserObj)
        $('.all-tweets-container').prepend($tweetElement)
        console.log(tweeterUserObj)
      }
    }
    
    const escape = function(str) {
      let div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML
    }

  const createTweetElement = (data) => {
    console.log(data)
    
    return `
    <section class="tweets-list">
          <article class="tweets-list-container">
            <header class="tweets-list-header">
              <div class="tweets-name-display">
                <img src=${data["user"]["avatars"]}/>
                <p class="tweet-nickname">
                  ${data.user.name}
                </p>
              </div>
  
              <p class="tweet-username">
                ${data.user.handle}
              </p>
            </header>
            
            <div class="tweet-body">
              <p>
              ${escape(data.content.text)}
              </p>
            </div>
  
            <footer>
              <p class="tweet-date">
                 ${timeago.format(data.created_at)}
              </p>
              <div class="tweet-icons">
                <i class="fa-solid fa-flag"></i>
                <i class="fa-solid fa-retweet"></i>
                <i class="fa-solid fa-heart"></i>
              </div>
            </footer>
          </article>
        </section>
    `
  }

  const loadTweets = $.get('/tweets', function(data) {
     renderTweets(data);
  }, 'json');
  
  
  loadTweets;

  $('#tweet-form').submit(function(event) {
    event.preventDefault()
    const tweetFormData = $('#tweet-form').serialize()
    // console.log($('#tweet-form').serialize())
    let tweetTextField = $('#tweet-text-area').val();

    if (tweetTextField === "") {
      return $('.validation-error').text('Text field cant be empty!').slideDown()
    } else if (tweetTextField.length > 140) {
      return $('.validation-error').text('You are over the character limit!').slideDown()
    }

    $.post('/tweets', tweetFormData, function(responseData) {
      // console.log(responseData)

      $.get('/tweets', function(res) {
        renderTweets(res)
        $('#tweet-text-area').val('')
      })
      
      
      $('.validation-error').slideUp()
      
    })

    // $.get('/tweets', function(resData) {
    //   const newTweet = resData[resData.length - 1]
    //   renderNewTweet(newTweet)
    //   // console.log(newTweet.user.name)
    // })


  })


  // const $form = $('#tweet-form');
  // const formData = $form.serialize();

  


  // const $tweet = createTweetElement(tweetData);
  
  // console.log($tweet)
  // $('.all-tweets-container').append($tweet)

})