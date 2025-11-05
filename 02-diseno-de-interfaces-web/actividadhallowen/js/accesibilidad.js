// Script de accesibilidad - cambio de tema y tamaño de fuente/**

 * Script de accesibilidad para The Nightmare Before Christmas

document.addEventListener('DOMContentLoaded', function() { * Controla el cambio de tema y el tamaño de fuente

    const btnTema = document.getElementById('btn-tema'); * Proyecto de 2º DAW - Diseño de Interfaces Web

    const btnFuenteMas = document.getElementById('btn-fuente-mas'); */

    const btnFuenteMenos = document.getElementById('btn-fuente-menos');

// Esperamos a que cargue el DOM antes de ejecutar nada

    let tamanoFuente = 16;document.addEventListener('DOMContentLoaded', function() {



    // Cargar preferencias guardadas    // ===== VARIABLES =====

    const temaGuardado = localStorage.getItem('tema');    const btnTema = document.getElementById('btn-tema');

    if (temaGuardado === 'claro') {    const btnFuenteMas = document.getElementById('btn-fuente-mas');

        document.body.classList.add('tema-claro');    const btnFuenteMenos = document.getElementById('btn-fuente-menos');

    }

    // Tamaño de fuente por defecto

    const tamanoGuardado = localStorage.getItem('tamanoFuente');    let tamanoFuente = 16;

    if (tamanoGuardado) {

        tamanoFuente = parseInt(tamanoGuardado);    // ===== CARGAR PREFERENCIAS GUARDADAS =====

        document.documentElement.style.fontSize = tamanoFuente + 'px';    // Usamos localStorage para recordar las preferencias del usuario

    }    cargarPreferencias();



    // Cambiar tema

    if (btnTema) {    // ===== CAMBIO DE TEMA CLARO/OSCURO =====

        btnTema.addEventListener('click', function() {    if (btnTema) {

            document.body.classList.toggle('tema-claro');        btnTema.addEventListener('click', function() {

                        // Toggle: si tiene la clase la quitamos, si no la ponemos

            const temaClaro = document.body.classList.contains('tema-claro');            document.body.classList.toggle('tema-claro');

            localStorage.setItem('tema', temaClaro ? 'claro' : 'oscuro');

        });            // Cambiar el emoji del botón para que sea más visual

    }            if (document.body.classList.contains('tema-claro')) {

                btnTema.textContent = '☀️ Tema';

    // Aumentar fuente                btnTema.setAttribute('aria-label', 'Cambiar a tema oscuro');

    if (btnFuenteMas) {            } else {

        btnFuenteMas.addEventListener('click', function() {                btnTema.textContent = '🌙 Tema';

            if (tamanoFuente < 24) {                btnTema.setAttribute('aria-label', 'Cambiar a tema claro');

                tamanoFuente += 2;            }

                document.documentElement.style.fontSize = tamanoFuente + 'px';

                localStorage.setItem('tamanoFuente', tamanoFuente);            // Guardar la preferencia en localStorage

            }            guardarTema();

        });        });

    }    }



    // Disminuir fuente

    if (btnFuenteMenos) {    // ===== AUMENTAR TAMAÑO DE FUENTE =====

        btnFuenteMenos.addEventListener('click', function() {    if (btnFuenteMas) {

            if (tamanoFuente > 12) {        btnFuenteMas.addEventListener('click', function() {

                tamanoFuente -= 2;            // Limitar a 24px máximo para que no se vea raro

                document.documentElement.style.fontSize = tamanoFuente + 'px';            if (tamanoFuente < 24) {

                localStorage.setItem('tamanoFuente', tamanoFuente);                tamanoFuente += 2;

            }                aplicarTamanoFuente();

        });                guardarTamanoFuente();

    }            }

});        });

    }


    // ===== DISMINUIR TAMAÑO DE FUENTE =====
    if (btnFuenteMenos) {
        btnFuenteMenos.addEventListener('click', function() {
            // Limitar a 12px mínimo para que sea legible
            if (tamanoFuente > 12) {
                tamanoFuente -= 2;
                aplicarTamanoFuente();
                guardarTamanoFuente();
            }
        });
    }


    // ===== FUNCIONES AUXILIARES =====

    /**
     * Aplica el tamaño de fuente al documento
     */
    function aplicarTamanoFuente() {
        document.documentElement.style.fontSize = tamanoFuente + 'px';
        // Anunciar el cambio para lectores de pantalla (opcional)
        anunciarCambio('Tamaño de fuente: ' + tamanoFuente + ' píxeles');
    }

    /**
     * Guarda el tema en localStorage
     */
    function guardarTema() {
        const temaClaro = document.body.classList.contains('tema-claro');
        localStorage.setItem('tema', temaClaro ? 'claro' : 'oscuro');
    }

    /**
     * Guarda el tamaño de fuente en localStorage
     */
    function guardarTamanoFuente() {
        localStorage.setItem('tamanoFuente', tamanoFuente);
    }

    /**
     * Carga las preferencias guardadas
     */
    function cargarPreferencias() {
        // Cargar tema
        const temaGuardado = localStorage.getItem('tema');
        if (temaGuardado === 'claro') {
            document.body.classList.add('tema-claro');
            if (btnTema) {
                btnTema.textContent = '☀️ Tema';
                btnTema.setAttribute('aria-label', 'Cambiar a tema oscuro');
            }
        }

        // Cargar tamaño de fuente
        const tamanoGuardado = localStorage.getItem('tamanoFuente');
        if (tamanoGuardado) {
            tamanoFuente = parseInt(tamanoGuardado);
            aplicarTamanoFuente();
        }
    }

    /**
     * Anuncia cambios para lectores de pantalla
     * Crea un elemento live region temporal
     */
    function anunciarCambio(mensaje) {
        // Crear un div oculto que los lectores de pantalla detectan
        let anuncio = document.getElementById('anuncio-accesibilidad');
        if (!anuncio) {
            anuncio = document.createElement('div');
            anuncio.id = 'anuncio-accesibilidad';
            anuncio.setAttribute('role', 'status');
            anuncio.setAttribute('aria-live', 'polite');
            anuncio.style.position = 'absolute';
            anuncio.style.left = '-10000px';
            anuncio.style.width = '1px';
            anuncio.style.height = '1px';
            anuncio.style.overflow = 'hidden';
            document.body.appendChild(anuncio);
        }

        // Poner el mensaje y borrarlo después
        anuncio.textContent = mensaje;
        setTimeout(function() {
            anuncio.textContent = '';
        }, 1000);
    }


    // ===== NAVEGACIÓN POR TECLADO MEJORADA =====
    // Añadir indicador visual cuando se navega con teclado
    document.addEventListener('keydown', function(e) {
        // Si se pulsa Tab, añadimos una clase al body
        if (e.key === 'Tab') {
            document.body.classList.add('usando-teclado');
        }
    });

    // Si se usa el ratón, quitamos la clase
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('usando-teclado');
    });

});

