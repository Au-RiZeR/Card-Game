$(document).ready(function () {
  
  var socket = io();

  var messages = document.getElementById('messages');
  var form = document.getElementById('form');
  var cards = document.getElementById('cards')
  var cardsOP = document.getElementById('cardsOP')
  var input = document.getElementById('input');
  
  // $("#send").click(function (e) { 
  //   e.preventDefault();
  //   if (input.value != "") {
  //     socket.emit('messageFromClient', input.value);
  //     input.value = '';
  //   }
  // });


  $('body').on('click', '.card', function () {
    let card = {
      cardPlayed : $(this).attr("alt"),
      cardPlayedID : $(this).attr("id")
    }
    socket.emit('playedCard', card);

    // $(this).remove();
  });

  $("#pickup").click(function (e) { 
    e.preventDefault();
    console.log("pressed")
    socket.emit('pickupCard');
  });
  
  socket.on('messageFromServer', function(msg) {
    var item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  });

  socket.on('cardPlayed', function(card) {
    $("#cardInPlay").attr("src", `./images/cards/${card.cardPlayed}.png`);
    console.log(card.cardPlayed)
    document.getElementById(card.cardPlayedID).remove()
  });
  
  socket.on('cardPickup', function(cardName, cardID) {
    var item = document.createElement('div');
    var img = document.createElement('img');
    $(img).attr("src", `./images/cards/${cardName}.png`);
    $(item).addClass(`${cardName} card`);
    $(item).attr('alt', `${cardName}`);
    $(item).attr('id', `${cardID}`);
    item.appendChild(img);
    cards.appendChild(item);
    // window.scrollTo(0, document.body.scrollHeight);
  });
  socket.on('cardOPPickup', function(cardName,cardID) {
    var item = document.createElement('div');
    var img = document.createElement('img');
    $(img).attr("src", `./images/cards/${cardName}.png`);
    $(item).addClass(`${cardName} cardOP`);
    $(item).attr('alt', `${cardName}`);
    $(item).attr('id', `${cardID}`);
    item.appendChild(img);
    cardsOP.appendChild(item);
    // window.scrollTo(0, document.body.scrollHeight);
  });


});
