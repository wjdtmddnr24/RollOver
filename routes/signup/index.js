var express = require('express');
var User = require('../../db/user');
var router = express.Router();

router.post('/', function (req, res) {
    var id = req.body.id;
    var password = req.body.password;
    var email = req.body.email;
    var name = req.body.name;
    User.findOne({id: id}, function (err, user) {
        if (err) {
            throw err;
        }
        if (user) {
            res.json({result: 'error', error: '사용자가 이미 있습니다.'});
            return;
        }
        var newUser = new User({
            id: id,
            password: User.hashedPassword(password),
            email: email,
            name: name
        });
        newUser.save();
        res.json({result: 'success'});
    });
});

module.exports = router;