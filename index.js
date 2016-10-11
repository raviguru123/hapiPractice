'use strict';
var hapi=require("hapi");
var port=8888;
var server=new hapi.Server();


server.connection({
	host:'localhost',
	port:port
});



server.register(require("inert"),err=>{
	if(err)
		console.log("error occured during inert registration");

	server.route({
	method:'GET',
	path:"/HELLO",
	isCaseSensitive:false,
	handler:function(request,reply){
		//console.log("params=",request);
		return reply.file("./public/hello.html");
	}
});
})


server.start(err=>{
	if(err)
		console.log("error occured during server start");

	console.log("server is running in port",port);
})

