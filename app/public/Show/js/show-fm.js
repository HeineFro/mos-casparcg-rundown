function checkOnAir() {
    var isOn = false;
    $("span:contains('On-Air')").each(function() {
        if ($(this).hasClass("active")) {
            isOn = true;
        }
    });
    if (isOn) {
        $(".pos-warn").hide();
    }
    return isOn;
}

$(document).ready(function() {
    $('nav ul li a').click(function() {
        $('ul li a').removeClass("active");
        $(this).addClass("active");
    });
});

$(document).ready(function() {
    sendCommand({ "gui": "sidsteOpdateretFisk" });
    // BtnToggle
    $(".flip").click(function() {
        if ($(this).parent().hasClass("panelcont")) {
            if ($(this).parent().find(".dagValgt").length) {
                if (!checkOnAir()) {
                    $(this).find("span").toggleClass("active");
                    checkOnAir();
                    ///funktion - playIn
                    sendCommand({ "resultat": "play" });
                    //sendtoCGcom('playIn');
                } else if ($(this).find('span:contains("On-Air")').hasClass("active")) {
                    sendCommand({ "resultat": "stop" });
                    //sendtoCGcom('playOut');
                    $(this).find("span").toggleClass("active");
                }
            } else if ($(this).find('span:contains("On-Air")').hasClass("active")) {

                $(this).find("span").toggleClass("active");
            } else {
                $(this).parent().parent().find(".warn").show();
                $(this).parent().parent().find(".warn").delay(1500).fadeOut();
            }
        } else {
            $(this).find("span").toggleClass("active");
        }
    });

    // BtnToggle LÅS vaegt
    $("#V1-BtnToggle").on("click", function() {
        if ($(this).find('span:contains("Lås vægt")').hasClass("active")) {
            sendCommand({ "scale": "unlock" });

        } else {
            ($(this).find('span:contains("Frigiv")').hasClass("off"))
            console.log("Vægt er låst !");

            sendCommand({ "scale": "lock" });

        }
    });
    $("#V3-BtnToggle").on("click", function() {
        if ($(this).find('span:contains("Lås vægt")').hasClass("active")) {
            sendCommand({ "scale": "trim" });

        } else {
            ($(this).find('span:contains("Frigiv")').hasClass("off"))
            console.log("trim");

            sendCommand({ "scale": "trim" });

        }
    });

    // BtnToggle Vægt On-Air
    $("#V2-BtnToggle").on("click", function() {
        if ($(this).find('span:contains("Off-Air")').hasClass("active")) {
            amcp(stop);
            console.log("stop");

        } else {
            ($(this).find('span:contains("On-Air")').hasClass("off"))
            console.log("Vægt er live");
            amcp(play);
        }
    });
    $("#V4-BtnToggle").on("click", function() {
        if ($(this).find('span:contains("Off-Air")').hasClass("active")) {
            amcp(stop);
            unLoad();

        } else {
            ($(this).find('span:contains("On-Air")').hasClass("off"))
            amcp(play);
            amcp(stopPreview);
        }
    });

    $("#V4-BtnToggle1").on("click", function() {
        if ($(this).find('span:contains("Off-Air")').hasClass("active")) {
            amcp(stop);
            unLoad();

        } else {
            ($(this).find('span:contains("On-Air")').hasClass("off"))
            amcp(play);
            amcp(stopPreview);
        }
    });


    // UPDATE - Button Animation

    $(".updatebutton").click(function() {
        sendCommand({ "resultat": "updateTemp" });
        // Reset progess bar width
        $(this).find(".update-progress-bar").css({ width: "5%" });
        // Reset Previous Stages
        $(this).find(".stage-2").stop().hide();
        $(this).find(".stage-3").stop().hide();
        // Stage 1
        $(this).find(".stage-1").stop().show().fadeOut();
        // Stage 2
        $(this).find(".stage-2").delay(300).fadeIn();
        $(this)
            .find(".update-progress-bar")
            .delay(400)
            .animate({ width: "100%" }, 800);
        setTimeout(function() {
            $(".stage-2").fadeOut();
        }, 1000);
        // Stage 3
        $(this).find(".stage-3").delay(1400).fadeIn().delay(300).fadeOut();
        // Return to beginning
        $(".stage-1").delay(2200).fadeIn();
    });

    /// BTNS Skilte
    // Største fisk
    $("#Sf-btnNo1").click(function() {
        sendCommand({ "resultat": "updateStorDag1" });
        $("#Sf-btnNo1").addClass("dagValgt");
        $("#Sf-btnNo2,#Sf-btnNo3,#Sf-btnNo4,#Sf-btnNo5").removeClass("dagValgt");
        $("#Bb-btnNo1,#Bb-btnNo2,#Bb-btnNo3,#Bb-btnNo4,#Bb-btnNo5").removeClass(
            "dagValgt"
        );
        console.log("Største fisk dag 1");
    });

    $("#Sf-btnNo2").click(function() {
        sendCommand({ "resultat": "updateStorDag2" });
        $("#Sf-btnNo2").addClass("dagValgt");
        $("#Sf-btnNo1,#Sf-btnNo3,#Sf-btnNo4,#Sf-btnNo5").removeClass("dagValgt");
        $("#Bb-btnNo1,#Bb-btnNo2,#Bb-btnNo3,#Bb-btnNo4,#Bb-btnNo5").removeClass(
            "dagValgt"
        );
        console.log("Største fisk dag 2");
    });

    $("#Sf-btnNo3").click(function() {
        sendCommand({ "resultat": "updateStorDag3" });
        $("#Sf-btnNo3").addClass("dagValgt");
        $("#Sf-btnNo1,#Sf-btnNo2,#Sf-btnNo4,#Sf-btnNo5").removeClass("dagValgt");
        $("#Bb-btnNo1,#Bb-btnNo2,#Bb-btnNo3,#Bb-btnNo4,#Bb-btnNo5").removeClass(
            "dagValgt"
        );
        console.log("Største fisk dag 3");
    });

    $("#Sf-btnNo4").click(function() {
        sendCommand({ "resultat": "updateStorDag4" });
        $("#Sf-btnNo4").addClass("dagValgt");
        $("#Sf-btnNo1,#Sf-btnNo2,#Sf-btnNo3,#Sf-btnNo5").removeClass("dagValgt");
        $("#Bb-btnNo1,#Bb-btnNo2,#Bb-btnNo3,#Bb-btnNo4,#Bb-btnNo5").removeClass(
            "dagValgt"
        );
        console.log("Største fisk dag 4");
    });

    $("#Sf-btnNo5").click(function() {
        sendCommand({ "resultat": "updateStorAll" });
        $("#Sf-btnNo5").addClass("dagValgt");
        $("#Sf-btnNo1,#Sf-btnNo2,#Sf-btnNo3,#Sf-btnNo4").removeClass("dagValgt");
        $("#Bb-btnNo1,#Bb-btnNo2,#Bb-btnNo3,#Bb-btnNo4,#Bb-btnNo5").removeClass(
            "dagValgt"
        );
        console.log("Største fisk samlet");
    });

    /// BTNS Skilte
    // Bedste båd
    $("#Bb-btnNo1").click(function() {
        sendtoCGcom('bestBaadDag1');
        $("#Bb-btnNo1").addClass("dagValgt");
        $("#Bb-btnNo2,#Bb-btnNo3,#Bb-btnNo4,#Bb-btnNo5").removeClass("dagValgt");
        $("#Sf-btnNo1,#Sf-btnNo2,#Sf-btnNo3,#Sf-btnNo4,#Sf-btnNo5").removeClass(
            "dagValgt"
        );
        console.log("Bedste båd dag 1");
    });

    $("#Bb-btnNo2").click(function() {
        sendtoCGcom('bestBaadDag2');
        $("#Bb-btnNo2").addClass("dagValgt");
        $("#Bb-btnNo1,#Bb-btnNo3,#Bb-btnNo4,#Bb-btnNo5").removeClass("dagValgt");
        $("#Sf-btnNo1,#Sf-btnNo2,#Sf-btnNo3,#Sf-btnNo4,#Sf-btnNo5").removeClass(
            "dagValgt"
        );
        console.log("Bedste båd dag 2");
    });

    $("#Bb-btnNo3").click(function() {
        sendtoCGcom('bestBaadDag3');
        $("#Bb-btnNo3").addClass("dagValgt");
        $("#Bb-btnNo1,#Bb-btnNo2,#Bb-btnNo4,#Bb-btnNo5").removeClass("dagValgt");
        $("#Sf-btnNo1,#Sf-btnNo2,#Sf-btnNo3,#Sf-btnNo4,#Sf-btnNo5").removeClass(
            "dagValgt"
        );
        console.log("Bedste båd dag 3");
    });

    $("#Bb-btnNo4").click(function() {
        sendtoCGcom('bestBaadDag4');
        $("#Bb-btnNo4").addClass("dagValgt");
        $("#Bb-btnNo1,#Bb-btnNo2,#Bb-btnNo3,#Bb-btnNo5").removeClass("dagValgt");
        $("#Sf-btnNo1,#Sf-btnNo2,#Sf-btnNo3,#Sf-btnNo4,#Sf-btnNo5").removeClass(
            "dagValgt"
        );
        console.log("Bedste båd dag 4");
    });

    $("#Bb-btnNo5").click(function() {
        sendtoCGcom('bestBaadAll');
        $("#Bb-btnNo5").addClass("dagValgt");
        $("#Bb-btnNo1,#Bb-btnNo2,#Bb-btnNo3,#Bb-btnNo4").removeClass("dagValgt");
        $("#Sf-btnNo1,#Sf-btnNo2,#Sf-btnNo3,#Sf-btnNo4,#Sf-btnNo5").removeClass(
            "dagValgt"
        );
        console.log("Bedste båd dag samlet");
    });
    trim = () => {
            sendCommand({ "scale": "trim" });
        }
        //// ROW markers p1-p10
    onlyPosOnAir = (pos) => {
        if (checkOnAir()) {
            sendCommand({ "pos": pos });
        }

    };

    $('#pos1').click(function() {

        $('#pos1,#pos2,#pos3,#pos4,#pos5,#pos6,#pos7,#pos8,#pos9,#pos10').removeClass('posValgt');
        $(this).addClass('posValgt');
        onlyPosOnAir(1);
    });
    $('#pos2').click(function() {
        onlyPosOnAir(2);
        $('#pos1,#pos2,#pos3,#pos4,#pos5,#pos6,#pos7,#pos8,#pos9,#pos10').removeClass('posValgt');
        $(this).addClass('posValgt');
    });
    $('#pos3').click(function() {
        onlyPosOnAir(3);
        $('#pos1,#pos2,#pos3,#pos4,#pos5,#pos6,#pos7,#pos8,#pos9,#pos10').removeClass('posValgt');
        $(this).addClass('posValgt');
    });
    $('#pos4').click(function() {
        onlyPosOnAir(4);
        $('#pos1,#pos2,#pos3,#pos4,#pos5,#pos6,#pos7,#pos8,#pos9,#pos10').removeClass('posValgt');
        $(this).addClass('posValgt');
    });
    $('#pos5').click(function() {
        onlyPosOnAir(5);
        $('#pos1,#pos2,#pos3,#pos4,#pos5,#pos6,#pos7,#pos8,#pos9,#pos10').removeClass('posValgt');
        $(this).addClass('posValgt');
    });
    $('#pos6').click(function() {
        onlyPosOnAir(6);
        $('#pos1,#pos2,#pos3,#pos4,#pos5,#pos6,#pos7,#pos8,#pos9,#pos10').removeClass('posValgt');
        $(this).addClass('posValgt');
    });
    $('#pos7').click(function() {
        onlyPosOnAir(7);
        $('#pos1,#pos2,#pos3,#pos4,#pos5,#pos6,#pos7,#pos8,#pos9,#pos10').removeClass('posValgt');
        $(this).addClass('posValgt');
    });
    $('#pos8').click(function() {
        onlyPosOnAir(8);
        $('#pos1,#pos2,#pos3,#pos4,#pos5,#pos6,#pos7,#pos8,#pos9,#pos10').removeClass('posValgt');
        $(this).addClass('posValgt');
    });
    $('#pos9').click(function() {
        onlyPosOnAir(9);
        $('#pos1,#pos2,#pos3,#pos4,#pos5,#pos6,#pos7,#pos8,#pos9,#pos10').removeClass('posValgt');
        $(this).addClass('posValgt');
    });
    $('#pos10').click(function() {
        onlyPosOnAir(10);
        $('#pos1,#pos2,#pos3,#pos4,#pos5,#pos6,#pos7,#pos8,#pos9,#pos10').removeClass('posValgt');
        $(this).addClass('posValgt');
    });
    $('#posreset').click(function() {
        onlyPosOnAir(0);

        $('#pos1,#pos2,#pos3,#pos4,#pos5,#pos6,#pos7,#pos8,#pos9,#pos10').removeClass('posValgt');
    });

    $(".markbtns .pbtn").click(function() {
        if ($(this).attr("id") == "posreset") {
            $(".markbtns .pbtn").removeClass("posValgt");
        } else {
            $(".markbtns .pbtn").removeClass("posValgt");
            if (checkOnAir()) $(this).addClass("posValgt");
            else $(".pos-warn").show();
        }
    });
});