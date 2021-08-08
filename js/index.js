// jshint esversion: 6
// Defaualt States..
$(".reset").attr("disabled", true);
$(".resultField").val("$0.00");
$("#customEntry").hide();
$(".cbz").hide();

// Custom btn click state
$(".custom").on("click", () => {
    $(".reset").attr("disabled", false);
    $(".selectTip").css("color", "inherit");
    $(".reset").addClass("btnClick");
    $(".custom").hide();
    $(".Btn").removeClass("btnClick");
    $("#customEntry").slideToggle();
});


// Tip buttons Clicked 
$(".Btn").on("click", () => {
    $(".reset").attr("disabled", false);
    $(".reset").addClass("btnClick");
    $("#customEntry").hide();
    $(".custom").slideDown();
    $("#customEntry").val("");
    $(".selectTip").css("color", "inherit");
    $("#customEntry").css("border-color", "hsl(189, 41%, 97%)");
    btnClass = "#" + event.target.id;  
    // event is depracated do not use. I had to because this.id , $(this).attr("id") were not working
    $(".Btn").removeClass("btnClick");
    $(btnClass).addClass("btnClick");
});


// Reset Buttons clicked
$(".reset").on("click", () => {
    $(".resultField").val("$0.00");
    $(".parameterInput").val("");
    $(".selectTip").css("color", "inherit");
    $(".Btn").removeClass("btnClick");
    $("#customEntry").hide();
    $(".custom").slideDown();
    $(".reset").removeClass("btnClick");
    $(".cbz").fadeOut();
    $(".parameterInput").css("border-color", "hsl(189, 41%, 97%)");
    $(".reset").attr("disabled", true);
});


// Keydown for Enter
$(document).on("keydown", (e) => {
    if (e.key == "Enter") {
        // List of all tip btns except custom
        btnList = $(".Btn").get();
        // custom tip yes or no default yes == Y
        customYN = "Y";
        // loop to check if any tip btn has class btnClick..
        for (i = 0; i < 5; i++) {
            if (btnList[i].classList.contains("btnClick")) {
                tipPercent = btnList[i].id;
                // if true cutsom tip == No == N
                customYN = 'N';
                break;
            }
        }
        // Running tip calculator
        if (customYN == "N") {
            tipMathCalc(tipPercent);
        } else {
            // Checking if custom tip has empty field or not
            tipPercent = $("#customEntry").val();
            if (tipPercent != "") {
                $(".selectTip").css("color", "inherit");
                $("#customEntry").css("border-color", "hsl(172, 67%, 45%)");
                tipMathCalc(tipPercent);
            } else {
                // displaying error msg
                $(".selectTip").css("color", "red");
                $("#customEntry").css("border-color", "red");
            }
        }
    }
    // enabling reset button adding btn click class
    $(".reset").attr("disabled", false);
    $(".reset").addClass("btnClick");
});

function tipMathCalc(tipPercent) {
    // removing cbz.
    $(".cbz").fadeOut();
    // list of input fields 
    var listOfVals = ["#bill", "#numOfPeople"];
    // loop to check validity of input
    for (i = 0; i < 2; i++) {
        term = $(listOfVals[i]).val();
        if (term == "") {
            if (listOfVals[i] == "#numOfPeople") {
                $(".cbz").fadeIn();
                $(listOfVals[i]).css("border-color", "red");
            } else {
                $(listOfVals[i]).css("border-color", "red");
            }
        } else {
            for (m = 0; m < term.length; m++) {
                if (term[0] != "0") {
                    var validList = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
                    if (validList.includes(term[m])) {
                        $(listOfVals[i]).css("border-color", "hsl(172, 67%, 45%)");

                    } else {
                        $(listOfVals[i]).css("border-color", "red");
                    }
                } else {
                    if (listOfVals[i] == "#numOfPeople") {
                        $(".cbz").fadeIn();
                        $(listOfVals[i]).css("border-color", "red");
                    } else {
                        $(listOfVals[i]).css("border-color", "red");
                    }
                }
            }
        }
    }
    // executing the tip calculator
    if ($(listOfVals[0]).css("border-color") == "rgb(38, 192, 171)" && $(listOfVals[1]).css("border-color") == "rgb(38, 192, 171)") {
        $(".cbz").fadeOut();
        setTimeout(() => {
            var bill = $("#bill").val();
            var numOfPeople = $("#numOfPeople").val();
            var tipPerPerson = (tipPercent / 100) * bill;
            var tipPerPersonRounded = tipPerPerson.toFixed(2);
            var totalTip = tipPerPersonRounded * parseInt(numOfPeople);
            $("#tipPerPerson").val("$" + tipPerPersonRounded);
            $("#totalTip").val("$" + totalTip);
            $(".parameterInput").css("border-color", "hsl(189, 41%, 97%)");
        }, 700);
    }
}