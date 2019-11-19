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
    var newLab = new laboratory({
        name: req.body.name,
        location: req.body.location ,
        img_url: req.body.img_url
    });
    newLab.save(function(err, lab) {
        console.log('Sucessfully insert laboratory: '+ lab.name);
    });
    res.render('index');
});

/* GET 실습실 컴퓨터 배치도 */
router.get('/:laboratory/', function (req, res, next) {
    // 실습실 컴퓨터 목록 가져오기 + 최근 제보 목록 가져오기
    laboratory.findOne({_id: req.params.laboratory}, function (err, data) {
        if (err) throw err;
        res.json(data);
    });
});

/* POST 실습실 컴퓨터 추가 */
router.post('/:laboratory/', function (req, res) {
    //laboratory id에 해당하는 것을 찾고 computer 추가
    laboratory.findOne({_id: req.params.laboratory}, function(err, lab){
        lab.computer.push({
            name: req.body.name,
            location: req.body.location,
            property: req.body.property,
        })
        lab.save(function(err, lab) {
            console.log('Sucessfully insert computer');
        });
    });
    res.render('laboratory');
});

/* GET 실습실 컴퓨터 한 대 제보 */
router.get('/:laboratory/:computer', function (req, res, next) {
    // 실습실 컴퓨터 한 대의 제보 가져오기
    laboratory.findOne({_id: req.params.laboratory}, function (err, data) {
        if (err) throw err;
        res.json(data);
    });
});

/* POST 실습실 컴퓨터 한 대 제보 추가 */
router.post('/:laboratory/:computer', function (req, res) {
    //laboratory, computer id에 해당하는 것을 찾고 reports 추가
    laboratory.findOne({_id: req.params.laboratory}, function(err, lab){
        for(var i=0, com; com=lab.computer[i]; i++){
            if(com._id===req.params.computer){
                com.reports.push({
                    title: req.body.title,
                    content: req.body.content,
                    author: req.body.author,
                    tags: req.body.tags
                    //status=
                });
                break;
            }
        }
        lab.save(function(err, lab) {
            console.log('Sucessfully insert report');
        });
    });
    res.render('computer');
});

module.exports = router;
