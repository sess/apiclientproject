/* global $ */

let currentTurn = "player";

let currentCard = "none";

let previousTurn = "computer";

let compMatches = 0;

let playerMatches = 0;

let win = false;

function Turns(){
    if(currentTurn === "player"){
        currentTurn = "computer";
    }else if(currentTurn === "computer"){
        currentTurn = "player";
    }
}

function comLogic(){
    
}

$.ajax({
    url: "https://deckofcardsapi.com/api/deck/k6md5slc2b2s/shuffle/?deck_count=1",
    method: "GET",
    success: function(response){
        var deck_id = response.deck_id;
        console.log(deck_id);
        $(".cardCount").text(response.remaining);
        
        $.ajax({
            url:"https://deckofcardsapi.com/api/deck/k6md5slc2b2s/draw/?count=5",
            method: "GET",
            success: function(response){
                for (let i = 0; i < 5; i++){
                    console.log(i);
                    $("#playerHand").append("<button class=\"cardBttns\" id=\"pCard\"><img class=\"cards\" id=\"playerCards\" src=\"" + response.cards[i].images.png + "\"></button>");
                    $(".cardCount").text(response.remaining);
                }        
            }
        });
    
        $.ajax({
            url:"https://deckofcardsapi.com/api/deck/k6md5slc2b2s/draw/?count=5",
            method: "GET",
            success: function(response){
                for (let q = 0; q < 5; q++){
                    $("#opponentHand").append("<button clickable=\"false\"class=\"cardBttns\"><img class=\"cards\" id=\"opponentCards\" id=\"" + q + "\" src=\"cardBackside.png\"></button");
                    $(".cardCount").text(response.remaining);
                }        
            }
        });
    }
});

$("#pCard0").click(function(){
 
});