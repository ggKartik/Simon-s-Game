var btns = document.querySelectorAll('.btnconfig');

var btnclrs = ["red","blue","green","yellow"];
var gameptrn = [];
var userclickedpattern = [];


function nextsequence(){
    userclickedpattern = [];
    level++;
    $('#gameinfo').text("level " + level);
    
    var randomnumber = Math.floor(Math.random()*4);  
    // console.log(randomnumber);
    var randomcolor = btnclrs[randomnumber];
    gameptrn.push(randomcolor);

    $("#" + randomcolor).fadeOut(100).fadeIn(100);
    // var audio = new Audio("sounds/" + randomcolor + ".mp3");
    // audio.play();
    playsound(randomcolor);
    // animatepress(randomcolor);
}

$(".btnconfig").click(function(){
    var clickedbtnid = $(this).attr("id");
    userclickedpattern.push(clickedbtnid);
    // console.log(userclickedpattern);
    playsound(clickedbtnid);
    animatepress(clickedbtnid);
    checkans(userclickedpattern.length-1);
});


function checkans(currvalue){
    if(gameptrn[currvalue] === userclickedpattern[currvalue]){
        // console.log("success")
        if(gameptrn.length ===  userclickedpattern.length){
            setTimeout(function(){
                nextsequence();
            },1000)
        }
    }
    else{
        playsound("wrong");
        $("#gameinfo").text("Nice Try,Press Any Key To Restart")
        wrongans();
        setTimeout(function(){
            $('body').removeClass('wrong')
        },200);
        startover();
    }
}



function playsound(colorname){
    var audio = new Audio("sounds/"+ colorname + ".mp3");
    audio.play();
}

function animatepress(color){
    $("#"+color).addClass('pressed');

    setTimeout(function(){
        $("#"+color).removeClass('pressed');
    },100);
}

var started = false;
var level = 0;

$(document).keypress(function(){
    if(!started){
        $('#gameinfo').text("level " + level);
        nextsequence();
        started = true;
    }
});


function wrongans(){
    $('body').addClass('wrong');
}

function startover(){
    level = 0;
    gameptrn = [];
    started = false;
}