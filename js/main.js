/*----- constants -----*/
var symbols = [
    { name: 'gun', imgUrl: 'https://i.imgur.com/YgvwBl9.jpg', val: 0 },
    { name: 'badge', imgUrl: 'https://i.imgur.com/RsIytun.jpg', val: 5 },
    { name: 'dice', imgUrl: 'https://i.imgur.com/0WqsBCk.jpg', val: 25 },
    { name: 'horseshoe', imgUrl: 'https://i.imgur.com/Aagv5e7.jpg', val: 50 },
    { name: 'whiskey', imgUrl: 'https://i.imgur.com/OTA99Wi.jpg', val: 100 },
    { name: 'loot', imgUrl: 'https://i.imgur.com/8ga3OIM.jpg', val: 250 },
];

var state = {
    reels: {
        a: null,
        b: null,
        c: null,
    },
    cash: 0,
    bet: 0,

}

var weights = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5],
    [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5],
];



var sounds = {
    betting: 'http://freesound.org/data/previews/79/79172_1230147-lq.mp3',
    resetting: 'http://freesound.org/data/previews/165/165390_2989529-lq.mp3',
    letErRip: 'http://freesound.org/data/previews/160/160885_2895933-lq.mp3',
    spinning: 'http://freesound.org/data/previews/69/69689_866625-lq.mp3',
}

/*----- app's state (variables) -----*/
let msg, weighting, buttDisable;

/*----- cached element references -----*/
var audio = document.getElementById("bgSound");
var player = new Audio();

var slotReelA = document.querySelector('#a');
var slotReelB = document.querySelector('#b');
var slotReelC = document.querySelector('#c');

var betEl = document.querySelector('#bet');
var cshEl = document.querySelector('#cash');
var msgEl = document.querySelector('#message h2');

/*----- event listeners -----*/
document.querySelector('#bet-btns').addEventListener('click', betting);
document.querySelector('#spin').addEventListener('click', spin);
document.querySelector('#reset').addEventListener('click', initialize);

/*----- functions -----*/
initialize();

setTimeout(function () {
    audio.play();
    audio.volume = 0.3;

    setTimeout(function () {
        audio.pause();
        audio.currentTime = 0;
    }, 26750);
});

function betting(evt) {
    if (!buttDisable) {
        let placeBet = parseInt(evt.target.textContent);

        if (betEl <= 5) {
            weighting = weights[0];
        } else if (betEl <= 10) {
            weighting = weights[1];
        } else {
            weighting = weights[2];
        }


        if (placeBet > state.cash) {
            return;
        } else if (state.cash > 0) {
            state.cash -= placeBet;
            state.bet += placeBet;
        }

        player.src = sounds['betting'];
        player.play();

        if (state.cash === 0) msg = 'You Feelin Lucky?';

        render();
    }
}

function spin() {

    if (state.bet === 0) return;

    buttDisable = true;

    player.src = sounds['spinning'];
    player.play();

    var setIntA = setInterval(function () {
        var run = Math.floor(Math.random() * 5);
        var ranImg = symbols[run].imgUrl;
        state.reels.a = symbols[weighting[Math.floor(Math.random() * weighting.length)]];
        render();
    }, 75);

    var setIntB = setInterval(function () {
        var run = Math.floor(Math.random() * 5);
        var ranImg = symbols[run].imgUrl;
        state.reels.b = symbols[weighting[Math.floor(Math.random() * weighting.length)]];
        render();
    }, 75);

    var setIntC = setInterval(function () {
        var run = Math.floor(Math.random() * 5);
        var ranImg = symbols[run].imgUrl;
        state.reels.c = symbols[weighting[Math.floor(Math.random() * weighting.length)]];
        render();
    }, 75);

    setTimeout(function () {
        clearInterval(setIntA);
    }, 3000);

    setTimeout(function () {
        clearInterval(setIntB);
    }, 3500);

    setTimeout(function () {
        clearInterval(setIntC);
        buttDisable = false;
        winner();
        render();
    }, 4000);

    render();
}

function winner() {
    if ((state.reels.a.val === state.reels.b.val) && (state.reels.b.val === state.reels.c.val)) {
        state.cash += parseInt(state.reels.c.val) + state.bet;
        msg = 'Winner! Winner!';
        state.bet = 0;
    } else {
        msg = 'Tough Luck Pardner';
        state.bet = 0;
    }
}

function render() {
    betEl.textContent = 'Bet:' + ' $' + state.bet;
    cshEl.textContent = 'Cash:' + ' $' + state.cash;
    msgEl.textContent = msg;
    slotReelA.style.backgroundImage = `url(${state.reels.a.imgUrl})`;
    slotReelB.style.backgroundImage = `url(${state.reels.b.imgUrl})`;
    slotReelC.style.backgroundImage = `url(${state.reels.c.imgUrl})`;
}

function initialize() {
    player.src = sounds['resetting'];
    player.play();
    msg = 'Giddy Up Pardner';
    state.bet = 0;
    state.cash = 100;
    state.reels.a = symbols[weights[0][0]];
    state.reels.b = symbols[weights[0][0]];
    state.reels.c = symbols[weights[0][0]];
    buttDisable = false;
    window.clearInterval(3);
    window.clearInterval(4);
    window.clearInterval(5);

    render();
}