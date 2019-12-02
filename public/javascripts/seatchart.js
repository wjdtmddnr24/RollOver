var curComputer = null;
var clickEvt = null;
var clickPos = null;
var stage = null;
var layer = null;
var backgroundMenuNode = null;
var computerMenuNode = null;

function initKonva() {
    backgroundMenuNode = document.getElementById('background-menu');
    computerMenuNode = document.getElementById('computer-menu');
    stage = new Konva.Stage({
        container: 'seat-chart',
        width: $('#seat-chart').width(),
        height: $('#seat-chart').height()
    });
    layer = new Konva.Layer();
    stage.add(layer);
}

function setBorder() {
    var Rect = new Konva.Rect({
        x: 0,
        y: 0,
        width: stage.width(),
        height: stage.height(),
        fill: 'white',
        stroke: 'black',
        strokeWidth: 2
    });
    Rect.on('contextmenu', function (e) {
        e.evt.preventDefault();
        clickEvt = e.evt;
        clickPos = stage.getPointerPosition();
        computerMenuNode.style.display = 'none';
        backgroundMenuNode.style.display = 'initial';
        backgroundMenuNode.style.top = e.evt.pageY - 5 + 'px';
        backgroundMenuNode.style.left = e.evt.pageX - 5 + 'px';
    });


    layer.add(Rect);
    // layer.add(background);
}

function setContextMenu() {
    window.addEventListener('click', () => {
        // hide menu
        backgroundMenuNode.style.display = 'none';
        computerMenuNode.style.display = 'none';
    });
}

/*
computer : {
_id,
name,
location : {}
}
 */
function deleteComputer() {
    //TODO 컴퓨터 지우기
    jQuery.ajax({
        url: '',
        type: 'POST',
        data: {
            type: 'remove-computer',
            _id: curComputer.com._id,
        },
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (result) {
            // console.log(result);
            if (result.result === 'success') {
                getCom(result.data._id).destroy();
                layer.draw();
            } else {
                alert('error!');
            }
        }
    });
}

function resizeComputer() {
    var text = prompt("너비와 높이를 띄어쓰기로 구분해서 입력해주세요.", `${curComputer.children[0].width()} ${curComputer.children[0].height()}`);
    if (text.length > 0 && text.split(' ').length >= 2 && !isNaN(parseInt(text.split(' ')[0])) && !isNaN(parseInt(text.split(' ')[1]))) {
        var x = parseInt(text.split(' ')[0]);
        var y = parseInt(text.split(' ')[1]);
        jQuery.ajax({
            url: '',
            type: 'POST',
            data: {
                type: 'resize-computer',
                _id: curComputer.com._id,
                W: x,
                H: y
            },
            dataType: 'json',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (result) {
                // console.log(result);
                if (result.result === 'success') {
                    getCom(result.data._id).children[0].size({
                        width: result.data.W,
                        height: result.data.H
                    });
                    layer.draw();
                } else {
                    alert('error!');
                }
            }
        });
    }
}

function renameComputer() {
    // TODO ajax 이름 바꾸기
    if (!curComputer.com || !curComputer.com._id) return;
    var text = prompt("변경할 이름을 입력하세요.", curComputer.children[1].text());
    if (text != null) {
        jQuery.ajax({
            url: '',
            type: 'POST',
            data: {
                type: 'rename-computer',
                _id: curComputer.com._id,
                name: text
            },
            dataType: 'json',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (result) {
                // console.log(result);
                if (result.result === 'success') {
                    getCom(result.data._id).children[1].text(result.data.name);
                    layer.draw();
                } else {
                    alert('error!');
                }
            }
        });

    }
}

