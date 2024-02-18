let boxex=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset");
let newGameBtn=document.querySelector("#new_game-btn");
let container=document.querySelector(".container");
let msgContainer=document.querySelector(".msg-main-container");
let msg=document.querySelector("#msg");
let game=document.querySelector(".game");
var videoElement = document.querySelector('.video');
var sourceElement = document.querySelector('#videoSource');
let playerContainer=document.querySelector(".player-container");
let btnCon=document.querySelector(".button-container");




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

function computerTurn() {
    computerWinning();
    turnO = true;
    countClick += 1;
    checkWinner(countClick);
}

function final(x){
    c=0
    for(let box of boxex){
        if (c==x){
            computerButton=box;
            break;

        }else{
            c+=1;
        }
    }
    computerButton.innerText ="X";
    computerButton.style.color = '#fcf300';
    computerButton.disabled = true;
    return true;
}


function checkingComputerWinning(){
    k=false
    for(pattern of winningPattern){
        let pos1Val=boxex[pattern[0]].innerText;
        let pos2Val=boxex[pattern[1]].innerText;
        let pos3Val=boxex[pattern[2]].innerText;

        if (pos1Val==="" && pos2Val==="X" && pos3Val==="X"){
            k= final(pattern[0])
            return k

        }else if (pos1Val==="X" && pos2Val==="" && pos3Val==="X"){
            k= final(pattern[1])
            return k
        }
        else if (pos1Val==="X" && pos2Val==="X" && pos3Val===""){
            k=final(pattern[2])
            return k
        } 
    }
    return k
}

function checkingOpponentWinning(){
    k=false
    for(pattern of winningPattern){
        let pos1Val=boxex[pattern[0]].innerText;
        let pos2Val=boxex[pattern[1]].innerText;
        let pos3Val=boxex[pattern[2]].innerText;

        if (pos1Val==="" && pos2Val==="O" && pos3Val==="O"){
            k= final(pattern[0])
            return k

        }else if (pos1Val==="O" && pos2Val==="" && pos3Val==="O"){
            k= final(pattern[1])
            return k
        }
        else if (pos1Val==="O" && pos2Val==="O" && pos3Val===""){
            k= final(pattern[2])
            return k
        }
    }
    return k
}

function randomMove(){
    const availableButtons = Array.from(boxex).filter((btn) => btn.innerText ==="");
    const computerWinIndex= Math.floor(Math.random() * availableButtons.length);
    computerButton=availableButtons[computerWinIndex];
    computerButton.innerText ="X";
    computerButton.style.color = '#fcf300';
    computerButton.disabled = true;
}

function computerWinning(){
    s=checkingComputerWinning();
    if (s==false){
        s=checkingOpponentWinning();
    }
    if(s==false){
        randomMove();
    }
}

const enableBoxes=()=>{
    for(let box of boxex){
        box.disabled=false;
        box.removeEventListener('click',function(){
            console.log("event listenrt removed");

        });
        box.innerHTML="";
    }
}

const disableBoxes=()=>{
    for(let box of boxex){
        box.disabled=true;
    }
}

var checkResult=false;


const showWinner=(winner)=>{

    setTimeout(() => {

        checkResult=true;
        if(winner=="O"){
            msg.innerText=`CONGRATULATIONS, WINNER PLAYER 1`;
            sourceElement.src = 'y.mp4';
            videoElement.load();
            videoElement.play();
        }
        else if(winner=="X"){
            msg.innerText=`YOU LOST, WINNER PLAYER 2`;
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

        resetBtn.classList.remove("hide");
        container.classList.toggle("hide")
        msgContainer.classList.toggle("hide")
        disableBoxes();

    },1100);
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

                if(pos1Val=="O"){
                    boxex[pattern[0]].style.backgroundColor="green"
                    boxex[pattern[1]].style.backgroundColor="green";
                    boxex[pattern[2]].style.backgroundColor="green";
                }else{
                    boxex[pattern[0]].style.backgroundColor="red"
                    boxex[pattern[1]].style.backgroundColor="red";
                    boxex[pattern[2]].style.backgroundColor="red";
                }
                
                c=true;
                ans=pos1Val;
                break;
            }
        }
    }
    if (c==true){
        showWinner(ans);
        return true;
    }
    else if(countClick==9){
        showWinner(ans);
        return true;
    }else{
        return false;
    }

}

const resetGame=()=>{
    videoElement.pause();

    for(let box of boxex){
        box.style.backgroundColor= "#1d3557";
    }

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

const homeMenu=()=>{
    playerContainer.classList.remove("hide");
    container.classList.add("hide")
    msgContainer.classList.add("hide")
    btnCon.classList.add("hide")
}

newGameBtn.addEventListener("click",function(){
    resetGame();
});

resetBtn.addEventListener("click",function(){
    console.log("restet call");
    resetGame();
    console.log("home call");
    homeMenu();
    console.log("done", turnO);

    
});


screen.addEventListener("orientationchange", function () {
    console.log("The orientation of the screen is: " + screen.orientation);
});




const buttons = document.querySelectorAll('.box');
buttons.forEach((button) => {
    button.addEventListener('click', () => {

        if(type==="s"){
            if (turnO && button.textContent === '') {
                button.innerText ="O";
                button.style.color = 'white';
                turnO = false;
                button.disabled = true;
                countClick += 1;
                if(checkWinner(countClick)==false){
                    setTimeout(computerTurn, 600);
                }
            }
        }

        if (type=="m"){
            if (turnO && button.textContent === '') {
                button.innerText ="O";
                button.style.color = 'white';
                turnO = false;
                button.disabled = true;
                countClick += 1;
                checkWinner(countClick)
            }else{
                button.innerText ="X";
                button.style.color = 'yellow';
                turnO = true;
                button.disabled = true;
                countClick += 1;
                checkWinner(countClick)
            }
            
        }
        
    });
});



// single player function call
let singleBtn=document.querySelector("#single");
singleBtn.addEventListener("click",()=>{
    playerContainer.classList.add("hide");
    msgContainer.classList.add("hide");
    container.classList.remove("hide");
    btnCon.classList.remove("hide");
    type="s";
})



// multi player function call
let multiBtn=document.querySelector("#multi");
multiBtn.addEventListener("click",()=>{
    playerContainer.classList.add("hide");
    msgContainer.classList.add("hide");
    container.classList.remove("hide")
    btnCon.classList.remove("hide")
    type="m";

})




