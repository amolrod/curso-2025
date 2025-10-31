/**
 * Script para validación del formulario de contacto
 * Incluye validación accesible con anuncios para lectores de pantalla
 * Proyecto de 2º DAW - Diseño de Interfaces Web
 */

document.addEventListener('DOMContentLoaded', function() {

    const formulario = document.getElementById('formulario-contacto');

    // Solo ejecutar si estamos en la página de contacto
    if (!formulario) return;

    // Campos del formulario
    const campoNombre = document.getElementById('nombre');
    const campoEmail = document.getElementById('email');
    const campoAsunto = document.getElementById('asunto');
    const campoMensaje = document.getElementById('mensaje');
    const campoPrivacidad = document.getElementById('privacidad');


    // ===== VALIDACIÓN EN TIEMPO REAL =====
    // Validar mientras el usuario escribe (cuando pierde el foco)

    if (campoNombre) {
        campoNombre.addEventListener('blur', function() {
            validarNombre();
        });
    }

    if (campoEmail) {
        campoEmail.addEventListener('blur', function() {
            validarEmail();
        });
    }

    if (campoAsunto) {
        campoAsunto.addEventListener('blur', function() {
            validarAsunto();
        });
    }

    if (campoMensaje) {
        campoMensaje.addEventListener('blur', function() {
            validarMensaje();
        });
    }


    // ===== ENVÍO DEL FORMULARIO =====
    formulario.addEventListener('submit', function(e) {
        e.preventDefault(); // Evitar que se envíe de verdad

        // Validar todos los campos
        const nombreValido = validarNombre();
        const emailValido = validarEmail();
        const asuntoValido = validarAsunto();
        const mensajeValido = validarMensaje();
        const privacidadValida = validarPrivacidad();

        // Si todo es válido, "enviar" el formulario
        if (nombreValido && emailValido && asuntoValido && mensajeValido && privacidadValida) {
            mostrarExito();
            formulario.reset();
        } else {
            // Si hay errores, hacer foco en el primer campo con error
            const primerError = formulario.querySelector('.error');
            if (primerError) {
                primerError.focus();
            }
        }
    });


    // ===== FUNCIONES DE VALIDACIÓN =====

    /**
     * Validar campo nombre
     */
    function validarNombre() {
        const valor = campoNombre.value.trim();
        const errorSpan = document.getElementById('nombre-error');

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

