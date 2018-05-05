
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

const game = document.querySelector("#game"),
      minNum = document.querySelector(".min-num"),
      maxNum = document.querySelector(".max-num"),
      guessBtn = document.querySelector("#guess-btn"),
      guessInput = document.querySelector("#guess-input"),
      message = document.querySelector(".message");

minNum.textContent = min
maxNum.textContent = max

// https://javascript.info/bubbling-and-capturing
// http://www.javascripter.net/faq/eventbubbling.htm
// http://www.qc4blog.com/?p=650
// http://codingrepo.com/javascript/2017/05/19/javascript-difference-mousedown-mouseup-click-events/
game.addEventListener("click", function (e) {
  console.log(e)
  if (e.target.className === "play-again") {
    window.location.reload()
  }
})

guessBtn.addEventListener("click", function () {
  message.textContent = ""
  let guess =  parseInt(guessInput.value)

  if (Number.isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter number between ${min} and ${max}`, "red")
    return false
  }

  if (guess === winningNum) {
    // game over - win
    gameOver(true, `${winningNum} is correct! YOU WIN!!!`)
  } else {
    guessesLeft -= 1
    if (guessesLeft === 0) {
      // game over - lose
      gameOver(false, `Game over, you lost. Correct number was ${winningNum}`)
    } else {
      // game over - continue
      guessInput.style.borderColor = "red"
      guessInput.value = ""
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left.`, "red")
    }
  }
})

function gameOver(won, msg){
  let color
  won === true ? color = "green" : color = "red"

  guessInput.disabled = won
  guessInput.style.borderColor = color
  setMessage(msg, color)

  // play again?
  guessBtn.value = "Play Again"
  guessBtn.className += "play-again"
}

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min) 
}


function setMessage(msg, color) {
  message.style.color = color
  message.textContent = msg
}


