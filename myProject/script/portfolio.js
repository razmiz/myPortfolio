
$('#contactImage').click(function () {
    $('#contactForm').toggle("display", "block");
});

$('.contactMe').click(function () {
    $('#contactForm').css("display", "block");
});



$(document).ready(function () {
    var scrollTop = 0;
    $(window).scroll(function () {
        scrollTop = $(window).scrollTop();
        if (scrollTop >= 100) {
            $('#logo').css("display", "block");
        } else {
            $('#logo').css("display", "none");
        }
    });
});

function send() {
    var firstName = $.trim($('#firstName').val());
    var email = $.trim($('#email').val());
    var phone = $.trim($('#phone').val());
    var namereg = /^[a-zA-Zא-ת ]+$/;
    var emailreg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    var phonereg = /^[0-9-+]+$/;

    $('input').focus(function () {
        $('input').removeClass('error');
    });

    if (firstName.length < 2 || firstName.length > 30 || !namereg.test(firstName)) {
        $('#firstName').addClass('error');
        $('#firstName').attr('placeholder', '  * נא להקליד שם');
    } if (phone.length < 9 || phone.length < 10 || !phonereg.test(phone)) {
        $('#phone').addClass('error');
        $('#phone').attr('placeholder', '* נא להקליד מספר טלפון');
    } if (email.length < 5 || email.length > 40 || !emailreg.test(email)) {
        $('#email').addClass('error');
        $('#email').attr('placeholder', ' * נא להכניס כתובת מייל תקינה ');
    } else {
        $("#message").html('<span>תודה! <BR> הודעתך נשלחה בהצלחה</span>');
        $("#myForm").hide();
        contactDetails();
        clearForm();
        $('#contactForm').toggle("display", "none");

        setTimeout(function () {
            $("#myForm").submit();
            $("#message").html('');
        }, 2000);
    }
}

function contactDetails() {
    var uDetails = $("form").serializeArray();
    var userObject = {};
    for (var i = 0; i < uDetails.length; ++i)
        if (uDetails[i] !== undefined) userObject[i] = uDetails[i];
    console.log(userObject);
}

function clearForm() {
    $('#firstName').val("");
    $('#email').val("");
    $('#phone').val("");
    $('#uText').val("");
    $(':input').removeAttr('placeholder');
}