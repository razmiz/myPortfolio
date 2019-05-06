$(document).ready(function () {
    boardLoad();
    function boardLoad() {
        $('#mainSection').append('<table id="tab"></table>');
        for (let i = 1; i <= 9; i++) {
            $('#tab').append("<tr id='t'></tr>");

            for (let k = 1; k <= 9; k++) {
                $('#t').append("<td><div id='k'></div></td>");
                $('#k').addClass('backgroundDivs');

                var id = "" + i + k;
                $('#k').addClass('square');

                $('#k').attr('id', id);
            }
            $('#t').removeAttr('id')
        }

        //keep the first div inside mainSection:
        var fRandom = Math.floor(Math.random() * 9);
        fRandom++;

        var id = "" + fRandom + 1;
        var lastDiv = id;
        $('#' + id).addClass('gold');
        $(".gold").html('<i class="fas fa-sign-out-alt"></i>');
        $('#' + id).removeClass('backgroundDivs');

        for (let i = 3; i <= 9; i += 2) {
            fRandom = Math.floor(Math.random() * 9);
            fRandom++;

            var thisId = "" + fRandom + i;
            $('#' + thisId).addClass('black');
            $('#' + thisId).removeClass('backgroundDivs');

            //connect the random divs
            colorCon(lastDiv, thisId);

            lastDiv = thisId;
        }

        function colorCon(num1, num2) {
            if (num1[0] < num2[0]) {
                //num1 bigger
                var count = 1;
                while (count < 3) {
                    var idConnect = "" + num1[0] + (num1[1] * 1 + count);
                    $('#' + idConnect).addClass('black');
                    $('#' + idConnect).removeClass('backgroundDivs');
                    count++;
                }
                for (let i = Number(num1[0]) + 1; i <= num2[0]; i++) {
                    var idCon = "" + i + num2[1];
                    $('#' + idCon).addClass('black');
                    $('#' + idCon).removeClass('backgroundDivs');
                }

            } else if (num1[0] == num2[0]) {
                //same row
                var count = 1;
                var idConnect = "" + num1[0] + (num1[1] * 1 + 1);
                $('#' + idConnect).addClass('black');
                $('#' + idConnect).removeClass('backgroundDivs');

            } else {
                //num2 lower
                var count = 1;
                while (count < 3) {
                    var idConnect = "" + num1[0] + (num1[1] * 1 + count);
                    $('#' + idConnect).addClass('black');
                    $('#' + idConnect).removeClass('backgroundDivs');
                    count++;
                }
                for (let i = Number(num1[0]) - 1; i >= num2[0]; i--) {
                    var idCon = "" + i + num2[1];
                    $('#' + idCon).addClass('black');
                    $('#' + idCon).removeClass('backgroundDivs');
                }
            }

            var idFirst = 0;
            var idLast = 0;
            for (let i = 1; i <= 9; i++) {
                var idNow = "" + i + 9;

                if ($('#' + idNow).hasClass('black')) {
                    var isFirst = true;
                    var islast = true;
                    //first
                    if (i > 1) {
                        for (let k = i - 1; k > 0; k--) {
                            var idN = "" + k + 9;
                            if ($('#' + idN).hasClass('black')) {
                                isFirst = false;
                            }
                        }
                        if (isFirst) {
                            idFirst = idNow;
                        }
                    } else {
                        idFirst = 19;
                    }

                    //last
                    for (let j = i + 1; j <= 9; j++) {
                        var idN = "" + j + 9;
                        if ($('#' + idN).hasClass('black')) {
                            islast = false;
                        }
                    }
                    if (islast) {
                        idLast = idNow;
                    }
                }
            }
            //find the very last div and color it to red:
            var firstLeft = idFirst[0] + (Number(idFirst[1]) - 1);
            if ($('#' + firstLeft).hasClass('black')) {
                $('#' + idLast).addClass('red');
            } else {
                $('#' + idFirst).addClass('red');
            }
            if ($('#19').hasClass('red')) {
                if ($('#18').hasClass('black')) {
                    $('#19').removeClass('red');
                    $('#' + idLast).addClass('red');
                }
            }
            $('.red').html('<i class="fas fa-sign-out-alt"></i>');
        }

        //set timer
        $('#timer').html("00:10");

        function setTimer() {
            var time = 10;
            $('#timer').html("00:" + time);
            $('#timer').css("color", "red");
            countDown = setInterval(function () {
                time--;
                if (time < 10) {
                    $('#timer').html("00:0" + time);
                } else {
                    $('#timer').html("00:" + time);
                }
                if (time == 0) {
                    stopTimer();
                    showLosingAlert('<h2>נגמר הזמן! הפסדת נקודה, נסה שוב</h2>');
                }
            }, 1000);

            if (isAlertShow == true) {
                stopTimer();
                $('.backgroundDivs').css('animation', 'none');
            }
        }

        //the game:
        $('.gold').one("mouseenter", function () {
            $('.backgroundDivs').css('animation', 'change-background 4s ease infinite');
            setTimer();

            $('.backgroundDivs').mouseover(function () {
                if (isDone() == false && isAlertShow == false) {
                    outOfRoad();
                }
            });

            $('.black').mouseover(function () {
                if (isAlertShow == false) {
                    black(this);
                }
            });

            $('.red').mouseover(function () {
                if (isDone() == true) {
                    endGame();
                }
            });
        })

        $('#mainSection').append('<div id="alert"></div>');
        $('#alert').hide();
        $('#timer').css("color", "grey");
    }

    var isAlertShow = false;

    function black(element) {
        element.style.backgroundColor = "gold";
    }

    function showLosingAlert(message) {
        $('#alert').show();
        isAlertShow = true;
        $('.backgroundDivs').css('animation', 'none');
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

    function outOfRoad() {
        stopTimer();
        showLosingAlert('<h2>נגעת בשטח אסור<BR> הפסדת נקודה! נסה שוב</h2>');
    }

    function stopTimer() {
        clearInterval(countDown);
    }

    //check if all black divs are colored gold:
    function isDone() {
        var wellDone = 0;
        var x = document.getElementsByClassName("black");
        for (var i = 0; i < x.length; i++) {
            var eColor = getComputedStyle(x[i], null).getPropertyValue("background-color");
            if (eColor == "rgb(255, 215, 0)") {
                wellDone++;
            }
        }
        return (wellDone == x.length);
    }

    function endGame() {
        if (isDone()) {
            $('#alert').show();
            isAlertShow = true;
            $('.backgroundDivs').css('animation', 'none');
            $('#alert').html('<h2>כל הכבוד! קיבלת נקודה</h2>');
            $('#alert').append('<button id="alertButton">אישור</button>');

            $('#alertButton').click(function () {
                $('#mainSection').empty();
                boardLoad();
                uScore++;
                $('#userScore').empty();
                $('#userScore').append("תוצאה: " + uScore);
                isAlertShow = false;
            });

            stopTimer();
        }
    }

    // set SpaceKey for alert button's click
    $(document).keydown(function (event) {
        if (isAlertShow == true) {
            if (event.which == 32) {
                $('#alertButton').click();
                isAlertShow = false;
            }
        }
    });
    addToTable()
});

$('#instructionButton').click(function () {
    $('#alert').slideToggle();
    isAlertShow = true;
    $('#alert').html('<h2>הוראות משחק</h2><p>נסה לעבור עם העכבר מהנקודה הצהובה אל הנקודה האדומה לפי השביל המסומן</p><p>!שים לב! יש רק 10 שניות למסלול<i class="fas fa-exclamation-triangle"></i></p>');
    $('#alert').append('<button id="alertButton">אישור</button>');

    $('#alertButton').click(function () {
        $('#alert').fadeOut();
        isAlertShow = false;
    });
});

var uScore = 0;
$('#score').html("<span id='userScore'>תוצאה: 0</span> ");

function saveScore() {
    var userName = prompt("רשום את שמך");
    if (userName) {
        var playerInfo = { playerName: userName, playerScore: uScore };
        var playerArray = [];
        if (sessionStorage.listOfPlayers) {
            playerArray = JSON.parse(sessionStorage.listOfPlayers);
        }

        playerArray.push(playerInfo);
        sessionStorage.listOfPlayers = JSON.stringify(playerArray);
        addToTable();
    }
}

function addToTable() {
    var savedInfo = [];
    if (sessionStorage.listOfPlayers) {
        $('#highScores tbody').empty();
        savedInfo = JSON.parse(sessionStorage.listOfPlayers);
        savedInfo.sort(function (playerA, playerB) {    // sort savedInfo by playerScore
            if (playerA.playerScore > playerB.playerScore) {
                return -1;  // if playerA score is higher -> move to top
            } else if (playerA.playerScore < playerB.playerScore) {
                return 1; // if playerB score is higher -> move player A to bottom
            } else {
                return 0;
            }
        });
        for (var key in savedInfo) {
            console.log(savedInfo[key]);
            $('#highScores tbody').append("<tr><td>" + savedInfo[key].playerScore + "</td><td>" + savedInfo[key].playerName + "</td></tr>")
        }
    }
}