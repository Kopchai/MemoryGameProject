let card1 = ''; // The former
let card2 = ''; // The latter
let card1Parent = '';
let card2Parent = '';
let ready = true;
let cardCounter = 0;
let flip = 0;

document.querySelector(".restart").addEventListener("click", restart);
document.querySelector(".deck").addEventListener("click", cardOpen);
document.querySelector(".deck").addEventListener("click", startTimer);

// Unlocking clicked cards and comparing them

function cardOpen(evt) {
  //startTimer();
  if (evt.target.className == "card" && cardCounter != 2) {
	    evt.target.className += " open show";

    // Determines which card comes first in a unlocked pair of cards

    if (card1 == false) {
      card1 = evt.target.firstElementChild.className;
      card1Parent = evt.target;
      cardCounter = 1;
    } else {
      card2 = evt.target.firstElementChild.className;
      card2Parent = evt.target;
      cardCounter = 2;

      // Increasing the amount of moves

      document.querySelector(".moves").innerText = +document.querySelector(".moves").innerText + 1;

      // Rating system. Stars decrease depending on how many moves you've made

      if (document.querySelector(".moves").innerText == '15' || document.querySelector(".moves").innerText == '20') {
        document.querySelector(".fa-star").parentNode.removeChild(document.querySelector(".fa-star"));
      }

      // Card matching

      if (card1 == card2) {
        card1Parent.className = "card open match";
        card2Parent.className = "card open match";
        card1 = '';
        card2 = '';
        cardCounter = 0;
        flip += 2;

        //Check if Game is Over?

        if (flip == 16) {
          isOver();
        }

      } else {
        setTimeout(function () {
          evt.target.className = "card close"; card1Parent.className = "card close"}, 800);
        setTimeout(function () {
          evt.target.className = "card"; card1Parent.className = "card"; card1 = ''; card2 = ''; cardCounter = 0}, 1000);
      }
    }

    ready = false;

  }
}

// Rating system renewal

function returnStars() {
  while (document.getElementsByClassName("fa-star").length != 3) {
    var newStar = document.createElement("li");
    newStar.className = "fa fa-star";
    document.querySelector(".stars").appendChild(newStar);
  }
}

let timerContainer = document.querySelector(".timer");
let totalSeconds = 0;
timerContainer.innerHTML = totalSeconds + ' s';

function startTimer(){
  let liveTimer = setInterval(function(){
    totalSeconds++;
    timerContainer.innerHTML = totalSeconds + ' s';
  },1000);
}

// Resets all the progress you've made when you finish the game

function restart() {
  card1 = "";
  card2 = "";
	document.querySelector(".moves").innerText = '0';
	returnStars();
  let cards = Array.prototype.slice.call(document.querySelectorAll('.card'));
	cards = shuffle(cards);
	const deck = document.querySelector(".deck");

	for (let i = 0; i < cards.length; i++) {
		deck.appendChild(cards[i]);
		cards[i].className = "card";
	}
	totalSeconds = 0;
  timerContainer.innerHTML = totalSeconds + " s";
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

// Alert when you win:

function isOver() {
 let movesCount = document.querySelector(".moves").innerText;
 let starsCount = document.getElementsByClassName("fa-star").length;
 let timeCount = document.querySelector('.timer').innerHTML;
 alert("Congratulations! \nYou have won with " + movesCount + " moves and " + starsCount + " stars. \nYour Time: " + timeCount + "econds. \nDo you want to play again?");
 restart();
}

restart();
