
const id = document.getElementById('id');
const pw = document.getElementById('pw');
const logIn = document.getElementById('logIn');
var Parent = document.getElementById('LoginArea');


if (localStorage.LoginState == 1) {
    //로그인 된 상태 
    //로그인 창 변경 
    while (Parent.hasChildNodes()) Parent.removeChild(Parent.firstChild);

    let UserInfo = document.createElement('p');
    Parent.appendChild(UserInfo);
    UserInfo.innerHTML = localStorage.User + "님";

    UserInfo.setAttribute('style', "margin-top:-20px;font-weight:bold;color:white");

    let LogOut = document.createElement('button');
    Parent.appendChild(LogOut);
    LogOut.innerHTML = "LogOut";
    LogOut.setAttribute('class', "btn btn-success  rounded-0");
    LogOut.setAttribute('style', "float:right;margin-top:-20px;font-weight:bold");

    LogOut.addEventListener("click", () => clickLogOut());
}

function clickLogin() {
    //console.log(id.value);
    axios.post('http://localhost:3000/login', {
        id: id.value,
        pw: pw.value

    }).then(res => {
        //console.log("Hello");
        console.log(res.data);
        if (res.data === "success") {
            localStorage.LoginState = 1;
            localStorage.User = id.value;

            window.location.reload();

        } else if (res.data === "not Found") {
            alert("not Found");
        } else if (res.data === "incorrect") {
            alert("incorrect");
        }

    }).catch(err => {
        console.log(err);
    });

}

function clickLogOut() {
    // //  console.log("Hello");
    // axios.get('http://localhost:3000/logout').then(res => {

    // }).catch(err => {
    //     console.log(err);
    // });
    localStorage.LoginState = 0;
    localStorage.User = "";
    window.location.reload();
}

logIn.addEventListener("click", () => clickLogin());