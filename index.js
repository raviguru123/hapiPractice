'use strict';
var hapi=require("hapi");
var port=8888;
var server=new hapi.Server();
var joi=require('joi');
var quotes = [
  {
    author: 'Audrey Hepburn'
  , text: 'Nothing is impossible, the word itself says \'I\'m possible\'!'
  }
, {
    author: 'Walt Disney'
  , text: 'You may not realize it when it happens, but a kick in the teeth may be the best thing in the world for you'
  }
, {
    author: 'Unknown'
  , text: 'Even the greatest was once a beginner. Don\'t be afraid to take that first step.'
  }
, {
    author: 'Neale Donald Walsch'
  , text: 'You are afraid to die, and you\'re afraid to live. What a way to exist.'
  }
];


server.connection({
	host:'localhost',
	port:port
},function(err){
	console.log("server connection successfully  create on port=",port)
});



server.register(require("inert"),err=>{
	if(err)
		console.log("error occured during inert registration");

	server.route({// GET request handler
	method:'GET',
	path:"/quote/{id?}",
	handler:function(request,reply){
		//var id=Math.floor(Math.random()*quotes.length);
		var id=request.params.id;
		if(id){
			if(id<quotes.length){
				return reply(quotes[id]);
			}
			else{
				return reply("quotes not found in this id");
			}
		}
		else{
			reply(quotes);	
		}
		
	}
});


server.route({
	method:'POST',
	path:'/quote',
	config:{
		handler:function(request,reply){
			var newQuote={
				author:request.payload.author,
				text:request.payload.author
			}
			quotes.push(newQuote);
			return reply(newQuote);
		},
		validate:{
			payload:{
				author:joi.string().required(),
				text:joi.string().required()
			}
		}
	}
})

});


server.start(err=>{
	if(err)
		console.log("error occured during server start");

	console.log("server is running in port",port);
});

