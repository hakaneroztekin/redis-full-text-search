const express = require("express");
var fs = require('fs');
const redis = require("redis");
const axios = require("axios");

const app = express();
const port = 3002;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(port, () => {
    console.log("Backend is up and ready to go.")
})

app.get("/students/:name", (req, res) => {
    console.log("Student search requested for name ");
    console.log(req.params.name)
})

app.get("/students/", (req, res) => {
    console.log("All students are requested");

    // executing sync call, mimicking 3rd party API call
    var students = JSON.parse(fs.readFileSync('resources/students-small.json', 'utf8'));

    return res.send(students);
})