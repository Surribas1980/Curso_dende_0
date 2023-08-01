const endPoints = {
  gardarDatos: '/gardoDatos',
  pedirListaGardada:'/verListaGardada',
  borrarDatos:'/borrarTarefa',
  cerrar:'/',
}
const metodos = {
  get:'GET',
  post: 'POST',
  put:'PUT'
}
const etiquetas = {
  li:'li',
  div:'div',
  img:'img',
  input:'input',
  h1:'h1',
  boton:'button'
}
const eventosEnFuncionsNecesarios = {
  oClick: 'click'
}
const atributoHidden = (referencia,valor)=>{
  referencia.hidden = valor;
}
const changeColor = (event) => {
  event.target.classList.toggle("cambioCor")
}
const borrarElementos = (event)=>{
  
    event.target.parentElement.previousElementSibling.remove();
    event.target.parentElement.remove();
    if(parrafos.childElementCount === 1){
      parrafos.classList.remove('para-lista')
      console.log('a ver se queda sólo un: ',parrafos.childElementCount)
      parrafos.firstChild.remove()
    }else{
      console.log('as tareas que quedan son:  ',parrafos.childElementCount)
    }
}
const deleteElementList = (event) => {
  console.log(`en deleteElementList ${event.target.parentElement.nextElementSibling}`)
  let elemento = event.target.parentElement.nextElementSibling;

  elemento.hidden == false ?  atributoHidden(elemento,true) : atributoHidden(elemento,false);
  

}

const escoitoEvento = (referencia,evento,funNecesaria) => {
  referencia.addEventListener(evento,funNecesaria,true)
}
const creoReferenciasDeElementos = () =>{
  let refsCreadas = {
    li: creaElemento(etiquetas.li),
    div:creaElemento(etiquetas.div),
    imagen: creaElemento(etiquetas.img),
    divOculto: creaElemento(etiquetas.div),
    divInterno: creaElemento(etiquetas.div),
    divOcultoListaGardada:creaElemento(etiquetas.div),
    imagenListaGardada: creaElemento(etiquetas.img),
    divInternoListaGardada: creaElemento(etiquetas.div),
    titulo:creaElemento(etiquetas.h1)
  }
  
  return refsCreadas;
}

function creaElemento(etiqueta){
  return document.createElement(etiqueta);
}
function addClassWithRef(referencia,clase){
  return referencia.classList.add(clase)
}
function establecerAtributo(referencia,atributo,valor){
  return referencia.setAttribute(atributo,valor);
}
function writingIn(referencia,textoAEscribir){
  referencia.innerHTML = textoAEscribir;
}
function engadoDentroOTotalQueQuero(referencia,elemento) {
  referencia.append(elemento)
}


function writingInDocHTML(){
  
  let referencia = creoReferenciasDeElementos();

  if(parrafos.childElementCount === 0){
      writingIn(referencia.titulo,"Lista de tarefas a gardar");
      engadoDentroOTotalQueQuero(parrafos,referencia.titulo)
    
  }
  addClassWithRef(referencia.div,"unDiv");
  addClassWithRef(referencia.li,"en-linea")
  addClassWithRef(referencia.imagen,"unhaImaxen");
  addClassWithRef(parrafos,"para-lista");
  addClassWithRef(referencia.divOculto,"divOculto");
  
  establecerAtributo(referencia.imagen,'src','./css/basura.png');
  establecerAtributo(referencia.divOculto,'id','div_Oculto');

  atributoHidden(referencia.divOculto,true)
  escoitoEvento(referencia.divOculto,eventosEnFuncionsNecesarios.oClick,borrarElementos)
  
  writingIn(referencia.li,entradaDeDatos.value)
  writingIn(referencia.divInterno,'Queres eliminala tarefa? CLICAME PARA CONFIRMAR')
  
  escoitoEvento(referencia.li,eventosEnFuncionsNecesarios.oClick,changeColor)
 
  escoitoEvento(referencia.imagen,eventosEnFuncionsNecesarios.oClick,deleteElementList)


  engadoDentroOTotalQueQuero(parrafos,referencia.div);
  engadoDentroOTotalQueQuero(referencia.div,referencia.li);
  engadoDentroOTotalQueQuero(referencia.div,referencia.imagen);
  engadoDentroOTotalQueQuero(parrafos,referencia.divOculto);
  engadoDentroOTotalQueQuero(referencia.divOculto,referencia.divInterno);
  
 

}





