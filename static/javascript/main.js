import {
        creaElemento,
        addClassWithRef,
        establecerAtributo,
        writingInList,
        engadoDentroOTotalQueQuero,
        sendData,
        getData,
        escoitoEvento,
        writingInDocHTML} from "./helpers/funciones.js";


const eventosNecesarios = {
  oClick: 'click'
}

const funcionsNecesarias = {
  escribirNoHtml: writingInDocHTML,
  enviarListaDeTareas: sendData,
  traerListaDeTareasGardadas: getData
}

escoitoEvento(oBoton,eventosNecesarios.oClick,funcionsNecesarias.escribirNoHtml)
escoitoEvento(enviar,eventosNecesarios.oClick,funcionsNecesarias.enviarListaDeTareas)
escoitoEvento(verLista,eventosNecesarios.oClick,funcionsNecesarias.traerListaDeTareasGardadas)
