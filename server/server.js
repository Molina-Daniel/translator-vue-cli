// Initialize Path module
const path = require('path');
// Initialize Express
const express = require('express');
// Object containing all the server configuration
const app = express();

// Server Configuration
// Settings - set the port by default or 8000
app.set('port', process.env.PORT || 8000);

// Static files - show where the statics files are
app.use(express.static(path.join(__dirname, '../public')));

// Start the server - listen when the server starts and console the port where started
const server = app.listen(app.get('port'), () => {
  console.log('server on port', app.get('port'));
});


// Socket.io makes the bidirectional communication but it needs a server running already
// Initialize Socket.io
const SocketIO = require('socket.io');

// Storage the running server in a constant to work with
const io = SocketIO.listen(server);

// WebSockets
// Listen new client connections
io.on('connection', (socket) => {
  console.log('new connection', socket.id);
  socket.on('textToTranslate', (data) => {
    console.log(data);
    var { translate } = require("google-translate-api-browser");
    translate(data, { to: "es" })
      .then(res => {
        console.log(res.text);
        io.sockets.emit('translated', res.text)
      })
      .catch(err => {
        console.error(err);
      });
  })
});