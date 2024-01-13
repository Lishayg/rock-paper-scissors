// GAME

let player1Score = 0
let player2Score = 0
let roundWinner = ''
let gameMode = 'againstComputer';
let currentPlayer = 'player1';
let player1Selection;
let player2Selection;

// Function to set the default game mode and initialize the page
function initializePage() {
    selectGameMode(); // Set the default game mode
    // Other initialization code if needed
}

function selectGameMode() {
    // Display a modal or prompt to let the user choose the game mode
    // For simplicity, let's use a prompt for now
    const selectedMode = prompt("Select game mode:\n1. Two Players\n2. Against Computer");

    // Check the selected mode
    if (selectedMode === '1') {
        gameMode = 'twoPlayers';
        alert(`It's ${currentPlayer}'s turn`);
        startGame();
    } else if (selectedMode === '2') {
        gameMode = 'againstComputer';
        startGame();
    } else {
        alert('Invalid selection. Please choose 1 or 2.');
    }
    
}

function startGame() {
    // Hide or disable the button to select game mode
    document.getElementById('selectModeBtn').style.display = 'none';

    // Display the buttons and other game elements based on the selected game mode
    if (gameMode === 'twoPlayers' || gameMode === 'againstComputer') {
        // Display buttons for both game modes
        document.getElementById('rockBtn').style.display = 'block';
        document.getElementById('paperBtn').style.display = 'block';
        document.getElementById('scissorsBtn').style.display = 'block';
    }

}


function playRound(player1Selection, player2Selection) {
  if (player1Selection === player2Selection) {
    roundWinner = 'tie'
  }
  if (
    (player1Selection === 'ROCK' && player2Selection === 'SCISSORS') ||
    (player1Selection === 'SCISSORS' && player2Selection === 'PAPER') ||
    (player1Selection === 'PAPER' && player2Selection === 'ROCK')
  ) {
    player1Score++
    if (gameMode === 'againstComputer') {
        roundWinner = 'player'
    }
    else{
        roundWinner = 'player1'
    }
  }
  if (
    (player2Selection === 'ROCK' && player1Selection === 'SCISSORS') ||
    (player2Selection === 'SCISSORS' && player1Selection === 'PAPER') ||
    (player2Selection === 'PAPER' && player1Selection === 'ROCK')
  ) {
    player2Score++
    if (gameMode === 'againstComputer') {
        roundWinner = 'computer'
    }
    else{
        roundWinner = 'player2'
    }
  }
  updateScoreMessage(roundWinner, player1Selection, player2Selection)
}

function getRandomChoice() {
  let randomNumber = Math.floor(Math.random() * 3)
  switch (randomNumber) {
    case 0:
      return 'ROCK'
    case 1:
      return 'PAPER'
    case 2:
      return 'SCISSORS'
  }
}

function isGameOver() {
  return player1Score === 5 || player2Score === 5
}

// UI

const scoreInfo = document.getElementById('scoreInfo')
const scoreMessage = document.getElementById('scoreMessage')
const player1ScorePara = document.getElementById('player1Score')
const player2ScorePara = document.getElementById('player2Score')
const player1Sign = document.getElementById('player1Sign')
const player2Sign = document.getElementById('player2Sign')
const rockBtn = document.getElementById('rockBtn')
const paperBtn = document.getElementById('paperBtn')
const scissorsBtn = document.getElementById('scissorsBtn')
const endgameModal = document.getElementById('endgameModal')
const endgameMsg = document.getElementById('endgameMsg')
const overlay = document.getElementById('overlay')
const restartBtn = document.getElementById('restartBtn')

rockBtn.addEventListener('click', () => handleClick('ROCK'))
paperBtn.addEventListener('click', () => handleClick('PAPER'))
scissorsBtn.addEventListener('click', () => handleClick('SCISSORS'))
restartBtn.addEventListener('click', restartGame)
overlay.addEventListener('click', closeEndgameModal)


