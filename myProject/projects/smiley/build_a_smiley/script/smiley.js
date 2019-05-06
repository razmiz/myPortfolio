
document.addEventListener("dragstart", function (event) {
    event.dataTransfer.setData("draggedObject", event.target.id);
    event.target.style.opacity = "0.4";
});

document.addEventListener("dragend", function (event) {
    event.target.style.opacity = "1";
});

document.addEventListener("dragenter", function (event) {
    if (event.target.className.indexOf("droptarget") > -1) {
        event.target.style.border = "3px dotted red";
    }
});

document.addEventListener("dragover", function (event) {
    event.preventDefault();
});

document.addEventListener("dragleave", function (event) {
    if (event.target.className.indexOf("droptarget") > -1) {
        event.target.style.border = "";
    }
});

document.addEventListener("drop", function (event) {
    event.preventDefault();
    if (event.target.className.indexOf("droptarget") > -1) {
        event.target.style.border = "";
        var data = event.dataTransfer.getData("draggedObject");
        event.target.appendChild(document.getElementById(data));
    }

    if (checkFullFace() == true) {
        setTimeout(() => {
            $('body').css("background-image", "url('../images/fireworks.gif')")
            $('.sideBar').remove();
            document.getElementById("logo").src = "images/R.P.N.png";
            $("#instructions").hide();
            $("#stickyNote").hide();            
        }, 200);
    }
});

function checkFullFace() {
    if ($("#leftEyeSpot").find('.eyes , .insideEye').length != 2) {
        return false;
    }
    if ($("#rightEyeSpot").find('.eyes , .insideEye').length != 2) {
        return false;
    }
    if ($("#mouthSpot").find('#tongue , #mouth').length != 2) {
        return false;
    }
    return true;
}

$("#instructions").click(function () {
    $("#stickyNote").slideToggle();
});

