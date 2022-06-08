'use strict';

const express = require('express');
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const env = require('env-var');
const { detectExtension } = require('nodemailer/lib/mime-funcs/mime-types');
require('log-timestamp');

// Constants
const PORT = env.get('LISTENPORT').default('8080').asPortNumber();
//const PORT = '8080';
const HOST = '0.0.0.0';
const SMTPHOST = env.get('SMTPHOST').default('localhost').required().asString();
const SMTPPORT = env.get('SMTPPORT').default('25').asPortNumber();
const SMTPSECURE = env.get('SMTPSECURE').default('false').asBool();
const SMTPFROM = env.get('SMTPFROM').default('noone@example.net').required().asString();
const SMTPTO = env.get('SMTPTO').required().asString();


async function mailer() {
//  return;
let transporter = nodemailer.createTransport({
  host: SMTPHOST,
  port: SMTPPORT,
  secure: SMTPSECURE
});

let info = await transporter.sendMail({
  from: '${SMTPFROM}', // sender address
  to: '${SMTPTO}', // list of receivers
  subject: "Hello ✔", // Subject line
  text: "", // plain text body
  html: "<b>Hello world?</b>", // html body
});

console.log("Message sent: %s", info.messageId);
}

// App
const app = express();
app.use(bodyParser.json())
app.get("/", (req, res) => {
  console.log("get")
  res.status(200).end()
})
app.post("/hook", (req, res) => {
  console.log(req.body) // Call your action on the request here
  mailer().catch((err) => {
    console.error("Send mail error:", err.message)
    res.status(500).end();
  })
  res.status(200).end();
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
