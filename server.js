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
  rexistroUsuario:'/rexistro',
  rexistrandoUser:'/rexistrandoUser'
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
       borrarTarefa} = require("./helpers/funciones")

//Rutas de archivos 
const pathImaxes = path.join(__dirname,'/Imaxes');
const pathStatic = path.join(__dirname,'./static');
const outra = path.join(__dirname,'./');
//Páxinas de envio
const paxina = {
  listaTarefas:'envio.html',
  rexistraUsuario:'formulariogistro.html'
}
//Preparo as peticións
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));//parsea solo string
app.use(cors())
app.use(express.static(pathImaxes))
app.use(express.static(pathStatic));
//app.use(express.static(outra));
/** 
Dou acceso a Imaxes/usuarios
*/

//Preparo unha petición POST
app.post(endPoints.paxinaEntrada,(req,res)=>{
  let palabra = '';
  if(palabra == 'hola'){
    app.use(express.static(outra))
		res.sendFile(paxina.listaTarefas,{root: outra})
  }
    
})
app.post(endPoints.rexistroUsuario,(req,res)=>{
  res.sendFile(paxina.rexistraUsuario,{root: pathStatic})
    
})

app.post(endPoints.gardoDatos,unPostExemploReqBodyFunction)
app.post(endPoints.rexistrandoUser,(req,res,next)=>{
  let corpoBody=req.body;
  console.log('corpoBody: ',corpoBody)
  if(req.body != undefined){
    //res.sendStatus(200);
    res.redirect('/rexistro');
    next();
  }
})
app.get(endPoints.rexistroUsuario,(req,res)=>{
  res.sendFile(paxina.rexistraUsuario,{root: pathStatic})
    
})
//////////////////////////////
app.get(endPoints.verListaGardada,unVerListaGardada)
app.put(endPoints.borrarTarefaId,borrarTarefa)
// Accedo o arquivo estático


//START SERVER
app.listen(3000, messageServerOn);
