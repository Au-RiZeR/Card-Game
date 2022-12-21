$(document).ready(function () {
  
  var socket = io();

  var messages = document.getElementById('messages');
  var form = document.getElementById('form');
  var cards = document.getElementById('cards')
  var input = document.getElementById('input');
  
  // $("#send").click(function (e) { 
  //   e.preventDefault();
  //   if (input.value != "") {
  //     socket.emit('messageFromClient', input.value);
  //     input.value = '';
  //   }
  // });


  $('body').on('click', '.card', function () {
    let cardPlayed = $(this).attr("alt");
    socket.emit('playedCard', cardPlayed);

    $(this).remove();
  });

  // $(".card").click(function (e) { 
  //   e.preventDefault();
  //   // console.log($(this).text())
  //   let cardPlayed = $(this).attr("alt");
  //   socket.emit('playedCard', cardPlayed);

  //   $(this).remove();
  // });


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
  
  socket.on('cardPickup', function(cardName) {
    var item = document.createElement('div');
    var img = document.createElement('img');
    $(img).attr("src", `./images/cards/${cardName}.png`);
    $(item).addClass(`${cardName} card`);
    $(item).attr('alt', `${cardName}`);
    item.appendChild(img);
    cards.appendChild(item);
    // window.scrollTo(0, document.body.scrollHeight);
  });

});
