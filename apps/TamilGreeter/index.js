module.change_code = 1;
'use strict';

var alexa = require( 'alexa-app' );
var app = new alexa.app( 'tamilgreeter' );


app.launch( function( request, response ) {
	response.say( 'Welcome to your tamil greeter. Please tell your name.' ).reprompt( 'Can you please tell your name.').shouldEndSession( false );
} );


app.error = function( exception, request, response ) {
	console.log(exception)
	console.log(request);
	console.log(response);	
	response.say( 'Sorry an error occured ' + error.message);
};

app.intent('sayNumber',
  {
    "slots":{"USERNAME":"AMAZON.LITERAL"}
	,"utterances":[ 
		"My Name is {slot value|USERNAME}",
		"Yen Peruu {slot value|USERNAME}"
		]
  },
  function(request,response) {
    var username = request.slot('USERNAME');
    response.say("Vanakkam "+ username);
  }
);

module.exports = app;