var Parent = document.querySelector('#container')
var writeBtn = document.querySelector('#writeBtn');
var postTable = document.querySelector('#postTable');



if (localStorage.LoginState == 0) {
    Parent.removeChild(writeBtn);
}

while (postTable.hasChildNodes()) postTable.removeChild(postTable.firstChild);

axios.get('http://localhost:3000/kin')
    .then(res => {
        //console.log(res.data['Date Test']);

        for (let i = 0; i < Object.keys(res.data).length; i++) {
            let newTr = document.createElement('tr');


            let postIdx = document.createElement('td');
            postIdx.innerHTML = i + 1;//title
            //console.log(Object.values(res.data));
            //newTd.innerHTML = Object.values(res.data)[0].writer;
            newTr.appendChild(postIdx);

            let postTitle = document.createElement('td');
            postTitle.innerHTML = Object.keys(res.data)[i];//title
            //console.log(Object.values(res.data));
            //newTd.innerHTML = Object.values(res.data)[0].writer;
            newTr.appendChild(postTitle);

            let postWriter = document.createElement('td');
            //newTd.innerHTML = Object.keys(res.data)[0];//title
            //console.log(Object.values(res.data));
            postWriter.innerHTML = Object.values(res.data)[i].writer;
            newTr.appendChild(postWriter);

            let postDate = document.createElement('td');
            //newTd.innerHTML = Object.keys(res.data)[0];//title
            //console.log(Object.values(res.data));
            postDate.innerHTML = Object.values(res.data)[i].date;

            //console.log(newTr.childNodes[1]);
            newTr.addEventListener("click", () => clickTr(newTr.childNodes[1].innerHTML, res.data[newTr.childNodes[1].innerHTML]));
            newTr.appendChild(postDate);



            postTable.appendChild(newTr);
        }


    }).catch(err => {
        console.log(err);
    });


function clickTr(title, object) {
    sessionStorage.clear();
    var jsonObj = JSON.stringify(object);
    sessionStorage.PostTitle = title;
    sessionStorage.PostObject = jsonObj;

    location.href = "../html/oneKin.html";


}