function handleClick(playerSelection) {
    // Check if it's a two-player game and it's player1's turn
    if (gameMode === 'twoPlayers' && currentPlayer === 'player1') {
        // Store player1's selection
        player1Selection = playerSelection;
        // Change the player turn to player2
        currentPlayer = 'player2';
        alert(`It's ${currentPlayer}'s turn`);
    } else if (gameMode === 'twoPlayers' && currentPlayer === 'player2') {
        // Store player2's selection
        player2Selection = playerSelection;
        // Evaluate the round and reset for the next round
        playRound(player1Selection, player2Selection);
        // Display the results
        updateChoices(player1Selection, player2Selection);
        updateScore();

        // Check if the game is over
        if (isGameOver()) {
            openEndgameModal();
            setFinalMessage();
        } else {
            // Change the player turn back to player1 for the next round
            currentPlayer = 'player1';
            alert(`It's ${currentPlayer}'s turn`);
        }
    } else {
        // Against computer mode
        // Generate the computer's selection if in againstComputer mode
        player2Selection = getRandomChoice();
        player1Selection = playerSelection;
        // Evaluate the round and reset for the next round
        playRound(player1Selection, player2Selection);
        // Display the results
        updateChoices(player1Selection, player2Selection);
        updateScore();

        // Check if the game is over
        if (isGameOver()) {
            openEndgameModal();
            setFinalMessage();
        } else {
            // Change the player turn back to player1 for the next round
            currentPlayer = 'player1';
        }
    }

    

}

function updateChoices(player1Selection, player2Selection) {
  switch (player1Selection) {
    case 'ROCK':
        // Create an img element
        var rockImage = document.createElement('img');
        rockImage.src = 'images/rock.png';
        rockImage.alt = 'rock image';
        rockImage.style.width = '80%';
        rockImage.style.height = '80%';
        rockImage.style.objectFit = 'contain';

        // Clear any existing content in playerSign
        player1Sign.innerHTML = '';

        // Append the img element to playerSign
        player1Sign.appendChild(rockImage);
        break;
    case 'PAPER':
        // Create an img element
        var paperImage = document.createElement('img');
        paperImage.src = 'images/paper.png';
        paperImage.alt = 'paper image';
        paperImage.style.width = '65%';
        paperImage.style.height = '65%';
        paperImage.style.objectFit = 'contain';

        // Clear any existing content in playerSign
        player1Sign.innerHTML = '';

        // Append the img element to playerSign
        player1Sign.appendChild(paperImage);
        break;
    case 'SCISSORS':
        // Create an img element
        var scissorsImage = document.createElement('img');
        scissorsImage.src = 'images/scissors.png';
        scissorsImage.alt = 'scissors image';
        scissorsImage.style.width = '65%';
        scissorsImage.style.height = '65%';
        scissorsImage.style.objectFit = 'contain';

        // Clear any existing content in playerSign
        player1Sign.innerHTML = '';

        // Append the img element to playerSign
        player1Sign.appendChild(scissorsImage);
        break;
  }

  switch (player2Selection) {
    case 'ROCK':
        // Create an img element
        var rockImage = document.createElement('img');
        rockImage.src = 'images/rock.png';
        rockImage.alt = 'rock image';
        rockImage.style.width = '80%';
        rockImage.style.height = '80%';
        rockImage.style.objectFit = 'contain';

        // Clear any existing content in computerSign
        player2Sign.innerHTML = '';

        // Append the img element to computerSign
        player2Sign.appendChild(rockImage);
        break;
    case 'PAPER':
        // Create an img element
        var paperImage = document.createElement('img');
        paperImage.src = 'images/paper.png';
        paperImage.alt = 'paper image';
        paperImage.style.width = '65%';
        paperImage.style.height = '65%';
        paperImage.style.objectFit = 'contain';

        // Clear any existing content in computerSign
        player2Sign.innerHTML = '';

        // Append the img element to computerSign
        player2Sign.appendChild(paperImage);
        break;
    case 'SCISSORS':
        // Create an img element
        var scissorsImage = document.createElement('img');
        scissorsImage.src = 'images/scissors.png';
        scissorsImage.alt = 'scissors image';
        scissorsImage.style.width = '65%';
        scissorsImage.style.height = '65%';
        scissorsImage.style.objectFit = 'contain';

        // Clear any existing content in computerSign
        player2Sign.innerHTML = '';

        // Append the img element to computerSign
        player2Sign.appendChild(scissorsImage);
        break;
  }
}

