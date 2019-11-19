var express = require('express');
/* passport 설정 */
var passport= require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var flash=require('connect-flash');
//////////////////
var User=require('../../db/user');
var router = express.Router();

router.post('/', function(req, res,done) {
    var id = req.body.id;
    var password = req.body.password;
    var email = req.body.email;
    var name = req.body.name;
    User.findOne({id: id}, function (err, user) {
        if (err) {
            return done(err);
        }
        if (user) {
            req.flash("error", "사용자가 이미 있습니다.");
            return res.redirect('/');
        }
        var newUser = new User({
            id: id,
            password: password,
            email: email,
            name: name
        });
        newUser.save(done);
    });
},passport.authenticate("login",{
        successRedirect:'../',
        failureRedirect:'/',
        failureFlash:true
}));

module.exports = router;