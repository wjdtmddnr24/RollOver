var express = require('express');
var router = express.Router();
var laboratory = require('../../db/laboratory');

/* GET home page : 실습실 목록 */
router.get('/', function (req, res, next) {
    // 실습실 목록 가져오기
    laboratory.find({}, function (err, labs) {
        if (err) throw err;
        res.json(labs);
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
    res.json({result: 'success'});
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
        res.json(lab);
    });
});

/* POST 실습실 컴퓨터 추가 */
router.post('/:laboratory', function (req, res) {
    //laboratory id에 해당하는 것을 찾고 computer 추가
    laboratory.findOne({_id: req.params.laboratory}, function (err, lab) {
        if (err) {
            res.json({result: 'error'});
        }
        if (!lab) {
            res.json({result: 'error', error: 'no such laboratory!'});
            res.status(404).send('no such laboratory!');
            return;
        }
        switch (req.body.type) {
            case 'add-computer': {
                lab.computers.push({
                    name: req.body.name,
                    location: req.body.location,
                    property: req.body.property,
                });
                lab.save();
                res.json({result: 'success', data: lab.computers[lab.computers.length - 1]});
                break;
            }
            case 'add-computers': {
                var coms = [];
                for (let i = 0; i < req.body.data.length; i++) {
                    const com = req.body.data[i];
                    lab.computers.push({
                        name: com.name,
                        location: com.location,
                        property: com.property,
                    });
                    coms.push(lab.computers[lab.computers.length - 1]);
                }
                lab.save();
                res.json({result: 'success', data: coms});
                break;
            }
            case 'resize-computer': {
                const _id = req.body._id;
                const W = req.body.W;
                const H = req.body.H;
                var com = null;
                for (let i = 0; i < lab.computers.length; i++) {
                    if (lab.computers[i]._id.toString() === _id) {
                        com = lab.computers[i];
                        break;
                    }
                }
                if (!com) {
                    res.json({result: 'error', error: 'no such computer'});
                    return;
                }
                com.location.W = W;
                com.location.H = H;
                res.json({result: 'success', data: {_id: _id, W: W, H: H}});
                lab.save();
                break;
            }
            case 'rename-computer': {
                const _id = req.body._id;
                const name = req.body.name;
                var com = null;
                for (let i = 0; i < lab.computers.length; i++) {
                    if (lab.computers[i]._id.toString() === _id) {
                        com = lab.computers[i];
                        break;
                    }
                }
                if (!com) {
                    res.json({result: 'error', error: 'no such computer'});
                    return;
                }
                com.name = name;
                res.json({result: 'success', data: {_id: _id, name: name}});
                lab.save();
                break;
            }
            case 'remove-computer': {
                const _id = req.body._id;
                const name = req.body.name;
                var com = null;
                for (let i = 0; i < lab.computers.length; i++) {
                    if (lab.computers[i]._id.toString() === _id) {
                        com = lab.computers[i];
                        break;
                    }
                }
                if (!com) {
                    res.json({result: 'error', error: 'no such computer'});
                    return;
                }
                lab.computers.pull(com);
                res.json({result: 'success', data: {_id: _id}});
                lab.save();
                break;
            }
            case 'move-computer': {
                const _id = req.body._id;
                var com = null;
                for (let i = 0; i < lab.computers.length; i++) {
                    if (lab.computers[i]._id.toString() === _id) {
                        com = lab.computers[i];
                        break;
                    }
                }
                if (!com) {
                    res.json({result: 'error', error: 'no such computer'});
                    return;
                }

                com.location.X = req.body.X;
                com.location.Y = req.body.Y;
                lab.save();
                res.json({result: 'success', data: {_id: _id, X: com.location.X, Y: com.location.Y}});
                break;
            }
            default: {
                res.json({result: 'error', error: 'no such type'});
            }
        }

    });
});

/* GET 실습실 컴퓨터 한 대 제보 */
router.get('/:laboratory/:computer', function (req, res) {
    // 실습실 컴퓨터 한 대의 제보 가져오기
    laboratory.findOne({_id: req.params.laboratory}, function (err, lab) {
        if (err) throw err;
        if (!lab) {
            res.json({result: 'error', error: 'no such laboratory!'});
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
        res.json({com});
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
        res.json(report);
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
        switch (req.body.type) {
            case 'toggle-status': {
                report.status = req.body.data;
                lab.save();
                res.json({result: 'success'});
                break;
            }
            default : {
                report.comments.push({
                    author: req.user.id,
                    title: req.body.title,
                    content: req.body.content
                });
                lab.save();
                res.json({result: 'success'});
                break;
            }
        }
    });
});

module.exports = router;
