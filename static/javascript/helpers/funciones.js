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
}
const eventosEnFuncionsNecesarios = {
  oClick: 'click'
}

const changeColor = (event) => {
  event.target.classList.toggle("cambioCor")
}
const borrarElementos = (event)=>{
  console.log('en div oculto')
    event.target.parentElement.previousElementSibling.remove();
    event.target.parentElement.remove();
    if(parrafos.childElementCount === 0){
    parrafos.classList.remove('para-lista')
    console.log('a ver se queda sólo un: ',parrafos.childElementCount)
  }else{
    console.log('as tareas que quedan son:  ',parrafos.childElementCount)
  }
}
const deleteElementList = (event) => {
  //event.target.parentNode.remove();
  //event.target.style.display = 'none';
  //event.target.parentElement.nextElementSibling.style.display = 'block';
  //event.target.hidden = true;
  let elemento = event.target.parentElement.nextElementSibling;
  if(elemento.hidden == false){
    elemento.hidden = true
  }else{
    elemento.hidden = false
  }
  //elemento.hidden = false;
  /*if(parrafos.childElementCount === 0){
    parrafos.classList.remove('para-lista')
    console.log('a ver se queda sólo un: ',parrafos.childElementCount)
  }else{
    console.log('as tareas que quedan son:  ',parrafos.childElementCount)
  }*/
}
const escoitoEvento = (referencia,evento,funNecesaria) => {
  referencia.addEventListener(evento,funNecesaria)
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
  
  let unLi = creaElemento(etiquetas.li);// o non existir un li, agrego unha referencia
  let unDiv = creaElemento(etiquetas.div);
  let unhaImg = creaElemento(etiquetas.img);
  let unDivOculto = creaElemento(etiquetas.div);
  let outroDiv = creaElemento(etiquetas.div);
  addClassWithRef(unDiv,"unDiv");
  addClassWithRef(unLi,"en-linea")
  addClassWithRef(unhaImg,"unhaImaxen");
  addClassWithRef(parrafos,"para-lista");

  addClassWithRef(unDivOculto,"divOculto");
  
  establecerAtributo(unhaImg,'src','./css/basura.png');
  establecerAtributo(unDivOculto,'id','div_Oculto');
  unDivOculto.hidden = true;
  unDivOculto.addEventListener('click',borrarElementos)
  writingIn(unLi,entradaDeDatos.value)
  writingIn(outroDiv,'Queres eliminala tarefa? CLICAME PARA CONFIRMAR')
  
  escoitoEvento(unLi,eventosEnFuncionsNecesarios.oClick,changeColor)
 
  escoitoEvento(unhaImg,eventosEnFuncionsNecesarios.oClick,deleteElementList)


  engadoDentroOTotalQueQuero(parrafos,unDiv);
  engadoDentroOTotalQueQuero(unDiv,unLi);
  engadoDentroOTotalQueQuero(unDiv,unhaImg);
  engadoDentroOTotalQueQuero(parrafos,unDivOculto);
  engadoDentroOTotalQueQuero(unDivOculto,outroDiv);
  
 

}





/** 
  COMUNICACIÓN CO BACK 

  > Verbos utilizados:
    - POST y GET
*/

const sendData = async () => {
 
  let dataObjectToSend = {};
  let etiquetas = document.getElementsByClassName("en-linea");

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

    let unLi;
    let unDiv;
    addClassWithRef(listaGardada,"para-lista");
    for(let cont=0; cont < json.data.tareasGardadas.length ;cont ++){
      unLi = creaElemento('li');
      unDiv = creaElemento('div');
      establecerAtributo(unLi,'datos',json.data.tareasGardadas[cont].id)
      establecerAtributo(unLi,'id','oBorra')
      addClassWithRef(unDiv,"unDiv");
      writingIn(unLi,json.data.tareasGardadas[cont].tarea);
      engadoDentroOTotalQueQuero(listaGardada,unDiv);
      engadoDentroOTotalQueQuero(unDiv,unLi);
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
    deleteData(event.target.getAttribute('datos'))
    event.target.remove()
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