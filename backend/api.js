const express = require("express");
var responseTime = require('response-time')
var fs = require('fs');
var cors = require('cors')

const redis = require("redis");
const axios = require("axios");

const app = express();
const port = 3002;

app.use(responseTime())

// allow cors, not recommended in production
app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Expose-Headers", "X-Response-Time");
    next();
});

app.listen(port, () => {
    console.log("Backend is up and ready to go.")
})

// mimicking 3rd party API call
function getAllStudents() {
    return JSON.parse(fs.readFileSync('resources/students.json', 'utf8'));
}

app.get("/students/:name", (req, res) => {
    console.log("Student search requested for name " + req.params.name);
    let matchingStudents = getAllStudents().filter(student => student.firstName.toLowerCase().includes(req.params.name));
    if (matchingStudents == null) {
        return;
    }
    matchingStudents.forEach(student => student.label = student.firstName + " " + student.lastName);
    console.log("Matching students:")
    console.log(matchingStudents)
    return res.send(matchingStudents)
})

app.get("/students/", (req, res) => {
    console.log("All students are requested");

    return res.send(getAllStudents());
})