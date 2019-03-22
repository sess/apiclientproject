/* global $ */

$.ajax({
    url: "https://deckofcardsapi.com/api/deck/lsk54361eevo/shuffle/?deck_count=1",
    method: "GET",
    success: function(response){
        var deck_id = response.deck_id;
        $(".cardCount").text(response.remaining);
        
    $.ajax({
        url:"https://deckofcardsapi.com/api/deck/" + deck_id +"/draw/?count=5",
        method: "GET",
        success: function(response){
            response.cards.forEach(function(cardIMG){
                $(".playerHand").append("<img class='cards' class='playerCards' src='" + response.cards.image + "'>");
            });        
        }
    });
    
    $.ajax({
        url:"https://deckofcardsapi.com/api/deck/" + deck_id + "/draw/?count=5",
        method: "GET",
        success: function(response){
            response.cards.forEach(function(){
                $(".opponentHand").append(`<img class="cards" class="opponentCards" src='"${response.cards.images}"'>`);
            });        
        }
    });
    $(".cardCount").text(response.remaining);
    }
});