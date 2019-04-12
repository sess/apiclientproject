/* global $ */

let currentTurn = "player";

let currentCard = "none";

let selectedCard = "none";

let previousTurn = "computer";

let compMatches = 0;

let playerMatches = 0;

let win = false;

let playerText = "Player's Turn";

let comText = "Computer's Turn";

let drawText = "Go Fish";

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

function calledCard(selected,index){
    $(selected).click(function(){
        currentCard = index;
        console.log("PL " + currentCard);
    });
}


function select(selected,index){
    $(selected).click(function(){
        selectedCard = index;
        console.log("COM " + selectedCard);
    });
}

let playerSelect = function(){
    select("#opponentCard0", comCards[0]);
    select("#opponentCard1", comCards[1]);
    select("#opponentCard2", comCards[2]);
    select("#opponentCard3", comCards[3]);
    select("#opponentCard4", comCards[4]);
}

let playerCall = function (){
    calledCard("#playerCard0",playerCards[0]);
    calledCard("#playerCard1", playerCards[1]);
    calledCard("#playerCard2", playerCards[2]);
    calledCard("#playerCard3", playerCards[3]);
    calledCard("#playerCard4", playerCards[4]);
}

playerSelect();
playerCall();

/*function clickTwo(selected, index){
    $(selected).click(function(){
       //console.log("clickTwo");
        currentCard = index;
        console.log(currentCard);
    });
}*/

/*function opponentCardSelect(){
    clickTwo("#opponentCard0", comCards[0]);
    clickTwo("#opponentCard1", comCards[1]);
    clickTwo("#opponentCard2", comCards[2]);
    clickTwo("#opponentCard3", comCards[3]);
    clickTwo("#opponentCard4", comCards[4]); 
}*/

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
                    //$("#appendedScript").append("$(\"#playerCard" + i + "\"" + ").click(function(){ currentCard = $(\"#playerCard" + i + "\"" + ").val(); console.log(currentCard); });");
                    playerCards.push(response.cards[i].value);
                }       
                playerSelect();
                playerCall();
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
                    comCards.push(response.cards[q].value);
                }        
                //opponentCardSelect();
            }
        });
    }
});

$(".opponentCards").click(function(){
    /*if(text === playerText){
        
        turns();
    }else if(text === drawText){
        alert("Those aren't your cards.");
    }*/
});

$("#deck").click(function(){
    if(text != comText){
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
                    playerCall = function(){
                        calledCard("#playerCard0",playerCards[0]);
                        calledCard("#playerCard1", playerCards[1]);
                        calledCard("#playerCard2", playerCards[2]);
                        calledCard("#playerCard3", playerCards[3]);
                        calledCard("#playerCard4", playerCards[4]);
                        calledCard("#playerCard" + i, playerCards[i]);
                    }
                }
                playerCards.push(response.cards[0].code);
            }
        });
    }else if($(".cardCount").val() <= 0){
        alert("There are no more cards in the deck.");
        if(currentTurn === "player"){
            text = playerText;
        }else if(currentTurn === "computer"){
            text = comText;
        }
    }
});

if(win === "true"){
    alert("The game has been won");
}