/*----- constants -----*/
var symbols = [
    { name: 'gun', imgUrl: '', val: 0 },
    { name: 'boots', imgUrl: '', val: 5 },
    { name: 'whiskey', imgUrl: '', val: 25 },
    { name: 'wanted', imgUrl: '', val: 50 },
    { name: 'horse', imgUrl: '', val: 100 },
    { name: 'goldNug', imgUrl: '', val: 250 },
];

var weighting = [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 2, 2, 2];

/*----- app's state (variables) -----*/
let bet, cash, msg, win, reels;

/*----- cached element references -----*/
var slotReel = document.querySelectorAll('.reel');
var betEl = document.querySelector('#bet');
var cshEl = document.querySelector('#cash');
var msgEl = document.querySelector('#message h2')

/*----- event listeners -----*/
document.querySelector('#bet-btns').addEventListener('click', betting);
document.querySelector('#spin').addEventListener('click', spin);
document.querySelector('#reset').addEventListener('click', initialize);

/*----- functions -----*/

initialize();

function render() {
    //activete msg, slot reels, bet, money
    betEl.textContent = 'bet:' + bet;
    cshEl.textContent = '$:' + cash;
    msgEl.textContent = msg;
    slotReel.style.backgroundImage = `url(${[].imgUrl})`;
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

//render is used every time user interacts

function betting(evt) {
    parseInt(evt.target.innerText('$', ''));
    console.log(evt);


    //each bet decrease cash, win = bet + amount, lose just losing bet
}

function spin() {

}

