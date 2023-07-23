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
  
  let unP = creaElemento('li');// o non existir un li, agrego unha referencia
  let unDiv = creaElemento('div');
  let unhaImg = creaElemento('img');
  let check = creaElemento('input');
  
  establecerAtributo(check,'type','checkbox');
  addClassWithRef(unDiv,"unDiv");
  addClassWithRef(check,"novo-accent-color");
  addClassWithRef(unP,"en-linea")
  addClassWithRef(unhaImg,"unhaImaxen");
 
  
  establecerAtributo(unhaImg,'src','./css/basura.png');
  

  writingInList(unP,entradaDeDatos.value)

  
  unP.addEventListener('click',changeColor)

  unhaImg.addEventListener('click',deleteElementList)

  engadoDentroOTotalQueQuero(parrafos,unDiv);
  engadoDentroOTotalQueQuero(unDiv,unP);
  engadoDentroOTotalQueQuero(unDiv,unhaImg);
 

}


const changeColor = (event) => {
  event.target.classList.toggle("cambioCor")
}

const deleteElementList = (event) =>{

  event.target.parentNode.remove()
  
}
const sendData = async () => {
 
  let dataObjectToSend = {};
  let etiquetas = document.getElementsByClassName("en-linea");

    for(let contador = 0; contador < etiquetas.length; contador ++){
      dataObjectToSend[`tarea ${contador}`] = etiquetas[contador].firstChild.textContent;
    }
  
    console.log('envio datos: ',dataObjectToSend,JSON.stringify(dataObjectToSend))

    const res = await fetch('/gardoDatos',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(dataObjectToSend)
    })
    const json = await res.json();
    console.log('res status: ',json);
}
const getData = async () =>{
  
  let dataObjectToSend = {};

    const res = await fetch('/verListaGardada',{
      method:'GET',
      headers:{
        'Content-Type':'application/json'
      }
    })
    const json = await res.json();
    console.log('/verListaGardada status: ',json,json.data.tareasGardadas[1].tarea);
    /*let etiquetas = document.getElementsByClassName("en-linea");

    for(let contador = 0; contador < etiquetas.length; contador ++){
      dataObjectToSend[`tarea ${contador}`] = etiquetas[contador].firstChild.textContent;
    }
  
    console.log('envio datos: ',dataObjectToSend,JSON.stringify(dataObjectToSend))*/

    let unLi;
    let unDiv;
    for(let cont=0; cont < json.data.tareasGardadas.length ;cont ++){
      unLi = creaElemento('li');
      unDiv = creaElemento('div');
      writingInList(unLi,json.data.tareasGardadas[cont].tarea);
      engadoDentroOTotalQueQuero(listaGardada,unDiv);
      engadoDentroOTotalQueQuero(unDiv,unLi);
    }
    
}
oBoton.addEventListener('click',writingInDocHTML)
enviar.addEventListener('click',sendData)
verlista.addEventListener('click',getData);