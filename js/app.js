'use strict';

const rootEl = document.getElementById('root');

const titleEl = document.createElement('h1');
titleEl.innerHTML = 'Memoji';
titleEl.classList.add('title');
rootEl.appendChild(titleEl);

const deskEl = document.createElement('div');
deskEl.classList.add('desk', 'container');
rootEl.appendChild(deskEl);

const modalEl = document.createElement('div');
modalEl.classList.add('modal', 'hidden');
rootEl.appendChild(modalEl);

const modalInnerEl = document.createElement('div');
modalInnerEl.classList.add('modal-inner');
modalEl.appendChild(modalInnerEl);

const modalTitleEl = document.createElement('h2');
modalTitleEl.classList.add('modal-title');
modalTitleEl.innerHTML = 'Win';
modalInnerEl.appendChild(modalTitleEl);

const resetButtonEl = document.createElement('button');
resetButtonEl.classList.add('reset-button');
resetButtonEl.innerHTML = 'Play again';
resetButtonEl.addEventListener('click', resetButtonClickHandler);
modalInnerEl.appendChild(resetButtonEl);

rootEl.appendChild(modalEl);

const timerEl = document.createElement('div');
timerEl.classList.add('timer');
timerEl.innerHTML = `01:00`;
rootEl.appendChild(timerEl);

const cards = ["🐶", "🐱", "🐭", "🐹", "🐰", "🐻", "🐶", "🐱", "🐭", "🐹", "🐰", "🐻"];

const state = { cards: [], flipped: [], matched: [], timer: null };
let id = 0;

const createCard = (card) => {
    id++;
    const cardEl = document.createElement('div');
    cardEl.classList.add('card');
    cardEl.id = id;
    state.cards.push({ card, id, cardEl });

    cardEl.addEventListener('click', cardClickHandler);
    deskEl.appendChild(cardEl);
}

const cardClickHandler = (ev) => {
    if (state.timer === null) {
        state.timer = timer();
    }

    const cardEl = ev.target;
    const card = state.cards.find(c => c.id === +cardEl.id).card;
    setTimeout(() => cardEl.innerHTML = card, 150)

    if (state.flipped.length < 3) {
        cardEl.classList.add('card-flipped');
        cardEl.removeEventListener('click', cardClickHandler);
        state.flipped.push({ card, cardEl });
    }
    if (state.flipped.length === 2) {

        if (state.flipped[0].card === state.flipped[1].card) {
            if (state.matched.length === cards.length - 2) {
                clearInterval(state.timer);
                state.timer = null;
                modalTitleEl.innerHTML = 'Win';
                resetButtonEl.innerHTML = 'Play again';
                modalEl.classList.remove('hidden');
            }
            state.matched.push(state.flipped[0], state.flipped[1]);
            state.matched.forEach(({ cardEl }) => {
                cardEl.classList.add('card-matched');
                cardEl.removeEventListener('click', cardClickHandler);
            });
            state.flipped = [];
        } else {
            state.flipped.forEach(({ cardEl }) => {
                cardEl.classList.add("card-not-matched");
                cardEl.removeEventListener('click', cardClickHandler);
            });
        }
        return;
    }
    if (state.flipped.length === 3) {
        const restoreCards = state.flipped.slice(0, 2);
        restoreCards.forEach(({ cardEl }) => {
            cardEl.classList.remove('card-flipped', "card-not-matched");
            cardEl.innerHTML = "";
            cardEl.addEventListener('click', cardClickHandler);
        });
        state.flipped = [state.flipped[2]];
        return;
    }

}

function resetButtonClickHandler() {
    if (state.timer !== null) {
        clearInterval(state.timer);
    }
    state.timer = null;
    state.flipped = [];
    state.matched = [];
    modalEl.classList.add('hidden');
    timerEl.innerHTML = `01:00`;
    state.cards.forEach(({ cardEl }) => {
        cardEl.classList.remove('card-flipped', 'card-matched', 'card-not-matched');
        cardEl.removeEventListener('click', cardClickHandler);
        cardEl.innerHTML = "";
        cardEl.addEventListener('click', cardClickHandler);
    });
    state.cards = [];
    setTimeout(render, 500)
}

const timer = () => {
    let time = 60;
    const timerId = setInterval(() => {
        time--;
        const timeString = time < 10 ? `0${time}` : time;
        timerEl.innerHTML = `00:${timeString}`;
        if (time === 0) {
            clearInterval(timerId);
            modalTitleEl.innerHTML = 'Lose';
            resetButtonEl.innerHTML = 'Try again';
            modalEl.classList.remove('hidden');
        }
    }, 1000);

    return timerId;
}

const randomize = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const render = () => {
    deskEl.innerHTML = "";
    randomize(cards).forEach(createCard);
}

render();