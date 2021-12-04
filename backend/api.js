const express = require("express");
var responseTime = require('response-time')
var fs = require('fs');
var cors = require('cors')

const redis = require("redis");

let redisClient;

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
    // connect to redis
    redisClient = redis.createClient({
        host: process.env["redis.host"],
        port: process.env["redis.port"],
        // todo update
        // password: process.env["redis.password"]
    });
    redisClient.connect();

    redisClient.on('connect', () => {
        console.log("Redis is connected.");
    });
    redisClient.on('error', err => {
        console.log('Redis is failed to connect. Error ' + err);
    });

    console.log("API is up and ready to go.")
})

// mimicking 3rd party API call
async function getAllStudents() {
    return await redisClient.get("students").then((response => {
        if (response) {
            console.log("Students cache found, returning.")
            console.log(response)
            return []; // todo update
        }
        console.log("Students cache not found, parsing.")
        return JSON.parse(fs.readFileSync('resources/students.json', 'utf8'));
    }));
}

app.get("/students/:name", async (req, res) => {
    console.log("Student search requested for name " + req.params.name);
    let matchingStudents = await getAllStudents();
    matchingStudents = matchingStudents.filter(function (student) {
        // search in all fields of a student object
        return Object.values(student).find(value => String(value).toLowerCase().includes(req.params.name.toLowerCase()));
    });
    if (matchingStudents.length === 0) {
        return res.send()
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