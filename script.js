let boxex=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset");
let newGameBtn=document.querySelector("#new_game-btn");
let container=document.querySelector(".container");
let msgContainer=document.querySelector(".msg-main-container");
let msg=document.querySelector("#msg");
let game=document.querySelector(".game");
var videoElement = document.querySelector('.video');
var sourceElement = document.querySelector('#videoSource');



let turnO= true;

const winningPattern = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

var countClick=0;

boxex.forEach((box) =>{
    box.addEventListener("click",()=>{
        if (turnO){
            box.innerText="O"
            box.style.color="white"
            turnO=false
        }else{
            box.innerText="X"
            box.style.color="#fcf300"
            turnO=true
        }
        box.disabled=true;
        countClick+=1;
        checkWinner(countClick);
    })

})

const enableBoxes=()=>{
    for(let box of boxex){
        box.disabled=false;
        box.innerHTML=""
    }
}

const disableBoxes=()=>{
    for(let box of boxex){
        box.disabled=true;
    }
}

var checkResult=false;

const showWinner=(winner)=>{

    checkResult=true;

    if(winner=="O"){
        msg.innerText=`CONGRATULATIONS, WINNER O`;
        sourceElement.src = 'y.mp4';
        videoElement.load();
        videoElement.play();
    }
    else if(winner=="X"){
        msg.innerText=`Bhai kya kar raha hai tu, winner X`;
        sourceElement.src = 'bhai.mp4';
        videoElement.load();
        videoElement.play();
    }
    else{
        msg.innerText="DRAW";
        sourceElement.src = 'bhai.mp4';
        videoElement.load();
        videoElement.play();
    }

    resetBtn.classList.add("hide");
    container.classList.toggle("hide")
    msgContainer.classList.toggle("hide")
    disableBoxes();
}

const checkWinner=(countClick) =>{
    let c=false;
    let ans="D"
    for(pattern of winningPattern){
        let pos1Val=boxex[pattern[0]].innerText;
        let pos2Val=boxex[pattern[1]].innerText;
        let pos3Val=boxex[pattern[2]].innerText;
        
        if (pos1Val!="" && pos2Val!="" && pos3Val!=""){
            if(pos1Val==pos2Val && pos2Val==pos3Val){
                c=true;
                ans=pos1Val;
                break;
            }
        }
    }
    if (c==true){
        showWinner(ans);
    }
    else if(countClick==9){
        showWinner(ans);
    }
}

const resetGame=()=>{
    videoElement.pause();

    if(checkResult==true){
        countClick=0;
        turnO=true;
        enableBoxes();
        resetBtn.classList.remove("hide");
        container.classList.toggle("hide")
        msgContainer.classList.toggle("hide")
        checkResult=false;

    }else{
        countClick=0;
        turnO=true;
        enableBoxes();
    }
    
    
}

newGameBtn.addEventListener("click",resetGame)
resetBtn.addEventListener("click",resetGame)

screen.addEventListener("orientationchange", function () {
    console.log("The orientation of the screen is: " + screen.orientation);
  });

