let rank = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let suits = ["diamonds", "hearts", "spades", "clubs"];
let deck = [];
let dealersHand = [];
let playersHand = [];
let players = [];
let dealerTotal;
let playerTotal;
const dealerImages = document.querySelectorAll('.dealerCard');
const cardImages = document.querySelectorAll('.playerCard');
console.log(cardImages);
let dealersMessage = document.querySelector('.title');
let playersMessage = document.querySelector('.pTitle');



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
            }
            // console.log(card);
            deck.push(card);
            
		}
    }
    return deck;
}

function load()
{
    initialize();

    
}

window.onload = load;


function shuffle() {
    for (let i = 0; i < 500; i++)
    {
        let location1 = Math.floor((Math.random() * deck.length));
        let location2 = Math.floor((Math.random() * deck.length));
        let tmp = deck[location1];
        deck[location1] = deck[location2];
        deck[location2] = tmp;
    }
}

function createPlayers(num)
{
    players = [];
    for(let i = 1; i <= num; i++)
    {
        let hand = [];
        let player = {Name: 'Player ' + i, ID: i, Points: 0, Hand: hand };
        players.push(player);
    }
}



function initialize() {
    playersHand = [];
    dealersHand = [];
    getDeck();
    shuffle();
    createPlayers(2);
    cardImages.forEach(function(card){
        card.innerHTML = '';
    })
    dealerImages.forEach(function(cards){
        cards.innerHTML = '';
    })
    playersMessage.innerHTML = '';
    dealersMessage.innerHTML = '';

    //currentPlayer = players[1];
    //write a deal function that pushes deck0deals(n) cards
    deal(playersHand, 2, true);
    deal(dealersHand, 2, false);
    renderPlayer();
    renderDealer();
}

document.querySelector('#deal').addEventListener('click', function (e) {
    initialize();
    

})


document.querySelector('#hit').addEventListener('click', function(e) {
        deal(playersHand, 1, true);
        renderPlayer();
        checkPlayer();
        
    })
document.querySelector('.stand').addEventListener('click', function(e){
    const dealer2 = document.getElementById('dealer2');
    const dealer2Img = document.querySelector('#dealer2 img');
    const imgName = dealer2Img.getAttribute('data-id');
    console.log(dealer2Img);
    console.log(imgName);
    const front = document.createElement('img');
        front.setAttribute('src', `images/PNG/${imgName}`);
        dealer2.appendChild(front);
        dealer2Img.remove();
      console.log(front);
      dealerBust();
      renderPlayer();
      renderDealer();
      checkDealer();
      checkDealer();
      checkDealer();
      dealerBust();
      checkWin();
    



})

function deal(person, num, isPlayer) {
    for (let i = 0; i < num; i++) {
       const dealt =  deck.pop()
       console.log(dealt);
       const img = document.createElement('img');
       console.log(!isPlayer && i===1);
        const imgPath = !isPlayer && i===1 ? `images/PNG/red_back.png` : `images/PNG/${dealt.fileName}`
       img.setAttribute('src', imgPath);
       img.setAttribute('data-id', dealt.fileName);
       console.log(img);
       person.push(dealt);
       if (isPlayer) {
       cardImages[i].appendChild(img);
       console.log(cardImages[i]);}
       if (!isPlayer) {
            dealerImages[i].appendChild(img); 
            
        }
    }
}
function renderPlayer() {
        //playerFace = 0;
        playerTotal = 0;
        //playerTotal = 0;
    for (let i = 0; i < playersHand.length; i++) {
        //playerFace = playersHand[i].face;
        playerTotal += playersHand[i].weight;
        //playersMessage.innerHTML += playerFace;
    }

}
function renderDealer() {
        dealerTotal = 0
    for (let i = 0; i < dealersHand.length; i++) {
        dealerTotal += dealersHand[i].weight;
        //dealersMessage.innerHTML += `<h3>${dealersHand[i].face}</h3>` 
    }
    
}


function checkPlayer() {
    if (playerTotal > 21) {
        let hit = document.querySelectorAll('#hit .stand');
             hit.forEach(function(btn){
                 btn.disabled = true;
             })
         playersMessage.innerHTML = `<h2>Player Busts</h2>`;
     }
}

function checkWin() {
    if (playerTotal > dealerTotal && playerTotal <= 21) {
        playersMessage.innerHTML = 'Player Wins!';
            let btns = document.querySelectorAll('#hit .stand');
            btns.disabled = true;
    }
    if (dealerTotal > playerTotal && dealerTotal <= 21) {
    dealersMessage.innerHTML = `<h2>Dealer Wins</h2>`;
    }
}
console.log(playerTotal)
 console.log(typeof playerTotal)
    

function checkDealer() {
    if (dealerTotal < 17) {
        deal(dealersHand, 1, false);
    }
    dealerBust();
}
    
function dealerBust() {
    if (dealerTotal > 21) {
    dealersMessage.innerHTML = `<h2>Dealer Busts!</h2>`;      
    }
}
    