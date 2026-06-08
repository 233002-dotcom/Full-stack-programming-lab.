$(document).ready(function() {
    function validateField(field, errorId, condition) {
        if (!condition) {
            field.addClass("error");
            $("#" + errorId).fadeIn(200);
            return false;
        } else {
            field.removeClass("error");
            $("#" + errorId).fadeOut(200);
            return true;
        }
    }

    // Validation on blur
    $("#username").blur(function() {
        validateField($(this), "usernameError", $(this).val().length >= 3);
    });

    $("#email").blur(function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        validateField($(this), "emailError", emailRegex.test($(this).val()));
    });

    $("#password").blur(function() {
        validateField($(this), "passwordError", $(this).val().length >= 6);
    });

    // Form submission
    $("#registrationForm").on("submit", function(event) {
        event.preventDefault();

        const isUserValid = validateField($("#username"), "usernameError", $("#username").val().length >= 3);
        const isEmailValid = validateField($("#email"), "emailError", /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($("#email").val()));
        const isPassValid = validateField($("#password"), "passwordError", $("#password").val().length >= 6);

        if (isUserValid && isEmailValid && isPassValid) {
            $("#registrationForm").fadeOut(300, function() {
                $("#successMessage").fadeIn(300);
            });
        }
    });
});
