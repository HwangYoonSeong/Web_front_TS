
////////////////////////////////Time////////////////////////////////////////
//var myFunc = () => { console.log("ddd") } //선언이 아니라 정의 
function time() {

    const time = document.querySelector("#time");

    let newDiv = document.createElement('div');
    newDiv.style.fontSize = "30px";
    newDiv.style.fontFamily = 'digital-clock-font';

    time.appendChild(newDiv);
    let interval = setInterval(() => {
        now = new Date();
        hours = now.getHours();
        minutes = now.getMinutes();
        seconds = now.getSeconds();
        if (hours < 12) {
            timeStr = "AM" + ((hours < 10) ? "0" : "") + hours;
        } else {
            timeStr = "PM " + (((hours - 12) < 10) ? "0" : "") + (hours - 12);
            // timeStr = "PM " + (hours - 12);
        }

        timeStr += ((minutes < 10) ? ":0" : ":") + minutes;
        timeStr += ((seconds < 10) ? ":0" : ":") + seconds;

        newDiv.innerHTML = timeStr;

    }, 1000);
}

////////////////////////////////Calendar////////////////////////////////////////
var today = new Date();
var date = new Date();
var todoBox = document.getElementById('todo-box');
var todoData = document.getElementById('todo-data');
var checkToday = 0;
function firstTodo() {
    today = new Date();
    var addTodoObj = JSON.parse(localStorage[localStorage.Using]);
    addTodoObj[`${today.getFullYear()}` + `${today.getMonth() + 1}` + `${today.getDate()}` + 'T' + `${today.getHours()}` + `${today.getMinutes()}` + `${today.getSeconds()}`] = todoBox.value;

    var jsonTodoObj = JSON.stringify(addTodoObj);
    //console.log(jsonObj);
    localStorage[localStorage.Using] = jsonTodoObj;


}

todoData.addEventListener('click', firstTodo);  //당일 todolist 이벤트 추가 

todoData.addEventListener('click', function () { //클릭할 때마다 todoList에 추가되는 것을 보여주기 위해 
    var todoList = document.getElementById("todolist");

    var row2 = todoList.insertRow(); //행 추가 
    cell = row2.insertCell();
    cell.innerHTML = todoBox.value;
    cell = row2.insertCell();
    cell.innerHTML = '<label class="x"  >x</label>';
    cell2 = row2.insertCell();
    cell2.innerHTML = '<label class="clear">&#62;</label>';

    cell.addEventListener('click', function () {
        //console.log(row2.childNodes[0].innerHTML);
        row2.remove(); //새로 추가된 row 삭제 //appendPending과 같은 부분인데 왜 여기서는 각 row를 반환하지?? 
        var addTodoObj = JSON.parse(localStorage[localStorage.Using]);
        //console.log(addTodoObj);
        for (var eter in addTodoObj) {
            if (row2.childNodes[0].innerHTML === addTodoObj[eter]) {
                delete addTodoObj[eter];//같은 pending을 추가할 경우 같이 삭제된다 
            }
        }

        var jsonTodoObj = JSON.stringify(addTodoObj);
        localStorage[localStorage.Using] = jsonTodoObj;




    });

    cell2.addEventListener('click', function () {
        var addTodoObj = JSON.parse(localStorage[localStorage.Using]);
        for (var eter in addTodoObj) {
            if (row2.childNodes[0].innerHTML === addTodoObj[eter]) {
                delete addTodoObj[eter];//같은 pending을 추가할 경우 같이 삭제된다 
                addTodoObj['F' + eter] = row2.childNodes[0].innerHTML;
                var jsonTodoObj = JSON.stringify(addTodoObj);
                localStorage[localStorage.Using] = jsonTodoObj;
            }
        }


        //console.log(addTodoObj);


        //console.log(row2);
        cell4 = row2.insertCell();
        cell4.innerHTML = row2.childNodes[0].innerHTML;
        row2.deleteCell(0);


        cell3 = row2.insertCell(0);
        cell3.innerHTML = " ";



    });
});

var dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

//좌측 요일과 날짜 표시 
const showDay = document.getElementById('day');
let newP_day = document.createElement('p');
showDay.appendChild(newP_day);
newP_day.innerHTML = dayList[today.getDay()];

const showDate = document.getElementById('date');
let newP_date = document.createElement('p');
showDate.appendChild(newP_date);
newP_date.innerHTML = today.getDate();

function prev() {

    today = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    showCalendar();
}

function next() {

    today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
    showCalendar();
}

