const express = require("express"),
      path = require("path");
const util = require("util");
//var app = require('./app');
var https = require('https');
var bodyParser = require('body-parser');

var sendtoazure = require('./sendtoazure.js');

const port = process.env.PORT || 3000;

// Initialize the web app instance,
// along with the desired view engine
// for rendering view templates.
const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Indicate which directory static resources
// (e.g. stylesheets) should be served from.
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});

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
          '  "shouldEndSession": true'+
          '}'+
        '}';

app.get('/*', function (req, res) {
    console.log('GET:',req); 
  res.setHeader('Content-Type','application/json');  
  res.send(result)
});

app.post('/*', function (req, res) {
  console.log('BODY:',util.inspect(req.body, {showHidden: true, depth: null}))
  console.log('BASEURL:',util.inspect(req.baseUrl, {showHidden: true, depth: null}))
  console.log('ORIGINALURL:',util.inspect(req.originalUrl, {showHidden: true, depth: null}))
  console.log('PARAMS:',util.inspect(req.params, {showHidden: true, depth: null}))
  console.log('PATH:',util.inspect(req.path, {showHidden: true, depth: null}))
  console.log('QUERY:',util.inspect(req.query, {showHidden: true, depth: null}))    
  res.setHeader('Content-Type', 'application/json');  
  res.send(result)
  sendtoazure.emptyMsg();

});

/*
// Expose a default route, and begin listening for requests.
//app.get("/", require("./routes/index"));
app.set('port', port);

var options = {
    requestCert: false,
    rejectUnauthorized: false,
};

var server = https.createServer(options, app);


 
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
*/

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