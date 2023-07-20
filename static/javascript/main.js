function escribir(entradaDeTexto){
  
  
  let unP = document.createElement('li');// o non existir un li, agrego unha referencia
  let check = document.createElement('input');
  check.setAttribute('type','checkbox')
  check.classList.add("novo-accent-color");
  //unP.classList.add("cambioCor")
  unP.classList.add("en-linea")
  console.log('a entrada de texto en escribir é: ☢',entradaDeTexto)
  console.log('estou a crear un unP: ',unP);

  unP.innerHTML = entradaDeTexto;


  
  unP.addEventListener('click',changeColor)

  
  /*document.body.append(div)
  document.body.append(check)*/
  /*parrafos.prepend(unP)*/
  parrafos.append(unP)
  //parrafos.before(check)
}

const escribindoDendeOBoton = () => {

  console.log(entradaDeDatos.value)
  
  escribir(entradaDeDatos.value)
}

const changeColor = (event) => {
  event.target.classList.toggle("cambioCor")
}

