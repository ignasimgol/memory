
/* 
* @author Ignasi Muñoz <ignasimgol@gmail.com> 
* @link https://github.com/ignasimgol Git Hub
*/


var nick;
var email;
var geolocalizacionTxt;
var avatarImg;
var difficulty;


  
function datosUsuario(nick, email, avatarCont, difficulty) {
    sessionStorage.setItem('nick', nick.value);
    sessionStorage.setItem('email', email.value);
    sessionStorage.setItem('difficulty', difficulty.value);
    sessionStorage.setItem('geolocalizacionTxt', geolocalizacionTxt);
    sessionStorage.setItem('avatarImg', avatarCont.src);
}

function getDatosUsuario() {
    nick = sessionStorage.getItem('nick');
    email = sessionStorage.getItem('email');
    difficulty = sessionStorage.getItem('difficulty');
    avatarImg = sessionStorage.getItem('avatarImg');
}



function comprobacionDatosUsuario(){
    if(nick===null){
        sessionStorage.setItem('error','No se ha rellenado correctamente el formulario');
        return false;
    }

    if(difficulty===0){
        sessionStorage.setItem('error','No se ha rellenado correctamente el formulario');
        return false;
    }
    return true;
}

function datoGeolocalizacion(){
    if(!navigator.geolocation){
        geolocalizacionTxt="El navegador no es compatible con la geolocalización"
    }else{
        navigator.geolocation.getCurrentPosition(
            //Exito
            (position)=>{geolocalizacionTxt='Latitud:'+position.coords.latitude+',longitud:'+position.coords.longitude},
            //Error
            ()=>{geolocalizacionTxt="La geolocalización no ha sido posible";}
        )
    }
}


//local storage

function historicoUsuario(nick){
    let historicoStorage=localStorage.getItem('historico');
    let historico;
    if(historicoStorage==null){
        historico=[];
    }else{
        historico=JSON.parse(historicoStorage);
    }
    let registroUsuario={
        usuario:nick.value,
        fecha:Date.now()
    }
    historico.push(registroUsuario);
    localStorage.setItem('historico',JSON.stringify(historico));
}


///////////DIFICULTAD JUEGO///////

document.addEventListener('DOMContentLoaded', function() {
    // Agrega un evento al botón 'jugar' de la página de inicio
    document.getElementById('jugar').addEventListener('click', function() {
      // Obtén el valor seleccionado en el select de dificultad
      const selectedDifficulty = document.getElementById('difficulty').value;
  
      // Almacena la dificultad seleccionada en localStorage
      localStorage.setItem('difficulty', selectedDifficulty);
  
      // Redirecciona a la página del juego
      window.location.href = 'juego.html';
    });
  });

  function mostrarMensajeDeError() {
    const errorDiv = document.getElementById('error');
    const errorMessage = sessionStorage.getItem('error');
    if (errorMessage) {
      errorDiv.textContent = errorMessage;
    }
  }
  
  // Llama a esta función después de ejecutar comprobacionDatosUsuario
  mostrarMensajeDeError();
  
  