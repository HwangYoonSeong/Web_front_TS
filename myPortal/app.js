const express = require("express");
// var expressSession = require('express-session');


const app = express();
const fs = require('fs');

app.use(express.json());
app.use(express.static('./'))

// app.get('/', (req, res) => {
//     res.sendFile(_dirname + "/index.html")
// })
// app.use(expressSession({
//     secret: 'key',
//     resave: false,
//     saveUninitialized: false,

// }))
app.all('/*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type"
    );
    next();
});

app.post('/signup/:userId', (req, res) => {
    // console.log(req.body.id);
    // console.log(req.body.pw);

    var id = req.params.userId;
    if (req.body.pw != req.body.pwConfig) {
        res.send('wrong');
    }
    else {

        fs.readFile('user.json', 'utf8', (err, data) => {
            //console.log(data);
            const users = JSON.parse(data);
            //console.log(users);
            if (users[id]) { //중복 확인 
                res.send('duplicate');
                return;
            }
            delete req.body.pwConfig;
            console.log(req.body);
            users[id] = req.body;

            const user = JSON.stringify(users, null, '\t');
            fs.writeFile('user.json', user, err => {
                res.send('success');
                if (err) {
                    res.status(500).send('Internal Server Error')
                }
            })

            if (err) {
                res.status(500).send('Internal Server Error')
            }

        })

    }
});


app.post('/login', (req, res) => {
    //var sess = req.session;

    fs.readFile('user.json', 'utf8', (err, data) => {
        const users = JSON.parse(data);
        var id = req.body.id;
        var pw = req.body.pw;

        if (!users[id]) { //회원 확인 
            res.send("not Found");
            return;
        }

        if (users[id].pw === pw) {
            //sess.username = id;
            res.send("success");
        } else {
            res.send("incorrect");
        }

        if (err) {
            res.status(500).send('Internal Server Error')
        }

    });

});


app.post('/post/:title', (req, res) => {
    const title = req.params.title;
    const post = req.body;
    const inputPost = JSON.stringify(post, null, '\t');

    fs.readFile('post.json', 'utf8', (err, data) => {
        //console.log(data);
        const posts = JSON.parse(data);

        posts[title] = req.body;
        const inputPost = JSON.stringify(posts, null, '\t');
        fs.writeFile('post.json', inputPost, err => {
            res.send('success');
            if (err) {
                res.status(500).send('Internal Server Error')
            }
        })


        if (err) {
            res.status(500).send('Internal Server Error')
        }

    })
});


app.get('/kin', (req, res) => {
    fs.readFile('post.json', 'utf8', (err, data) => {

        const Allposts = JSON.parse(data);
        const showPost = JSON.stringify(Allposts, null, '\t');
        res.send(showPost);



    })
});

app.delete('/:title', (req, res) => {
    let title = req.params.title;
    console.log(title);
    console.log("Hello")
    fs.readFile('post.json', 'utf8', (err, data) => {

        const Allposts = JSON.parse(data);
        console.log(Allposts);

        delete Allposts[title];
        console.log(Allposts);
        const deletedPost = JSON.stringify(Allposts, null, '\t');
        fs.writeFile('post.json', deletedPost, err => {
            res.send('success');
            if (err) {
                res.status(500).send('Internal Server Error')
            }
        });
        if (err) {
            res.status(500).send('Internal Server Error')
        }


        // res.send(showPost);
    })
});





app.listen(3000, function () {
    console.log(`App is running on port 3000`);
});




