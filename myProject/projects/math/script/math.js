
function onload(userAnswerId, num1Id, num2Id, operatorId, maxNum, operators) {
    var num1 = Math.floor((Math.random() * maxNum)) + 1;
    var num2 = Math.floor((Math.random() * maxNum)) + 1;
    num1 = Number(num1);
    num2 = Number(num2);
    document.getElementById(num1Id).innerHTML = num1;
    document.getElementById(num2Id).innerHTML = num2 + " ";

    var op = operators[Math.floor(Math.random() * operators.length)]
    if (op == "÷") {
        document.getElementById(userAnswerId).title = "במקרה של שבר עשרוני, יש לרשום עד 3 ספרות אחרי הנקודה";
    }
    document.getElementById(operatorId).innerHTML = op;
}

onload('userAnswer', 'num1', 'num2', 'operator', 10, ["+", "-"]);
onload('userAnswer2', 'num10', 'num20', 'operator2', 100, ["+", "-", "×", "÷"]);

function check(userMessageId, userAnswerId, num1Id, num2Id, operatorId, maxNum, operators) {
    var uAnswer = document.getElementById(userAnswerId).value;
    var num1 = document.getElementById(num1Id).innerHTML;
    num1 = Number(num1);
    var num2 = document.getElementById(num2Id).innerHTML;
    num2 = Number(num2);
    var op = document.getElementById(operatorId).innerHTML;
    if (uAnswer == "") {
        document.getElementById(userMessageId).innerHTML = "יש לכתוב תשובה";
        document.getElementById(userMessageId).style.color = "#2f2828";
        document.getElementById(userAnswerId).style.borderBottom = "4px solid red";
    } else if (op == "+") {
        if (num1 + num2 == uAnswer) {
            answerIsRight(userMessageId, userAnswerId);
        } else {
            answerIsWrong(userMessageId, userAnswerId);
        }
    } else if (op == "-") {
        if (num1 - num2 == uAnswer) {
            answerIsRight(userMessageId, userAnswerId);
        } else {
            answerIsWrong(userMessageId, userAnswerId);
        }
    } else if (op == "×") {
        if (num1 * num2 == uAnswer) {
            answerIsRight(userMessageId, userAnswerId);
        } else {
            answerIsWrong(userMessageId, userAnswerId);
        }
    } else if (op == "÷") {
        var ans = num1 / num2;
        ans = ans.toFixed(3)  //עד 3 ספרות אחרי הנקודה
        console.log(ans);
        if (ans == uAnswer) {
            answerIsRight(userMessageId, userAnswerId);
        } else {
            answerIsWrong(userMessageId, userAnswerId);
        }
    }
    document.getElementById(userAnswerId).value = "";
    onload(userAnswerId, num1Id, num2Id, operatorId, maxNum, operators);
}

function answerIsRight(userMessageId, userAnswerId) {
    document.getElementById(userMessageId).innerHTML = "כל הכבוד! " + "<i class='far fa-smile'></i>";
    addScore();
    document.getElementById(userMessageId).style.color = "green";
    document.getElementById(userAnswerId).style.borderBottom = "";
}

function answerIsWrong(userMessageId, userAnswerId) {
    document.getElementById(userMessageId).innerHTML = "טעית" + " <i class='far fa-frown'></i>" + " נסה שנית";
    reduceScore();
    document.getElementById(userMessageId).style.color = "#ff3558";
    document.getElementById(userAnswerId).style.borderBottom = "";
}



function reset(userMessageId, userAnswerId, num1Id, num2Id, operatorId, maxNum, operators) {
    document.getElementById(userMessageId).innerHTML = "";
    document.getElementById(userAnswerId).style.borderBottom = "";
    document.getElementById(userAnswerId).title = "";
    onload(userAnswerId, num1Id, num2Id, operatorId, maxNum, operators);
}

