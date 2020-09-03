// console.log("Hello World");
// var i = 0;  //function scope 
// let j = 0;  //block scope  
// const h = 1;

// console.log(i, j, h);

// i = 10;
// j = 20;
// //h = 30; //상수라서 변경할 수 없다   

// console.log(i, j, h);

// var i = 10;
// var ten = "10";

// if (i === ten) {
//     console.log("same");
// } else {
//     console.log("diff");
// }

/////////////////////////////////////////////////////////////////////
let button = document.querySelector('#btn');



//var myFunc = () => { console.log("ddd") } //선언이 아니라 정의 
const daun = document.querySelector("#div");
let date = new Date();

function clickBtn(msg) {
    let newDiv = document.createElement('div');
    // newDiv.innerHTML = "Hello World";
    // newDiv.style.fontSize = "100px";
    //newDiv.innerHTML = new Date().getSeconds() + "초";
    newDiv.style.fontSize = "100px";
    daun.appendChild(newDiv);
    let interval = setInterval(() => {
        now = new Date();
        hours = now.getHours();
        minutes = now.getMinutes();
        seconds = now.getSeconds();
        timeStr = "" + hours + "시";
        timeStr += ((minutes < 10) ? ":0" : ":") + minutes + "분";
        timeStr += ((seconds < 10) ? ":0" : ":") + seconds + "초";

        //newDiv.innerHTML = new Date().getSeconds() + "초";
        newDiv.innerHTML = timeStr;

    }, 1000);
    //clearInterval(interval);
    // console.log(msg);
    //console.log(`${date.getSeconds()} 초`);
}



function init() {
    button.addEventListener("click", () => clickBtn("ddd"));
    //console.log(date.getSeconds());
    // setInterval(() => {
    //     date = new Date();
    //     console.log(date.getSeconds());
    // }, 1000);
}

init();

