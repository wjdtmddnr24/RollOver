var express = require('express');
/* passport 설정 */
var passport= require('passport');

//////////////////
var User= require('../../db/user');
var router = express.Router();

router.post('/login_process', passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:'/' //재진입 // alert
}));

module.exports = router;