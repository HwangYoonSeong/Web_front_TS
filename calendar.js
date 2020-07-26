
//var myFunc = () => { console.log("ddd") } //선언이 아니라 정의 
const time = document.querySelector("#time");

let newDiv = document.createElement('div');
// newDiv.innerHTML = "Hello World";
// newDiv.style.fontSize = "100px";
// newDiv.innerHTML = new Date().getSeconds() + "초";
newDiv.style.fontSize = "20px";
time.appendChild(newDiv);
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
//console.log(msg);
//console.log(`${date.getSeconds()} 초`);



var today = new Date();
var date = new Date();
var dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const showDay = document.getElementById('day');
let newP_day = document.createElement('p');
showDay.appendChild(newP_day);
newP_day.innerHTML = dayList[today.getDay()];

const showDate = document.getElementById('date');
let newP_date = document.createElement('p');
showDate.appendChild(newP_date);
newP_date.innerHTML = today.getDate();




function prevCalendar() {//이전 달
    today = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    buildCalendar();
}
function nextCalendar() {//다음 달
    today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
    buildCalendar();//달력 cell 만들어 출력
}


function buildCalendar() {//현재 달 달력 만들기
    var doMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    console.log("FirstDate: " + doMonth);

    var lastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    console.log("lastDate: " + lastDate);
    //이번 달의 마지막 날
    //new를 써주면 정확한 월을 가져옴, getMonth()+1을 해주면 다음달로 넘어가는데
    //day를 1부터 시작하는게 아니라 0부터 시작하기 때문에 
    //대로 된 다음달 시작일(1일)은 못가져오고 1 전인 0, 즉 전달 마지막일 을 가져오게 된다
    var tbCalendar = document.getElementById("calendar");

    var tbCalendarYM = document.getElementById("tbCalendarYM");

    tbCalendarYM.innerHTML = today.getFullYear() + "년 " + (today.getMonth() + 1) + "월";

    /*while은 이번달이 끝나면 다음달로 넘겨주는 역할*/

    while (tbCalendar.rows.length > 2) {
        //열을 지워줌
        //기본 열 크기는 body 부분에서 2로 고정되어 있다.
        tbCalendar.deleteRow(tbCalendar.rows.length - 1);
        //테이블의 tr 갯수 만큼의 열 묶음은 -1칸 해줘야지 
        //30일 이후로 담을달에 순서대로 열이 계속 이어진다.
    }
    var rowCount = 100;
    var row = null;
    row = tbCalendar.insertRow();
    row.setAttribute('id', rowCount++);
    //테이블에 새로운 열 삽입//즉, 초기화

    var cnt = 0;
    console.log("day:" + doMonth.getDay());
    for (i = 0; i < doMonth.getDay(); i++) {
        //첫째 주 시작일 까지 빈칸 생성

        cell = row.insertCell();//열 한칸한칸 계속 만들어주는 역할
        cnt = cnt + 1;
    }

    /*달력 출력*/
    console.log("date:" + lastDate.getDate());

    for (i = 1; i <= lastDate.getDate(); i++) {

        cell = row.insertCell();
        cell.innerHTML = "<div class='num'  id='" + i + "' ' >" + i + "</div>";
        cnt = cnt + 1;
        if (cnt % 7 == 1) {/*일요일 계산*/

            cell.innerHTML = "<div class='num'  id='" + i + "'   style='color:red'>" + i + "</div>";
            //#F79DC2
            //1번째의 cell에만 색칠
        }
        if (cnt % 7 == 0) {/* 1주일이 7일 이므로 토요일 구하기*/

            cell.innerHTML = "<div class='num'  id='" + i + "'   style='color:skyblue' >" + i + "</div>";


            row = calendar.insertRow();
            row.setAttribute('id', rowCount++);
        }
        /*오늘의 날짜에 노란색 칠하기*/
        if (today.getFullYear() == date.getFullYear()
            && today.getMonth() == date.getMonth()
            && i == date.getDate()) {
            //달력에 있는 년,달과 내 컴퓨터의 로컬 년,달이 같고, 일이 오늘의 일과 같으면
            //오늘 날짜에 active class 추가 
            var clickedDate1 = document.getElementById(today.getDate());
            clickedDate1.classList.add('active2');
        }
    }






    var tdGroup = [];
    for (let i = 1; i <= lastDate.getDate(); i++) {
        tdGroup[i] = document.getElementById(i);
        tdGroup[i].addEventListener('click', changeToday);
    }

    //for문으로 기존의 active class가 있는 경우 삭제 
    //현재 이벤트가 발생한 곳에 active class 추가 
    function changeToday(e) {
        for (let i = 1; i <= lastDate.getDate(); i++) {
            if (tdGroup[i].classList.contains('active')) {
                tdGroup[i].classList.remove('active');
            }
        }
        clickedDate1 = e.currentTarget;
        clickedDate1.classList.add('active');
        newP_date.innerHTML = clickedDate1.id;
        today = new Date(today.getFullYear(), today.getMonth(), clickedDate1.id);

        newP_day.innerHTML = dayList[today.getDay()];
    }

}

buildCalendar();