// get a random index from an array given it's size
const getRandomIndex = (size) => Math.floor(Math.random() * size);

// cards is an array of card objects
const shuffleCards = (cards) => {
  // loop over the entire cards array
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    // select a random position from the deck
    const randomIndex = getRandomIndex(cards.length);

    // get the current card in the loop
    const currentItem = cards[currentIndex];

    // get the random card
    const randomItem = cards[randomIndex];

    // swap the current card and the random card
    cards[currentIndex] = randomItem;
    cards[randomIndex] = currentItem;
  }

  // give back the shuffled deck
  return cards;
};

const makeDeck = () => {
  // create the empty deck at the beginning
  const newDeck = [];
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  const suitSymbols = ['♥️', '♦️', '♣️', '♠️'];
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // make a variable of the current suit
    const currentSuit = suits[suitIndex];
    const currentSuitSymbol = suitSymbols[suitIndex];
    console.log(`current suit: ${currentSuit}`);
    console.log(`current suitSymbol: ${currentSuitSymbol}`);

    // loop to create all cards in this suit
    // rank 1-13
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // Convert rankCounter to string
      let cardName = `${rankCounter}`;
      let cardDisplay = `${cardName}`;
      // 1, 11, 12 ,13
      if (cardName === '1') {
        cardName = 'ace';
      } else if (cardName === '11') {
        cardName = 'jack';
      } else if (cardName === '12') {
        cardName = 'queen';
      } else if (cardName === '13') {
        cardName = 'king';
      }

      if (cardDisplay === '1') {
        cardDisplay = 'A';
      } else if (cardDisplay === '11') {
        cardDisplay = 'J';
      } else if (cardDisplay === '12') {
        cardDisplay = 'Q';
      } else if (cardDisplay === '13') {
        cardDisplay = 'K';
      }

      // make a single card object variable
      const cardInfo = {
        suitSymbol: currentSuitSymbol,
        name: cardName,
        suit: currentSuit,
        display: cardDisplay,
        rank: rankCounter,
      };

      console.log(`rank: ${rankCounter}`);

      // add the cardInfo to the deck
      newDeck.push(cardInfo);
    }
  }

  return newDeck;
};

const createCard = (cardInfo) => {
  const card = document.createElement('div');
  card.classList.add('card');

  const suit = document.createElement('div');
  suit.classList.add('suit');
  suit.innerText = cardInfo.suitSymbol;

  const name = document.createElement('div');
  name.classList.add('name');
  name.innerText = cardInfo.display;

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

// global variables
const deck = shuffleCards(makeDeck());

let playersTurn = 1; // matches with starting instructions
let player1Card;

const player1Button = document.createElement('button');
player1Button.classList.add('button1');

const player2Button = document.createElement('button');
player2Button.classList.add('button2');

const gameInfo = document.createElement('div');

let cardContainer;

let canClick = true;

const output = (message) => {
  gameInfo.innerText = message;
};

// callback functions
const player1Click = () => {
  if (playersTurn === 1 && canClick === true) {
    canClick = false;

    setTimeout(() => {
      player1Card = deck.pop();

      const cardElement = createCard(player1Card);

      cardContainer.innerHTML = '';
      cardContainer.appendChild(cardElement);

      output('It is player 2 turn. Player 2, click on the player 2 button');

      playersTurn = 2;
      canClick = true;
    }, 2000);
  }
};

const player2Click = () => {
  if (playersTurn === 2 && canClick === true) {
    canClick = false;

    setTimeout(() => {
      const player2Card = deck.pop();

      const cardElement = createCard(player2Card);

      cardContainer.appendChild(cardElement);

      playersTurn = 1;
      canClick = true;

      if (player1Card.rank > player2Card.rank) {
        output('player 1 wins');
      } else if (player1Card.rank < player2Card.rank) {
        output('player 2 wins');
      } else {
        output('tie');
      }
    }, 2000);
  }
};

// beginning of game logic
const initialiseGame = () => {
  // starting instructions set out in gameInfo
  gameInfo.innerText = 'Its player 1 turn, click on player 1 button to draw a card';
  document.body.appendChild(gameInfo);

  cardContainer = document.createElement('div');
  cardContainer.classList.add('container');

  document.body.appendChild(cardContainer);

  // initialise both players' buttons
  player1Button.innerText = 'Player 1';
  document.body.appendChild(player1Button);
  player1Button.addEventListener('click', player1Click);

  player2Button.innerText = 'Player 2';
  document.body.appendChild(player2Button);
  player2Button.addEventListener('click', player2Click);
};

initialiseGame();
