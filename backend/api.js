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

// mimicking 3rd party API call
function getAllStudents() {
    return JSON.parse(fs.readFileSync('resources/students-small.json', 'utf8'));
}

app.get("/students/:name", (req, res) => {
    console.log("Student search requested for name " + req.params.name);
    let matchingStudents = []
    matchingStudents.push(getAllStudents().find(student => student.firstName === req.params.name));
    matchingStudents.forEach(student => student.label = student.firstName);
    console.log("Matching students:")
    console.log(matchingStudents)
    return res.send(matchingStudents)
})

app.get("/students/", (req, res) => {
    console.log("All students are requested");

    return res.send(getAllStudents());
})