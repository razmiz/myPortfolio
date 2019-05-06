$(document).ready(function () {
    $('input[type="checkbox"]').click(function () {
        varThisID = '#' + this.value;
        if ($(this).prop("checked") == true) {
            $(varThisID).css('display', 'block'); // display the addOns according to the choise
        }
        else {
            $(varThisID).css('display', 'none'); // remove the addOns 
        }
    });

    $("#pizzaSize").change(function () {
        var str;
        $("#pizzaSize option:selected").each(function () {
            str = $(this).text();
        });

        if (str == 'S') {
            $('.pizzaImages').css({ "-webkit-transform": "scale(1)" });
        } else if (str == "M") {
            $('.pizzaImages').css({ "-webkit-transform": "scale(1.4)" });
        } else if (str == "L") {
            $('.pizzaImages').css({ "-webkit-transform": "scale(1.9)" });
        }
    })
        .trigger("change");
});

function showAdress() {
    document.getElementById('address').style.display = "inline-block";
}
function hideAdress() {
    document.getElementById('address').style.display = "none";
}


$('#send').click(function () {
    isValid = checkValidation();
    if (isValid == true) {
        getOrderNumber();
        var counter = 4;
        var uDetails = $("form").serializeArray();
        console.log(uDetails);
        uDetails.unshift({ name: "orderNumber", value: orderNumber });
        localStorage.setItem("userDetails" + orderNumber, JSON.stringify(uDetails));

        var userName = $('#uName').val();
        var lastName = $('#uLastName').val();
        $('#messageForUser').css("display", "block");
        $('#messageForUser').empty();
        $('#messageForUser').append("<h3 id='thankHeadline'>תודה " + userName + " " + lastName + ",</h3>" + "<h4>הזמנתך התקבלה בהצלחה</h4><p>", "מספר הזמנתך הוא: " + orderNumber + "</p><div id='counter'>" + 5 + "</div>");
        countDown = setInterval(function () {

            if ($('#counter').html() != "") {
                $('#counter').html("<div id='counter'>" + counter + "</div>")
            } else {
                $('#counter').html("<div id='counter'>" + counter + "</div>")
            }
            counter--;
            if (counter == 0) {
                clearInterval(countDown);
            }
        }, 1000);

        $('#sendInput').click(function (e) {
            e.preventDefault();
            setTimeout(function () {
            }, 5000);
        });

        setTimeout(function () {
            $('#messageForUser').css("display", "none");
            $("form").trigger('reset');
            $('.pizzaImages').css("display", "none");
            $('#basePizza').css("display", "block");
            $('.pizzaImages').css({ "-webkit-transform": "scale(1)" });

            hideAdress();
        }, 5000);

    } else {
        $('#sendInput').click(function (e) {
            e.preventDefault();
        });
    }
});

var orderNumber = "";

function getOrderNumber() {
    orderNumber = Math.floor(Math.random() * 1000000);
    return;
}

function checkValidation() {
    var firstName = $.trim($('#uName').val());
    var lastName = $.trim($('#uLastName').val());
    var pickOrDel1 = $("#delivery").prop("checked");
    var pickOrDel2 = $("#pick").prop("checked");
    var uStreet = $.trim($('#street').val());
    var uCity = $.trim($('#city').val());

    var namereg = /^[a-zA-Zא-ת ]+$/;

    $('input').focus(function () {
        $('input').removeClass('error');
    });

    if (firstName.length < 2 || firstName.length > 30 || !namereg.test(firstName)) {
        $('#uName').addClass('error');
    } if (lastName.length < 2 || lastName.length > 30 || !namereg.test(lastName)) {
        $('#uLastName').addClass('error');
    } else if ((pickOrDel1 == false) && (pickOrDel2 == false)) {
        $('#mustChoose').css("display", "block");
        setTimeout(function () {
            $('#mustChoose').css("display", "none");
        }, 2000);
    }
    else {
        return true;
    }
}

