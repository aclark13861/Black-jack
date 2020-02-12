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


function getDeck() {

	for (let i = 0; i < suits.length; i++) {
		for (let x = 0; x < cards.length; x++) {
            let weight = parseInt(cards[x]);
            if (cards[x] == "J" || cards[x] == "Q" || cards[x] == "K")
                weight = 10;
            if (cards[x] == "A")
                weight = 11;
            let cardName = (cards[x] + ` of ` + suits[i] + ` ` + weight);
            const suitLetter = suits[i][0].toUpperCase();
            const card = {
                name: cards[x] + ` of ` + suits[i],
                weight: weight,
                fileName: `${suits[i] + cards[x]}.svg`
            }
            console.log(card);
            deck.push(card);
            
		}
	}

	return deck;
}

function load()
{
    getDeck();
}

window.onload = load;

let init = function() {
    deck = [];
    getDeck();
    playersHand = [];
    dealersHand = [];
}

document.querySelector('#start').addEventListener('click', function (e) {
    init();
    getDealer();
    getDealer();
    getPlayer();
    getPlayer();
    
})

let getDealer = function() {
    let playCard = deck[Math.floor(Math.random() * deck.length)];
        dealersHand.push(playCard.name);
        console.log(dealersHand);
}
let getPlayer = function() {
    let playCard = deck[Math.floor(Math.random() * deck.length)];
        playersHand.push(playCard.name)
        let first = document.querySelector('.test');
        first.innerHTML = playersHand;
        console.log(playersHand)
}

document.querySelector('#hit').addEventListener('click', getPlayer);

// let checkOver = function() {
//     if playCard.weight
// }

function createComputer() {
    document.getElementById('dealersCards').innerHTML = '';
    for (var i = 0; i < players.length; i++)
    {
        let div_player = document.createElement('div');
        let div_playerid = document.createElement('div');
        let div_hand = document.createElement('div');
        let div_points = document.createElement('div');
        
        div_points.className = 'points';
        div_points.id = 'points_' + i;
        div_plsyer.id ='player';
        div_hand.id ='hand_' + i;

        div_playerid.innerHTML = players[i].ID;
        div_player.appendChild(div_playerid);
        div_player.appendChild(div_hand);
        div_player.appendChild(div_points);
        document.getElementById('.test').appendChild(div_player);
    }

}