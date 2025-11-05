// Validacion simple del formulario
document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.querySelector('form');
    
    if (formulario) {
        formulario.addEventListener('submit', function(evento) {
            evento.preventDefault();
            
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const mensaje = document.getElementById('mensaje').value;
            const acepto = document.getElementById('acepto').checked;
            
            // Validacion basica
            if (!nombre.trim()) {
                alert('Por favor, introduce tu nombre');
                document.getElementById('nombre').focus();
                return false;
            }
            
            if (!email.trim()) {
                alert('Por favor, introduce tu correo electronico');
                document.getElementById('email').focus();
                return false;
            }
            
            if (!mensaje.trim()) {
                alert('Por favor, escribe un mensaje');
                document.getElementById('mensaje').focus();
                return false;
            }
            
            if (!acepto) {
                alert('Debes aceptar el uso de tus datos para continuar');
                document.getElementById('acepto').focus();
                return false;
            }
            
            // Si todo es correcto
            alert('Gracias por tu mensaje. Lo hemos recibido correctamente.');
            formulario.reset();
        });
    }
});