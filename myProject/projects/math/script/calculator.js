var lastpress = "";

function click1(number) {
    if (lastpress == "operator") {
        document.getElementById("screen").innerHTML = ""
    }
    if (document.getElementById("screen").innerHTML.length < 10) {
        document.getElementById("screen").innerHTML += number;
    }
    lastpress = "number";
}

var num1;
var sign = "";
function ClickOperator(operator) {
    num1 = document.getElementById("screen").innerHTML;
    num1 = Number(num1);
    lastpress = "operator";
    sign = operator;
}

var num2;
var uCal;

function showResult() {
    num2 = document.getElementById("screen").innerHTML;
    num2 = Number(num2);
    document.getElementById("screen").innerHTML = "";

    if (sign == "+") {
        uCal = num1 + num2;
    } else if (sign == "-") {
        uCal = num1 - num2;
    } else if (sign == "*") {
        uCal = num1 * num2;
    } else if (sign == "/") {
        uCal = num1 / num2;
    }
    document.getElementById("screen").innerHTML = parseFloat(uCal.toFixed(5));
}

function ClearScreen() {
    document.getElementById("screen").innerHTML = "";
    num1 = "";
    num2 = "";
    operator = "";
}




