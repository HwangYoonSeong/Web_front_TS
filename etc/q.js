
function initBtn() {
    document.querySelector('#regBtn').addEventListener('click', () => {

        axios.post('http://localhost:3000/signup', {
            id: document.querySelector('#id').value,
            pw: document.querySelector('#pw').value,
            pwConfirm: document.querySelector('#pwConfirm').value,
            name: document.querySelector('#name').value
        }).then(res => {
            console.log(res);
        })
    });

    document.querySelector('#loginBtn').addEventListener('click', () => {
        axios.post('http://localhost:3000/login', {
            id: document.querySelector('#loginId').value,
            pw: document.querySelector('#loginPw').value,
        }).then(res => {
            document.querySelector('#check').innerHTML = res.data
        })
    })
}