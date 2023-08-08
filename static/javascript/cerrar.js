home.addEventListener('click',()=>{
  console.log('cierra?')
   location.replace('/');
})
visualizarMenuMobil.addEventListener('click',(event)=>{
    console.log('hola');
    event.target.nextElementSibling.classList.toggle('ocultar-menu');
})