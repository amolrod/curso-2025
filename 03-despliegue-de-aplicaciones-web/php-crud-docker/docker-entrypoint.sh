#!/bin/bash

# Generar certificados SSL si no existen
if [ ! -f /etc/ssl/private/apache-selfsigned.crt ]; then
    echo "Generando certificados SSL..."
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout /etc/ssl/private/apache-selfsigned.key \
        -out /etc/ssl/private/apache-selfsigned.crt \
        -subj "/C=ES/ST=Madrid/L=Madrid/O=Universidad/OU=IT/CN=localhost"
    echo "Certificados SSL generados correctamente"
fi

# Crear directorio para GoAccess si no existe
mkdir -p /var/www/html/goaccess

# Crear archivo de log si no existe
touch /var/log/apache2/access.log

# Iniciar GoAccess en segundo plano para análisis en tiempo real
# Nota: ws-url debe apuntar a localhost:7890 (puerto expuesto en docker-compose)
goaccess /var/log/apache2/access.log \
    --log-format=COMBINED \
    --real-time-html \
    --ws-url=ws://localhost:7890 \
    --addr=0.0.0.0 \
    --port=7890 \
    --output=/var/www/html/goaccess/report.html \
    --daemonize

# Ejecutar comando principal (Apache)
exec "$@"
