'use strict'
   
    var emojis = {"smile": "\ud83d\ude04", "grin": "\ud83d\ude00", "teeth": "\ud83d\ude01", "tears_of_joy": "\ud83d\ude02", "smile_open_mouth": "\ud83d\ude03", "nervous": "\ud83d\ude05", "laugh": "\ud83d\ude06", "halo": "\ud83d\ude07", "devil": "\ud83d\ude08", "wink": "\ud83d\ude09", "happy": "\ud83d\ude0a", "delicious": "\ud83d\ude0b", "relieved": "\ud83d\ude0c", "heart_eyes": "\ud83d\ude0d", "sunglasses": "\ud83d\ude0e", "smirk": "\ud83d\ude0f", "neutral": "\ud83d\ude10", "annoyed": "\ud83d\ude11", "unamused": "\ud83d\ude12", "cold_sweat": "\ud83d\ude13", "pensive": "\ud83d\ude14", "confused": "\ud83d\ude15", "confounded": "\ud83d\ude16", "kiss": "\ud83d\ude18", "kiss_smiling_eyes": "\ud83d\ude19", "kiss_closed_eyes": "\ud83d\ude1a", "tongue": "\ud83d\ude1b", "tongue_wink": "\ud83d\ude1c", "tongue_tightly_closed_eyes": "\ud83d\ude1d", "disappointed": "\ud83d\ude1e", "worried": "\ud83d\ude1f", "angry": "\ud83d\ude20", "furious": "\ud83d\ude21", "cry": "\ud83d\ude22", "perserver": "\ud83d\ude23", "triumph": "\ud83d\ude24", "disappointed_relieved": "\ud83d\ude25",
"frown_open_mouth": "\ud83d\ude26", "anguished": "\ud83d\ude27", "fearful": "\ud83d\ude28", "weary": "\ud83d\ude29", "sleepy": "\ud83d\ude2a", "tired": "\ud83d\ude2b", "grimac": "\ud83d\ude2c", "cry": "\ud83d\ude2d", "open_mouth": "\ud83d\ude2e", "hushed": "\ud83d\ude2f", "open_mouth_cold_sweat": "\ud83d\ude30", "scream": "\ud83d\ude31", "dead": "\ud83d\ude32", "embarrassed": "\ud83d\ude33", "sleep": "\ud83d\ude34", "dizzy": "\ud83d\ude35", "no_mouth": "\ud83d\ude36", "sick": "\ud83d\ude37", "cat_smile": "\ud83d\ude38", "cat_tears_of_joy": "\ud83d\ude39", "cat_open_mouth": "\ud83d\ude3a", "cat_heart_eyes": "\ud83d\ude3b", "cat_smirk": "\ud83d\ude3c", "cat_kiss": "\ud83d\ude3d", "cat_angry": "\ud83d\ude3e", "cat_cry": "\ud83d\ude3f", "cat_shocked": "\ud83d\ude40", "no_good": "\ud83d\ude45", "ok_gesture": "\ud83d\ude46", "bow": "\ud83d\ude47", "monkey_see": "\ud83d\ude48", "monkey_hear": "\ud83d\ude49", "monkey_speak": "\ud83d\ude4a", "raising_hand": "\ud83d\ude4b", "celebration": "\ud83d\ude4c", "frown": "\ud83d\ude4d","sad": "\ud83d\ude4d", "pray": "\ud83d\ude4f", "cyclone": "\ud83c\udf00", "foggy": "\ud83c\udf01", "umbrella": "\ud83c\udf02", "night": "\ud83c\udf03", "sunrise_mountains": "\ud83c\udf04", "sunrise": "\ud83c\udf05", "rainbow": "\ud83c\udf08", "earth": "\ud83c\udf0e", "moon": "\ud83c\udf15", "moon_face": "\ud83c\udf1d", "sun_face": "\ud83c\udf1e", "palm_tree": "\ud83c\udf34", "cactus": "\ud83c\udf35", "tulip": "\ud83c\udf37", "mushroom": "\ud83c\udf44", "eggplant": "\ud83c\udf46", "penis": "\ud83c\udf46", "banana": "\ud83c\udf4c", "watermelon": "\ud83c\udf49", "peach": "\ud83c\udf51", "butt": "\ud83c\udf51", "pizza": "\ud83c\udf55", "bread": "\ud83c\udf5e", "ice_cream": "\ud83c\udf66", "beer": "\ud83c\udf7a", "santa": "\ud83c\udf85", "top_hat": "\ud83c\udfa9", "surf": "\ud83c\udfc4", "swim": "\ud83c\udfca", "snake": "\ud83d\udc0d", "frog": "\ud83d\udc38", "eyes": "\ud83d\udc40", "ear": "\ud83d\udc42", "tongue": "\ud83d\udc45", "ok": "\ud83c\udc4d", "thumbs_up": "\ud83d\udc00", "wave": "\ud83d\udc4b", "thumbs_down": "\ud83d\udc4e", "clap": "\ud83d\udc4f", "baby": "\ud83d\udc76", "ghost": "\ud83d\udc7b", "broken_heart": "\ud83d\udc94", "poo": "\ud83d\udca9", "poop": "\ud83d\udca9", "100": "\ud83d\udcaf", "fire": "\ud83d\udd25", "heart": "\ud83d\u2764""};

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

		    while(/[^a-zA-Z0-9]/.test(text.slice(-1)))  {
				text = text.substring(0, text.length - 1);		    
			}

			if(text.endsWith("ing")) { // laughing -> laugh
				text = text.substring(0, text.length - 3);
				if((text + 'e') in emojis)
					text = text + 'e';
			}

			// Chat bot responses
		    if(text == "what_is_your_name" || text == "whats_your_name") {
				sendTextMessage(sender, "EmojiMaster, built by Linus");
		    }		    
       		else if(text in emojis) {
		   		sendTextMessage(sender, emojis[text]);
		    } else if(text == "help") {
		    	sendTextMessage(sender, "Welcome to EmojiMaster, made by Linus. Please tell me the name of your favorite emoji.");
		    } else if(text == "hey" || text == "hi" || text == "hello") {
		    	sendTextMessage(sender, "Hello! I am EmojiMaster, made by Linus. Please tell me the name of your favorite emoji.")
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