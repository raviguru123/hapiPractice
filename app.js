var joi=require('joi');

var schema={
	name:joi.string().max(255).required(),
	lastname:joi.string().required()
}


joi.validate({name:"ravi Kumar Guru",lastname:""},schema,function(err,res){
	if(err)
		console.log("error occured during validation",err);
	else{
		console.log("response come from =",res);
	}
});