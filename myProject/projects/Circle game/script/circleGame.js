$(document).ready(function () {
    reloadMainDiv();
});

function reloadMainDiv() {
    $('#game').empty();
    $('#game').prepend('<div id="mainDiv"><div class="circle1 circle" onmouseover="endGame()"></div></div>')
    setTimer();
    stopTimer();

    $('#mainDiv').mousemove(function () {
        showCoords(event);
        moveTo()
    })

    $('.circle').hover(function () {
        endGame();
    })

    $('#mainDiv').mouseenter(function () {
        setTimer();
    });

    $('#mainDiv').mouseleave(function () {
        stopTimer();
        endGame();
        reloadMainDiv();
    });

    $('#timer').html("0");
    $('#mainDiv').append('<div id="alert"></div>');
    $('#alert').hide();
}

var x; //current cursor place
var y; // current cursor place

function showCoords(event) {
    x = event.clientX;
    y = event.clientY;
}

function moveTo() {
    var topPlace = ((y - 25) + "px");
    var leftPlace = ((x - 25) + "px");
    $('.circle').css("top", topPlace);
    $('.circle').css("left", leftPlace);
}

var lastHighScore = 0;

function endGame() {
    $('.circle').css("background-color", "red");
    lastHighScore = $('#highScore').html();
    currentTime = $('#timer').html();
    if (currentTime > lastHighScore) {
        $('#highScore').html(currentTime);
    }
    stopTimer();

    setTimeout(() => {
        reloadMainDiv();
    }, 100);
}

function setTimer() {
    var time = 00;
    $('#timer').html(time);
    $('#timer').css("color", "red");
    counter = setInterval(function () {
        time++;
        $('#timer').html(time);

        if (time < 5) {
        } else if (time % 5 == 0) {
            $("#level").html("שלב 2");
            $('#mainDiv').append('<div class="circle1 circle" onmouseover="endGame()"></div>');
        } else if (time % 7 == 0) {
            $('#mainDiv').append('<div class="circle2 circle" onmouseover="endGame()"></div>');
        } else if (time % 3 == 0) {
            $('#mainDiv').append('<div class="circle3 circle" onmouseover="endGame()"></div>');
        } else if (time % 11 == 0) {
            $('#mainDiv').append('<div class="circle4 circle" onmouseover="endGame()"></div>');
        } else if (time % 4 == 0) {
            $('#mainDiv').append('<div class="circle5 circle" onmouseover="endGame()"></div>');
        } else if (time % 13 == 0) {
            $('#mainDiv').append('<div class="circle6 circle" onmouseover="endGame()"></div>');
        } else if (time % 17 == 0) {
            $('#mainDiv').append('<div class="circle7 circle" onmouseover="endGame()"></div>');
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(counter);
}

$('#instructionButton').click(function () {
    $('#alert').slideToggle();
    isAlertShow = true;
    $('#alert').html('<h2>הוראות משחק</h2><p>נסה להחזיק כמה שיותר זמן בתוך הריבוע בלי שהעיגולים יגעו בך</p><p>שים לב! אחרי 5 שניות הקצב עולה ועוד עיגולים מתווספים<i class="fas fa-exclamation-triangle"></i></p>');
    $('#alert').append('<button id="alertButton">אישור</button>');
    $('#alertButton').click(function () {
        $('#alert').fadeOut();
        isAlertShow = false;
    });
});

function showAlertMessage(message) {
    $('#alert').show();
    $('#alert').html(message);
    $('#alert').append('<button id="alertButton">אישור</button>');
    $('#alertButton').click(function () {
        $('#mainSection').empty();
        boardLoad();
        if (uScore !== 0) {
            uScore--;
        }
        $('#userScore').empty();
        $('#userScore').append("תוצאה: " + uScore);
        isAlertShow = false;
    });
}