function updateScore() {
  if (roundWinner === 'tie') {
    scoreInfo.textContent = "It's a tie!"
  } else if (gameMode === 'againstComputer' && roundWinner === 'player') {
    scoreInfo.textContent = 'You won!'
  } else if (gameMode === 'againstComputer' && roundWinner === 'computer') {
    scoreInfo.textContent = 'You lost!'
  }
  else if (gameMode === 'twoPlayers' && roundWinner === 'player1') {
    scoreInfo.textContent = 'Player1 won!'
  } else if (gameMode === 'twoPlayers' && roundWinner === 'player2') {
    scoreInfo.textContent = 'Player2 won!'
  }


  if (gameMode === 'againstComputer'){
    player1ScorePara.textContent = `Player: ${player1Score}`
    player2ScorePara.textContent = `Computer: ${player2Score}`
  }
  else{
    player1ScorePara.textContent = `Player1: ${player1Score}`
    player2ScorePara.textContent = `Player2: ${player2Score}`
  }
  
}

function updateScoreMessage(winner, player1Selection, player2Selection) {

  if (winner === 'player' || winner === 'player1') {
    scoreMessage.textContent = `${capitalizeFirstLetter(
      player1Selection
    )} beats ${player2Selection.toLowerCase()}`
    return
  }
  if (winner === 'computer' || winner === 'player2') {
    scoreMessage.textContent = `${capitalizeFirstLetter(
      player1Selection
    )} is beaten by ${player2Selection.toLowerCase()}`
    return
  }

  scoreMessage.textContent = `${capitalizeFirstLetter(
    player1Selection
  )} ties with ${player2Selection.toLowerCase()}`
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

function openEndgameModal() {
  endgameModal.classList.add('active')
  overlay.classList.add('active')
}

function closeEndgameModal() {
  endgameModal.classList.remove('active')
  overlay.classList.remove('active')
}

function setFinalMessage() {
    if (gameMode === 'againstComputer' && player1Score > player2Score) {
        endgameMsg.textContent = 'You won!'
    } else if (gameMode === 'againstComputer' && player1Score < player2Score) {
        endgameMsg.textContent = 'You lost...'
    } else if (gameMode === 'twoPlayers' && player1Score > player2Score) {
        endgameMsg.textContent = 'Player1 won!'
    } else if (gameMode === 'twoPlayers' && player1Score < player2Score) {
        endgameMsg.textContent = 'Player2 won!'
    }

}

function restartGame() {
  player1Score = 0
  player2Score = 0
  
  document.body.style.textAlign = 'center';
  document.getElementById('selectModeBtn').style.display = 'inline-block'; // or 'inline'
  selectModeBtn.textContent = 'Select Game Mode'
  scoreInfo.textContent = 'Choose your weapon'
  scoreMessage.textContent = 'First to score 5 points wins the game'
  if (gameMode === 'againstComputer'){
    player1ScorePara.textContent = `Player: 0`
    player2ScorePara.textContent = `Computer: 0`
  }
  else{
    player1ScorePara.textContent = `Player1: 0`
    player2ScorePara.textContent = `Player2: 0`
  }
  player1Sign.textContent = '❔'
  player2Sign.textContent = '❔'
  endgameModal.classList.remove('active')
  overlay.classList.remove('active')
}