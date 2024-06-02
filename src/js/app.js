let paso = 1;
const pasoInicial = 1;
const pasoFinal = 3;
const cita = {
    id: '',
    nombre: '',
    fecha: '',
    hora: '',
    servicios: []
};


document.addEventListener('DOMContentLoaded', function () {
    iniciarApp();
});


function iniciarApp() {
    mostarSeccion();// va a mostra la seccion que tenmos definda en Paso
    tabs();//Cambiar la seccion cuando se precione los tabs
    botonesPaginador();// Agrega o quita los botones del paginador
    paginaSiguiente();
    paginaAnterior();
    consultarAPI();//Consulta la api en backend de PHP
    idCliente();
    nombreCliente();//anade el nombre del cliente al objeto de cita
    seleccionarFecha();//anade una fecha a la cita
    seleccionarHora();//anade la hora en la cita

    mostrarResumen();//mostar resumen en pagina final

}
function mostarSeccion() {
    //ocultar la seccion que tenga la clase de mostrar
    const seccionAnterior = document.querySelector('.mostrar');
    if (seccionAnterior) {  //tenemos que comprovar si hay una clase mostar y quitarla
        seccionAnterior.classList.remove('mostrar');
    }
    //Seleccionar la seccion con el paso..
    const pasoSelector = `#paso-${paso}`;
    const seccion = document.querySelector(pasoSelector);
    seccion.classList.add('mostrar');
    //Quitar la clase actual al tab anterior
    const tabAnterior = document.querySelector('.actual');
    if (tabAnterior) {
        tabAnterior.classList.remove('actual');
    }

    //Resaltar el tab actual
    const tab = document.querySelector(`[data-paso="${paso}"]`);
    tab.classList.add('actual');
}

