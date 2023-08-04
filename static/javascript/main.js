import {
        sendData,
        getData,
        escoitoEvento,
        writingInDocHTML,
        borrar,
        cerrar
} from "./helpers/funciones.js";

const eventosNecesarios = {
  oClick: 'click'
}
const funcionsNecesarias = {
  escribirNoHtml: writingInDocHTML,
  enviarListaDeTareas: sendData,
  traerListaDeTareasGardadas: getData,
  borraAtarefa:borrar,
  cerrarSesion:cerrar,
}

escoitoEvento(oBotonInsertarTarefa,eventosNecesarios.oClick,funcionsNecesarias.escribirNoHtml)
escoitoEvento(oBotonEnviar,eventosNecesarios.oClick,funcionsNecesarias.enviarListaDeTareas)
escoitoEvento(oBotonVerLista,eventosNecesarios.oClick,funcionsNecesarias.traerListaDeTareasGardadas)

escoitoEvento(closeSesion,eventosNecesarios.oClick,funcionsNecesarias.cerrarSesion)


