var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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

module.exports = mongoose.model('user', userSchema);

