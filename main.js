const board = document.querySelector('.memory-game');
let cards = [];
let flippedCards = [];

function startGame() {
    generateCards();

    function flipCard(card) {
        card.classList.add('flipped');
        card.textContent = card.dataset.key;
    }

    function unflipCards() {
        flippedCards.forEach(card => {
            card.classList.remove('flipped');
            card.textContent = '';
        });
        flippedCards = [];
    }

    function compareCards() {
        if (flippedCards.length === 2) {
            if (flippedCards[0].dataset.key === flippedCards[1].dataset.key) {
                flippedCards = [];
                cards = cards.filter(card => !card.classList.contains('flipped'));
                if (cards.length === 0) {
                    setTimeout(() => {
                        alert('GG, You won !');
                        resetGame();
                    }, 500);
                }
            } else {
                setTimeout(() => {
                    unflipCards();
                }, 1000);
            }
        }
    }

    function cardClick() {
        if (this.classList.contains('flipped') || flippedCards.length === 2) return;
        flipCard(this);
        flippedCards.push(this);
        compareCards();
    }

    function generateCards() {
        cards = Array.from(document.querySelectorAll('.card'));
        const keys = Array.from({ length: cards.length / 2 }, (_, i) => i + 1);
        const shuffledKeys = keys.concat(keys).sort(() => Math.random() - 0.5);

        cards.forEach((card, index) => {
            card.dataset.key = shuffledKeys[index];
            card.addEventListener('click', cardClick);
        });
    }

    function resetGame() {
        location.reload();
    }

    generateCards();
}

startGame();
