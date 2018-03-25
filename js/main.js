/*----- constants -----*/
var symbols = [
    { name: 'gun', imgUrl: 'https://i.imgur.com/YgvwBl9.jpg', val: 0 },
    { name: 'badge', imgUrl: 'https://i.imgur.com/RsIytun.jpg', val: 5 },
    { name: 'dice', imgUrl: 'https://i.imgur.com/0WqsBCk.jpg', val: 25 },
    { name: 'horseshoe', imgUrl: 'https://i.imgur.com/Aagv5e7.jpg', val: 50 },
    { name: 'whiskey', imgUrl: 'https://i.imgur.com/OTA99Wi.jpg', val: 100 },
    { name: 'loot', imgUrl: 'https://i.imgur.com/8ga3OIM.jpg', val: 250 },
];

var weighting = [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 2, 2, 2];

var sounds = {
    landing: 'http://soundbible.com/mp3/Cowboy_Theme-Pavak-1711860633.mp3',
    betting: 'http://freesound.org/data/previews/79/79172_1230147-lq.mp3',
    resetting: 'http://freesound.org/data/previews/165/165390_2989529-lq.mp3',
    letErRip: 'http://freesound.org/data/previews/160/160885_2895933-lq.mp3',
    spinning: 'http://freesound.org/data/previews/69/69689_866625-lq.mp3',
}

/*----- app's state (variables) -----*/
let bet, cash, msg, win, reels;

/*----- cached element references -----*/
var audio = document.getElementById("bgSound");

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
audio.volume = 0.2;

function betting(evt) {
    let placeBet = parseInt(evt.target.textContent);
    console.log(placeBet);

    if (placeBet > cash) {
        return;
    } else if (cash > 0) {
        cash = (cash -= placeBet);
        bet = (bet += placeBet);
    }

    if (cash === 0) msg = 'You Feelin Lucky?'

    render();


    //each bet decrease cash, win = bet + amount, lose just losing bet
}

function spin() {

}

function winner() {


}

function render() {
    //activete msg, slot reels, bet, money
    //render is used every time user interacts
    betEl.textContent = 'Bet:' + ' $' + bet;
    cshEl.textContent = 'Cash:' + ' $' + cash;
    msgEl.textContent = msg;
    slotReelA.style.backgroundImage = `url(${symbols[0].imgUrl})`;
    slotReelB.style.backgroundImage = `url(${symbols[0].imgUrl})`;
    slotReelC.style.backgroundImage = `url(${symbols[0].imgUrl})`;
}

function initialize() {
    msg = 'Giddy Up Pardner';
    bet = 0;
    cash = 50;
    reels = {
        a: 0,
        b: 0,
        c: 0,
    }

    render();
}