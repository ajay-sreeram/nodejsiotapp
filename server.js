const express = require("express"),
      path = require("path");
const util = require("util");
var app = require('./app');
var https = require('https');

const port = process.env.PORT || 3000;

// Initialize the web app instance,
// along with the desired view engine
// for rendering view templates.
/*const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Indicate which directory static resources
// (e.g. stylesheets) should be served from.
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});

*/

// Expose a default route, and begin listening for requests.
//app.get("/", require("./routes/index"));
app.set('port', port);

var options = {
    requestCert: false,
    rejectUnauthorized: false,
};

var server = https.createServer(options, app);

var result='{'+
          '"version": "1.0",'+
          '"sessionAttributes": {},'+
          '"response": {'+
          '  "outputSpeech": {'+
          '    "type": "PlainText",'+
          '    "text": "Ok let me switch on the light for you"'+
          '  },'+
          '  "card": {'+
          '    "type": "Simple",'+
          '    "title": "SessionSpeechlet - Welcome",'+
          '    "content": "SessionSpeechlet - Welcome to the Alexa Skills Kit sample, Please tell me your favorite color by saying, my favorite color is red"'+
          '  },'+
          '  "reprompt": {'+
          '    "outputSpeech": {'+
          '      "type": "PlainText",'+
          '      "text": "Please tell me your favorite color by saying, my favorite color is red"'+
          '    }'+
          '  },'+
          '  "shouldEndSession": false'+
          '}'+
        '}';
 
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}


// Potential next steps:
// ---------------------
// 1) Update the views/stylesheets to get a feel for using Pug and static resources
// 2) Add additional routes/views to handle more requests (e.g. /about, /users)
// 3) Add additional middleware to process requests as needed (e.g. JSON bodies, cookie headers)
// 4) Add some front-end JavaScript, reference it from your layout view, and serve the file from the /public directory
// 5) Have fun trying App Service!