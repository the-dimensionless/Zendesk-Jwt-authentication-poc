// create an express app
const express = require("express");
const jwt = require('jsonwebtoken');

const app = express();

const checkToken = (req, res, next) => {
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
};

// define the first route
app.get("/api", function (req, res) {
    console.log('\nIncoming Request is\n', req);
    res.send("This is a dummy auth server");
});

app.post('/api', (req, res) => {
    const name = 'Sumit';
    const id = 1;
    const email = 'sumit.singh1@yopmail.com'

    console.log('\nIncoming Request is\n', req);

    const token = jwt.sign(
        {
            name,
            email,
            id,
        },
        'JKjvzHqoHxyRJojChDEq7TVzBJlFIwzRt4AJbsIF55FSBMcp'
    );

    res.status(200).json({
        jwt: token
    });
});

app.get('/api/private', checkToken, (req, res) => {
    res.json({
        text: 'A private view'
    });
});


// start the server listening for requests
app.listen(process.env.PORT || 5000,
    () => console.log("Server is running..."));