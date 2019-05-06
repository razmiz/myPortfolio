function reset() {
    document.location.reload(true);
}

function designBox() {
    var valBackgroundColor = document.getElementById("uBackgroundColor").value;
    var valHight = document.getElementById("uHeight").value + "px";
    var valWidth = document.getElementById("uWidth").value + "px";
    var valHeaderText = document.getElementById("uHeaderText").value;
    var valText = document.getElementById("uText").value;
    var valSize = document.getElementById("inputGroupSelect01").value + "px";
    var valColor = document.getElementById("uColor").value;
    var box = document.getElementById("myBox");
    var headerBox = document.getElementById("headerBox");
    var headerColor = document.getElementById("headerColor").value;
    
    box.style.backgroundColor = valBackgroundColor;
    box.style.width = valWidth;
    box.style.height = valHight;
    box.innerHTML = valText;
    box.style.fontSize = valSize;
    box.style.color = valColor;
    headerBox.innerHTML = '<h2><u>' + valHeaderText + '</u></h2>';
    headerBox.style.color = headerColor
}

var chooseBG = document.getElementById("chooseBackground");

function clickToChoose() {
    if (chooseBG.style.display === "block") {
        chooseBG.style.display = "none";
    } else {
        chooseBG.style.display = "block";
    }
}

function myBackground(cardNumber) {
    var boxStyle = document.getElementById("myBox").style;
    boxStyle.backgroundImage = "url('backgrounds/background" + cardNumber + ".jpg')"
}

function noBackground() {
    document.getElementById("myBox").style.backgroundImage = "none";
    document.getElementById("myBox").style.backgroundColor = "";
}