function helpBar() {
    var cal = document.getElementById("fullBody").style;
    if (cal.display == "block") {
        cal.display = "none";
        document.getElementById("helper").innerHTML = "צריך עזרה? ";
        document.getElementById("helper2").innerHTML = "צריך עזרה? ";
    } else {
        cal.display = "block";
        document.getElementById("helper").innerHTML = "סגור מחשבון";
        document.getElementById("helper2").innerHTML = "סגור מחשבון";
    }
    document.getElementById("userAnswer").style.borderBottom = "";
    ClearScreen() // function is at: "calculator.js"
}

function openEasy() {
    var easy = document.getElementById("mainEasy");
    var adv = document.getElementById("mainAdvance");
    if (easy.style.display === "block") {
        easy.style.display = "none";
        document.getElementById("btnEasy").innerHTML = " קל (+,-) <i class='fas fa-sort-down'></i>";
    } else {
        easy.style.display = "block";
        document.getElementById("btnEasy").innerHTML = " קל (+,-) <i class='fas fa-sort-up'></i>";
    }
    if (easy.style.display === "block" && adv.style.display === "block") {
        easy.style.display = "block";
        adv.style.display = "none";
    }
    reset('userMessage', 'userAnswer', 'num1', 'num2', 'operator', 10, ['+', '-'])
}

function openAdvance() {
    var easy = document.getElementById("mainEasy");
    var adv = document.getElementById("mainAdvance");
    if (adv.style.display === "block") {
        adv.style.display = "none";
        document.getElementById("btnAdv").innerHTML = " מתקדם (+,-,÷,×) <i class='fas fa-sort-down'></i>";
    } else {
        adv.style.display = "block";
        document.getElementById("btnAdv").innerHTML = " מתקדם (+,-,÷,×) <i class='fas fa-sort-up'></i>";
    }
    if (adv.style.display === "block" && easy.style.display === "block") {
        adv.style.display = "block";
        easy.style.display = "none";
    }
    reset('userMessage2', 'userAnswer2', 'num10', 'num20', 'operator2', 100, ['+', '-', '÷', '×'])
}

var uScore = 0;
function addScore() {
    uScore++;
    document.getElementById("userScore").innerHTML = '1' + '<span id="plusFont">+</span>';
    var mySpan = document.getElementById("userScore");
    mySpan.classList.add("changeColor");
    setTimeout(() => {
        mySpan.classList.remove("changeColor");
        document.getElementById("userScore").innerHTML = uScore;
    }, 2000);
}

function reduceScore() {
    if (uScore != 0) {
        uScore--;
        document.getElementById("userScore").innerHTML = "1-";
        var mySpan = document.getElementById("userScore");
        mySpan.classList.add("changeColor");
        setTimeout(() => {
            mySpan.classList.remove("changeColor");
            document.getElementById("userScore").innerHTML = uScore;
        }, 2000);
    } else {
        var mySpan = document.getElementById("userScore");
        mySpan.classList.add("changeColor");
        setTimeout(() => {
            mySpan.classList.remove("changeColor");
            document.getElementById("userScore").innerHTML = uScore;
        }, 2000);
    }
}

//get the calculator move on drag:
var screen1 = document.getElementById("screen");

screen1.onmousedown = function (event) {
    console.log("onMouseDown");
    // make the calculator absolute and on top by z-index
    fullBody.style.position = 'absolute';
    fullBody.style.zIndex = 1000;
    // move it out of any current parents directly into body
    // to make it positioned relative to the body
    document.body.append(fullBody);
    // ...and put that absolutely positioned under the cursor
    moveAt(event.pageX, event.pageY);

    // centers the calculator at (pageX, pageY) coordinates
    function moveAt(pageX, pageY) {
        fullBody.style.left = pageX - screen1.offsetWidth / 2 + 'px';
        fullBody.style.top = pageY - screen1.offsetHeight / 2 + 'px';
        console.log(pageX, pageY, screen1.offsetHeight, screen1.offsetWidth);
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    // move the calculator on mousemove
    document.addEventListener('mousemove', onMouseMove);

    // drop the calculator
    document.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        screen1.onmouseup = null;
    };
};

var input = document.getElementById("userAnswer");
input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("checkAnswerButton").click();
    }
});

var input2 = document.getElementById("userAnswer2");
input2.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("checkAnswerButton2").click();
    }
});