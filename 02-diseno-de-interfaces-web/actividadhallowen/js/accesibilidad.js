/**
 * Script de accesibilidad para The Nightmare Before Christmas
 * Controla el cambio de tema y el tamaño de fuente
 * Proyecto de 2º DAW - Diseño de Interfaces Web
 */

// Esperamos a que cargue el DOM antes de ejecutar nada
document.addEventListener('DOMContentLoaded', function() {

    // ===== VARIABLES =====
    const btnTema = document.getElementById('btn-tema');
    const btnFuenteMas = document.getElementById('btn-fuente-mas');
    const btnFuenteMenos = document.getElementById('btn-fuente-menos');

    // Tamaño de fuente por defecto
    let tamanoFuente = 16;

    // ===== CARGAR PREFERENCIAS GUARDADAS =====
    // Usamos localStorage para recordar las preferencias del usuario
    cargarPreferencias();


    // ===== CAMBIO DE TEMA CLARO/OSCURO =====
    if (btnTema) {
        btnTema.addEventListener('click', function() {
            // Toggle: si tiene la clase la quitamos, si no la ponemos
            document.body.classList.toggle('tema-claro');

            // Cambiar el emoji del botón para que sea más visual
            if (document.body.classList.contains('tema-claro')) {
                btnTema.textContent = '☀️ Tema';
                btnTema.setAttribute('aria-label', 'Cambiar a tema oscuro');
            } else {
                btnTema.textContent = '🌙 Tema';
                btnTema.setAttribute('aria-label', 'Cambiar a tema claro');
            }

            // Guardar la preferencia en localStorage
            guardarTema();
        });
    }


    // ===== AUMENTAR TAMAÑO DE FUENTE =====
    if (btnFuenteMas) {
        btnFuenteMas.addEventListener('click', function() {
            // Limitar a 24px máximo para que no se vea raro
            if (tamanoFuente < 24) {
                tamanoFuente += 2;
                aplicarTamanoFuente();
                guardarTamanoFuente();
            }
        });
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

