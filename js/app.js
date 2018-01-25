/*
 * Create a list that holds all of your cards
 */

 const cards = [
 'fa-bicycle',
 'cube',
 'leaf',
 'anchor',
 'paper-plane-o',
 'bolt',
 'bomb',
 'diamond'
];

//calling my card elements

const $game = document.getElementById('game');
const $card = document.getElementsByClassName('card');
const $start = document.getElementById('restart');
const $deck = document.getElementById('deck');
const $moves = document.getElementById('moves');
const $startLabel = document.getElementById('start-label');
const $oneStar = document.getElementById('one-star');
const $twoStar = document.getElementById('two-star');
const $threeStar = document.getElementById('three-star');
const $timer = document.getElementById('timer');
const $stars = document.getElementById('stars');


const $openCards = [];
let moves = 0;
let matches = 0;
let isRestart = true;
let isFirstGame = true;
let seconds = -1;
let minutes = 0;
let timerEvent;
let firstMoveMade = false;

//Starting the game
function initGame() {
     $startLabel.classList.add('shown');
     console.log('initGame working.');
     };

  // Add one event listener to deck element
  $deck.addEventListener("click", () => {
    console.log("I flipped a card.");
    flipCard();
  });


/*
 * Build the first deck when app is started
 */
function prepareNewDeck() {
    let randomCards = getRandomCards();

    const $deckFragment = document.createDocumentFragment();

    for (const card of randomCards) {
        const $newElement = document.createElement('li');
        $newElement.classList.add('card');
        $newElement.classList.add('card-container');
        //populating the sorted cards with images. do i need to get images?
        $newElement.innerHTML = `<div class="card-flip">
                              <img class="back"><i class="fa fa-${card}"></i></div>
                              <div class="front escale"><i class="fa fa-question-circle-o"></i></div>
                            </div>`

        $deckFragment.appendChild($newElement);
    }

    $deck.style.display = 'none';

    $deck.appendChild($deckFragment);
    $deck.style.display = null;

    // Cache the cards
    $cards = document.getElementsByClassName('card-flip');
}

/*
 * Rebuild deck when game is re-started
 */
function rebuildDeck() {
    moves = -1;
    matches = 0;
    firstMoveMade = false;
    resetStars();
    updateMoves();

    let $cards = document.getElementsByClassName('card-flip');
    let randomCards = getRandomCards();
    let i = 0;
    for (const $card of $cards) {
        if ($card.classList.contains('flipped')) $card.classList.remove('flipped');
        $card.dataset.card = randomCards[i];
        setTimeout(setImageSource, 150, $card, randomCards[i]);
        ++i;
    }
};


/*
 * Display the cards on the page
 */
function displayCards() {
    setTimeout(function() {
        if (isFirstGame) {
            prepareNewDeck();
            isFirstGame = false;
            $game.classList.add('shown');
        } else rebuildDeck();
        displayMessage('<p class="type-writer">Starting new game.</p>', true, true);
    }, 300);
}

// Flipping the card This is not working.
function flipCard($element) {
    $element.classList.contains('shown open flipped avoidClick');
    updateMoves();
}

//Add element to open card plus conditional logic for matching.
function addToOpenCards($element) {
    $openCards.push($element);
    if ($openCards.length > 1) checkCardMatch();
}

//checking to see if the cards match.
function checkCardMatch() {
    if ($openCards[0].dataset.card !== $openCards[1].dataset.card) {
        setTimeout(function() {
            unflipCards();
            setTimeout(function() { $openCards = []; }, 400);
        }, 700);
    } else {
        setTimeout(function() {
            $openCards = [];
            ++matches;
            if (matches == 8) {
                wonGame();
            }
        }, 400);
    }

    updateMoves();
}

/*
 * Display winning message
 */
function wonGame() {
    stopTimer();
    let starHTML = `${$stars.innerHTML.replace(/<li>/g, '').replace(/<\/li>/g, '')}`;
    displayMessage(`<p class="type-writer">You did it! <strong>${minutes}:${seconds < 10 ? '0' : ''}${seconds}</strong> secs ${starHTML}</p>`);
    };


//functions to do things

//hide cards after click if no match
function unflipCards() {
  $openCards[0].classList.remove('flipped');
  $openCards[1].classList.remove('flipped');
}

//count the number of moves and apply to star rating

function updateMoves() {
  ++moves;
  $moves.innerText = moves;
  checkStars();
}

function checkStars() {
  if (moves >= 12) {
    $threeStar.classList.add('fa-star-o');
  }
  if (moves >= 18) {
      $twoStar.classList.add('fa-star-o');
  }
}

/*
 * Reset the star display
 */
function resetStars() {
    $threeStar.classList.remove('fa-star-o');
    $twoStar.classList.remove('fa-star-o');
}



/*
* Create array with the card order
*/
function getRandomCards() {
   let shuffledCards = shuffle(cards).slice(0, 8);
   return shuffle([...shuffledCards, ...shuffledCards]);
}


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

    return array;
}

/*
     * Update timer in the screen
     */
    function updateTimer() {
        ++seconds;
        if (seconds == 60) {
            ++minutes;
            seconds = 0;
        }

        $timer.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    /*
     * Reset the timer
     */
    function resetTimer() {
        seconds = -1;
        minutes = 0;
    }

    /*
     * Stop the timer
     */
    function stopTimer() {
        if (timerEvent) clearInterval(timerEvent);
    }

    /*
     * Start the timer
     */
    function startTimer() {
        stopTimer();
        timerEvent = setInterval(function() { updateTimer() }, 1000);
    }

    setTimeout(function() { initGame(); }, 500);

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
