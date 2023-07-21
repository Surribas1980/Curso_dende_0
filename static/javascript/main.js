function creaElemento(etiqueta){
  return document.createElement(etiqueta);
}
function addClassWithRef(referencia,clase){
  return referencia.classList.add(clase)
}
function establecerAtributo(referencia,atributo,valor){
  return referencia.setAttribute(atributo,valor)
}

function escribir(entradaDeTexto){
  
  let unP = creaElemento('li');// o non existir un li, agrego unha referencia
  let unDiv = creaElemento('div');
  //let outroDiv = creaElemento('div');
  let unhaImg = creaElemento('img');
  let check = creaElemento('input');
  
  establecerAtributo(check,'type','checkbox');
  addClassWithRef(unDiv,"unDiv");
  addClassWithRef(check,"novo-accent-color");
  addClassWithRef(unP,"en-linea")
  addClassWithRef(unhaImg,"unhaImaxen");
  //addClassWithRef(outroDiv,"unhaImaxeNaClase");
  
  establecerAtributo(unhaImg,'src','./css/basura.png');
  

  unP.innerHTML = entradaDeTexto;


  
  unP.addEventListener('click',changeColor)

  unhaImg.addEventListener('click',deleteElementList)
  /*document.body.append(div)
  document.body.append(check)*/
  /*parrafos.prepend(unP)*/
  
  parrafos.append(unDiv);
  unDiv.append(unP);
  unDiv.append(unhaImg);
  //unDiv.append(outroDiv)
  //parrafos.before(check)
}

const escribindoDendeOBoton = () => {

  console.log(entradaDeDatos.value)
  
  escribir(entradaDeDatos.value)
}

const changeColor = (event) => {
  event.target.classList.toggle("cambioCor")
}

const deleteElementList = (event) =>{

  event.target.parentNode.remove()
  
}

