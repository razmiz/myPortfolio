var x = '<i class="fas fa-times"></i>';
var o = '<i class="far fa-circle"></i>';
var currentSign = "o";
var nextSign = "x";
var gameEnded = false;
var isAlertShow = false;

function isVsPc() {  // if true against PC
    var selectedRadio = $('input[name=chooseGame]:checked').val();
    return (selectedRadio == "pc");
}

$('.square').click(function () {
    var isEmpty = $(this).html();
    if (isEmpty == "") {
        if (currentSign != "x") {
            $(this).html(x);
            if (isVsPc() == false) {
                currentSign = "x";
            }
        } else {
            $(this).html(o);
            if (isVsPc() == false) {
                currentSign = "o";
            }
        }
    } else {
        showAlert('מקום זה כבר תפוס');
        $('#disableGame').show();
        isAlertShow = true;
    }

    if (currentSign == "o") {
        nextSign = "x"
    } else {
        nextSign = "o"
    }
    $('#current').empty();
    $('#current').append("הצורה הנוכחית: " + nextSign);

    if (isVsPc()) {
        var emptyCellsArray = getEmptyCellsArray();
        var randomCell = randomFromArray(emptyCellsArray);
        if (isAlertShow == false) {
            setTimeout(() => {
                $(randomCell).html(o);
                if (gameEnded != true) {
                    checkWinner();
                }
            }, 200);
        }
    }
    checkWinner();
});

function getCellValue(rowNumber, columnNumber) {
    return $('#s' + rowNumber + '-' + columnNumber).html();
}

function checkRow(rowNumber) {
    var firstValue = getCellValue(rowNumber, 1);
    if (firstValue == "") {
        return false;
    }
    for (var columnNumber = 1; columnNumber <= 3; columnNumber++) {
        var cellValue = getCellValue(rowNumber, columnNumber);
        if (cellValue != firstValue) {
            return false;
        }
    }
    return true;
}

function checkCol(columnNumber) {
    var firstValue = getCellValue(1, columnNumber);
    if (firstValue == "") {
        return false;
    }
    for (var rowNumber = 1; rowNumber <= 3; rowNumber++) {
        var cellValue = getCellValue(rowNumber, columnNumber)
        if (cellValue != firstValue) {
            return false;
        }
    }
    return true;
}

function checkAlachsonLeftTop() {
    var firstCell = getCellValue(1, 1);
    var secondCell = getCellValue(2, 2);
    var thirdCell = getCellValue(3, 3);
    if (firstCell === secondCell && secondCell === thirdCell && firstCell !== "") {
        return true;
    } else {
        return false;
    }
}

function checkAlachsonLeftBottom() {
    var firstCell = getCellValue(3, 1);
    var secondCell = getCellValue(2, 2);
    var thirdCell = getCellValue(1, 3);
    if (firstCell === secondCell && secondCell === thirdCell && firstCell !== "") {
        return true;
    } else {
        return false;
    }
}

function checkBoardFull() {
    for (rowNumber = 1; rowNumber <= 3; rowNumber++) {
        for (columnNumber = 1; columnNumber <= 3; columnNumber++) {
            var cellValue = getCellValue(rowNumber, columnNumber);
            if (cellValue == "") {
                return false;
            }
        }
    }
    return true;
}

function colorCell(rowNumber, columnNumber) {
    var cell = ('#s' + rowNumber + '-' + columnNumber);
    $(cell).css("color", "red");
}

function colorRow(rowNumber) {
    for (var colNumber = 1; colNumber <= 3; colNumber++) {
        colorCell(rowNumber, colNumber);
    }
}

function colorColumn(columnNumber) {
    for (var rowNumber = 1; rowNumber <= 3; rowNumber++) {
        colorCell(rowNumber, columnNumber);
    }
}

function colorAlachsonLeftTop() {
    colorCell(1, 1);
    colorCell(2, 2);
    colorCell(3, 3);
}

function colorAlachsonLeftBottom() {
    colorCell(3, 1);
    colorCell(2, 2);
    colorCell(1, 3);
}

function checkWinner() {

    var checkSq1 = $('#s1-1').html();
    var checkSq2 = $('#s1-2').html();
    var checkSq3 = $('#s1-3').html();
    var checkSq4 = $('#s2-1').html();
    var checkSq7 = $('#s3-1').html();

    if (checkRow(1)) {
        endGame();
        $('#winner').append("The Winner is: " + checkSq1);
        colorRow(1);
    } else if (checkRow(2)) {
        endGame();
        $('#winner').append("The Winner is: " + checkSq4);
        colorRow(2);
    } else if (checkRow(3)) {
        endGame();
        $('#winner').append("The Winner is: " + checkSq7);
        colorRow(3);
    } else if (checkCol(1)) {
        endGame();
        $('#winner').append("The Winner is: " + checkSq1);
        colorColumn(1);
    } else if (checkCol(2)) {
        endGame();
        $('#winner').append("The Winner is: " + checkSq2);
        colorColumn(2);
    } else if (checkCol(3)) {
        endGame();
        $('#winner').append("The Winner is: " + checkSq3);
        colorColumn(3);
    } else if (checkAlachsonLeftTop()) {
        endGame();
        $('#winner').append("The Winner is: " + checkSq1);
        colorAlachsonLeftTop()
    } else if (checkAlachsonLeftBottom()) {
        endGame();
        $('#winner').append("The Winner is: " + checkSq3);
        colorAlachsonLeftBottom()
    } else if (checkBoardFull() == true) {
        draw();
    } 

    var winMessage = $('#winner').html();
    if (winMessage != "") {
        $('#current').remove();
    }
}

function endGame() {
    gameEnded = true;
    setTimeout(() => {
        showAlert('יש לנו מנצח!');
        $('#winner').append('<br><button onclick= "reloadPage()">משחק חדש</button>');
        $('#disableGame').show();
    }, 300);
}

function draw() {
    gameEnded = true;
    setTimeout(() => {
        showAlert('תיקו!');
        $('#winner').append('<button onclick= "reloadPage()">משחק חדש</button>');
        $('#disableGame').show();
    }, 300);
}

function reloadPage() {
    window.location.reload();
}

function showAlert(message) {
    $('#alertMessage').show();
    $('#alertMessage').html(message);
    $('#alertMessage').append('<br><button>אישור</button>');
    isAlertShow = true;
    $('button').click(function () {
        $('#alertMessage').hide();
        $('#disableGame').hide();
        isAlertShow = false;
    });
}


function getEmptyCellsArray() {
    var emptyCellsArray = [];
    for (var rowNumber = 1; rowNumber <= 3; rowNumber++) {
        for (var columnNumber = 1; columnNumber <= 3; columnNumber++) {
            var cellValue = getCellValue(rowNumber, columnNumber);
            var cell = ('#s' + rowNumber + '-' + columnNumber);
            if (cellValue == "") {
                emptyCellsArray.push(cell);
            }
        }
    }
    return emptyCellsArray;
}

function randomFromArray(myArray) {
    var randomItem = (Math.floor(Math.random() * myArray.length));
    return myArray[randomItem];
}

function hidePlayerSelection() {
    $('#chooseGame').css("display", "none");
    $('#current').append("הצורה הנוכחית: " + nextSign);
}

// set SpaceKey for button's click
$(document).keydown(function (event) {
    if (isAlertShow == true) {
        if (event.which == 32) {
            $('button').click();
        }
    }
});