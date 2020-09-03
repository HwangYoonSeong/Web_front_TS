const email = document.getElementById('email');
const id = document.getElementById('id');
const pw = document.getElementById('pw');
const pwConfig = document.getElementById('pwConfig');
const name = document.getElementById('name');

const signUp = document.getElementById('button');



function clickSignup() {
    //console.log(id.value);
    axios.post('http://localhost:3000/signup/' + id.value, {
        email: email.value,
        pw: pw.value,
        pwConfig: pwConfig.value,

    }).then(res => {
        if (res.data === "wrong") alert("비밀번호가 일치하지 않습니다.")
        else if (res.data === "duplicate") alert("중복된 아이디 입니다.")
        else {
            //console.log(res);
            alert("Welcome");
            history.go(-1);
        }


    }).catch(err => {
        console.log(err);
    });

}


signUp.addEventListener("click", () => clickSignup());
