'use strict'
   
    var emojis = {"smile": "\ud83d\ude04", "grin": "\ud83d\ude00", "teeth": "\ud83d\ude01", "tears_of_joy": "\ud83d\ude02", "smile_open_mouth": "\ud83d\ude03", "nervous": "\ud83d\ude05", "laugh": "\ud83d\ude06", "halo": "\ud83d\ude07", "devil": "\ud83d\ude08", "wink": "\ud83d\ude09", "happy": "\ud83d\ude0a", "delicious": "\ud83d\ude0b", "relieved": "\ud83d\ude0c", "heart_eyes": "\ud83d\ude0d", "sunglasses": "\ud83d\ude0e", "smirk": "\ud83d\ude0f", "neutral": "\ud83d\ude10", "annoyed": "\ud83d\ude11", "unamused": "\ud83d\ude12", "cold_sweat": "\ud83d\ude13", "pensive": "\ud83d\ude14", "confused": "\ud83d\ude15", "confounded": "\ud83d\ude16", "kiss": "\ud83d\ude18", "kiss_smiling_eyes": "\ud83d\ude19", "kiss_closed_eyes": "\ud83d\ude1a", "tongue": "\ud83d\ude1b", "tongue_wink": "\ud83d\ude1c", "tongue_tightly_closed_eyes": "\ud83d\ude1d", "disappointed": "\ud83d\ude1e", "worried": "\ud83d\ude1f", "angry": "\ud83d\ude20", "furious": "\ud83d\ude21", "crying": "\ud83d\ude22", "perservering": "\ud83d\ude23", "triumph": "\ud83d\ude24", "disappointed_relieved": "\ud83d\ude25"};

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

app.set('port', (process.env.PORT || 5000));

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// Process application/json
app.use(bodyParser.json());

// Index route
app.get('/', function (req, res) {
	res.send('Hello world, I am a chat bot');
    })

// for Facebook verification
    app.get('/webhook/', function (req, res) {
	    if (req.query['hub.verify_token'] === 'this_is_my_token') {
		res.send(req.query['hub.challenge']);
	    }
	    res.send('Error, wrong token');
	})

// Spin up the server
    app.listen(app.get('port'), function() {
	    console.log('running on port', app.get('port'));
	})

    app.post('/webhook/', function (req, res) {
	    let messaging_events = req.body.entry[0].messaging;
	    for (let i = 0; i < messaging_events.length; i++) {
		let event = req.body.entry[0].messaging[i];
		let sender = event.sender.id;
		if (event.message && event.message.text) {

			// String Formatting
		    let text = event.message.text.toLowerCase();
		    text.replace(/\W/g, '') // remove all non-alphanumeric characters
		    text = text = text.split(' ').join('_'); // replace spaces with underscores
		    text = text.replace(/emoji/g,''); // remove "emoji" from string
		    text = text.replace(/face/g,''); // remove "face" from string
		    if(text.slice(-1) == "_") {
				text = text.substring(0, text.length - 1);		    
			}

			sendTextMessage(sender, text);
			// Chat bot responses
		    if(text == "what_is_your_name" || text == "whats_your_name") {
				sendTextMessage(sender, "EmojiMaster, built by Linus");
		    }		    
       		else if(text in emojis) {
		   		sendTextMessage(sender, emojis[text]);
		    } else if(text == "help") {
		    	sendTextMessage(sender, "Welcome to EmojiMaster, made by Linus. Please tell me the name of your favorite emoji.");
		    }
		    else {
		    	sendTextMessage(sender, "Sorry, I couldn't find that emoji. If you would like help, please say, 'help.'");
		    }

		}
	    }
	    res.sendStatus(200);
	})
const token = "EAACziZAx9VhYBAGCONpu3rHnIPouwss6Nf5edZCaoF4ZC3by1W9t09HLoeazcAFypSDH7UDM7qCFbWovX2uW1f2fLXSnWquIDkmpTZB90zQx0l5DToZC4UDikaZCqCPHSAMrQlOyQMCyxUMQFfQAZCFUmxMYl5OOxxaFZBM3BufyhwZDZD"

function sendTextMessage(sender, text) {
    let messageData = { text:text }
    request({
	    url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
		recipient: {id:sender},
		    message: messageData,
		    }
	}, function(error, response, body) {
	    if (error) {
		console.log('Error sending messages: ', error);
	    } else if (response.body.error) {
		console.log('Error: ', response.body.error);
	    }
	})
	}