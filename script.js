// Define functions for the game
function startGame(event) {
    event.preventDefault(); // Prevent the default link behavior
    window.location.href = "game.html"; // Redirect to game.html
}

function quitGame(event) {
    event.preventDefault(); // Prevent the default link behavior
    if (confirm('Are you sure you want to quit?')) {
        window.close();
    }
}

// Function to initialize the game
function initiateGame() {
    // Get player names and hide input fields
    const player1 = document.getElementById('player1Input').value;
    const player2 = document.getElementById('player2Input').value;

    if (player1 && player2) {
        document.getElementById('game-container').style.display = 'none';
        document.getElementById('game-area').style.display = 'block';
        startHangmanGame(player1, player2);
    } else {
        alert('Please enter names for both players.');
    }
}

// Function to start the hangman game
function startHangmanGame(player1, player2) {
    // Initialize game variables
    const words = ['jungle', 'choice', 'plastic', 'biscuit', 'brisket', 'tomato'];
    const playerScores = { [player1]: 0, [player2]: 0 };
    let currentPlayer = player1;
    let currentWord = '';
    let guessed = '';
    let tries = 5;

    // Start the game loop
    function nextTurn() {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        currentWord = words[Math.floor(Math.random() * words.length)];
        guessed = '';
        tries = 5;
        updateDisplay();
    
        // Check if the current player guessed the word correctly
        const correctGuesses = currentWord.split('').filter(char => guessed.includes(char)).length;
        if (correctGuesses === currentWord.length) {
            alert(`Congratulations, ${currentPlayer}! You guessed the word "${currentWord}" correctly.`);
            playerScores[currentPlayer]++;
        }
    
        // Check if any player reached 3 points
        if (playerScores[player1] >= 3 || playerScores[player2] >= 3) {
            const winner = playerScores[player1] >= 3 ? player1 : player2;
            alert(`Congratulations, ${winner}! You are the winner!`);
            document.getElementById('game-area').style.display = 'none';
        }
    }
    
    

    // Function to update the display
   // Function to update the display
function updateDisplay() {
    document.getElementById('player-turn').textContent = `${currentPlayer}'s turn`;
    const wordDisplay = currentWord.split('').map(char => guessed.includes(char) ? char : '_').join(' ');
    document.getElementById('word-display').textContent = wordDisplay;
    document.getElementById('tries-remaining').textContent = `Tries remaining: ${tries}`;
    // Display the number of correct guesses for the current player
    document.getElementById('correct-guesses').textContent = `Correct guesses: ${playerScores[currentPlayer]}`;
}

    

    // Function to handle player guesses
    window.makeGuess = function() {
        const guess = document.getElementById('guess-input').value;
        if (guess.length !== 1 || !/^[a-zA-Z]$/.test(guess)) {
            alert('Please enter a single alphabetical character.');
            return;
        }

        if (guessed.includes(guess)) {
            alert(`You already guessed "${guess}". Try another letter.`);
            return;
        }

        guessed += guess;
        if (!currentWord.includes(guess)) {
            tries--;
        }

        if (tries === 0) {
            alert(`No more tries remaining... You lose. The word was: ${currentWord}`);
            nextTurn();
        } else if (currentWord.split('').every(char => guessed.includes(char))) {
            alert(`Congratulations, ${currentPlayer}! You got it!`);
            playerScores[currentPlayer]++;
            nextTurn();
        } else {
            updateDisplay();
        }

        document.getElementById('guess-input').value = '';
    };

    // Start the first turn
    nextTurn();
}
