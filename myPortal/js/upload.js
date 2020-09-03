var title = document.querySelector('#title');
var contents = document.querySelector('#contents');
var uploadBtn = document.querySelector('#uploadBtn');


function clickUploadBtn() {
    let date = new Date();
    let dateString = date.getFullYear() + '.' + `${date.getMonth() + 1}` + '.' + date.getDate();

    axios.post('http://localhost:3000/post/' + title.value, {

        contents: contents.value,
        writer: localStorage.User,
        date: dateString
    }).then(res => {
        console.log(res.data);


    }).catch(err => {
        console.log(err);
    });

    alert("Success");
    location.href = "../html/kin.html";

}

uploadBtn.addEventListener("click", () => clickUploadBtn());

