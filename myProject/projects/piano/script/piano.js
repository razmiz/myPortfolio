function playSound(note) {
    let thisNote = new Audio();
    thisNote.src = 'audio/audio' + note + '.mp3';
    thisNote.play();
}

var counter;
var simple = ['1C', '2D', '3E', '4F', '5G', '6A', '7B', '8C'];
var yonatan = ['5G', '3E', '3E', '', '4F', '2D', '2D', '', '1C', '2D', '3E', '4F', '5G', '5G', '5G', '', '5G', '3E', '3E', '', '4F', '2D', '2D', '', '1C', '3E', '5G', '5G', '1C'];
var furElise = ['10E', '9Ds', '10E', '9Ds', '10E', '7B', '9D', '8C', '6A', '', '1C', '3E', '6A', '7B', '', '3E', '5Gs', '7B', '8C', '', '3E', '10E', '9Ds', '10E', '9Ds', '10E', '7B', '9D', '8C', '6A', '', '1C', '3E', '6A', '7B', '', '3E', '8C', '7B', '6A'];
var toy = ['2Ds', '2Ds', '4Fs', '', '2Ds', '2Ds', '6As', '6As', '5Gs', '', '2Ds', '', '4Fs', '', '', '2Ds', '2Ds', '4Fs', '', '2Ds', '2Ds', '6As', '6As', '5Gs', '', '2Ds', '', '4Fs', '', '', '6As', '6As', '5Gs', '', '5Gs', '6As', '7B', '', '7B', '7B', '7B', '', '6As', '', '2Ds', '', '2Ds', '2Ds', '6As', '', '', '2Ds', '', '2Ds', '2Ds', '6As']
var timer;

function autoPlay(song, miliseconds) {
    counter = 0;
    stopMusic();
    timer = setInterval(function () {
        if (counter > song.length - 1) {
            clearInterval(timer);
            clearKeyColor(song[counter - 1]);
        } else {
            clearKeyColor(song[counter - 1]);
            if (song[counter] != '') {
                playSound(song[counter]);
                colorKey(song[counter]);
            }
            counter++;
        }
    }, miliseconds);
}

function stopMusic() {
    if (timer) {
        clearInterval(timer);
    }
    document.querySelectorAll('.active').forEach(function (element) {
        removeClass(element, 'active');
    });
}

function colorKey(note) {
    var keyElement = document.getElementById(note);
    if (keyElement != null) {
        keyElement.className += ' active ';
    }
}

function clearKeyColor(note) {
    if (note != null) {
        var keyElement = document.getElementById(note);
        if (keyElement != null) {
            removeClass(keyElement, 'active');
        }
    }
}

function removeClass(element, theClass) {
    // replace all class to "" (g=global):
    element.className = element.className.replace(new RegExp(theClass, 'g'), "");
}

var arrayWithElements = new Array();
var userSong = [];

//save user clicks to new array:
document.onclick = clickListener;

function clickListener(e) { 
    var clickedElement = (window.event)
        ? window.event.srcElement
        : e.target,
        tags = document.getElementsByTagName(clickedElement.tagName);

    for (var i = 0; i < tags.length; ++i) {
        if (tags[i] == clickedElement) {
            arrayWithElements.push({ tag: clickedElement.id });

            for (tag in arrayWithElements) {
                var userPress = arrayWithElements[tag].tag;
            }
            userSong.push(userPress);
        }
    }
}

function userRecord() { //התחל להקליט
    userSong = [];
    document.getElementById("recordIcon").style.color = "red";
}

function playUserRecord() {
    document.getElementById("recordIcon").style.color = "gold";
    autoPlay(userSong, 500);
}