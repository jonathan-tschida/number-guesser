// Global Variables
var currentMin = 1;
var currentMax = 100;
var correctNumber = getRandomRange(currentMin, currentMax);
var gameCount = ["+", "+"];
// Query Selectors
// Set Range
var minRange = document.querySelector('#min-range');
var maxRange = document.querySelector('#max-range');
var errorMessage = document.querySelector('#error-message');
var updateButton = document.querySelector('#update-button');
// Guess Form
var minSpan = document.querySelector('#min-span');
var maxSpan = document.querySelector('#max-span');
var oneName = document.querySelector('#one-name');
var twoName = document.querySelector('#two-name');
var oneGuess = document.querySelector('#one-guess');
var twoGuess = document.querySelector('#two-guess');
var rangeErrorMessageOne = document.querySelector('#range-error-one');
var rangeErrorMessageTwo = document.querySelector('#range-error-two');
var submitButton = document.querySelector('#submit-button');
var clearButton = document.querySelector('#clear-button');
var resetButton = document.querySelector('#reset-button');
// Latest Guess
var oneChallenger = document.querySelector('#one-challenger');
var twoChallenger = document.querySelector('#two-challenger');
var oneLatestGuess = document.querySelector('#one-latest-guess');
var twoLatestGuess = document.querySelector('#two-latest-guess');
var oneFeedback =document.querySelector('#one-guess-feedback');
var twoFeedback =document.querySelector('#two-guess-feedback');
// Winner Card
var winnerBox = document.querySelector('#winner-card');
var outcomeNameOne = document.querySelector('#outcome-name-one');
var outcomeNameTwo = document.querySelector('#outcome-name-two');
var winnerName = document.querySelector('#winner-name');
var summaryGuesses = document.querySelector('#summary-guesses');
var closeButton = document.querySelector('#close-winner-output');
// var playerInputBox = document.querySelectorAll('.player-input-box');
// var errorIcon = document.querySelector('#range-error');

submitButton.disabled = true;
clearButton.disabled = true;
resetButton.disabled = true;
updateButton.disabled = true;

document.addEventListener('keyup', enableSubmit);
document.addEventListener('keyup', enableClear);
clearButton.addEventListener('click', clearInputs);
submitButton.addEventListener('click', updateLatestGuess);
updateButton.addEventListener('click', updateRange);
document.addEventListener('keyup', checkRange);
closeButton.addEventListener('click', closeWinnerOutput);
document.addEventListener('keyup', enableReset);
resetButton.addEventListener('click', resetGame);
minRange.addEventListener('click', checkRange);
minRange.addEventListener('keyup', checkRange);
maxRange.addEventListener('click', checkRange);
maxRange.addEventListener('keyup', checkRange);
document.addEventListener('keyup', rangeErrorCheckOne);
document.addEventListener('keyup', rangeErrorCheckTwo);

function getRandomRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function enableSubmit() {
  var hasOneName = oneName.value !== "";
  var hasTwoName = twoName.value !== "";
  var hasOneGuess = oneGuess.value !== "";
  var hasTwoGuess = twoGuess.value !== "";
  var isFilled = hasOneName && hasTwoName && hasOneGuess && hasTwoGuess;
  if (isFilled) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

function enableClear() {
  var hasOneName = oneName.value !== "";
  var hasTwoName = twoName.value !== "";
  var hasOneGuess = oneGuess.value !== "";
  var hasTwoGuess = twoGuess.value !== "";
  var isFilled = hasOneName || hasTwoName || hasOneGuess || hasTwoGuess;
  if (isFilled) {
    clearButton.disabled = false;
  } else {
    clearButton.disabled = true;
  }
}

// Re-using this function for now //
function clearInputs() {
  oneName.value = "";
  twoName.value = "";
  oneGuess.value = "";
  twoGuess.value = "";
  submitButton.disabled = true;
  clearButton.disabled = true;
}

function updateLatestGuess() {
  oneChallenger.innerText = oneName.value;
  twoChallenger.innerText = twoName.value;
  oneLatestGuess.innerText = oneGuess.value;
  twoLatestGuess.innerText = twoGuess.value;
  checkGuess(oneGuess, oneFeedback);
  checkGuess(twoGuess, twoFeedback);
  oneGuess.value = "";
  gameCount.push("+"); // oneGuess count
  twoGuess.value = "";
  gameCount.push("+"); // twoGuess count
  submitButton.disabled = true;
  clearButton.disabled = true;
  // resetButton.disabled = true; //reset button remain active becuase it is used to reset game at any time
}

function checkGuess(guessInput, feedbackMessage) {
  var currentGuess = parseInt(guessInput.value);
  if (currentGuess === correctNumber) {
    feedbackMessage.innerText = "BOOM!";
    // Function for updating Winner's Summary
    updateWinner();
    // clear guess form
    clearGuessForm();
    // create new rnadom correctNumber
    // newCorrectNumber();
    correctNumber = getRandomRange(currentMin, currentMax);
  } else if (currentGuess > correctNumber) {
    feedbackMessage.innerText = "that's too high";
  } else if (currentGuess < correctNumber) {
    feedbackMessage.innerText = "that's too low"
  } else {
    feedbackMessage.innerText = "something went wrong";
  }
}

function updateRange() {
  minSpan.innerText = minRange.value;
  maxSpan.innerText = maxRange.value;
  currentMin = parseInt(minRange.value);
  currentMax = parseInt(maxRange.value);
  correctNumber = getRandomRange(currentMin, currentMax);
  minRange.value = ""; // clear value in min range box after valid update
  maxRange.value = ""; // clear value in max range box after valid update
  updateButton.disabled = true;
}

// function checkRange() {
//   var min = parseInt(minRange.value);
//   var max = parseInt(maxRange.value);
// // remove the style when ccs enable/disable property is implemented //
//   if (min >= max) {
//     errorIcon.style.visibility = 'visible';
//     maxRange.style.borderColor = '#dd1972';
//   } else {
//     errorIcon.style.visibility = 'hidden';
//     maxRange.style.border = '1px solid #d0d2d3';
//   }
//   if (min < max) {
//     updateButton.disabled = false;
//   } else {
//     updateButton.disabled = true;
//   }
// }

// This function will update information on Winner's Summary //
function updateWinner() {
  outcomeNameOne.innerText = oneName.value;
  outcomeNameTwo.innerText = twoName.value;
  summaryGuesses.innerText = gameCount.length; // this enter number of guesses into Winner Summary
  gameCount.length = 0; // the array reset to default when a game is complete
  winnerNameOutput(); // this function will update winner name
}

// Close Winner Summary //


function closeWinnerOutput() {
  winnerBox.remove();
}

// shorter function for clear feature, will comment out intial clear function //
// added class name of playerInput to input textboxes line 50, 58, 71, and 79 in html//
// Had to re-implement old function
// function clearInputs() {
//   for (i = 0; i < playerInputBox.length; i++) {
//     playerInputBox[i].value = "";
//   }
//   submitButton.disabled = true;
//   clearButton.disabled = true;
// }

// this will clear guess form after game is complete
function clearGuessForm() {
  oneName.value = "";
  twoName.value = "";
  oneGuess.innerText = "";
  twoGuess.innerText = "";
}

// this function will generate new correctNumber
// function newCorrectNumber() {
//   var min = parseInt(minRange.value);
//   var max = parseInt(maxRange.value);
//   correctNumber = getRandomRange(min, max);
// }

function checkRange() {
  if (maxRange.value == '') {
    errorMessage.style.visibility = "hidden";
    maxRange.classList.remove('error-highlight');
    updateButton.disabled = true;
  } else if (parseInt(minRange.value) < parseInt(maxRange.value)) {
    errorMessage.style.visibility = "hidden";
    maxRange.classList.remove('error-highlight');
    updateButton.disabled = false;
  } else if (parseInt(minRange.value) >= parseInt(maxRange.value)) {
    errorMessage.style.visibility = "visible";
    maxRange.classList.add('error-highlight');
    updateButton.disabled = true;
  } else if (minRange.value == '') {
    errorMessage.style.visibility = "hidden";
    maxRange.classList.remove('error-highlight');
    updateButton.disabled = true;
  }
}





function rangeErrorCheckOne() {
  if (parseInt(oneGuess.value) < currentMin) {
    rangeErrorMessageOne.style.visibility = "visible";
    submitButton.disabled = true;
  } else if (parseInt(oneGuess.value) > currentMax) {
    rangeErrorMessageOne.style.visibility = "visible";
    submitButton.disabled = true;
  } else {
    rangeErrorMessageOne.style.visibility = "hidden";
  }
}

function rangeErrorCheckTwo() {
  if (parseInt(twoGuess.value) < currentMin) {
    rangeErrorMessageTwo.style.visibility = "visible";
    submitButton.disabled = true;
  } else if (parseInt(twoGuess.value) > currentMax) {
    rangeErrorMessageTwo.style.visibility = "visible";
    submitButton.disabled = true;
  } else {
    rangeErrorMessageTwo.style.visibility = "hidden";
  }
}

// this function will update winner of the number guesser
function winnerNameOutput() {
  if (parseInt(oneGuess.value) === correctNumber) {
    winnerName.innerText = oneName.value;
  } else if (parseInt(twoGuess.value) === correctNumber) {
    winnerName.innerText = twoName.value;
  }
}

// function below will reset game to default with new generated correct number


function enableReset() {
  var hasMin = minRange.value !== "";
  var hasMax = maxRange.value !== "";
  var hasOneName = oneName.value !== "";
  var hasTwoName = twoName.value !== "";
  var hasOneGuess = oneGuess.value !== "";
  var hasTwoGuess = twoGuess.value !== "";
  var isFilled = hasMin || hasMax || hasOneName || hasTwoName || hasOneGuess || hasTwoGuess;
  if (isFilled) {
    resetButton.disabled = false;
  } else {
    resetButton.disabled = true;
  }
}

function resetGame() {
  defaultSetRange();
  clearAllField();
  defaultLatestGuess();
  submitButton.disabled = true;
  clearButton.disabled = true;
  updateButton.disabled = true;
  resetButton.disabled = true;
}

function clearAllField() {
  oneName.value = "";
  twoName.value = "";
  oneGuess.value = "";
  twoGuess.value = "";
  minRange.value = "";
  maxRange.value = "";
}
function defaultSetRange() {
  currentMin = 1;
  currentMax = 100;
  correctNumber = getRandomRange(currentMin, currentMax);
  minSpan.innerText = "1";
  maxSpan.innerText = "100";
}

function defaultLatestGuess() {
  oneChallenger.innerText = "challenger 1 name";
  oneLatestGuess.innerText = "?";
  oneFeedback.innerText = "no guesses yet";
  twoChallenger.innerText = "challenger 2 name";
  twoLatestGuess.innerText = "?";
  twoFeedback.innerText = "no guesses yet";
 }
