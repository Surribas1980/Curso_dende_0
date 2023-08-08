const express = require("express");
const app = express();
const path = require("path");
const outra = path.join(__dirname,'../');
const paxina = {
  listaTarefas:'envio.html',
  rexistraUsuario:'formulariogistro.html'
}
app.use(express.static(outra));

const db = require('../db/conexion_db')

const unPostExemploReqBodyFunction = function(req,res){

    const conn = db.open();
    let tareasGardadas = [];
  
    conn.serialize(function (){
      for(let elemento in req.body){
          conn.run(`INSERT INTO tareas (tarea) VALUES (?)`,[`${req.body[elemento]}`],
            function (error) {
              if (error) {
                console.error(error.message);
              }
              console.log(`Inserted a row with the ID: ${this.lastID}`);
            }
          );
      }//for
        
         conn.each(`SELECT * FROM tareas`, (error, row) => {
          if (error) {
            throw new Error(error.message);
          }
          //console.log(row);
          tareasGardadas.push(row)
          console.log('as tareas: ',tareasGardadas);
          salidaDeDatos = row;
          
        },()=>{
          res.send({
                  status:"ok",
                  data:{
                      tareasGardadas,
                  }
              })
        });//conn.each

              
        });//conn.serialize

    //conn.close();
}
const unVerListaGardada = function(req,res){

    const conn = db.open();
    let tareasGardadas = [];
  
    conn.serialize(function (){
         conn.each(`SELECT * FROM tareas`, (error, row) => {
          if (error) {
            throw new Error(error.message);
          }
         
          tareasGardadas.push(row)
         
          salidaDeDatos = row;
          
        },()=>{
          res.send({
                  status:"ok",
                  data:{
                      tareasGardadas,
                  }
              })
        });//conn.each

              
        });//conn.serialize

    //conn.close();
}
const insertarUsuario = (req,res,next)=>{
  const conn = db.open()
  const body = req.body;

  console.log('body ',body.name,body.pwd,body.dni);
  if(req.body != undefined){
    //res.sendStatus(200);

    conn.serialize(function (){
          conn.run(`INSERT INTO usuarios (dni,pwd,nome) VALUES (?,?,?)`,[`${body.dni}`,`${body.pwd}`,`${body.name}`],
            function (error) {
              if (error) {
                console.error(error.message);
              }
              
            }
          );
        
         conn.each(`SELECT * FROM usuarios`, (error, row) => {
          if (error) {
            throw new Error(error.message);
          }
          console.log(row);
        },()=>{
          res.redirect('/rexistro');
          next();
        });//conn.each

              
        });//conn.serialize






    
    /*res.redirect('/rexistro');
    next();*/
  }
}
const borrarTarefa = function(req,res){

  const conn = db.open();
  
  const {id} = req.params;
    console.log('req.query: ',id,req.params)

    conn.run(`DELETE FROM tareas WHERE id = ?`,[`${id}`],
            function (error) {
              if (error) {
                console.error(error.message);
              }
              console.log(`Borrada a fila co ID: ${id}`);
            }
          );
        res.send({
                status:"ok"    
            })
}
const lerUsuario = (req,res,next)=>{
  const body = req.body;
  const conn = db.open()
  console.log('body: ',body)
  conn.serialize(function (){
          
        
        conn.get(`SELECT * FROM usuarios WHERE nome = ? and pwd = ? and dni = ?`,[`${body.name}`,`${body.pwd}`,`${body.dni}`], (error, row) => {
          if (error) {
            throw new Error(error.message);
          }
          console.log(row);
          let datosSend = {
            nome: row.nome,
            pwd: row.pwd,
            dni: row.dni
          }
           console.log('estou en lerUsuario ',datosSend);
            //res.send(datosSend)
           req.datosSend = datosSend;
    
              //next();
         });//conn.get
        conn.run(`CREATE VIEW IF NOT EXISTS usuarioslogueados as select * from usuarios where nome = '${body.name}'`,(error)=>{
           if (error) {
            throw new Error(error.message);
          }
          next();
        })  
        });//conn.serialize
}
const leoUsuarioLogueado = function(req,res){
  const conn = db.open();
console.log('está en leoUsuarioLogueado : ');
  conn.get(`SELECT * FROM usuarioslogueados ORDER BY nome ASC`,(error,row)=>{
    if (error) {
            throw new Error(error.message);
          }
    console.log('está sacando datos: ',row);
          let datosSend = {
            nome: row.nome,
            pwd: row.pwd,
            dni: row.dni
          }
    /*let datosSend = {
            nome: 'row.nome',
            pwd: 'row.pwd',
            dni: 'row.dni'
          }*/
    res.send(datosSend)
  })
}
const messageServerOn = function () {
 console.log("Server running");
}
const enviandoPaxTarefas = function(req,res){
   console.log('estou o final',req.datosSend,req.body)
   res.sendFile(paxina.listaTarefas,{root: outra})
  //res.send(req.datosSend)
}
module.exports = {
	unPostExemploReqBodyFunction,
	messageServerOn,
  unVerListaGardada,
  borrarTarefa,
  insertarUsuario,
  lerUsuario,
  enviandoPaxTarefas,
  leoUsuarioLogueado
}