/*
 * Create a list that holds all of your cards
 */
 //TS: in this i'm calling the deck class and trying to shuffle its contents. But I don't know how to turn the card elements into an array.
const decklist = document.getElementsByClassName('deck').onsubmit => shuffle();
//TS:calling the card class so I have it in this JS doc.
const card = document.getElementsByClassName('card');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
//TS:shuffle the list of cards ¯\_(ツ)_/¯
function displayCards() {
  for (let i = 0; i < decklist.length; i++) {
    decklist.appendChild(card)
    card.style.shuffle('fa');
  }
};


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
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
decklist.card.onclick => {
  displaySymbol(this);
};

const displaySymbol = card => {
  const symbol = card.classList.add('fa-');
}

//TS: I'm not sure how to write the if/else statemetn for matching two cards. I'm not sure how to call a matching statement that works for all card symbols.