function showCalendar() {
    var firstDate = new Date(today.getFullYear(), today.getMonth(), 1);
    //console.log("FirstDate: " + firstDate);

    var lastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0); //다음 달의 0은 이전달의 마지막
    //console.log("lastDate: " + lastDate);

    var calendar = document.getElementById("calendar");
    var calendarYM = document.getElementById("calendarYM"); //Year과 Month를 표시하는 부분
    calendarYM.style.fontSize = '20px';
    calendarYM.innerHTML = monthList[today.getMonth()] + '&nbsp;&nbsp;&nbsp;&nbsp;' + today.getFullYear();

    //Month 이동시 row 초기화 
    while (calendar.rows.length > 2) {//기본 열 크기는 body 부분에서 2로 고정
        calendar.deleteRow(calendar.rows.length - 1);
    }
    var rowCount = 100;
    var row = null;
    row = calendar.insertRow(); //행 추가 
    row.setAttribute('id', rowCount++); //행의 id 설정 


    var cnt = 0;
    //console.log("day:" + firstDate.getDay());
    for (i = 0; i < firstDate.getDay(); i++) {
        //첫째 주 시작일 까지 빈칸 생성
        cell = row.insertCell();//열 한칸한칸 계속 만들어주는 역할
        cnt = cnt + 1;
    }

    //달력 출력
    //console.log("date:" + lastDate.getDate());
    for (i = 1; i <= lastDate.getDate(); i++) {

        cell = row.insertCell();

        cell.innerHTML = "<div class='num'  id='" + i + "' ' >" + i + "</div>";
        cnt = cnt + 1;
        if (cnt % 7 == 1) {/*일요일 계산*/

            cell.innerHTML = "<div class='num sun checkSun'  id='" + i + "'>" + i + "</div>";

        }
        if (cnt % 7 == 0) {/* 1주일이 7일 이므로 토요일 구하기*/

            cell.innerHTML = "<div class='num sat checkSat'  id='" + i + "'>" + i + "</div>";
            row = calendar.insertRow();
            row.setAttribute('id', rowCount++);
        }

        //오늘의 날짜에 노란색 칠하기
        if (today.getFullYear() == date.getFullYear()
            && today.getMonth() == date.getMonth()
            && i == date.getDate()) {
            //달력에 있는 년,달과 내 컴퓨터의 로컬 년,달이 같고, 일이 오늘의 일과 같으면
            //오늘 날짜에 active class 추가 
            var clickDate = document.getElementById(i);
            clickDate.classList.add('active2');
            checkToday = 1;
            //console.log(clickDate.classList);
        }
    }

    var tdGroup = []; //모든 날짜를 순회하기위해 배열로 접근 
    for (let i = 1; i <= lastDate.getDate(); i++) {
        tdGroup[i] = document.getElementById(i);
        tdGroup[i].addEventListener('click', changeToday);
    }

    //for문으로 기존의 active class가 있는 경우 삭제
    function changeToday(e) { //날짜를 클릭했을 때 발생하는 이벤트 함수 
        for (let i = 1; i <= lastDate.getDate(); i++) {
            if (tdGroup[i].classList.contains('active')) {
                tdGroup[i].classList.remove('active');
            }
            //일요일과 토요일도 클릭했을 경우 color를 white변경하므로 다시 복구
            if (tdGroup[i].classList.contains('checkSun') && !(tdGroup[i].classList.contains('sun'))) {
                tdGroup[i].classList.add('sun');
            }
            if (tdGroup[i].classList.contains('checkSat') && !(tdGroup[i].classList.contains('sat'))) {
                tdGroup[i].classList.add('sat');
            }

        }

        //현재 이벤트가 발생한 곳에 active class 추가 
        clickDate = e.currentTarget;
        clickDate.classList.add('active');

        //클릭한 날짜에 따라 좌측에 해당 요일과 날짜 표시
        newP_date.innerHTML = clickDate.id;
        today = new Date(today.getFullYear(), today.getMonth(), clickDate.id, today.getHours(), today.getMinutes(), today.getSeconds());
        //console.log(`${today.getFullYear()}` + `${today.getMonth()}` + `${clickDate.id}`);
        newP_day.innerHTML = dayList[today.getDay()];

        ////////////////////////////////todoList////////////////////////////////////////
        // var Parent = document.getElementById('parent');
        // var logIn = document.getElementById('Login');
        // Parent.removeChild(logIn);
        // time();
        // showCalendar();
        ///////////////////////////////////////////////////
        // console.log(`${today.getFullYear()}` + `${today.getMonth() + 1}` + `${today.getDate()}` + `${today.getHours()}` + `${today.getMinutes()}` + `${today.getSeconds()}`);


        appendPending();//클릭 시 해당 날짜의 todoList 

        //////////////////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////////////

        todoData.removeEventListener('click', firstTodo);

        todoData.addEventListener('click', function () {

            var Time = new Date();
            var todoDate = `${today.getFullYear()}` + `${today.getMonth() + 1}` + `${clickDate.id}` + 'T' + `${Time.getHours()}` + `${Time.getMinutes()}` + `${Time.getSeconds()}`

            var addTodoObj = JSON.parse(localStorage[localStorage.Using]);
            addTodoObj[todoDate] = todoBox.value;
            var jsonTodoObj = JSON.stringify(addTodoObj);
            localStorage[localStorage.Using] = jsonTodoObj;   //클릭했을 때 해당 날짜정보를 기반하여 localStorage에 저장
            //////////////////////////////////////////////////////////////////////////////////////////////////////



            //this.removeEventListener('click', arguments.callee);
        });


        if (clickDate.classList.contains('sun')) {//일요일인 경우 빨간색
            clickDate.classList.remove('sun'); //일요일도 클릭했을 경우 color를 white변경
            newP_date.style.color = "red";
            newP_day.style.color = "red";
        } else if (clickDate.classList.contains('sat')) {//토요일인 경우 파란색
            clickDate.classList.remove('sat'); //토요일도 클릭했을 경우 color를 white변경
            newP_date.style.color = "skyblue";
            newP_day.style.color = "skyblue";
        } else {

            newP_date.style.color = "black";
            newP_day.style.color = "black";
        }
    }
}




