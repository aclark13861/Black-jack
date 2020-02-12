let cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let suits = ["diamonds", "hearts", "spades", "clubs"];
let deck = [];
let dealersHand = [];
let playersHand = [];


let players = []
function createPlayers(num)
{
    players = [];
    for(let i = 0; i <= num; i++)
    {
        let hand =[]
        let player = { Name: 'Player ' + i, ID: i, Points: 0, Hand: hand};
        players.push(player);
    }
}


function Deck() {

    this.deck = new array (52);
    this.count = 52;
    var c = 0;
    for (var i = 1; i <= 4; i++)
        for (var j = 1; j<= 13; j++)
            this.deck[c++] = new card(j, i);
}

function load()
{
    Deck();
    
}

window.onload = load;

let init = function() {
    deck = [];
    Deck();
    playersHand = [];
    dealersHand = [];
}




//////////////////

function Card(value, suit) {
    this.suit = -1;
    this.value = -1;

    if (arguments.length >= 2)
    this.set(arguments[0], arguments[1]);
}

card.ace = 1;
card.jack = 11;
card.queen = 12;
card.king = 13;


card.club = 1;
card.diamond = 2;
card.spade = 4;
card.heart = 3;

card.clear = function() {
    this.suit = -1;
    this.value = -1;
}

card.set = function (value, suit) {
    if (arguments.length < 2)
        alert('the set function requires two args');
       var v = Math.round(Number(value));
        var s = Math.round(Number(suit));
        if ( ! (v > -1 && v<=13) ) 
            alert('the value of a card must be in the range 1 to 13');
        if ( ! (s >= 1 && s<= 4) )
            alert('the suit of a card must be 1,2,3, or 4');
        this.suit = s;
        this.value = v;

}

card.toString = function() {
    if (this.value == -1)
        return "(Card not shown)";
    var s = "";
    switch (this.value) {
        case 1: s += "Ace"; break;
        case 11:s += "Jack"; break;
        case 12: s+= "Queen"; break;
        case 13: s+= "King"; break;
        derfault: s  += this.value; break;
}


s += " of ";
switch (this.suit) {
    case 1: s += "Clubs"; break;
    case 2: s += "Diamonds"; break;
    case 3: s += "Hearts"; break;
    case 4: s += "Spades; break";
}
return s;

deck.shuffle = function() {
    for (var i = 51; i > 0; i--) {
        var r = Math.floor((i+1) * Math.random(i));
        var temp = this.deck(r);
        this.deck(r) = this.deck[i];
        this.deck[i] = temp;
    }
    this.count = 52;
}

let nextCard = function() {
    if (this.count == 0)
        alert ("Deck is out of cards");
    return this.deck[--this.count];
}




document.querySelector('#deal').addEventListener('click', function (e) {
    init();
    getDealer();
    getDealer();
    getPlayer();
    
})

let getDealer = function() {
    let playCard = deck[Math.floor(Math.random() * deck.length)];
        dealersHand.push(playCard);
        console.log(dealersHand);
}
let getPlayer = function() {
    let playCard = deck[Math.floor(Math.random() * deck.length)];
    let playCard2 = deck[Math.floor(Math.random() * 30)];
        playersHand.push(playCard, playCard2)
        let title = document.querySelector('.test');
        title.innerHTML = playersHand[0].name + ` ` + playersHand[1].name + ` `;
        console.log(playersHand)
}
let hit = function() {
    let playersHand = [];
    let playCard3 = deck[Math.floor(Math.random * 29)];
    playersHand.push(playCard3);

    if (playersHand[0].weight + playersHand[1].weight === 21 || PlayersHand[0].weight + playersHand[1].weight + playersHand[2].weight === 21) {
        document.querySelector('.test').innerHTML = 'Player Busted!'
    };
}

document.querySelector('#hit').addEventListener('click', hit);


