const fs = require('fs');

const express = require('express');
const { userInfo } = require('os');
const app = express();



app.use(express.json())
app.use(express.static('./'))


app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})


app.post('/signup', (req, res) => {
    let userObj = {
        id: req.body.id,
        pw: req.body.pw,
        pwConfirm: req.body.pwConfirm,
        name: req.body.name
    }
    if (userObj.pw !== userObj.pwConfirm) {
        res.send('달라요');
    }
    else {
        let obj = {
            id: userObj.id,
            pw: userObj.pw
        }
        const userInfo = JSON.stringify(obj);
        fs.writeFileSync('users.json', userInfo, err => {
            if (err) console.log(err);
        });

        res.send('회원가입 성공!');
    }
})


app.post('/login', (req, res) => {
    let loginInfo = {
        id: req.body.id,
        pw: req.body.pw
    }
    console.log(loginInfo)

    fs.readFile('users.json', 'utf8', (err, data) => {
        let userInfo = JSON.parse(data);

        if ((loginInfo.id === userInfo.id) && (loginInfo.pw === userInfo.pw)) {
            console.log('로그인 완료!');
            res.send('성공!');
        }
    })

})


app.listen(3000, () => {
    console.log('open server')
})