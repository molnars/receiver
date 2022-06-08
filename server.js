'use strict';

const express = require('express');
const bodyParser = require("body-parser");
//const nodemailer = require("nodemailer");
//const env = require('env-var');

// Constants
const PORT = env.get('LISTENPORT').default('8080');
const HOST = '0.0.0.0';
const SMTPHOST = env.get('SMTPHOST').required();
const SMTPPORT = env.get('SMTPPORT').default('25').asPortNumber();
const SMTPSECURE = env.get('SMTPSECURE').default('false');
const SMTPFROM = env.get('SMTPFROM').required();
const SMTPTO = env.get('SMTPTO').required();


//async function mailer() {
//let transporter = nodemailer.createTransport({
//  host: SMTPHOST,
//  port: SMTPPORT,
//  secure: SMTPSECURE
//});

//let info = await transporter.sendMail({
//  from: '${SMTPFROM}', // sender address
//  to: '${SMTPTO}', // list of receivers
//  subject: "Hello ✔", // Subject line
//  text: "Hello world?", // plain text body
//  html: "<b>Hello world?</b>", // html body
//});


//console.log("Message sent: %s", info.messageId);
//}

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
console.log(`SMTP host:${SMTPHOST}:${SMTPPORT}`);
//
//curl -kv http://localhost:8080/hook -XPOST -H "Content-Type: application/json" -d '{"data": "value"}'
//
