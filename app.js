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
    res.send("This is a dummy auth server")
});

app.post('/api', (req, res) => {
    const dummyUser = {
        name: 'Sumit',
        id: 1,
        email: 'sumit.singh1@yopmail.com'
    };
    const token = jwt.sign(
        { dummyUser },
        '3jsniIXK64'
    );

    res.status(200).json({
        token: token
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