var  eventEmiter=function(){
	this.events={};
}

eventEmiter.prototype.on=function(event,callback){
	this.events[event]||(this.events[event]=[]);
	this.events[event].push(callback);
};

eventEmiter.prototype.emit=function(event){
	var args=Array.prototype.slice.call(arguments,1);
	if(this.events[event]){
		this.events[event].forEach(function(callback){
			callback.apply(this,args);
		});
	}
}

var obj=new eventEmiter();

obj.on("some",function(argument){
	console.log("some event executed");
});

obj.emit("some","yes");