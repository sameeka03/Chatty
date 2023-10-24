//Sameeka Maroli
//Task: Make a chat app on a live server 

const mongoose= require("mongoose");
const express= require("express");
const parser= require("body-parser");
const { Db } = require("mongodb");

// Starting anf connecting to MongoDB
const mongo_url='mongodb://127.0.0.1:27017/pa7';
mongoose.connect(mongo_url, {useNewUrlParser:true});
mongoose.connection.on("error",()=> {
	console.log("Error connecting to MongoDB")	
});

mongoose.connection.once('open',_ => {
	console.log('Database connected', mongo_url);
});
mongoose.connection.once('error', er => {
	console.log('Connection error', er);
});

var schema = new mongoose.Schema({
	time: Number,
	alias: String,
	message: String,
});

var Item = mongoose.model("Item",schema);

// Declating an express object to handle server things like GET and POST
const chat_server=express();
chat_server.use(express.static("public_html"));
chat_server.use(parser.json());
chat_server.post("/chats/post", (req, res) =>{
	console.log(req.body);
	var message_item = new Item({alias:req.body.alias, message:req.body.message, time:req.body.time});
	message_item.save().catch( (error) => {
        console.log('Error');
        console.log(error);
    });
    res.send();
});

// To handle get requests
chat_server.get("/chats", async (req, res) =>{
	var final_result="";
		await mongoose.model("Item").find().exec().then(results =>{
			for (var i in results){
				final_result += "<b>"+results[i].alias + ": </b>"+results[i].message +"<br/>";
			}
	});	
		res.send(final_result);
	
});

// Code to start listening on the server
chat_server.listen(3001, () => {
    console.log(`Server running at http://localhost/`);
});
