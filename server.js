console.log("__filename",__filename);
console.log("__dirname",__dirname);
console.log("process.env",process.env.port);
console.log("process.argv",process.argv);

if(module===require.main){
	console.log("this is main module");
	var runner=require("nodeunit-runner");
	runner.run(__filename);
}
else{
	console.log("this is not main module");
}

module.exports=function(){
	console.log("this file is export");
}