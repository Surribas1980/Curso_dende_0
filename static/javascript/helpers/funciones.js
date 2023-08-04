const endPoints = {
  gardarDatos: '/gardoDatos',
  pedirListaGardada:'/verListaGardada',
  borrarDatos:'/borrarTarefa'
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



const corpoFetch = (endPoint,metodo,oBody) => {

  console.log('corpoFetch: ',endPoint,metodo,oBody)
  
  let elementosEnvio = {}

  elementosEnvio.endPoint = endPoint;
  elementosEnvio.metodo = metodo;
  elementosEnvio.header = {'Content-Type':'application/json'};
  if(oBody !== undefined){
    elementosEnvio.body = oBody;
  }

  return elementosEnvio
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
  deleteClassParaLista(parrafos)
}
const deleteElementList = (event) => {
  
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
      engadoDentroOTotalQueQuero(parrafos,referencia.titulo);  
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
 
  
  let etiquetas = document.getElementsByClassName("en-linea");

    if(etiquetas.length !== 0){
      let dataObjectToSend = {};
      for(let contador = 0; contador < etiquetas.length; contador ++){
        dataObjectToSend[`tarea ${contador}`] = etiquetas[contador].firstChild.textContent;
      }
  
        
        let paraEnviar = corpoFetch(endPoints.gardarDatos,metodos.post,JSON.stringify(dataObjectToSend));
      
        
        const res = await fetch(paraEnviar.endPoint,{
          method: paraEnviar.metodo,
          headers:paraEnviar.header,
          body: paraEnviar.body
        })
        const json = await res.json();
      
      console.log('statusEnvio: ', json.status)
        
        if(json.status == 'ok'){
          pintarRecibidoStatusOkGardado ()
        }
    }
    
}
const pintarRecibidoStatusOkGardado = ()=>{
          let referencia = creoReferenciasDeElementos();
          addClassWithRef(referencia.div,"lista-gardada");
          writingIn(referencia.div,`<h1>Lista de tarefas gardada</h1><button id="quitar">OK</button>`);
          engadoDentroOTotalQueQuero(document.body,referencia.div);
          escoitoEvento(quitar,'click',quitarEstiloListaGardada)
}

const getData = async () =>{

    const res = await fetch(endPoints.pedirListaGardada,{
      method:metodos.get,
      headers:{
        'Content-Type':'application/json'
      }
    })
    const json = await res.json();
    
    if(json.data.tareasGardadas.length != 0){
      
      pintoListaGardada(json.data.tareasGardadas)
    }
    
}

const cerrar = ()=>{
  location.replace('/')
}
const deleteData = async (dato) =>{
    
    let id = dato;
    const res = await fetch(`${endPoints.borrarDatos}/${id}`,{
      method: metodos.put,
      headers:{
        'Content-Type':'application/json'
      }
    });

    const json = await res.json();
    
}
const borrar = (event)=>{
 
    let tarefaAeliminar = event.target.previousElementSibling.firstElementChild.getAttribute('datos');
    deleteData(tarefaAeliminar)

    event.target.previousElementSibling.remove()
    event.target.remove()
    deleteClassParaLista(listaGardada)
}

const deleteClassParaLista = (referencia)=>{
  if(referencia.childElementCount === 1){
      referencia.classList.remove('para-lista')
      referencia.firstChild.remove()
    }
}

const deleteElementListHidden = (event) => {
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
  escoitoEvento(referencia.divOcultoListaGardada,eventosEnFuncionsNecesarios.oClick,borrar)
  
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