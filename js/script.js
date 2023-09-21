/* comprobacion formulario */

// Inicializacion Variables, DOM

var nickInput;
var emailInput;
var formEntrada;
var error;
var avatarItems;
var itemImg;
var avatarCont;

//Comprobar si hay algun error de juego.html

if(sessionStorage.getItem('error')!=null)
{
    error.innerText=sessionStorage.getItem('error');
    sessionStorage.removeItem('error');
}


//Funciones de evento
function comprobarForm(event){
    //Comprobar Cambios
    if(nickInput.value.match(/(?<!\S)[0-9]/))
    {
        nickInput.focus();
        event.preventDefault();
        error.innerText="El campo de NICK no puede comenzar con un numero";
        return false;
    }

    //Informacion es correcta
    datosUsuario(nickInput, emailInput,avatarCont);
    historicoUsuario(nickInput); 
    return true;

}

function moviendoImg(event){
    itemImg=event.target;
    console.log(itemImg.src);
}

function cambiarImg(event){
    avatarCont.src=itemImg.src;
}

/**
 * carga de objetos del DOM comprobaciones y eventos del formulario
 * @date 2023-08-31
 */
function domCargado(){
    //Captura de todos los elements necesarios
    
    nickInput=document.getElementById("nick");
    emailInput=document.getElementById("email");
    formEntrada=document.getElementById("formEntrada");
    error=document.getElementById("error");

    //Comprobar si hay algun error de juego

    if(sessionStorage.getItem('error')!=null)
    {
        error.innerText=sessionStorage.getItem('error');
        sessionStorage.removeItem('error');
    }

    formEntrada.addEventListener('submit',comprobarForm);

    avatarItems=document.getElementsByClassName("avatarImgItem")
    //Eventos del dragandrop
    for(let item of avatarItems){
        item.addEventListener('dragstart',moviendoImg)
    }
    avatarCont=document.getElementById("avatarImg");
    avatarCont.addEventListener('dragover',e=>{e.preventDefault()})
    avatarCont.addEventListener('drop',cambiarImg)
}

//Inicio de carga de eventos
document.addEventListener('DOMContentLoaded',domCargado);


//Geolocalizacion
datoGeolocalizacion();