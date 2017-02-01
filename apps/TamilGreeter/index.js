module.change_code = 1;
'use strict';

var http = require('http');
var alexa = require( 'alexa-app' );
var app = new alexa.app( 'tamilgreeter' );


app.launch( function( request, response ) {
	response.say( 'Welcome to your tamil greeter. Please tell your name.' ).reprompt( 'Can you please tell your name.').shouldEndSession( false );
} );

var getTodaysODBMP3 = function(alexarequest,alexaresponse) {

var options = {
  host: 'odb.org',
  port: 80,
  path: '/'
};
var returnData;
var req = http.get(options, function(res) {
var body = '';
  console.log("Got response: " + res.statusCode);
  //console.log(res.body);
 res.on('data',function(data){
   body += data;
	});
res.on('end', function() {
    console.log(body);
  //  var audioSRC = process(body);
    //var ssml = '<audio src="' + http://dzxuyknqkmi1e.cloudfront.net/odb/2017/01/odb-01-27-17.mp3+ '"/>';
    //res.say(ssml); 
    //var username = request.slot('USERNAME');
    //res.say("Vanakkam "+ username + " "  + ssml);
    //returnData = process(body);
     var username = alexarequest.slot('USERNAME');
    alexaresponse.say(processMessage(body));
    alexaresponse.send();
  });
}).on('error', function(e) {
  console.log("Got error: " + e.message);
	});

req.end();

//return returnData;

}


var processMessage = function(body){
   var message;
   var match = /<div\s+class="post-content">([\s\S]*?)<div\s+class="tweetable-content([\s\S]*?)<\/div>([\s\S]*?)<\/div>/gim;
   var meditationContent = match.exec(body);
    message = meditationContent[1].trim() + '</p>';
    message = message + meditationContent[3];
    message = message.replace(/“/g,"");
    message = message.replace(/<em>/g,"");
    message = message.replace(/<\/em>/g,"");
    message = message.replace(/<p>/g,"");
    message = message.replace(/<\/p>/g,"");
    message = message.replace(/”/g,"");
    message = message.replace(/\n/g,"");
    message = message.replace(/\t/g,"");       
    return message;
}


var process = function(body){
	var x = /<audio\s+id="(.*?)"\s+src="(.*?)"(.*?)><\/audio>/gi;
	var myArray = x.exec(body);
	for( match of myArray){
		console.log(match);
	}
	return myArray[2];
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
    console.log('audio :' + audioSRC);
    var ssml = '<audio src="http://dzxuyknqkmi1e.cloudfront.net/odb/2017/01/odb-01-27-17.mp3"/>';
    //res.say(ssml); 
   
    return false;
    //p(request,response,username,ssml);
    //response.say("Vanakkam "+ username + " "  + audioSRC);
  }
);

var p = function(req,res,username,audiotag){
}

module.exports = app;