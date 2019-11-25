var express = require('express');
/* passport 설정 */
var passport = require('passport');

var router = express.Router();

router.post('/', passport.authenticate('local', {
    successReturnToOrRedirect: '/',
    failureFlash: true,
    failureRedirect: '/' // TODO 재진입 // alert
}), function (req, res) {
});

module.exports = router;