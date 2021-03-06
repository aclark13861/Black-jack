let rank = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let suits = ["diamonds", "hearts", "spades", "clubs"];
let deck = [];
let dealersHand = [];
let playersHand = [];
let dealerTotal;
let playerTotal;
let playerPoint = 0;
let dealerPoint = 0;


const dealerImages = document.querySelectorAll('.dealerCard');
const cardImages = document.querySelectorAll('.playerCard');

let dealersMessage = document.querySelector('.title');
let playersMessage = document.querySelector('.pTitle');
let playerCounter = document.querySelector('.playerCount')
let dealerCounter = document.querySelector('.dealerCount')


function getDeck() {
	for (let i = 0; i < suits.length; i++) {
		for (let x = 0; x < rank.length; x++) {
            let weight = parseInt(rank[x]);
                if (rank[x] == "J" || rank[x] == "Q" || rank[x] == "K")
                    weight = 10;
                if (rank[x] == "A")
                    weight = 11;
            const suitLetter = suits[i][0].toUpperCase();
            const card = {
                face: rank[x] + ` of ` + suits[i],
                weight: weight,
                fileName: `${rank[x] + suitLetter}.png`
            };
                deck.push(card);
		}
    }
    return deck;
};

function load() {
    initialize();
};

window.onload = load;


function shuffle() {
    for (let i = 0; i < 500; i++) {
        let location1 = Math.floor((Math.random() * deck.length));
        let location2 = Math.floor((Math.random() * deck.length));

        let tmp = deck[location1];
        deck[location1] = deck[location2];
        deck[location2] = tmp;
    }
};

function createPlayers(num) {
    players = [];
    for(let i = 1; i <= num; i++) {
        let hand = [];
        let player = {Name: 'Player ' + i, ID: i, Hand: hand };
        players.push(player);
    }
};

function initialize() {
    playersHand = [];
    dealersHand = [];
        let btnz = document.querySelectorAll('#hit, .stand');
            btnz.forEach(function(btn){
                btn.disabled = false;
})
    getDeck();
    shuffle();
    createPlayers(2);

    cardImages.forEach(function(card){
        card.innerHTML = '';
});

    dealerImages.forEach(function(cards){
        cards.innerHTML = '';
});

    playersMessage.innerHTML = '';
    dealersMessage.innerHTML = '';
    playerCounter.innerHTML = playerPoint;
    dealerCounter.innerHTML = dealerPoint;

    deal(playersHand, 2, true);
    deal(dealersHand, 2, false);

    renderPlayer();
    renderDealer();
};



document.querySelector('#deal').addEventListener('click', function (e) {
    initialize();
    dealerAceCheck();
    playerAceCheck();
    blackjack();
});

document.querySelector('#hit').addEventListener('click', function(e) {
        deal(playersHand, 1, true);
        playerAceCheck();
        renderPlayer();
        checkPlayer();
});

document.querySelector('.stand').addEventListener('click', function(e){
    const dealer2 = document.getElementById('dealer2');
    const dealer2Img = document.querySelector('#dealer2 img');
    const imgName = dealer2Img.getAttribute('data-id');
    const front = document.createElement('img');
        front.setAttribute('src', `images/PNG/${imgName}`);
        dealer2.appendChild(front);
        dealer2Img.remove();

      dealerAceCheck();
      renderDealer();
      checkDealer();
      dealerBust();
      dealerAceCheck();
      renderDealer();
      checkDealer();
      dealerBust();
      dealerAceCheck();
      renderDealer();
      checkDealer();
      dealerBust();
      checkWin();
      checkPush();

      let btns = document.querySelectorAll('#hit, .stand');
            btns.forEach(function(btn){
                btn.disabled = true;

    })
});

function deal(person, num, isPlayer) {
    for (let i = 0; i < num; i++) {
       const dealt =  deck.pop();
       const img = document.createElement('img');
       const imgPath = !isPlayer && i===1 ? `images/PNG/red_back.png` : `images/PNG/${dealt.fileName}`;
            img.setAttribute('src', imgPath);
            img.setAttribute('data-id', dealt.fileName);

       person.push(dealt);

       if (isPlayer) {
        cardImages[i].appendChild(img);}
       if (!isPlayer) {
            dealerImages[i].appendChild(img); 
            
        }
    }
};

function renderPlayer() {
        playerTotal = 0;
    for (let i = 0; i < playersHand.length; i++) {
            playerTotal += playersHand[i].weight;
    } 
};

function renderDealer() {
        dealerTotal = 0
    for (let i = 0; i < dealersHand.length; i++) {
        dealerTotal += dealersHand[i].weight; 
    }
};

function checkPlayer() {
    if (playerTotal > 21) {
         playersMessage.innerHTML = `<h2>Player Busts</h2>`;
         dealersMessage.innerHTML = `<h2>Dealer Wins</h2>`;
         dealerPoints();
         playerPoints();
            let btns = document.querySelectorAll('#hit, .stand');
            btns.forEach(function(btn){
                btn.disabled = true;
        })
    }
};

function checkWin() {
    if (playerTotal > dealerTotal && playerTotal <= 21) {
        playersMessage.innerHTML = `<h2>Player Wins!</h2>`;
    }
    if (dealerTotal > playerTotal && dealerTotal <= 21) {
        dealersMessage.innerHTML = `<h2>Dealer Wins</h2>`;
    }
    dealerPoints();
    playerPoints();
};

function checkDealer() {
    if (dealerTotal < 17) {
        deal(dealersHand, 1, false);
    }
        dealerBust();
};
    
function dealerBust() {
    if (dealerTotal > 21) {
        dealersMessage.innerHTML = `<h2>Dealer Busts!</h2>`;
        playersMessage.innerHTML = `<h2>Player Wins!</h2>`;
    }
};

function blackjack() {
    if (dealerTotal === 21 && dealersHand.length === 2) {
        dealersMessage.innerHTML = `<h2>BlackJack<h2>`;
        dealerPoint = dealerPoint + 1;
        let btns = document.querySelectorAll('#hit, .stand');
            btns.forEach(function(btn){
                btn.disabled = true;
        })
    }
    if (playerTotal === 21 && playersHand.length === 2) {
        playersMessage.innerHTML = `<h2>You got a BlackJack!</h2>`;
        playerPoint = playerPoint + 1;
        let btns = document.querySelectorAll('#hit, .stand');
            btns.forEach(function(btn){
                btn.disabled = true;
        })
    }
};

function checkPush() {
    if (dealerTotal === playerTotal ) {
        dealersMessage.innerHTML = '<h2>Push</h2>'
        playersMessage.innerHTML = '<h2>Push</h2>'
    }
};

function playerAceCheck(){
    for (let i=0; i < playersHand.length; i++) {
        if (playersHand[i].weight === 11 && playerTotal > 10) {
            playersHand[i].weight = 1;
        }
    }
}

function dealerAceCheck(){
    for (let i=0; i < dealersHand.length; i++) {
        if (dealersHand[i].weight === 11 && dealerTotal > 10) {
            dealersHand[i].weight = 1;
        }
    }
};

function playerPoints() {
    if (playerTotal > dealerTotal && playerTotal <= 21 || dealerTotal > 21) {
        playerPoint = playerPoint + 1;
        playerCounter.innerHTML = playerPoint;
    }
};

function dealerPoints() {
    if (dealerTotal > playerTotal && dealerTotal <= 21 || playerTotal > 21) {
        dealerPoint = dealerPoint + 1;
        dealerCounter.innerHTML = dealerPoint;
    }
};