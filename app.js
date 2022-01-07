const express = require("express");
const app = express();
const body_parser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
app.set("view engine","ejs")
app.use(body_parser.urlencoded({extended:true}))
app.use(express.static("public"))


app.get("/",(req,res)=>{
	res.render("index")
});

app.post("/",(req,res)=>{
    const http = require("https");
	let title = _.camelCase(req.body.title);

	let uri = "/search?term="+ title +"&locale=en-US&offset=0&limit=5"
	const options = {
		"method": "GET",
		"hostname": "shazam.p.rapidapi.com",
		"port": null,
		"path": uri,
		"headers": {
			"x-rapidapi-host": "shazam.p.rapidapi.com",
			"x-rapidapi-key": "1e09d93c71msh6f4e8142d55edcep13429ajsnbec6ef11dd95",
			"useQueryString": true
		}
	};

	http.get(options, function (response) {

		const chunks = [];

		response.on("data", function (chunk) {
			chunks.push(chunk);
		});
	
		response.on("end", function () {
			const body = Buffer.concat(chunks);
			const result = JSON.parse(body);
			let songs = result.tracks.hits;
			res.render("songs",{
				songs:songs
			})
		});

	});

});

app.get('/about',(req,res)=>{
	res.render("about")
})
















app.listen(3000,(req,res)=>{
    console.log("server is running")
})


