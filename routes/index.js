var express = require('express');
var router = express.Router();
var laboratory = require('../db/laboratory');

/* GET home page : 실습실 목록 */
router.get('/', function (req, res, next) {
    // 실습실 목록 가져오기
    laboratory.find({}, function (err, labs) {
        if (err) throw err;
        // res.json(data);
        res.render('index', {user: req.user, flash: req.flash(), labs: labs});
    });
});

/* POST 실습실 추가 */
router.post("/", function (req, res) {
    var newLab = new laboratory({
        name: req.body.name,
        location: req.body.location,
        img_url: req.body.img_url
    });
    newLab.save();
    res.redirect('/');
    // res.render('index');
});

/* GET 실습실 컴퓨터 배치도 */
router.get('/:laboratory', function (req, res, next) {
    // 실습실 컴퓨터 목록 가져오기 + 최근 제보 목록 가져오기
    laboratory.findOne({_id: req.params.laboratory}, function (err, lab) {
        if (err) throw err;
        if (!lab) {
            res.status(404).send('no such computer!');
            return;
        }
        res.render('laboratory', {user: req.user, flash: req.flash(), lab: lab});
    });
    // res.render('laboratory', {user: req.user, flash: req.flash()});

});

/* POST 실습실 컴퓨터 추가 */
router.post('/:laboratory', function (req, res) {
    //laboratory id에 해당하는 것을 찾고 computer 추가
    laboratory.findOne({_id: req.params.laboratory}, function (err, lab) {
        if (err) {
            res.json({result: 'error'});
        }
        console.log(req.body);
        lab.computers.push({
            name: req.body.name,
            location: req.body.location,
            property: req.body.property,
        });
        lab.save();
        res.json({result: 'success', data: lab.computers[lab.computers.length - 1]});
    });
});

/* GET 실습실 컴퓨터 한 대 제보 */
router.get('/:laboratory/:computer', function (req, res) {
    // 실습실 컴퓨터 한 대의 제보 가져오기
    laboratory.findOne({_id: req.params.laboratory}, function (err, lab) {
        if (err) throw err;
        if (!lab) {
            res.status(404).send('no such laboratory!');
            return;
        }
        var com = null;
        for (let i = 0; i < lab.computers.length; i++) {
            if (lab.computers[i]._id.toString() === req.params.computer) {
                com = lab.computers[i];
            }
        }
        if (!com) {
            res.status(404).send('no such computer!');
            return;
        }
        res.render('computer', {user: req.user, flash: req.flash(), lab: lab, com: com});
    });
});

/* POST 실습실 컴퓨터 한 대 제보 추가 */
router.post('/:laboratory/:computer', function (req, res) {
    //laboratory, computer id에 해당하는 것을 찾고 reports 추가
    laboratory.findOne({_id: req.params.laboratory}, function (err, lab) {
        if (!lab) {
            res.json({result: 'error', error: 'no such laboratory!'});
            return;
        }
        var com = null;
        for (let i = 0; i < lab.computers.length; i++) {
            if (lab.computers[i]._id.toString() === req.params.computer) {
                com = lab.computers[i];
            }
        }
        if (!com) {
            res.json({result: 'error', error: 'no such computer!'});
            return;
        }
        console.log(req.user);
        com.reports.push({
            title: req.body.title,
            content: req.body.content,
            tags: req.body.tags,
            author: req.user.id,
        });
        lab.save();
        res.json({result: 'success'});

    });
});

/* GET 실습실 컴퓨터 한 대 제보에 댓글 추가 */
router.get('/:laboratory/:computer/:report', function (req, res, next) {
    // 실습실 컴퓨터 한 대의 제보에 대한 댓글들 가져오기
    laboratory.findOne({_id: req.params.laboratory}, function (err, lab) {
        if (err) throw err;
        if (!lab) {
            res.status(404).send('no such computer!');
            return;
        }
        var com = null;
        for (let i = 0; i < lab.computers.length; i++) {
            if (lab.computers[i]._id.toString() === req.params.computer) {
                com = lab.computers[i];
            }
        }
        if (!com) {
            res.status(404).send('no such computer!');
            return;
        }
        var report = null;
        for (let i = 0; i < com.reports.length; i++) {
            if (com.reports[i]._id.toString() === req.params.report) {
                report = com.reports[i];
            }
        }
        if (!report) {
            res.status(404).send('no such report!');
            return;
        }
        res.render('report', {user: req.user, flash: req.flash(), lab: lab, com: com, report: report});
    });

});

/* POST 실습실 컴퓨터 한 대 제보에 댓글 추가 */
router.post('/:laboratory/:computer/:report', function (req, res) {
    //laboratory, computer, report id에 해당하는 것을 찾고 comments 추가
    laboratory.findOne({_id: req.params.laboratory}, function (err, lab) {
        if (err) throw err;
        if (!lab) {
            res.json({result: 'error', error: 'no such laboratory!'});

            return;
        }
        var com = null;
        for (let i = 0; i < lab.computers.length; i++) {
            if (lab.computers[i]._id.toString() === req.params.computer) {
                com = lab.computers[i];
            }
        }
        if (!com) {
            res.json({result: 'error', error: 'no such computer!'});
            return;
        }
        var report = null;
        for (let i = 0; i < com.reports.length; i++) {
            if (com.reports[i]._id.toString() === req.params.report) {
                report = com.reports[i];
            }
        }
        if (!report) {
            res.json({result: 'error', error: 'no such report!'});
            return;
        }
        report.comments.push({
            author: req.user.id,
            title: req.body.title,
            content: req.body.content
        });
        lab.save();
        res.json({result: 'success'});
    });
});

module.exports = router;
