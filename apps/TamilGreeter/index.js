module.change_code = 1;
'use strict';

var http = require('http');
var alexa = require( 'alexa-app' );
var app = new alexa.app( 'tamilgreeter' );


app.launch( function( request, response ) {
	response.say( 'Welcome to your tamil greeter. Please tell your name.' ).reprompt( 'Can you please tell your name.').shouldEndSession( false );
} );

var getTodaysODBMP3 = function(req,res) {

var options = {
  host: 'odb.org',
  port: 80,
  path: '/'
};

var res = http.get(options, function(res) {
var body = '';
  console.log("Got response: " + res.statusCode);
  //console.log(res.body);
 res.on('data',function(data){
   body += data;
	});
res.on('end', function() {
//    console.log(body);
  //  var audioSRC = process(body);
    //var ssml = '<audio src="' + http://dzxuyknqkmi1e.cloudfront.net/odb/2017/01/odb-01-27-17.mp3+ '"/>';
    //res.say(ssml); 
    //var username = request.slot('USERNAME');
    //res.say("Vanakkam "+ username + " "  + ssml);
    return process(body);
  });
}).on('error', function(e) {
  console.log("Got error: " + e.message);
	});

res.end();

}



var process = function(body){
	var x = /<audio\s+id="(.*?)"\s+src="(.*?)"(.*?)><\/audio>/gi;
	var myArray = x.exec(body);
	for( x of myArray){
		console.log(x);
	}
	return x[2];
}





app.error = function( exception, request, response ) {
	console.log(exception)
	console.log(request);
	console.log(response);	
	response.say( 'Sorry an error occured ' + error.message);
};

app.intent('WishInTamil',
  {
    "slots":{"USERNAME":"AMAZON.LITERAL"}
	,"utterances":[ 
		"My Name is {slot value|USERNAME}",
		"Yen Peruu {slot value|USERNAME}"
		]
  },
  function(request,response) {
    var audioSRC = getTodaysODBMP3(request,response);
    //var audioSRC = process(body);
    var ssml = '<audio src="http://dzxuyknqkmi1e.cloudfront.net/odb/2017/01/odb-01-27-17.mp3"/>';
    //res.say(ssml); 
    var username = request.slot('USERNAME');
    //p(request,response,username,ssml);
    response.say("Vanakkam "+ username + " "  + ssml);
  }
);

var p = function(req,res,username,audiotag){
}

module.exports = app;