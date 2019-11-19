var express = require('express');
/* passport 설정 */
var passport= require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash=require('connect-flash');
//////////////////
var User=require('../../db/user');
var router = express.Router();

router.get('/', function(req, res){
    req.logout();
    response.redirect('../');
    /*
    request.session.save(function(){
        response.redirect('../');
    })
     */
});

module.exports = router;