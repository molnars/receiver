'use strict';

const express = require('express');
const bodyParser = require("body-parser")

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(bodyParser.json())
app.get("/", (req, res) => {
  console.log("get")
  res.status(200).end()
})
app.post("/hook", (req, res) => {
  console.log(req.body) // Call your action on the request here
  res.status(200).end() // Responding is important
})


//app.get('/', (req, res) => {
//  res.send('Hello World');
//});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
