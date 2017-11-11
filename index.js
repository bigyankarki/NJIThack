
'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()

app.set('port', (process.env.PORT || 5000))

// Allows us to process the data
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// ROUTES

app.get('/', function(req, res) {
	res.send("Hi I am a chatbot")
})

let token = "EAACExOFbZCcEBADS9SRS4GtTcOkYLOPNyad13G0fqNyHVxtUDEJPkPgHAZCdMlP5oFTJKrFSc87P8ewjLUOeVFozXNWcSogPxpuNwc0MKiImjsvIdU79hZCcrllHs2wIrdDv9sMlyhiOVK1mj957mNTVnSK7qPiBhTSc5yWiwZDZD"
// Facebook

app.get('/webhook/', function(req, res) {
	if (req.query['hub.verify_token'] === "bigyan") {
		res.send(req.query['hub.challenge'])
	}
	res.send("Wrong token")
})

app.post('/webhook/', function(req, res) {
	let messaging_events = req.body.entry[0].messaging
	for (let i = 0; i < messaging_events.length; i++) {
		let event = messaging_events[i]
		let sender = event.sender.id
		if (event.message && event.message.text) {
			let text = event.message.text
      decideMessage(sender, text)
			//sendText(sender, "Text echo: " + text.substring(0, 100))
		}
	}
	res.sendStatus(200)
})

function decideMessage(sender, text1){
  let text = text1.toLowerCase()
  if (text.includes("summer")){

  } else if(text.includes("winter")) {

  } else {
    sendText(sender, "I like fall")
    // send questions
  }
}

function sendText(sender, text) {
	let messageData = {text: text}
	request({
		url: "https://graph.facebook.com/v2.6/me/messages",
		qs : {access_token: token},
		method: "POST",
		json: {
			recipient: {id: sender},
			message : messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log("sending error")
		} else if (response.body.error) {
			console.log("response body error")
		}
	})
}


//listening port
app.listen(app.get('port'), function() {
	console.log("running: port")
})
