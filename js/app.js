// VARIABLES LEER TEXTO 
let texto = document.querySelector('#texto');
const btnLeer = document.querySelector('#leer_texto');

// VARIABLES GRABAR 
const textoGrabar = document.querySelector('.texto_grabar');
const btnGrabar = document.querySelector('#grabar_voz');
const btnInfo = document.querySelector('#info');
const recVoz = window.SpeechRecognition || window.webkitSpeechRecognition
const reconocimiento = new recVoz();
let grabacion;

// LEER TEXTO INGRESADO
btnLeer.addEventListener('click', ()=>{
    const locutor = new SpeechSynthesisUtterance();
    const voz = window.speechSynthesis;
    let mensaje = texto.value;
    // texto.value = "";  //Para resetear el TextArea
    locutor.text = mensaje;
    locutor.lang = 'es-US';
    locutor.pitch = 1;
    locutor.rate = .9;

    console.log(voz.getVoices());

    voz.speak(locutor);
});



// GRABAR VOZ
reconocimiento.onstart = (e)=>{
    console.log(e);
    textoGrabar.innerHTML = '<i class="fas fa-podcast"></i> Grabando...'
    console.log(textoGrabar.textContent)
    tipo = e.type;
}

reconocimiento.onresult = (e)=>{
    console.log(e)
    grabacion = e.results[0][0].transcript;
    contestar(grabacion);
    textoGrabar.innerHTML = ''; //Eliminar "Grabando..." del HTML     
}

function verificarGrabacion(){
    setTimeout(()=>{
        if(grabacion === '' || grabacion === undefined){
        textoGrabar.innerHTML = '';
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            html: '<p class="error"> No se ha podido grabar audio,<br> vuelve a intentarlo.</p>'
        });
        }
        grabacion = '';
    }, 6000);
}

const palabrasClaveGrabacion = [
    'hola',
    'cómo estás',
    'cómo te llamas',
    'me llamo',
    'de dónde eres',
    'cuántos años tienes',
    'quién es tu creador'
];

const respuestasBot = [
    'Hola ¿quién eres?',
    'Muy bien ¿y tu?',
    'No tengo nombre todavía',
    'Mucho gusto, yo aún no tengo nombre',
    'Soy de Argentina',
    'Tengo muy poquito tiempo de vida, estoy creciendo',
    'Leo es mi creador. Cualquier sugerencia que tengas, contactalo vía email leo punto ve corta eme punto se ve larga a, arroba gmail punto com'
];

const contestar = (audio)=>{
    const voz_2 = new SpeechSynthesisUtterance();
    voz_2.lang = 'es-US'
    voz_2.rate = 0.8;

    let txtAudio = audio.toLowerCase();
    console.log(txtAudio)

    for(let i=0; i<palabrasClaveGrabacion.length; i++){
         if(txtAudio.includes(palabrasClaveGrabacion[i])){
            voz_2.text = respuestasBot[i];
            break;
        } else{
            //si no encuentra palabras clave
            voz_2.text = 'Lo siento, no entiendo, aún estoy en desarrollo';
        }
    }
    window.speechSynthesis.speak(voz_2);
}

btnGrabar.addEventListener('click', ()=>{
    reconocimiento.start();
    verificarGrabacion();
});

btnInfo.addEventListener('click', ()=>{
    Swal.fire({
        icon: 'info',
        html: '<p class="descripcion"> Graba frases que contengan alguna de estas claves para interactuar con el bot. Solo una clave por frase! </p> <br> <p class="palabras-claves"> hola! - cómo estás? - cómo te llamas? - me llamo... - de dónde eres? - cuántos años tienes? - quién es tu creador?'
      });
})

