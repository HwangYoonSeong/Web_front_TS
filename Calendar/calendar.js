//var myFunc = () => { console.log("ddd") } //선언이 아니라 정의 
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

////////////////////////////////calendar////////////////////////////////////////
var today = new Date();
var date = new Date();
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
    console.log("FirstDate: " + firstDate);

    var lastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0); //다음 달의 0은 이전달의 마지막
    console.log("lastDate: " + lastDate);

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
    console.log("day:" + firstDate.getDay());
    for (i = 0; i < firstDate.getDay(); i++) {
        //첫째 주 시작일 까지 빈칸 생성
        cell = row.insertCell();//열 한칸한칸 계속 만들어주는 역할
        cnt = cnt + 1;
    }

    //달력 출력
    console.log("date:" + lastDate.getDate());
    for (i = 1; i <= lastDate.getDate(); i++) {

        cell = row.insertCell();

        cell.innerHTML = "<div class=' num'  id='" + i + "' ' >" + i + "</div>";
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
            //console.log(clickDate.classList);
        }
    }

    var tdGroup = []; //모든 날짜를 순회하기위해 배열로 접근 
    for (let i = 1; i <= lastDate.getDate(); i++) {
        tdGroup[i] = document.getElementById(i);
        tdGroup[i].addEventListener('click', changeToday);
    }

    //for문으로 기존의 active class가 있는 경우 삭제 
    function changeToday(e) {
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
        today = new Date(today.getFullYear(), today.getMonth(), clickDate.id);
        newP_day.innerHTML = dayList[today.getDay()];

        //console.log(clickDate);
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

showCalendar();