const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const maths = require('./modules/math.js')
const match = require('./modules/match.js')

const app = express();
const server=http.createServer(app);
const io=socketio(server);

const port = process.env.PORT || 3000;      // the port to listen to
const publicDirectoryPath = path.join(__dirname, '/public');    //default path for pages to be served

app.use(express.static(publicDirectoryPath));   // how express 'serves' webpages

io.on('connection', (client) => {           // this function runs and persists for each socket individually
  console.log(io.engine.clientsCount)
    console.log('New websocket connection');// Log someone has connected
    console.log(client.id)
    if (io.engine.clientsCount>1) {
      matchAvailable = true
    } else {
      matchAvailable = false
    }
    console.log(matchAvailable)

    client.on('playedCard', msg => { // on message received
      io.emit('messageFromServer', msg);  // emit message to ALL Sockets
    });

    client.on('pickupCard', msg => { // on message received
      io.to(client.id).emit('cardPickup', "10_of_clubs");  // emit message to ALL Sockets
    });


    client.on('messageFromClient', msg => { // on message received
        io.emit('messageFromServer', msg);  // emit message to ALL Sockets
      });

    client.on('disconnect', () => {         // On Socket Destroyed
      console.log('New websocket disconnected');    // Log someone has disconnected
    });
});


console.log(maths.subtract(2,4))


// start of match
var matchAvailable = false
var inMatch = false



//end of match




server.listen(port,()=>{                    // Launch server
    console.log(`Server is up on port ${port}!`);
})