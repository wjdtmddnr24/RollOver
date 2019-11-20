var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

var userSchema = new Schema({
    id:{type:String, required:true},
    password: {type:String, required:true},
    email:{type:String, required:true},
    name: {type:String, required:true},
    created:{type:Date, default:Date.now}
});

userSchema.methods.validPassword = function(password) {
    return true;
};

userSchema.methods.hashedPassword = function(password) {
    return crypto.createHash("sha256").update(password).digest("hex");
};

module.exports = mongoose.model('user', userSchema);

