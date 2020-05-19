const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res){
	res.sendFile(__dirname+"/signup.html");
})

app.post("/", function (req, res){

	var fname = req.body.fname;
	var lname = req.body.lname;
	var email = req.body.email;

	var data = {
		members: [
			{
				email_address: email,
				status: "subscribed",
				merge_fields: {
					FNAME: fname,
					LNAME: lname
				}
			}
		]
	};

	var jsondata = JSON.stringify(data);

	var options = {
		url: "https://us20.api.mailchimp.com/3.0/lists/c3da335485",
		method: "POST",
		headers: {
			"Authorization": "shantk c3dcf5dbc658ee84b6fa9665933c5847-us20"
		},
		body: jsondata
	};

	request(options, function(error, response, body){
		if(error){
			res.sendFile(__dirname+"/failed.html");
		} else if (response.statusCode == 200) {
			res.sendFile(__dirname+"/success.html");
		} else {
			res.sendFile(__dirname+"/failed.html");
		}
	})
})

app.post("/failed", function(req, res){
	res.redirect("/");
})

app.listen(3000, function () {
	console.log("Server is Running")
})
