'use strict';

const rootEl = document.getElementById('root');

const titleEl = document.createElement('h1');
titleEl.innerHTML = 'Memoji';
titleEl.classList.add('title');
rootEl.appendChild(titleEl);

const deskEl = document.createElement('div');
deskEl.classList.add('desk', 'container');
rootEl.appendChild(deskEl);

const cards = ["🐶", "🐱", "🐭", "🐹", "🐰", "🐻", "🐶", "🐱", "🐭", "🐹", "🐰", "🐻"];

const state = { cards: [], flipped: [], matched: [] };
let id = 0;

const createCard = (card) => {
    id++;
    const cardEl = document.createElement('div');
    cardEl.classList.add('card');
    cardEl.id = id;
    state.cards.push({ card, id });

    cardEl.addEventListener('click', cardClickHandler);
    deskEl.appendChild(cardEl);
}

const cardClickHandler = (ev) => {

    const cardEl = ev.target;
    const card = state.cards.find(c => c.id === +cardEl.id).card;

    setTimeout(() => cardEl.innerHTML = card, 150)

    if (state.flipped.length < 3) {
        cardEl.classList.add('card-flipped');
        state.flipped.push({ card, cardEl });
    }
    if (state.flipped.length === 2) {

        if (state.flipped[0].card === state.flipped[1].card) {
            state.matched.push(state.flipped[0], state.flipped[1]);
            state.matched.forEach(({ cardEl }) => {
                cardEl.classList.add('card-matched');
                cardEl.removeEventListener('click', cardClickHandler);
            });
            state.flipped = [];
        } else {
            state.flipped.forEach(({ cardEl }) => {
                cardEl.classList.add("card-not-matched");
                cardEl.removeEventListener('click', cardClickHandler);;
            });
        }
        return;
    }
    if (state.flipped.length === 3) {
        const restoreCards = state.flipped.slice(0, 2);
        console.log(restoreCards, state.flipped);
        restoreCards.forEach(({ cardEl }) => {
            cardEl.classList.remove('card-flipped', "card-not-matched");
            cardEl.innerHTML = "";
            cardEl.addEventListener('click', cardClickHandler);
        });
        state.flipped = [state.flipped[2]];
        return;
    }

}

const randomize = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

randomize(cards).forEach(createCard);