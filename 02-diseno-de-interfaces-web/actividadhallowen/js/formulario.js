// Validacion del formulario de contacto/**

 * Script para validación del formulario de contacto

document.addEventListener('DOMContentLoaded', function() { * Incluye validación accesible con anuncios para lectores de pantalla

    const formulario = document.getElementById('formulario-contacto'); * Proyecto de 2º DAW - Diseño de Interfaces Web

     */

    if (!formulario) return;

document.addEventListener('DOMContentLoaded', function() {

    const campoNombre = document.getElementById('nombre');

    const campoEmail = document.getElementById('email');    const formulario = document.getElementById('formulario-contacto');

    const campoAsunto = document.getElementById('asunto');

    const campoMensaje = document.getElementById('mensaje');    // Solo ejecutar si estamos en la página de contacto

    const campoPrivacidad = document.getElementById('privacidad');    if (!formulario) return;



    // Validar al enviar    // Campos del formulario

    formulario.addEventListener('submit', function(e) {    const campoNombre = document.getElementById('nombre');

        e.preventDefault();    const campoEmail = document.getElementById('email');

    const campoAsunto = document.getElementById('asunto');

        let valido = true;    const campoMensaje = document.getElementById('mensaje');

    const campoPrivacidad = document.getElementById('privacidad');

        // Validar nombre

        if (campoNombre.value.trim() === '') {

            document.getElementById('nombre-error').textContent = 'El nombre es obligatorio';    // ===== VALIDACIÓN EN TIEMPO REAL =====

            campoNombre.classList.add('error');    // Validar mientras el usuario escribe (cuando pierde el foco)

            valido = false;

        } else {    if (campoNombre) {

            document.getElementById('nombre-error').textContent = '';        campoNombre.addEventListener('blur', function() {

            campoNombre.classList.remove('error');            validarNombre();

        }        });

    }

        // Validar email

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;    if (campoEmail) {

        if (campoEmail.value.trim() === '') {        campoEmail.addEventListener('blur', function() {

            document.getElementById('email-error').textContent = 'El email es obligatorio';            validarEmail();

            campoEmail.classList.add('error');        });

            valido = false;    }

        } else if (!emailRegex.test(campoEmail.value)) {

            document.getElementById('email-error').textContent = 'Email no valido';    if (campoAsunto) {

            campoEmail.classList.add('error');        campoAsunto.addEventListener('blur', function() {

            valido = false;            validarAsunto();

        } else {        });

            document.getElementById('email-error').textContent = '';    }

            campoEmail.classList.remove('error');

        }    if (campoMensaje) {

        campoMensaje.addEventListener('blur', function() {

        // Validar asunto            validarMensaje();

        if (campoAsunto.value === '') {        });

            document.getElementById('asunto-error').textContent = 'Selecciona un asunto';    }

            campoAsunto.classList.add('error');

            valido = false;

        } else {    // ===== ENVÍO DEL FORMULARIO =====

            document.getElementById('asunto-error').textContent = '';    formulario.addEventListener('submit', function(e) {

            campoAsunto.classList.remove('error');        e.preventDefault(); // Evitar que se envíe de verdad

        }

        // Validar todos los campos

        // Validar mensaje        const nombreValido = validarNombre();

        if (campoMensaje.value.trim().length < 10) {        const emailValido = validarEmail();

            document.getElementById('mensaje-error').textContent = 'El mensaje debe tener al menos 10 caracteres';        const asuntoValido = validarAsunto();

            campoMensaje.classList.add('error');        const mensajeValido = validarMensaje();

            valido = false;        const privacidadValida = validarPrivacidad();

        } else {

            document.getElementById('mensaje-error').textContent = '';        // Si todo es válido, "enviar" el formulario

            campoMensaje.classList.remove('error');        if (nombreValido && emailValido && asuntoValido && mensajeValido && privacidadValida) {

        }            mostrarExito();

            formulario.reset();

        // Validar privacidad        } else {

        if (!campoPrivacidad.checked) {            // Si hay errores, hacer foco en el primer campo con error

            document.getElementById('privacidad-error').textContent = 'Debes aceptar la politica de privacidad';            const primerError = formulario.querySelector('.error');

            valido = false;            if (primerError) {

        } else {                primerError.focus();

            document.getElementById('privacidad-error').textContent = '';            }

        }        }

    });

        // Si todo es valido, mostrar mensaje de exito

        if (valido) {

            document.getElementById('mensaje-confirmacion').hidden = false;    // ===== FUNCIONES DE VALIDACIÓN =====

            formulario.reset();

                /**

            setTimeout(function() {     * Validar campo nombre

                document.getElementById('mensaje-confirmacion').hidden = true;     */

            }, 5000);    function validarNombre() {

        }        const valor = campoNombre.value.trim();

    });        const errorSpan = document.getElementById('nombre-error');

});

        if (valor === '') {
            mostrarError(campoNombre, errorSpan, 'Por favor, introduce tu nombre');
            return false;
        } else if (valor.length < 2) {
            mostrarError(campoNombre, errorSpan, 'El nombre debe tener al menos 2 caracteres');
            return false;
        } else {
            limpiarError(campoNombre, errorSpan);
            return true;
        }
    }

    /**
     * Validar campo email
     */
    function validarEmail() {
        const valor = campoEmail.value.trim();
        const errorSpan = document.getElementById('email-error');
        // Regex simple para validar email
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (valor === '') {
            mostrarError(campoEmail, errorSpan, 'Por favor, introduce tu email');
            return false;
        } else if (!regexEmail.test(valor)) {
            mostrarError(campoEmail, errorSpan, 'Por favor, introduce un email válido');
            return false;
        } else {
            limpiarError(campoEmail, errorSpan);
            return true;
        }
    }

    /**
     * Validar campo asunto
     */
    function validarAsunto() {
        const valor = campoAsunto.value;
        const errorSpan = document.getElementById('asunto-error');

        if (valor === '') {
            mostrarError(campoAsunto, errorSpan, 'Por favor, selecciona un asunto');
            return false;
        } else {
            limpiarError(campoAsunto, errorSpan);
            return true;
        }
    }

    /**
     * Validar campo mensaje
     */
    function validarMensaje() {
        const valor = campoMensaje.value.trim();
        const errorSpan = document.getElementById('mensaje-error');

        if (valor === '') {
            mostrarError(campoMensaje, errorSpan, 'Por favor, escribe un mensaje');
            return false;
        } else if (valor.length < 10) {
            mostrarError(campoMensaje, errorSpan, 'El mensaje debe tener al menos 10 caracteres');
            return false;
        } else if (valor.length > 1000) {
            mostrarError(campoMensaje, errorSpan, 'El mensaje no puede superar los 1000 caracteres');
            return false;
        } else {
            limpiarError(campoMensaje, errorSpan);
            return true;
        }
    }

    /**
     * Validar checkbox de privacidad
     */
    function validarPrivacidad() {
        const errorSpan = document.getElementById('privacidad-error');

        if (!campoPrivacidad.checked) {
            mostrarError(campoPrivacidad, errorSpan, 'Debes aceptar la política de privacidad');
            return false;
        } else {
            limpiarError(campoPrivacidad, errorSpan);
            return true;
        }
    }


    // ===== FUNCIONES AUXILIARES =====

    /**
     * Mostrar error en un campo
     */
    function mostrarError(campo, errorSpan, mensaje) {
        campo.classList.add('error');
        campo.setAttribute('aria-invalid', 'true');
        errorSpan.textContent = '⚠️ ' + mensaje;
    }

    /**
     * Limpiar error de un campo
     */
    function limpiarError(campo, errorSpan) {
        campo.classList.remove('error');
        campo.setAttribute('aria-invalid', 'false');
        errorSpan.textContent = '';
    }

    /**
     * Mostrar mensaje de éxito
     */
    function mostrarExito() {
        const mensajeExito = document.getElementById('mensaje-confirmacion');
        if (mensajeExito) {
            mensajeExito.removeAttribute('hidden');
            // Hacer scroll hasta el mensaje
            mensajeExito.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // Hacer foco en el mensaje para que lo lean los lectores de pantalla
            mensajeExito.setAttribute('tabindex', '-1');
            mensajeExito.focus();

            // Ocultar el mensaje después de 5 segundos
            setTimeout(function() {
                mensajeExito.setAttribute('hidden', '');
            }, 5000);
        }
    }

});

