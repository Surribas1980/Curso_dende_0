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
const server = express();

//funcións
const {	messageServerOn } = require("./helpers/funciones")





//Preparo as peticións
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));//parsea solo string
server.use(cors())

// Accedo o arquivo estático
server.use(express.static(path.join(__dirname, "static")));

//START SERVER
server.listen(3000, messageServerOn);
