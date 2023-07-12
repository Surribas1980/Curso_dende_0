function escribir(entradaDeTexto){
  
  
  let div = document.createElement('div');

  console.log('a entrada de texto en escribir é: ',entradaDeTexto)
  console.log('estou a crear un div: ',div);

  div.innerHTML = entradaDeTexto;

  document.body.append(div)
}

const escribindoDendeOBoton = () => {

  console.log(entradaDeDatos.value)
  
  escribir(entradaDeDatos.value)
}