function addComputer(computer) {
    if (computer == null) {
        // TODO ajax로 컴퓨터 추가
        var name = prompt("컴퓨터의 이름을 입력해주세요");
        if (name.length === 0) return;
        jQuery.ajax({
            url: '',
            type: 'POST',
            data: {
                type: 'add-computer',
                name: name,
                location: {X: clickPos.x, Y: clickPos.y, W: 50, H: 50},
                property: ''
            },
            dataType: 'json',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (result) {
                // result = JSON.parse(result);
                // console.log(result);
                if (result.result === 'success') {
                    addComputer(result.data);
                } else {
                    alert('error!');
                }
            }
        });
    } else {
        var group = new Konva.Group({
            draggable: true,
            /* dragBoundFunc: function (pos) {
                 return {
                     x: this.absolutePosition().x < 0 ? 0 : pos.x,
                     y: pos.y <= 0 ? 0 : pos.y
                 };
             }*/
        });
        var rect = new Konva.Rect({
            x: computer.location.X,
            y: computer.location.Y,
            width: computer.location.W,
            height: computer.location.H,
            fill: true ? '#00c853' : '#ff3d00', // TODO 상황에 따라 색 바꾸기
            stroke: '#616161',
            strokeWidth: 1
        });
        var text = new Konva.Text({
            x: rect.x() + 5,
            y: rect.y() + 5,
            text: computer.name,
            fontSize: 25,
            fontFamily: 'Calibri',
            fill: '#212121'
        });
        group.com = computer;
        group.add(rect);
        group.add(text);
        layer.add(group);
        group.on('mouseover', function () {
            document.body.style.cursor = 'pointer';
        });
        group.on('mouseout', function () {
            document.body.style.cursor = 'default';
        });
        group.on('dragend', function (e) {
            console.log('de', e);
            t = this;
            // console.log('e',this, this.x(), this.y());
            jQuery.ajax({
                url: '',
                type: 'POST',
                data: {
                    type: 'move-computer',
                    _id: this.com._id,
                    X: this.children[0].x() + this.x(),
                    Y: this.children[0].y() + this.y()
                },
                dataType: 'json',
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (result) {
                    // console.log(result);
                    if (result.result === 'success') {
                        console.log('move done');
                    } else {
                        alert('error!');
                    }
                }
            });

        });
        group.on('click', function (e) {
            // console.log(this.com._id);
            console.log('c', e);
            if (e.evt.button == 2) return;
            window.location.href += `/${this.com._id}`;
        });
        group.on('contextmenu', function (e) {
            console.log('cm', e);
            e.evt.preventDefault();
            clickEvt = e.evt;
            clickPos = stage.getPointerPosition();
            curComputer = e.currentTarget;
            backgroundMenuNode.style.display = 'none';
            computerMenuNode.style.display = 'initial';
            computerMenuNode.style.top = e.evt.pageY - 5 + 'px';
            computerMenuNode.style.left = e.evt.pageX - 5 + 'px';
        });
    }
    layer.draw();
}

function addComputers(computers) {
    if (computers == null) {
        // TODO ajax로 컴퓨터 추가 2
        computers = [];
        var text = prompt("행 개수와 열 개수를 띄어쓰기로 구분해서 입력해주세요.", `1 1`);
        if (text && text.length > 0 && text.split(' ').length >= 2 && !isNaN(parseInt(text.split(' ')[0])) && !isNaN(parseInt(text.split(' ')[1]))) {
            var y = parseInt(text.split(' ')[0]);
            var x = parseInt(text.split(' ')[1]);
            for (let i = 0; i < y; i++) {
                for (let j = 0; j < x; j++) {
                    computers.push({
                        name: 'com',
                        location: {X: clickPos.x + j * 60, Y: clickPos.y + i * 60, W: 50, H: 50}
                    });
                }
            }
            jQuery.ajax({
                url: '',
                type: 'POST',
                data: {
                    type: 'add-computers',
                    data: computers
                },
                dataType: 'json',
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (result) {
                    // result = JSON.parse(result);
                    // console.log(result);
                    if (result.result === 'success') {
                        addComputers(result.data);
                    } else {
                        alert('error!');
                    }
                }
            });
        }
    } else {
        computers.forEach(function (computer) {
            addComputer(computer);
        });
    }
}

function getCom(id) {
    for (let i = 0; i < layer.children.length; i++) {
        var group = layer.children[i];
        if (group.com && group.com._id === id) {
            return group;
        }
    }
}
