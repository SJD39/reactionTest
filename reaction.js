var isTouchDevice = 'ontouchstart' in document.documentElement;
var html = document.getElementsByTagName('html')[0];
var body = document.getElementsByTagName('body')[0];
var content = document.getElementById('content');
var score_span = document.getElementById('score_span');
// 0 游戏未开始
// 1 随机延时中
// 2 等待用户操作
// 3 结算
var gameState = 0;
var startTime = 0;
var TimerID;

if (isTouchDevice) {
    window.ontouchstart = gameStart;
    window.ontouchend = gameEnd;
} else {
    window.onmousedown = gameStart;
    window.onmouseup = gameEnd;

    window.onkeydown = gameStart;
    window.onkeyup = gameEnd;
}

function initialize() {
    startTime = 0;
    body.style.backgroundColor = "#66ccff";
    score_span.style.color = '#a0ee00';
    score_span.innerText = "按下";
    explain.style.color = '#a0ee00';
    explain.innerText = "按下屏幕/键盘/鼠标开始测试";
}
initialize();

function TimerAnim() {
    if (gameState == 3) {
        return;
    }
    let score_num = new Date().getTime() - startTime;
    score_span.innerText = score_num + "ms";
    window.requestAnimationFrame(TimerAnim);
}

// 状态 1
function gameStart() {
    if (gameState != 0 && gameState != 3) {
        return;
    }
    gameState = 1;
    initialize();

    body.style.backgroundColor = "#FAAFBE";
    score_span.style.color = '#a0ee00';
    score_span.innerText = "准备";
    explain.style.color = '#a0ee00';
    explain.innerText = "准备松开屏幕/键盘/鼠标";

    let delayTime = 3000 + (Math.random() * 2000);

    TimerID = setTimeout(waitUser, delayTime);
}

// 状态 2
function waitUser() {
    gameState = 2;

    body.style.backgroundColor = "#dd4444";
    explain.innerText = "松开！";

    startTime = new Date().getTime();
    TimerAnim();
}

// 状态 3
function gameEnd() {
    if (gameState == 0) {
        return;
    }
    if (gameState == 1) {
        clearTimeout(TimerID);
        score_span.innerText = "提前";
        explain.innerText = "活在未来？按下鼠标/键盘/屏幕重新开始";
        gameState = 0;
    } else if (gameState == 2) {
        gameState = 3;
        let score_num = new Date().getTime() - startTime;
        score_span.innerText = score_num + "ms";
        explain.innerText = "你的成绩：" + score_num + "ms" + "，按下鼠标/键盘/屏幕重新开始";
    }
}

// 调整字体大小
function flexible() {
    html.style.fontSize = (body.clientWidth > 500 ? 500 : body.clientWidth) + "px";
}

window.onload = flexible;
window.onresize = flexible;