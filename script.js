/* global $ */

let currentTurn = "player";

let currentCard = "none";

let previousTurn = "computer";

let compMatches = 0;

let playerMatches = 0;

let win = false;

let playerText = "Player's Turn";

let comText = "Computer's Turn";

let drawText = "Draw a Card";

$(".text").text(playerText);

let text = $(".text").val();

let playerCards =[];
let comCards =[];

function turns(){
    if(currentTurn === "player"){
        currentTurn = "computer";
    }else if(currentTurn === "computer"){
        currentTurn = "player";
    }
}

function click(selected){
    currentCard = selected;
    $(selected).click(function(){
        console.log("click");
    });
}

function clickTwo(selected){
    $(selected).click(function(){
        console.log("clickTwo");
    });
}

function playerCardSelect(){
    click("#playerCard0");
    click("#playerCard1");
    click("#playerCard2");
    click("#playerCard3");
    click("#playerCard4");
}

function opponentCardSelect(){
    clickTwo("#opponentCard0");
    clickTwo("#opponentCard1");
    clickTwo("#opponentCard2");
    clickTwo("#opponentCard3");
    clickTwo("#opponentCard4"); 
}

function changeCurrentCard(value){
    currentCard = value;
}

$.ajax({
    url: "https://deckofcardsapi.com/api/deck/k6md5slc2b2s/shuffle/?deck_count=1",
    method: "GET",
    success: function(response){
        /*var deck_id = response.deck_id;
        console.log(deck_id);*/
        $(".cardCount").text(response.remaining);
        
        $.ajax({
            url:"https://deckofcardsapi.com/api/deck/k6md5slc2b2s/draw/?count=5",
            method: "GET",
            success: function(response){
                for (let i = 0; i < 5; i++){
                    $("#playerHand").append("<img val='" + response.cards[i].value +"' class=\"cards\" class=\"playerCards\" id='playerCard" + i + "' src=\"" + response.cards[i].images.png + "\">");
                    $(".cardCount").text(response.remaining);
                    console.log("playerHand");
                    console.log(response.cards[i].value);
                }        
                playerCards.push(response.cards[0].value);
                playerCards.push(response.cards[1].value);
                playerCards.push(response.cards[2].value);
                playerCards.push(response.cards[3].value);
                playerCards.push(response.cards[4].value);
                playerCardSelect();
                changeCurrentCard();
                /*currentCard = response.cards[0].value;
                console.log(currentCard);*/
            }
        });
    
        $.ajax({
            url:"https://deckofcardsapi.com/api/deck/k6md5slc2b2s/draw/?count=5",
            method: "GET",
            success: function(response){
                for (let q = 0; q < 5; q++){
                    $("#opponentHand").append("<img val='" + response.cards[q].value +"' class=\"cards\" class=\"opponentCards\" id='opponentCard" + q + "' src=\"cardBackside.png\">");
                    $(".cardCount").text(response.remaining);
                    console.log("comHand");
                    console.log(response.cards[q].value);
                }        
                comCards.push(response.cards[0].value);
                comCards.push(response.cards[1].value);
                comCards.push(response.cards[2].value);
                comCards.push(response.cards[3].value);
                comCards.push(response.cards[4].value);
                opponentCardSelect();
            }
        });
    }
});

console.log(playerCards);
console.log(comCards);

$(".opponentCards").click(function(){
    if(text === playerText){
        
        turns();
    }else if(text === drawText){
        alert("Those aren't your cards.");
    }
});

$("#deck").click(function(){
    if(text != drawText){
        alert("You can't draw a card at this time.");
    }else if(text === drawText && $(".cardCount").val() > 0){
    $.ajax({
            url:"https://deckofcardsapi.com/api/deck/k6md5slc2b2s/draw/?count=1",
            method: "GET",
            success: function(response){
                for (let i = 0; i < 1; i++){
                    console.log(i);
                    $("#playerHand").append("<img val='" + response.cards[i].value +"' class=\"cards\" class=\"playerCards\" id='playerCard" + i + "' src=\"" + response.cards[i].images.png + "\">");
                    $(".cardCount").text(response.remaining);
                }
                playerCards.push(response.cards[0].code);
            }
        });
    }else if($(".cardCount").val() <= 0){
        alert("There are no more cards in the deck.");
    }
});