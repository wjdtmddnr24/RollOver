var express = require('express');
/* passport 설정 */
var passport = require('passport');

var router = express.Router();

router.post('/', passport.authenticate('local', {
    successReturnToOrRedirect: '/',
    failureFlash: true,
    failureRedirect: '/'
}), function (req, res) {
});

module.exports = router;