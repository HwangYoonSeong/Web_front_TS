const express = require("express");


const app = express();
const fs = require('fs');

app.use(express.json());
app.use(express.static('./'))

// app.get('/', (req, res) => {
//     res.sendFile(_dirname + "/index.html")
// })
app.all('/*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type"
    );
    next();
});

app.post('/signup', (req, res) => {
    console.log(req.body.id);
    console.log(req.body.pw);
    if (req.body.pw != req.body.pwConfig) {
        res.send('wrong');
    }
    else {
        const obj = {
            id: req.body.id,
            pw: req.body.pw
        }
        const user = JSON.stringify(obj);
        fs.writeFile('user.json', user, err => {
            if (err) console.log(err);
        })

        res.send('success');

    }
});


app.post('/login', (req, res) => {
    console.log(req.body.id);
    console.log(req.body.pw);
    fs.readFile('user.json', 'utf8', (err, data) => {
        const user = JSON.parse(data);

        if ((user.id === req.body.id) && (user.pw === req.body.pw)) {
            res.send('success');
        } else {
            res.send('wrong');
        }
    });


});

app.listen(3000, function () {
    console.log(`App is running on port 3000`);
});