/** 
  COMUNICACIÓN CO BACK 

  > Verbos utilizados:
    - POST y GET
*/
const quitarEstiloListaGardada = (event)=>{
  event.target.parentElement.remove()
}
const sendData = async () => {
 
  let dataObjectToSend = {};
  let etiquetas = document.getElementsByClassName("en-linea");

    if(etiquetas.length !== 0){
      for(let contador = 0; contador < etiquetas.length; contador ++){
        dataObjectToSend[`tarea ${contador}`] = etiquetas[contador].firstChild.textContent;
      }
  
        console.log('envio datos: ',dataObjectToSend,JSON.stringify(dataObjectToSend))
    
        const res = await fetch(endPoints.gardarDatos,{
          method: metodos.post,
          headers:{
            'Content-Type':'application/json'
          },
          body: JSON.stringify(dataObjectToSend)
        })
        const json = await res.json();
        console.log('res status: ',json);
        
        if(json.status == 'ok'){
          let referencia = creoReferenciasDeElementos();
          addClassWithRef(referencia.div,"lista-gardada");
          writingIn(referencia.div,`<h1>Lista de tarefas gardada</h1><button id="quitar">OK</button>`);
          engadoDentroOTotalQueQuero(document.body,referencia.div);
          escoitoEvento(quitar,'click',quitarEstiloListaGardada)
        }
    }
    
}


const getData = async () =>{

    const res = await fetch(endPoints.pedirListaGardada,{
      method:metodos.get,
      headers:{
        'Content-Type':'application/json'
      }
    })
    const json = await res.json();
    console.log(`json.data.tareasGardadas: ${json.data.tareasGardadas}`)
    if(json.data.tareasGardadas.length != 0){
      
      pintoListaGardada(json.data.tareasGardadas)
    }
    
}

const cerrar = ()=>{
  location.replace('/')
}
const deleteData = async (dato) =>{
    console.log('dato: ',dato)
    let id = dato;
    const res = await fetch(`${endPoints.borrarDatos}/${id}`,{
      method: metodos.put,
      headers:{
        'Content-Type':'application/json'
      }
    });

    const json = await res.json();
    console.log(`resposta de borrar tarea: ${json.status}`)
}
const borrar = (event)=>{
 
    let tarefaAeliminar = event.target.previousElementSibling.firstElementChild.getAttribute('datos');
    deleteData(tarefaAeliminar)

  event.target.previousElementSibling.remove()
  event.target.remove()

  if(listaGardada.childElementCount === 1){
      listaGardada.classList.remove('para-lista')
      console.log('a ver se queda sólo un: ',listaGardada.childElementCount)
      listaGardada.firstChild.remove()
    }else{
      console.log('as tareas que quedan son:  ',listaGardada.childElementCount)
    }
  
    
}

const deleteElementListHidden = (event) => {
  console.log(`en deleteElementListHidden??? ${event.target.parentElement.nextElementSibling}`)
  let elemento = event.target.parentElement.nextElementSibling;

  elemento.hidden == false ?  atributoHidden(elemento,true) : atributoHidden(elemento,false);
  

}
const pintoListaGardada = (tareasGardadas)=>{
    let referencia;
    addClassWithRef(listaGardada,"para-lista");
  
    for(let cont=0; cont < tareasGardadas.length ;cont ++){
      referencia = creoReferenciasDeElementos();
     if(cont == 0){
       writingIn(referencia.titulo,"Lista gardada");
       engadoDentroOTotalQueQuero(listaGardada,referencia.titulo)
     }
      establecerAtributo(referencia.li,'datos',tareasGardadas[cont].id)
      establecerAtributo(referencia.li,'id','oBorraListaGardada')
      establecerAtributo(referencia.imagen,'src','./css/basura.png');
      addClassWithRef(referencia.div,"unDivListaGardada");
      addClassWithRef(referencia.imagen,"unhaImaxenListaGardada");
      writingIn(referencia.li,tareasGardadas[cont].tarea);
      engadoDentroOTotalQueQuero(listaGardada,referencia.div);
      engadoDentroOTotalQueQuero(referencia.div,referencia.li);
      engadoDentroOTotalQueQuero(referencia.div,referencia.imagen);
     
      escoitoEvento(referencia.imagen,eventosEnFuncionsNecesarios.oClick,deleteElementListHidden);
      writtingHiddenElement(referencia)
    }
}
const writtingHiddenElement = (referencia)=>{

  addClassWithRef(referencia.divOcultoListaGardada,"divOcultoListaGardada");
  atributoHidden(referencia.divOcultoListaGardada,true)
  writingIn(referencia.divOcultoListaGardada,'Queres eliminala tarefa? CLICAME PARA CONFIRMAR')
  engadoDentroOTotalQueQuero(listaGardada,referencia.divOcultoListaGardada);
  let referenciaDatosAEliminar = referencia.divOcultoListaGardada;
  escoitoEvento(referenciaDatosAEliminar,eventosEnFuncionsNecesarios.oClick,borrar)
  
}

export {
  creaElemento,
  addClassWithRef,
  establecerAtributo,
  writingIn,
  engadoDentroOTotalQueQuero,
  writingInDocHTML,
  sendData,
  getData,
  escoitoEvento,
  deleteData,
  borrar,
  cerrar
}