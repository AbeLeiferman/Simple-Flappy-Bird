var obstacle = document.getElementById("obstacle");
var hole = document.getElementById("hole");
var scoreDisplay = document.getElementById("score");
var score = 0;
let obstaclePosition = 400;
let obstacleSpeed = 1;
let obstacleWidth = 50;
let gameInterval = 20;
let holeWidth = 50;
let holeHeight = 150;
let hasPassed = false; // Track if the bird has passed the hole

// Move the obstacle at regular intervals
let gameLoop = setInterval(() => {
    // Move the obstacle left by decreasing its left position
    obstaclePosition -= obstacleSpeed;
    obstacle.style.left = obstaclePosition + "px";

    // Check if the obstacle has moved off-screen
    if (obstaclePosition <= -obstacleWidth) {
        // Reset position to the right
        obstaclePosition = 400;

        // Randomize hole's vertical position between 100px and 350px
        let randomTop = Math.floor(Math.random() * 300) + 50;
        let jitter = Math.floor(Math.random() * 10) - 5; // Adds small jitter of ±5 pixels
        hole.style.top = (randomTop + jitter) + "px";

        // Reset hasPassed flag for the next hole
        hasPassed = false; // Reset the flag when the hole resets
    }

    // Check if the bird has passed the hole
    checkScore();
}, gameInterval);

// Game functions 
var bird = document.getElementById("bird");
var game = document.getElementById("game");

let birdTop = 350;  // Initial position of the bird
let gravity = 0.8;  // Gravity pulling the bird down
let jumpStrength = -13;  // How much the bird jumps up
let velocity = 0;  // Bird's current vertical speed

// Listen for a key press or mouse click to make the bird flap (jump)
document.addEventListener("keydown", flap);
document.addEventListener("click", flap);

// Function to make the bird "flap" (jump up)
function flap() {
    velocity = jumpStrength;  // Make the bird go up
}

// Game loop to simulate gravity and update bird position
let gravityLoop = setInterval(() => {
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
}, gameInterval);

// Function to check if the bird has passed the hole
function checkScore() {
    // Get the current positions of the bird and the hole
    let birdRect = bird.getBoundingClientRect();
    let holeRect = hole.getBoundingClientRect();

    // Check if the bird's right side is past the left side of the hole
    if (birdRect.right > holeRect.left && birdRect.left < holeRect.right) {
        // Check if the bird is within the vertical bounds of the hole
        if (birdRect.top < holeRect.bottom && birdRect.bottom > holeRect.top) {
            // Bird is inside the hole area
            if (!hasPassed) { // Increment score only once per pass
                score++;
                scoreDisplay.textContent = "Score: " + score; // Update score display
                hasPassed = true; // Set flag to indicate passing
            }
        }
    } else {
        // Reset the flag if the bird is no longer passing
        hasPassed = false;
    }
}

