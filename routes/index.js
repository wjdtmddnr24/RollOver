var express = require('express');
var router = express.Router();
var laboratory = require('../db/laboratory');

/* GET home page : 실습실 목록 */
router.get('/', function (req, res, next) {
    // 실습실 목록 가져오기
    laboratory.findOne({}, function (err, data) {
        if (err) throw err;
        res.json(data);
    });
});

/* POST 실습실 추가 */
router.post("/", function (req, res) {

});

/* GET 실습실 컴퓨터 배치도 */
router.get('/:laboratory/', function (req, res, next) {
    // 실습실 컴퓨터 목록 가져오기 + 최근 제보 목록 가져오기
    laboratory.findOne({_id: req.params._id}, function (err, data) {
        if (err) throw err;
        res.json(data);
    })

});

/* POST 실습실 컴퓨터 추가 */
router.post('/:laboratory/', function (req, res) {
    res.render('laboratory');
});

/* GET 실습실 컴퓨터 한 대 제보 */
router.get('/:laboratory/:computer', function (req, res, next) {
    // 실습실 컴퓨터 한 대의 제보 가져오기
    laboratory.findOne({_id: req.params._id}, function (err, data) {
        if (err) throw err;
        res.json(data);
    });
});

/* POST 실습실 컴퓨터 한 대 제보 추가 */
router.post('/:laboratory/:computer', function (req, res) {
    res.render('computer');
});

module.exports = router;