function tabs() {
    const botones = document.querySelectorAll('.tabs button'); //cuando tenemos un all tenemos q usar un foreach

    botones.forEach(boton => { //arrow funcion  para escuchar por cada uno
        boton.addEventListener('click', function (e) {
            paso = parseInt(e.target.dataset.paso);

            mostarSeccion();
            botonesPaginador();

        })
    })
}
function botonesPaginador() {
    const paginaAnterior = document.querySelector('#anterior');
    const paginaSiguiente = document.querySelector('#siguiente');

    if (paso === 1) {
        paginaAnterior.classList.add('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    } else if (paso === 3) {
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.add('ocultar');
        mostrarResumen();
    } else {
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    }
    mostarSeccion();
}
function paginaSiguiente() {
    const paginaAnterior = document.querySelector('#anterior');
    paginaAnterior.addEventListener('click', function () {
        if (paso <= pasoInicial) return;
        paso--;
        botonesPaginador();
    })
}
function paginaAnterior() {
    const paginaSiguiente = document.querySelector('#siguiente');
    paginaSiguiente.addEventListener('click', function () {
        if (paso >= pasoFinal) return;
        paso++;
        botonesPaginador();
    })
}
async function consultarAPI() {

    try {
        const url = '${location.origin}/api/servicios';
        const resultado = await fetch(url);
        const servicios = await resultado.json();
        mostarServicios(servicios);

    } catch (error) {
        console.log(error);
    }
}

function mostarServicios(servicios) {
    servicios.forEach(servicio => {
        const { id, nombre, precio } = servicio;
        //creamos los parrafos con los datos
        const nombreServicio = document.createElement('p');
        nombreServicio.classList.add('nombre-servicio');
        nombreServicio.textContent = nombre;
        const precioServicio = document.createElement('p');
        precioServicio.classList.add('precio-servicio');
        precioServicio.textContent = `$ ${precio}`;
        //creamos los div para la pagina y le ponemos los parrafos 
        const servicioDiv = document.createElement('div');
        servicioDiv.classList.add('servicio');
        servicioDiv.dataset.idServicio = id;
        servicioDiv.onclick = function () {
            seleccionarServicio(servicio);
        };

        servicioDiv.appendChild(nombreServicio);
        servicioDiv.appendChild(precioServicio);
        document.querySelector('#servicios').appendChild(servicioDiv);//Agrega los servicios a la pagina
    })
}
function seleccionarServicio(servicio) {
    const { id } = servicio;
    const { servicios } = cita;
    //identifica el elemento al que se le da click
    const divServicio = document.querySelector(`[data-id-servicio="${id}"]`);
    //Comprobar si un servicio ya fue agregado
    if (servicios.some(agregado => agregado.id === id)) {
        //quitarlo
        cita.servicios = servicios.filter(agregado => agregado.id !== id);
        divServicio.classList.remove('seleccionado');
    } else {
        //agregarlo
        cita.servicios = [...servicios, servicio]
        divServicio.classList.add('seleccionado');
    }

}
function idCliente() {
    cita.id = document.querySelector('#id').value;

}
function nombreCliente() {
    cita.nombre = document.querySelector('#nombre').value;

}
function seleccionarFecha() {
    const inputfecha = document.querySelector('#fecha');
    inputfecha.addEventListener('input', function (e) {
        const dia = new Date(e.target.value).getUTCDay();

        if ([6, 0].includes(dia)) {
            e.target.value = '';
            mostrarAlerta('Fin de Semana no permitidos', 'error', '.formulario');
        }
        else {
            cita.fecha = e.target.value;
        }

    });
}
function seleccionarHora() {
    const inputHora = document.querySelector('#hora');

    inputHora.addEventListener('input', function (e) {
        const horacita = e.target.value;
        const hora = horacita.split(":")[0];// aca seccionamos solo la hora no los minutos

        const horacitasetada = '';
        if (hora < 10 || hora > 18) {  //controlamos la hoar de la cita 
            e.target.value = '';
            mostrarAlerta('Horas nos validadas', 'error', '.formulario');
        }
        else {
            cita.hora = e.target.value;//guardamos la hora de la cita de ser correcta
        }

    });

}

function mostrarAlerta(mensaje, tipo, elemento, desparece = true) {
    const alertaPrevia = document.querySelector('.alerta');
    if (alertaPrevia) {//Siya hay una alerta la removemos es para no agregar mas alertas al formulario
        alertaPrevia.remove();

    }

    //script para crear una alerta
    const alerta = document.createElement('DIV');
    alerta.textContent = mensaje;
    alerta.classList.add('alerta');
    alerta.classList.add(tipo);

    //Colocar el mensaje en el formulario

    const referencia = document.querySelector(elemento);//punto de referencia para agregar el elemento
    referencia.appendChild(alerta);//agrega el elemento

    if (desparece) { //Preguntamos si la alerta tiene q desaparecer
        //setear el tiempo que aparezca la alerta
        setTimeout(() => {
            alerta.remove(); //funcion 
        }, 3000);//tiempo 3 segundos
    }

}
function mostrarResumen() {
    const resumen = document.querySelector('.contenido-resumen');

    //Limpiar el contenido de Resumen
    while (resumen.firstChild) {
        resumen.removeChild(resumen.firstChild);
    }
    if (Object.values(cita).includes('') || cita.servicios.length === 0) {//iteramos sobre el objeto y preguntamos si hay un string vacio
        mostrarAlerta('Hace faltas datos fecha, hora o Servicios de la cita', 'error', '.contenido-resumen', false);
        return;
    }

    //formatear el div de resumen
    const { nombre, fecha, hora, servicios } = cita;


    //Heading para servicios en resumen
    const headingServicios = document.createElement('h3');
    headingServicios.textContent = 'Resumen de Servicios';
    resumen.appendChild(headingServicios);

    //Iterando y mostrando los servicios
    servicios.forEach(servicio => {
        const { id, precio, nombre } = servicio;
        const contenedorServicio = document.createElement('div');
        contenedorServicio.classList.add('contenedor-servicio');

        const textoServicio = document.createElement('p');
        textoServicio.textContent = nombre;

        const precioServicio = document.createElement('p');
        precioServicio.innerHTML = `<span>Precio:</span> $${precio}`;

        contenedorServicio.appendChild(textoServicio);
        contenedorServicio.appendChild(precioServicio);

        resumen.appendChild(contenedorServicio);

    });
    //Heading para cita en resumen
    const headingCita = document.createElement('h3');
    headingCita.textContent = 'Resumen de Cita';
    resumen.appendChild(headingCita);

    const nombreCliente = document.createElement('p');
    nombreCliente.innerHTML = `<span>Nombre:</span> ${nombre}`;

    //Formatear la fecha a espaniol

    const fechaObj = new Date(fecha);
    const mes = fechaObj.getMonth();
    const dia = fechaObj.getDate() + 2;
    const year = fechaObj.getFullYear();
    const fechaUTC = new Date(Date.UTC(year, mes, dia))

    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const fechaFormateada = fechaUTC.toLocaleDateString('es-AR', opciones);

    const fechaCita = document.createElement('p');
    fechaCita.innerHTML = `<span>Fecha:</span> ${fechaFormateada}`;

    const horaCita = document.createElement('p');
    horaCita.innerHTML = `<span>Hora:</span> ${hora} Horas`;

    //Boton para crear una cita
    const botonReservar = document.createElement('button');
    botonReservar.classList.add('boton');
    botonReservar.textContent = 'Reservar Cita';
    botonReservar.onclick = reservarCita;


    resumen.appendChild(nombreCliente);
    resumen.appendChild(fechaCita);
    resumen.appendChild(horaCita);
    resumen.appendChild(botonReservar);

}

async function reservarCita() {
    //Extraemos los dotos de la cita
    const { nombre, fecha, hora, servicios, id } = cita;

    const idServicios = servicios.map(servicio => servicio.id);

    const datos = new FormData();
    datos.append('fecha', fecha);
    datos.append('hora', hora);
    datos.append('usuarioId', id);
    datos.append('servicios', idServicios);
 
    try {
        //Peticion hacia la api
        const url = '${location.origin}/api/citas'
        const respuesta = await fetch(url, {
            method: 'POST',
            body: datos
        });

        const resultado = await respuesta.json();
        
        if (resultado.resultado) {
            swal({
                title: "Cita Creada",
                text: "Su cita se agrego Correctamente!",
                icon: "success",
                button: "OK",
              }).then(()=>{
                window.location.reload();
              });
        }
    }
    catch (error) {
        swal({
            title: "Error",
            text: "Hubo un al agregar la cita",
            icon: "error",
            button: "OK",
          });
    }
    //Si queremos ver los que tiene el formdata Tenemos q desconsruirlo
    // console.log([...datos]);
    //de esta forma creamos  un arreglo con los datos
}