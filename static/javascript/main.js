import {
        creaElemento,
        addClassWithRef,
        establecerAtributo,
        writingInList,
        engadoDentroOTotalQueQuero,
        sendData,
        getData,
        escoitoEvento,
        writingInDocHTML,
        deleteData,
        borrar} from "./helpers/funciones.js";


const eventosNecesarios = {
  oClick: 'click'
}

const funcionsNecesarias = {
  escribirNoHtml: writingInDocHTML,
  enviarListaDeTareas: sendData,
  traerListaDeTareasGardadas: getData,
  borraAtarefa:borrar,
}

escoitoEvento(oBotonInsertarTarefa,eventosNecesarios.oClick,funcionsNecesarias.escribirNoHtml)
escoitoEvento(oBotonEnviar,eventosNecesarios.oClick,funcionsNecesarias.enviarListaDeTareas)
escoitoEvento(oBotonVerLista,eventosNecesarios.oClick,funcionsNecesarias.traerListaDeTareasGardadas)
escoitoEvento(listaGardada,eventosNecesarios.oClick,funcionsNecesarias.borraAtarefa)
//listaGardada.addEventListener('click',borrar)