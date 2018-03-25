/*----- constants -----*/
var symbols = [
    { name: 'gun', imgUrl: 'https://i.imgur.com/Wuslckp.jpg', val: 0 },
    { name: 'badge', imgUrl: 'https://i.imgur.com/4zaXTbk.jpg', val: 5 },
    { name: 'dice', imgUrl: 'https://i.imgur.com/No8D3HJ.jpg', val: 25 },
    { name: 'horseshoe', imgUrl: 'https://i.imgur.com/hsQB8b0.jpg', val: 50 },
    { name: 'whiskey', imgUrl: 'https://i.imgur.com/FlTithL.jpg', val: 100 },
    { name: 'gold', imgUrl: 'https://i.imgur.com/vXaki6K.jpg', val: 250 },
];

var weighting = [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 2, 2, 2];

/*----- app's state (variables) -----*/
let bet, cash, msg, win, reels;

/*----- cached element references -----*/
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

function betting(evt) {
    let placeBet = parseInt(evt.target.textContent);
    console.log(placeBet);

    if  (placeBet > cash){
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

