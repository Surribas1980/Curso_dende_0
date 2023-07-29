// Ferramentas core
const readline = require('readline');
let rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
rl.on('SIGINT', () => {
  
  rl.question('Are you sure you want to exit? ', (answer) => {
    if (answer.match(/^y(es)?$/i)) {
      
      process.exit()}
  })
})
//
const endPoints = {
  gardoDatos:'/gardoDatos',
  verListaGardada:'/verListaGardada',
  borrarTarefaId:'/borrarTarefa/:id',
  paxinaEntrada:'/paxinaDEntrada',
  index:'/',
  novo:'/novo',
  cerrar:'/cerrar'
}
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const app = express();



//funcións
const {	messageServerOn,
       unPostExemploReqBodyFunction,
       unVerListaGardada,
       borrarTarefa,
       enviarPaxina} = require("./helpers/funciones")

//Rutas de archivos 
const pathImaxes = path.join(__dirname,'/Imaxes');

const pathStatic = path.join(__dirname,'./static')
//Preparo as peticións
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));//parsea solo string
app.use(cors())
app.use(express.static(pathImaxes))
/** 
Dou acceso a Imaxes/usuarios
*/


//Preparo unha petición GET
app.get(endPoints.index,(req,res)=>{
    const elfichero = 'index.html';
		res.sendFile(elfichero,{root: pathStatic})
})

app.get(endPoints.cerrar,(req,res)=>{
  console.log('cerrar?')
   res.redirect('./');
})
//Preparo unha petición POST
app.post(endPoints.paxinaEntrada,(req,res)=>{
  const elfichero = 'envio.html';
  console.log('datos que envía o cliente: ',req.body)
		res.sendFile(elfichero,{root: pathStatic})
})
app.post(endPoints.novo,(req,res)=>{
  console.log('novo: ',req.body,req.surname,req.message)
  res.send({status:"ok",
           resposta:"moi ben"})
})

app.post(endPoints.gardoDatos,unPostExemploReqBodyFunction)
app.get(endPoints.verListaGardada,unVerListaGardada)
app.put(endPoints.borrarTarefaId,borrarTarefa)
// Accedo o arquivo estático
app.use(express.static(path.join(__dirname, "static")));

//START SERVER
app.listen(3000, messageServerOn);
