FROM php:8.2-apache

# Instalar extensiones necesarias de PHP y herramientas
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    unzip \
    git \
    vim \
    wget \
    goaccess \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd mysqli pdo pdo_mysql \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Habilitar módulos de Apache
RUN a2enmod rewrite ssl headers

# Configurar ServerName para evitar warnings
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Crear directorio para certificados SSL
RUN mkdir -p /etc/ssl/private

# Generar certificado SSL autofirmado
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/ssl/private/apache-selfsigned.key \
    -out /etc/ssl/private/apache-selfsigned.crt \
    -subj "/C=ES/ST=Madrid/L=Madrid/O=Universidad/OU=IT/CN=localhost"

# Copiar configuración de Apache
COPY apache-config/000-default.conf /etc/apache2/sites-available/000-default.conf
COPY apache-config/default-ssl.conf /etc/apache2/sites-available/default-ssl.conf

# Habilitar sitio SSL
RUN a2ensite default-ssl

# Configurar permisos
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Crear script de inicio para GoAccess
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Exponer puertos
EXPOSE 80 443 7890

# Comando de inicio
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["apache2-foreground"]
