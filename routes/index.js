var express = require('express');
var router = express.Router();

/* GET home page : 실습실 목록 */
router.get('/', function (req, res, next) {
    res.render('index');
});

/* POST 실습실 추가 */
router.post("/", function (req, res) {

});

/* GET 실습실 컴퓨터 배치도 */
router.get('/:laboratory/', function (req, res) {
    res.render('laboratory');
});

/* GET 실습실 컴퓨터 한 대 제보 */
router.get('/:laboratory/:computer', function (req, res) {
    res.render('computer');
});

module.exports = router;
