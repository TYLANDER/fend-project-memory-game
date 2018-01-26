/*
 * Create a list that holds all of your cards
 */

 const cardOrder = [
 'fa fa-diamond',
 'fa fa-paper-plane-o',
 'fa fa-btc',
 'fa fa-bolt',
 'fa fa-cube',
 'fa fa-anchor',
 'fa fa-leaf',
 'fa fa-bicycle',
 'fa fa-diamond',
 'fa fa-paper-plane-o',
 'fa fa-anchor',
 'fa fa-bolt',
 'fa fa-cube',
 'fa fa-btc',
 'fa fa-leaf',
 'fa fa-bicycle'
  ];

//calling my card elements

let openCards = [],
move = 0,
matchedCards = 0,
restartTracker = 0,
time,
duration,
gameTime = 0;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    $('.card').each(function(index) {
       $(this).append('<i class= "'+ array[index] + '"></i>');
    });

    return array;
};

/*
 * Reads the move variable value and displays number of user moves
 *   - Each time a user reaches 10 moves, they lose a rating (display star removed)
 */
function trackScore() {
  if (move === 1) {
    $('.moves').html(move+" Move");

  } else {
    $('.moves').html(move+" Moves");
  }

  if (move === 12 || move === 20) {
    $('.stars').children(':first').addClass('animated pulse');

    setTimeout(function() {
      $('.stars').children(':first').remove();
      }, 1000);
  }
}

/*
 * If there is a match, set the 'card' class to .match
 *   - Remove .clicked
 *   - Once all cards are matched (matchedCards = 16), produce the modal
 *   - Empty array on clicked cards
 *   - Update score (moves + rating)
 *   - Adds Modal for win condition
 *   - Animation courtesy of aninimate.css: https://daneden.github.io/animate.css/
 */

function match(array, item) {
  $("."+item).parent().addClass('match bounce').removeClass('clicked');

  setTimeout(function() {
      $('.'+value).parent().css({'transition': '', 'transform': ''});
      }, 1600);

  array.splice(0, 2);

  matchedCards = matchedCards + 2;

  if (matchedCards === 16) {
    addModal();
  }

  trackScore();
}

/*
 * Logic If the cards don't match, set background color (via .clicked class)
 *   - Remove transition, transform and bg-color on specific intervals
 *   - Empty array of clicked cards
 *   - Update score (moves + rating)
 */
function noMatch(array, item) {
  $.each(array, function(index, value) {
    setTimeout(function() {
      $('.clicked').css({'background-color': 'red'})
      .addClass('animated swing');
      }, 600);

    setTimeout(function() {
      $('.'+value).parent().removeClass('open show animated rotateIn swing')
      .css({'background-color': ''});
      array.splice(0, 2);
      }, 1100);

    setTimeout(function() {
      $('.'+value).parent().css({'transition': '', 'transform': ''})
      .removeClass('clicked');
      }, 1600);
  });

  trackScore();
}

/*
 * Logic: When two .cards are clicked on, check to see if there is a match or not
 *   - Remove transition, transform and bg-color on specific intervals
 *   - Empty array of clicked cards
 */
function matchChecker(array, item) {
  array.push(item);

  if (array.length === 2) {
    move++;

    if (array[0] === item) {
      match(array, item);

    } else {
      noMatch(array, item);
    }
  }
}

  /*
   * Restart game
   *   - Removes li items of .deck
   *   - Shuffles and rebuilds deck .li
   *   - Reset move, matchedCards, openCards and time counters
   */
  function restart() {

    matchedCards = 0;

    $('.card').empty()
    .removeClass('open show clicked match animated bounce');

    shuffle(cardOrder);

    $('.moves').html("");

    if (move >= 20) {
      $('.stars').append('<li><i class="fa fa-star"></i></li>');
      $('.stars').append('<li><i class="fa fa-star"></i></li>');

    } else if (move >= 12) {
      $('.stars').append('<li><i class="fa fa-star"></i></li>');

    }

    move = 0;
    restartTracker = 1;
    time = new Date();
    openCards.splice(0, 2);
  }

  /*
   * Produce the modal overlay that displays final score, time and play again button
   *   - Add HTML for modal overlay
   *   - Display time and rating
  Sweet Alert from https://sweetalert.js.org/guides/#getting-started/
  */
  function addModal() {
    let modalDuration = duration;

    $('.time-counter').css({'display': 'none'});

    swal({
      title: 'Nice Work!',
      text: 'You matched all of the cards.',
      content: '.overlay-text-rating',
      icon: 'success',
      button: 'Play Again',
    });

    $('.swal-text').append('<h1 class= "overlay-text time">Completion Time: '+ modalDuration + ' Seconds</h1>');
    $('.swal-text').append('<h1 class= "overlay-text rating">Your Rating:  </h1>');

    $('.fa-star').each(function() {
      $('.rating').append('<span><i class="fa fa-star"></i></span>');
    });

    $('.swal-button').addClass('reset-button');

    $('.reset-button').click(function(){
      restart();
    });
  }

  /*
   * Event .card click
   *   - Add classes .open, .show, .clicked
   *   - Add rotate transformation with transition
   */
  const cardFlip = function(target) {
    $(target).addClass('open show clicked animated rotateIn')
    .css({'transition': '200ms linear all'});
  };

  /*
 * Create a new date and round up to be used in time display
 * Wrie time HTML
 */
function startTimer() {
  setInterval(function() {
    gameTime = Math.ceil((new Date() - time) / 1000);
    $('.time-counter').html("Your Time: " + gameTime);
    }, 1000);
}

/*
 * When the document is ready, call the following:
 *   - Shuffle function for randomizing card order
 *   - On the first click within .deck, start the time counter
 *   - event listener for .cards:
 *      - Only occurs if the card isn't already in the openCards array and only when the array is < 2
 *      - Check for a match or not
 *      - Check the interval between time start and current time, rounded to whole number
 *   - Event listeners for restart icon (body) and play again button (modal)
 */
$(document).ready(function() {

  shuffle(cardOrder);

  startTimer();

  setTimeout(function() {
    $('.score-panel').removeClass('animated bounce');
    }, 2000);

  $('.deck').one('click', function() {
    time = new Date();
    setTimeout(function() {
      $('.time-counter').removeClass('hide');
    }, 1000);
  });

  $('.card').click(function() {
    if (restartTracker === 1) {
      time = new Date;

      setTimeout(function() {
        $('.time-counter').removeClass('hide');
        }, 1000);

      restartTracker = 0;
    }

    if ($(this).hasClass('clicked') === false && $(this).hasClass('match') === false && openCards.length < 2) {
      $('.this').on('click', cardFlip(this));

      let classClicked = $(this).children(':first').attr('class').slice(3);

      matchChecker(openCards, classClicked);

    } else {
      return false;
    }

    setInterval(function() {
      duration = Math.ceil((new Date() - time) / 1000);
      }, 1000);
  });

  $('.restart').click(function() {
    $('.time-counter').addClass('hide');
    $('.moves').css({'display': 'none'});

    swal({
      title: "Game Reset",
      icon: "warning",
    });

    $('.swal-button').click(function() {
      restart();

    $('.moves').css({'display': ''});
  });
 });
});


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


//TS: I'm not sure how to write the if/else statemetn for matching two cards. I'm not sure how to call a matching statement that works for all card symbols.
