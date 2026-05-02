let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
let highScore = localStorage.getItem('highScore') || null;

const guessInput = document.getElementById('guess');
const message = document.getElementById('message');

function checkGuess() {
    const guess = Number(guessInput.value);
    if (!guess || guess < 1 || guess > 100) {
        showMessage('⛔ Enter a number between 1 and 100!', 'error');
        return;
    }
    attempts++;
    if (guess === secretNumber) {
        showMessage(`🎉 Correct! The number was ${secretNumber}.<br>Attempts: ${attempts}`,'success');
        if (!highScore || attempts < highScore) {
            highScore = attempts;
            localStorage.setItem('highScore', highScore);
            showMessage(`🏆 New High Score: ${highScore}!<br>Play again?`, 'success');
        } else {
            showMessage(`🥈 High Score: ${highScore}<br>Play again?`, 'success');
        }
        document.body.classList.add('win');
        setTimeout(resetGame, 2500);
    } else if (guess < secretNumber) {
        showMessage('🔼 Too low! Try again.', 'hint');
    } else {
        showMessage('🔽 Too high! Try again.', 'hint');
    }
    guessInput.value = '';
}

function showMessage(msg, type) {
    message.innerHTML = msg;
    message.className = type;
}

function resetGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    message.innerHTML = '';
    document.body.classList.remove('win');
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') checkGuess();
});

guessInput.focus();
