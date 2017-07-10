var mongoose=require('mongoose');
var mongocrypt=require('mongoose-bcrypt');
var userSchema=mongoose.Schema({
	username:{type:String , required :true , unique:true},
	password:{type:String , required:true , bcrypt: true },
	createdAt:{type:Date , default:Date.now},
	displayName:String,
	bio:String
});

userSchema.plugin(mongocrypt);
userSchema.methods.name=function() {
	// body...
	return this.displayName || this.username;
}
var User = mongoose.model("User", userSchema);
module.exports = User;