const id = document.getElementById('id');
const pw = document.getElementById('pw');
const pwConfig = document.getElementById('pwConfig');
const name = document.getElementById('name');

const signUp = document.getElementById('signUp');

const id2 = document.getElementById('id2');
const pw2 = document.getElementById('pw2');

const logIn = document.getElementById('logIn');


const userCheck = document.getElementById('userCheck');


function clickSignup() {
    //console.log(id.value);
    axios.post('http://localhost:3000/signup', {
        id: id.value,
        pw: pw.value,
        pwConfig: pwConfig.value,
        name: name.value
    }).then(res => {
        console.log(res)

    }).catch(err => {
        console.log(err);
    });

}

function clickLogin() {
    //console.log(id.value);
    axios.post('http://localhost:3000/login', {
        id: id2.value,
        pw: pw2.value

    }).then(res => {
        userCheck.innerHTML = res.data;
        //console.log(userCheck);
    }).catch(err => {
        console.log(err);
    });

}

signUp.addEventListener("click", () => clickSignup());
logIn.addEventListener("click", () => clickLogin());