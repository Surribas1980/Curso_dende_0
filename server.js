// Ferramentas core
const readline = require('readline');
let rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
rl.on('SIGINT', () => {
  rl.question('Are you sure you want to exit? ', (answer) => {
    if (answer.match(/^y(es)?$/i)) process.exit()
  })
})
//

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const app = express();

//funcións
const {	messageServerOn } = require("./funciones")

//Preparo as peticións
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));//parsea solo string
app.use(cors())

// Accedo o arquivo estático
app.use(express.static(path.join(__dirname, "static")));

//START SERVER
app.listen(3000, messageServerOn);
