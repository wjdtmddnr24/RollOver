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
        backgroundMenuNode.style.top = e.evt.clientY - 5 + 'px';
        backgroundMenuNode.style.left = e.evt.clientX - 5 + 'px';
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
}

function resizeComputer() {
    var text = prompt("너비와 높이를 띄어쓰기로 구분해서 입력해주세요.", `${curComputer.children[0].width()} ${curComputer.children[0].height()}`);
    if (text.length > 0 && text.split(' ').length >= 2 && !isNaN(parseInt(text.split(' ')[0])) && !isNaN(parseInt(text.split(' ')[1]))) {
        var x = parseInt(text.split(' ')[0]);
        var y = parseInt(text.split(' ')[1]);
        curComputer.children[0].size({
            width: x,
            height: y
        });
        layer.draw();
    }
}

function renameComputer() {
    // TODO ajax 이름 바꾸기
    var text = prompt("변경할 이름을 입력하세요.", curComputer.children[1].text());
    if (text != null) {
        curComputer.children[1].text(text);
        layer.draw();
    }
}

function addComputer(computer) {
    if (computer == null) {
        // TODO ajax로 컴퓨터 추가
        addComputer({name: 'test', location: {X: clickPos.x, Y: clickPos.y, W: 50, H: 50}});
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
        group.add(rect);
        group.add(text);
        layer.add(group);
        group.on('mouseover', function () {
            document.body.style.cursor = 'pointer';
        });
        group.on('mouseout', function () {
            document.body.style.cursor = 'default';
        });
        group.on('contextmenu', function (e) {
            e.evt.preventDefault();
            clickEvt = e.evt;
            clickPos = stage.getPointerPosition();
            curComputer = e.currentTarget;
            backgroundMenuNode.style.display = 'none';
            computerMenuNode.style.display = 'initial';
            computerMenuNode.style.top = e.evt.clientY - 5 + 'px';
            computerMenuNode.style.left = e.evt.clientX - 5 + 'px';
        });
    }
    layer.draw();
}

function addComputers(computers) {
    if (computers == null) {
        // TODO 사용자 크기 입력 받기
        // TODO ajax로 컴퓨터 추가 2
        computers = [];
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++)
                computers.push({name: 'test', location: {X: clickPos.x + j * 60, Y: clickPos.y + i * 60, W: 50, H: 50}})
        }
        addComputers(computers);
    } else {
        computers.forEach(function (computer) {
            addComputer(computer);
        });
    }
}

$(document).ready(function () {
    /* $('#seat-chart').resize(function () {
         stage.width($('#seat-chart').width());
         stage.height($('#seat-chart').height());
     });*/

    initKonva();
    setBorder();
    setContextMenu();

    for (let i = 1; i < 5; i++) {
        addComputer({name: `${i}`, location: {X: i * 60, Y: 20, W: 50, H: 50}});
    }

    layer.draw();
});