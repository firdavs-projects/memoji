'use strict';

const rootEl = document.getElementById('root');

const titleEl = document.createElement('h1');
titleEl.innerHTML = 'Memoji';
titleEl.classList.add('title');
rootEl.appendChild(titleEl);

const deskEl = document.createElement('div');
deskEl.classList.add('desk', 'container');
rootEl.appendChild(deskEl);

const cards = ["🐶", "🐱", "🐭", "🐹", "🐰", "🐻"]

const createCard = (card) => {
    const cardEl = document.createElement('div');
    const cardInnerEl = document.createElement('div');
    cardInnerEl.classList.add('card-inner');
    cardEl.appendChild(cardInnerEl);
    cardEl.classList.add('card');
    cardAddEvent(cardEl, card);
    deskEl.appendChild(cardEl);
}

const cardAddEvent = (cardEl, card) => {
    cardEl.addEventListener('click', () => {
        cardEl.classList.toggle('card-flipped');
        cardEl.classList.contains('card-flipped')
            ? setTimeout(() => cardEl.innerHTML = card, 150)
            : setTimeout(() => cardEl.innerHTML = '', 150);
    });
}

const randomize = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

randomize([...cards, ...cards]).forEach(createCard);