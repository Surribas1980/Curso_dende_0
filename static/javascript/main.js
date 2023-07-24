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

escoitoEvento(oBotonInsertarTarefa,eventosNecesarios.oClick,funcionsNecesarias.escribirNoHtml)
escoitoEvento(oBotonEnviar,eventosNecesarios.oClick,funcionsNecesarias.enviarListaDeTareas)
escoitoEvento(oBotonVerLista,eventosNecesarios.oClick,funcionsNecesarias.traerListaDeTareasGardadas)
