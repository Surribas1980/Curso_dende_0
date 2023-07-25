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
}


const changeColor = (event) => {
  event.target.classList.toggle("cambioCor")
}
const deleteElementList = (event) => {
  event.target.parentNode.remove()
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
  return referencia.setAttribute(atributo,valor)
}
function writingInList(referencia,textoAEscribir){
  referencia.innerHTML = textoAEscribir;
}
function engadoDentroOTotalQueQuero(referencia,elemento) {
  referencia.append(elemento)
}
function writingInDocHTML(){
  
  let unP = creaElemento(etiquetas.li);// o non existir un li, agrego unha referencia
  let unDiv = creaElemento(etiquetas.div);
  let unhaImg = creaElemento(etiquetas.img);
  
  addClassWithRef(unDiv,"unDiv");
  addClassWithRef(unP,"en-linea")
  addClassWithRef(unhaImg,"unhaImaxen");
  addClassWithRef(parrafos,"para-lista");
  
  establecerAtributo(unhaImg,'src','./css/basura.png');
  

  writingInList(unP,entradaDeDatos.value)

  
  unP.addEventListener('click',changeColor)

  unhaImg.addEventListener('click',deleteElementList)

  engadoDentroOTotalQueQuero(parrafos,unDiv);
  engadoDentroOTotalQueQuero(unDiv,unP);
  engadoDentroOTotalQueQuero(unDiv,unhaImg);
 

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
      writingInList(unLi,json.data.tareasGardadas[cont].tarea);
      engadoDentroOTotalQueQuero(listaGardada,unDiv);
      engadoDentroOTotalQueQuero(unDiv,unLi);
    }
    
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
}
export {
  creaElemento,
  addClassWithRef,
  establecerAtributo,
  writingInList,
  engadoDentroOTotalQueQuero,
  writingInDocHTML,
  sendData,
  getData,
  escoitoEvento,
  deleteData,
  borrar
}