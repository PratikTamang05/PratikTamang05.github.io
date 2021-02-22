'use strict';
// selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const curr0El = document.getElementById('current--0');
const curr1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0];
let currScore = 0;
let activePlayer = 0;
let playing = true;
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // 3 check if the rolled no is 1
    if (dice !== 1) {
      currScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currScore;
      //curr0El.textContent = currScore;
    } else {
      //Switch to next player
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Add current score to active player;
    scores[activePlayer] += currScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // check if score >=100
    if (scores[activePlayer] >= 20) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }
    //Switch the next player
    else switchPlayer();
  }
});
btnNew.addEventListener('click', function () {
  activePlayer = 0;
  playing = true;
  scores[0] = 0;
  scores[1] = 0;
  currScore = 0;
  document.getElementById('score--0').textContent = 0;
  document.getElementById('score--1').textContent = 0;
  document.getElementById('current--0').textContent = 0;
  document.getElementById('current--1').textContent = 0;
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
  if (player0El.classList.contains('player--winner'))
    player0El.classList.remove('player--winner');
  else player1El.classList.remove('player--winner');
});
