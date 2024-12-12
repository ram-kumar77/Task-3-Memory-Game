document.addEventListener("DOMContentLoaded", () => {
    // Define card colors
    const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
    const gameBoard = document.getElementById("game-board");
    const scoreDisplay = document.getElementById("score");
    const resetButton = document.getElementById("reset-button");


    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let matches = 0;

    // Shuffle the cards
    const shuffleCards = () => {
        cardsArray = [...colors, ...colors]; // Duplicate for pairs
        cardsArray.sort(() => Math.random() - 0.5); // Shuffle
    };

    // Create the cards on the board
    const createCards = () => {
        gameBoard.innerHTML = ""; // Clear the board
        cardsArray.forEach((color) => {
            const card = document.createElement("div");
            card.className = "card w-20 h-20 cursor-pointer hover:shadow-lg rounded bg-gray-600";

            card.dataset.color = color;
            
            gameBoard.appendChild(card);
        });
    };

    // Reveal a card
    const revealCard = (card) => {
        card.style.backgroundColor = card.dataset.color;
    };

    // Hide a card
    const hideCard = (card) => {
        card.style.backgroundColor = "gray";
    };

    // Reset card selection
    const resetSelections = () => {
        firstCard = null;
        secondCard = null;
        lockBoard = false;
    };

  

    // Handle card click
    const handleCardClick = (e) => {
        if (lockBoard) return;

        const clickedCard = e.target;
        if (!clickedCard.classList.contains("card") || clickedCard === firstCard || clickedCard.classList.contains("matched")) {
            return;
        }

        revealCard(clickedCard);

        if (!firstCard) {
            firstCard = clickedCard;
        } else {
            secondCard = clickedCard;
            lockBoard = true;

            // Check for match
            if (firstCard.dataset.color === secondCard.dataset.color) {
                firstCard.classList.add("matched");
                secondCard.classList.add("matched");
                matches++;
                scoreDisplay.textContent = `Score: ${matches}`;
                resetSelections();
            } else {
                // No match, hide cards after a delay
                setTimeout(() => {
                    hideCard(firstCard);
                    hideCard(secondCard);
                    resetSelections();
                }, 500);
            }

            // Check for win condition
            if (matches === colors.length) {
                setTimeout(() => alert("You won the game"), );
                return resetGame();
            }
        }
    };

    // Reset the game
    const resetGame = () => {
        matches = 0;
        scoreDisplay.textContent = "Score: 0";
        resetSelections();
        shuffleCards();
        createCards();
        const allCards = document.querySelectorAll(".card");
        allCards.forEach((card) => hideCard(card)); // Ensure all cards are hidden
    };

    // Initialize the game
    const initGame = () => {
        shuffleCards();
        createCards();
        hideCard
        gameBoard.addEventListener("click", handleCardClick);
        resetButton.addEventListener("click", resetGame);
    };

    initGame();
});
