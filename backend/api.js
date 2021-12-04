const express = require("express");

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