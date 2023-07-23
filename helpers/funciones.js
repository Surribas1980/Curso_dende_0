const path = require("path");
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
const messageServerOn = function () {
 console.log("Server running");
}

module.exports = {
	unPostExemploReqBodyFunction,
	messageServerOn,
  unVerListaGardada,
}