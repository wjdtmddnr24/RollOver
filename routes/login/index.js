var express = require('express');
/* passport 설정 */
var passport = require('passport');

var router = express.Router();

router.post('/login_process', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/' // TODO 재진입 // alert
}));

module.exports = router;