////////////////////////////////LogIn////////////////////////////////////////
var Parent = document.getElementById('parent');
var leftContent = document.getElementById('leftContent');
var logIn = document.getElementById('Login');
var rightContent = document.getElementById('rightContent');


function appendPending() { //show todoList (localStorage를 바탕으로)
    var getTodoObj = JSON.parse(localStorage[localStorage.Using]);
    //console.log(localStorage.Using);
    //localStorage.removeItem(localStorage.Using);
    var todoList = document.getElementById("todolist");
    var rowIdx = 0;

    var row2 = [];
    while (todoList.rows.length > 1) {//todoList 초기화
        todoList.deleteRow(todoList.rows.length - 1);
    }

    for (let i = 0; i < Object.keys(getTodoObj).length; i++) {

        if (Object.keys(getTodoObj)[i][0] === 'n') {//'name' key check 
            continue;
        }
        let test = "";

        for (let j = 0; j < Object.keys(getTodoObj)[i].length; j++) {
            if (Object.keys(getTodoObj)[i][j] === 'T') {//날짜까지만
                break;
            }
            test += (Object.keys(getTodoObj)[i][j]);

        }


        if ((`${today.getFullYear()}` + `${today.getMonth() + 1}` + `${today.getDate()}`) === test) {
            // console.log(Object.values(getTodoObj)[i]);

            row2[rowIdx] = todoList.insertRow(); //행 추가 

            cell = row2[rowIdx].insertCell();
            cell.innerHTML = Object.values(getTodoObj)[i];
            cell = row2[rowIdx].insertCell();
            cell.innerHTML = '<label class="x" id=' + rowIdx + ' >x</label>';
            cell2 = row2[rowIdx].insertCell();
            cell2.innerHTML = '<label class="clear" id=' + rowIdx + '>&#62;</label>';



            cell.addEventListener('click', function () {

                row2[this.childNodes[0].id].remove();
                var addTodoObj = JSON.parse(localStorage[localStorage.Using]);
                //console.log(addTodoObj);
                delete addTodoObj[Object.keys(getTodoObj)[i]];
                var jsonTodoObj = JSON.stringify(addTodoObj);
                localStorage[localStorage.Using] = jsonTodoObj;
            });

            cell2.addEventListener('click', function () {
                //console.log(this);
                //console.log(this.childNodes[0].id);
                //console.log(row2[this.childNodes[0].id]);
                var addTodoObj = JSON.parse(localStorage[localStorage.Using]);
                //console.log(addTodoObj);
                delete addTodoObj[Object.keys(getTodoObj)[i]];
                addTodoObj['F' + Object.keys(getTodoObj)[i]] = Object.values(getTodoObj)[i];
                var jsonTodoObj = JSON.stringify(addTodoObj);
                localStorage[localStorage.Using] = jsonTodoObj;


                row2[this.childNodes[0].id].deleteCell(0);


                cell4 = row2[this.childNodes[0].id].insertCell(0);
                cell4.innerHTML = " ";

                cell3 = row2[this.childNodes[0].id].insertCell();
                cell3.innerHTML = Object.values(getTodoObj)[i];



            });


        } else if (('F' + `${today.getFullYear()}` + `${today.getMonth() + 1}` + `${today.getDate()}`) === test) {
            // console.log(Object.values(getTodoObj)[i]);

            row2[rowIdx] = todoList.insertRow(); //행 추가 

            cell = row2[rowIdx].insertCell();
            cell.innerHTML = ' ';
            cell = row2[rowIdx].insertCell();
            cell.innerHTML = '<label class="x" id=' + rowIdx + ' >x</label>';
            cell2 = row2[rowIdx].insertCell();
            cell2.innerHTML = '<label class="clear" id=' + rowIdx + '>&#62;</label>';

            cell5 = row2[rowIdx].insertCell();
            cell5.innerHTML = Object.values(getTodoObj)[i];

            cell.addEventListener('click', function () {

                row2[this.childNodes[0].id].remove();
                var addTodoObj = JSON.parse(localStorage[localStorage.Using]);
                //console.log(addTodoObj);
                delete addTodoObj[Object.keys(getTodoObj)[i]];
                var jsonTodoObj = JSON.stringify(addTodoObj);
                localStorage[localStorage.Using] = jsonTodoObj;
            });

            cell2.addEventListener('click', function () {
                //console.log(this);
                //console.log(this.childNodes[0].id);
                //console.log(row2[this.childNodes[0].id]);
                var addTodoObj = JSON.parse(localStorage[localStorage.Using]);
                //console.log(addTodoObj);
                delete addTodoObj[Object.keys(getTodoObj)[i]];
                addTodoObj['F' + Object.keys(getTodoObj)[i]] = Object.values(getTodoObj)[i];
                var jsonTodoObj = JSON.stringify(addTodoObj);
                localStorage[localStorage.Using] = jsonTodoObj;

                row2[this.childNodes[0].id].deleteCell(0);


                cell4 = row2[this.childNodes[0].id].insertCell(0);
                cell4.innerHTML = " ";

                cell3 = row2[this.childNodes[0].id].insertCell();
                cell3.innerHTML = Object.values(getTodoObj)[i];



            });
        }
        rowIdx++;
    }
}


