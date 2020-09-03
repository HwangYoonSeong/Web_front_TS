var titleParent = document.querySelector('#titleParent');


titleParent.removeChild(title);
titleParent.removeChild(contents);


console.log(sessionStorage.PostTitle);
var PostObject = JSON.parse(sessionStorage.PostObject);
console.log(PostObject.contents);

var newH1 = document.createElement('h1');
newH1.innerHTML = sessionStorage.PostTitle;


var newP = document.createElement('p');
newP.innerHTML = PostObject.contents;

var newBtn = document.createElement('a');
newBtn.innerHTML = "Remove";
newBtn.setAttribute('class', "btn btn-success");

newBtn.setAttribute('style', "float:right; margin-top:50px");
newBtn.setAttribute('href', "#");
newBtn.setAttribute('role', "button");

newBtn.addEventListener("click", () => clickRemove());

titleParent.appendChild(newH1);
titleParent.appendChild(newP);

titleParent.appendChild(newBtn);

console.log(PostObject.writer);
if (localStorage.User !== PostObject.writer) {
    titleParent.removeChild(newBtn);
}

function clickRemove() {

    axios.delete('http://localhost:3000/' + sessionStorage.PostTitle)
        .then(res => {
            if (res.data === "success") {
                alert("Delete Successfully")
                location.href = "../html/kin.html";
            }
        }).catch(err => {
            console.log(err);
        });
}
//sessionStorage.clear();