$("#showButton").click(function () {
    $("#ordersTable").toggle()
    $(".findOrderRadio").toggle();
    $('#deleteDiv').toggle();
});

function savedNumber() {
    var userOrderNumberToShow = prompt("הכנס מספר הזמנה שמור")
    if (userOrderNumberToShow == null) {
        return;
    }
    $('#ordersTable').css("display", "table");
    var userData = {};
    userData = localStorage.getItem('userDetails' + userOrderNumberToShow);
    while (userData == null) {
        userOrderNumberToShow = prompt("מספר לא קיים, אנא הכנס מספר תקין")
        if (userOrderNumberToShow == null) { //the user pressed "Cancel"
            break;
        }
        userData = localStorage.getItem('userDetails' + userOrderNumberToShow);
    }
    var dataObject = {};
    dataObject = JSON.parse(userData);

    if (dataObject != null) {
        var insideData = {};
        for (var key in dataObject) {
            insideData[dataObject[key].name] = dataObject[key].value;
        }
        var addOns = [];
        for (var key in dataObject) {
            if (dataObject[key].name == "addOn") {
                addOns.push(dataObject[key].value)
            }
        }
        var result = "";

        if (userOrderNumberToShow != undefined) {
            result += "<tr id=tr" + userOrderNumberToShow + ">";
            result += "<td>" + insideData.orderNumber + "</td>";
            result += "<td>" + insideData.uName + "</td>";
            result += "<td>" + insideData.uLastName + "</td>";
            result += "<td>" + insideData.pickOrDel + "</td>";
            result += "<td>" + insideData.street + "</td>";
            result += "<td>" + insideData.city + "</td>";
            result += "<td>" + insideData.pizzaSize + "</td>";
            result += "<td>" + addOns + "</td>";
            result += "</tr>";
        }
        document.getElementById('userTable').innerHTML += result;
    }
}

function showLastOrder() {
    $('#ordersTable').css("display", "table");
    var userData = {};
    userData = localStorage.getItem('userDetails' + orderNumber);
    var dataObject = {};
    dataObject = JSON.parse(userData);
    if (dataObject == null) {
        alert("לא קיימת הזמנה אחרונה");
    }

    var insideData = {};
    for (var key in dataObject) {
        insideData[dataObject[key].name] = dataObject[key].value;
    }

    var addOns = [];
    for (var key in dataObject) {
        if (dataObject[key].name == "addOn") {
            addOns.push(dataObject[key].value)
        }
    }

    var result = "";

    if (orderNumber != "") {
        result += "<tr id=tr" + orderNumber + ">";
        result += "<td>" + insideData.orderNumber + "</td>";
        result += "<td>" + insideData.uName + "</td>";
        result += "<td>" + insideData.uLastName + "</td>";
        result += "<td>" + insideData.pickOrDel + "</td>";
        result += "<td>" + insideData.street + "</td>";
        result += "<td>" + insideData.city + "</td>";
        result += "<td>" + insideData.pizzaSize + "</td>";
        result += "<td>" + addOns + "</td>";
        result += "</tr>";
    }
    document.getElementById('userTable').innerHTML += result;

    $("form").trigger('reset');
    orderNumber = "";
    $('.pizzaImages').css("display", "none");
    $('#basePizza').css("display", "block");
    $('.pizzaImages').css({ "-webkit-transform": "scale(1)" });
}

function deleteOrder() {
    var userOrderNumberToDelete = $("#userOrderNumberToDelete").val();
    localStorage.removeItem("userDetails" + userOrderNumberToDelete);
    let orderRow = document.getElementById("tr" + userOrderNumberToDelete);

    if (orderRow == null) {
        $("#userOrderNumberToDelete").attr("placeholder", "נא להכניס מספר הזמנה ");
        $("#userOrderNumberToDelete").val("");
        $("#userOrderNumberToDelete").css("border-bottom", "3px solid red");
    } else {
        $("#userOrderNumberToDelete").css("border-bottom", "3px solid green");
        $(orderRow).remove();
        $("#userOrderNumberToDelete").val("");
    }
}