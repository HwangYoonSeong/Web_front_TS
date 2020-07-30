// var arr = [1, 2, 3, 4, 5];
// var test = [];

// // let value = arr.forEach((el, index) => {
// //     test.push(el + 2);
// // })

// arr.forEach((el, index) => {
//     test.push(el + 2);
// })

// console.log(test);
//console.log(value);


// // let value = arr.map((el, index) => {
// //     test.push(el + 2);
// //     return el + 2;
// // })

// // console.log(test);
// // console.log(value);

// var obj = {
//     name: "ys",
//     age: 24,
//     school: "KIT"
// }

// var jsonObj = JSON.stringify(obj);
// console.log(jsonObj);




// const div = document.querySelector("#div");

// function test() {
//     console.log("click");
// }

// const btn = document.createElement('button');
// btn.innerHTML = "Btn2";
// btn.onclick = test;
// div.appendChild(btn);


// const ul = document.createElement('ul');

// document.body.appendChild(ul);


// let arr = ["li1", "li2", "li3", "li4", "li5", "li6"]

// function conLog(e) {
//     console.log(e.target.innerHTML);
//     ul.removeChild(e.target);
// }

// arr.forEach((el, index) => {
//     const li = document.createElement('li');
//     li.innerHTML = el;
//     li.addEventListener('click', conLog);
//     ul.appendChild(li);
// })


// //'li3' 이름을 가진 Eliment를 제외한 배열을 만들려면 ?

// const result = arr.filter(eter => {
//     return eter !== 'li3'
// })
// console.log(result);


//마지막 실습 마우스로 드래그할경우 해당 좌표를 띄워라 


// function dragElement(elmnt) {

//     elmnt.onmousedown = dragMouseDown;
//     function dragMouseDown(e) {
//         document.onmousemove = elementDrag;
//         document.onmouseup = closeDragElement;

//     }

//     function elementDrag(e) {

//         let str = "x=" + e.clientX + " y=" + e.clientY;
//         elmnt.innerHTML = str;

//         let pos = e.target.getBoundingClientRect();

//         //console.log(recX, recY);
//         let pos3 = e.clientX - pos.left;
//         let pos4 = e.clientY - pos.top;
//         //console.log(pos3, pos4);
//         elmnt.style.marginTop = pos4 + "px";
//         elmnt.style.marginLeft = pos3 + "px";



//         //console.log(pos1, pos2, pos3, pos4);
//         // elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
//         // elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
//     }

//     function closeDragElement() {

//         document.onmouseup = null;
//         document.onmousemove = null;

//     }
// }

// dragElement(document.getElementById('rec'));


const div = document.querySelector('#rec');
var isClick = false;
div.addEventListener('mousedown', () => { isClick = true; });
div.addEventListener('mouseup', () => { isClick = false; });
div.addEventListener('mousemove', (e) => {
    if (isClick) {
        div.style.left = e.clientX - 50 + 'px';
        div.style.top = e.clientY - 50 + 'px';
        div.innerHTML = `X : ${e.clientX}, Y:${e.clientY}`
    }
});