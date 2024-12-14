// Get the start-container and flashcard-container elements
const startContainer = document.getElementById('start-container');
const flashcardContainer = document.getElementById('flashcard-container');
const startButton = document.getElementById('start-button');
const showAnswerButton = document.getElementById('show-answer-button');
const cardFront = document.getElementById('front');
const cardBack = document.getElementById('back');
const randomButton = document.getElementById('random-button');

// Add a click event listener to the previous button
const prevButton = document.getElementById('prev-button');
prevButton.addEventListener('click', handlePrevButtonClick);

// Add a click event listener to the next button
const nextButton = document.getElementById('next-button');
nextButton.addEventListener('click', handleNextButtonClick);

// Initialize the current card index
let currentCardIndex = 0;

// Add a click event listener to the start button
startButton.addEventListener('click', function() {
    // Hide the start button
    startContainer.style.display = 'none';
    
    // Show the flashcard container
    flashcardContainer.style.display = 'block';
    
    // Get a random card and populate the card data
    currentCardIndex = Math.floor(Math.random() * cards.length);
    populateCardData();
    showCardFront();
});

// Add a click event listener to the show answer button
showAnswerButton.addEventListener('click', function() {
    
    if (cardFront.style.display === 'none') {
        // Show the front and hide the back
        cardFront.style.display = 'flex';
        cardBack.style.display = 'none';
        
        // Change the button name to "Show Answer"
        showAnswerButton.textContent = 'Show Answer';
    } else {
        // Hide the front and show the back
        cardFront.style.display = 'none';
        cardBack.style.display = 'flex';
        
        // Change the button name to "Hide Answer"
        showAnswerButton.textContent = 'Hide Answer';
    }
});

// Add event listener to the random button
randomButton.addEventListener('click', function() {
    const lastCardIndex = currentCardIndex;
    currentCardIndex = Math.floor(Math.random() * cards.length);
    // Make sure the new card is different from the last card
    while (currentCardIndex === lastCardIndex) {
        currentCardIndex = Math.floor(Math.random() * cards.length);
    }
    showCardFront();
    populateCardData();
});

// Function to populate the front and back data of the current card
function populateCardData() {
    const currentCard = cards[currentCardIndex];
    const cardClass = document.getElementById('card-class');
    const cardID = document.getElementById('card-id');
    
    cardFront.innerHTML = currentCard.front;
    cardBack.innerHTML = currentCard.back;
    cardClass.textContent = currentCard.class;
    cardID.textContent = currentCard.id;
}

// Function to handle the previous button click
function handlePrevButtonClick() {
    if (currentCardIndex > 0) {
        currentCardIndex--;
    } else {
        currentCardIndex = cards.length - 1;
    }
    populateCardData();
    showCardFront();
}

// Function to handle the next button click
function handleNextButtonClick() {
    if (currentCardIndex < cards.length - 1) {
        currentCardIndex++;
    } else {
        currentCardIndex = 0;
    }
    populateCardData();
    showCardFront();
}

function showCardFront() {
    // Show the front and hide the back
    cardFront.style.display = 'flex';
    cardBack.style.display = 'none';

    // Change the button name to "Show Answer"
    showAnswerButton.textContent = 'Show Answer';
}