function LogInState() {

    Parent.removeChild(logIn);
    Parent.appendChild(leftContent);
    Parent.appendChild(rightContent);
    time();
    showCalendar();

    var LogOut = document.getElementById('LogOut');
    LogOut.addEventListener('click', () => {
        localStorage.LoginState = 0;
        window.location.reload();//새로고침
    });

    appendPending(); //처음 로딩시 당일 todoList 
}


if (localStorage.LoginState == 1) { //로그인 상태 유지  
    LogInState();
} else {

    Parent.removeChild(leftContent);
    Parent.removeChild(rightContent);

    var LoginData = document.getElementById('Login-data');
    var LoginBox = document.getElementById('Login-box');
    LoginData.addEventListener('click', Login);

    var SignupData = document.getElementById('Signup-data');
    SignupData.addEventListener('click', Signup);

}


function Login() {
    let count = 0;
    if (localStorage.userCount !== undefined) {
        for (let i = 0; i < localStorage.userCount; i++) {
            var obj2 = JSON.parse(localStorage["User" + i]);

            //console.log(obj2.name);
            if (LoginBox.value === obj2.name) {

                localStorage.Using = 'User' + i;
                // if (localStorage.LoginState == 0) {
                //     localStorage.LoginState = 1;
                // }
                localStorage.LoginState = 1;
                LogInState();//로그인 시 

                count++;
            }

        }
        if (count == 0) {
            alert("존재하지 않는 계정입니다.");

        }
    } else {
        alert("존재하지 않는 계정입니다.");
    }

}

function Signup() {
    //console.log(LoginBox.value);
    if (localStorage.userCount === undefined) { //처음에만 userCount 초기화 
        localStorage.userCount = 0;
    }
    var obj = {
        name: LoginBox.value
    }
    var jsonObj = JSON.stringify(obj);
    //console.log(jsonObj);
    localStorage["User" + localStorage.userCount++] = jsonObj;

}
