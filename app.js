// Get DOM elements
var obstacle = document.getElementById("obstacle");
var hole = document.getElementById("hole");
var scoreDisplay = document.getElementById("score");
var bird = document.getElementById("bird");
var game = document.getElementById("game");

var score = 0;
let obstaclePosition = 400;
let obstacleSpeed = 2; // Increased speed for a more dynamic game
let obstacleWidth = 50;
let holeWidth = 50;
let holeHeight = 150;
let hasPassed = false; // Track if the bird has passed the hole
let gameActive = true; // Track whether the game is active

let birdTop = 250;  // Initial position of the bird
let gravity = 0.8;  // Gravity pulling the bird down
let jumpStrength = -12;  // How much the bird jumps up
let velocity = 0;  // Bird's current vertical speed

// Function to reset the hole's position
function resetHolePosition() {
    let randomTop = Math.floor(Math.random() * (game.clientHeight - holeHeight - 100)) + 50; // Adjust range
    hole.style.top = randomTop + "px"; // Set hole's position
}

// Move the obstacle at regular intervals
let gameLoop = setInterval(() => {
    if (gameActive) {
        // Move the obstacle left by decreasing its left position
        obstaclePosition -= obstacleSpeed;
        obstacle.style.left = obstaclePosition + "px";

        // Check if the obstacle has moved off-screen
        if (obstaclePosition <= -obstacleWidth) {
            // Reset position to the right
            obstaclePosition = game.clientWidth; // Reset to the width of the game area
            resetHolePosition(); // Reset the hole position here for the next obstacle
            hasPassed = false; // Reset hasPassed for the next obstacle
        }

        // Check for collisions
        detectCollisions();
        checkScore(); // Check if the bird has passed the hole
    }
}, 20);

// Listen for a key press or mouse click to make the bird flap (jump)
document.addEventListener("keydown", flap);
document.addEventListener("click", flap);

// Function to make the bird "flap" (jump up)
function flap() {
    if (gameActive) {
        velocity = jumpStrength;  // Make the bird go up
    }
}

// Game loop to simulate gravity and update bird position
setInterval(() => {
    if (gameActive) {
        velocity += gravity;  // Apply gravity to the bird
        birdTop += velocity;  // Update the bird's position

        // Prevent the bird from going off the top or bottom of the screen
        if (birdTop < 0) {
            birdTop = 0;  // Prevent flying off the top
            velocity = 0;  // Stop upward movement
        } else if (birdTop > game.clientHeight - bird.clientHeight) {
            birdTop = game.clientHeight - bird.clientHeight;  // Prevent falling off the bottom
            velocity = 0;  // Stop falling when on the ground
        }

        // Update the bird's position on the screen
        bird.style.top = birdTop + "px";
    }
}, 20);

// Function to check if the bird has passed the hole
function checkScore() {
    let birdRect = bird.getBoundingClientRect();
    let holeRect = hole.getBoundingClientRect();

    // Check if the bird has passed the hole (to the right)
    if (birdRect.right > holeRect.right && !hasPassed) {
        score++;
        scoreDisplay.textContent = "Score: " + score; // Update score display
        hasPassed = true; // Set flag to indicate the bird has passed the hole
    }

    // Reset hasPassed if the bird is within the hole area or behind the hole
    if (birdRect.left < holeRect.right) {
        // The bird is still within the hole area; do not increment score
        if (birdRect.top < holeRect.bottom && birdRect.bottom > holeRect.top) {
            return; // Bird is in the hole, exit the function
        }
    }

    // Reset hasPassed if the bird is fully past the hole
    if (birdRect.right < holeRect.left) {
        hasPassed = false; // Reset the flag when the bird is fully past the hole
    }
}

// Collision detection to end game
function detectCollisions() {
    let birdRect = bird.getBoundingClientRect();
    let obstacleRect = obstacle.getBoundingClientRect();
    let holeRect = hole.getBoundingClientRect();

    // Check if the bird is within the horizontal range of the obstacle
    if (birdRect.right > obstacleRect.left && birdRect.left < obstacleRect.right) {
        // Check if the bird is outside the vertical bounds of the hole (hits the obstacle)
        if (birdRect.bottom > holeRect.bottom || birdRect.top < holeRect.top) {
            gameActive = false; // End the game
            alert("Game Over! Your score was: " + score);
            resetGame(); // Reset the game after game over
        }
    }
}

// Function to reset the game
function resetGame() {
    // Reset variables
    score = 0;
    scoreDisplay.textContent = "Score: " + score;
    birdTop = 250; // Reset bird position
    bird.style.top = birdTop + "px"; // Update bird position
    obstaclePosition = 400; // Reset obstacle position
    resetHolePosition(); // Reset hole position
    gameActive = true; // Set the game to active
}

// Start the game loop
resetHolePosition(); // Initialize hole position

        // Reset the flag if the bird is no longer passing
        hasPassed = false;
    }
}

