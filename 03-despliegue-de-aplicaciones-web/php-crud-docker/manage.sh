#!/bin/bash

# Script de ayuda para el proyecto PHP CRUD Docker

echo "================================================"
echo "  Sistema de Gestión de Empleados - CRUD"
echo "  PHP + MySQL + Docker + Apache + SSL"
echo "================================================"
echo ""

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

show_menu() {
    echo -e "${BLUE}Opciones disponibles:${NC}"
    echo ""
    echo "  1) Iniciar el proyecto (docker-compose up)"
    echo "  2) Detener el proyecto (docker-compose stop)"
    echo "  3) Ver logs en tiempo real"
    echo "  4) Ver estado de contenedores"
    echo "  5) Acceder al contenedor web (bash)"
    echo "  6) Acceder a MySQL (consola)"
    echo "  7) Hacer backup de la base de datos"
    echo "  8) Restaurar backup de la base de datos"
    echo "  9) Ver logs de Apache (access.log)"
    echo " 10) Ver logs de Apache (error.log)"
    echo " 11) Reiniciar todos los contenedores"
    echo " 12) Limpiar todo (contenedores + volúmenes)"
    echo " 13) Mostrar URLs de acceso"
    echo "  0) Salir"
    echo ""
}

start_project() {
    echo -e "${GREEN}Iniciando proyecto...${NC}"
    docker-compose up -d --build
    echo ""
    echo -e "${GREEN}✓ Proyecto iniciado${NC}"
    show_urls
}

stop_project() {
    echo -e "${YELLOW}Deteniendo proyecto...${NC}"
    docker-compose stop
    echo -e "${GREEN}✓ Proyecto detenido${NC}"
}

show_logs() {
    echo -e "${BLUE}Mostrando logs... (Ctrl+C para salir)${NC}"
    docker-compose logs -f
}

show_status() {
    echo -e "${BLUE}Estado de los contenedores:${NC}"
    docker-compose ps
}

access_web() {
    echo -e "${BLUE}Accediendo al contenedor web...${NC}"
    docker exec -it php-apache-crud bash
}

access_mysql() {
    echo -e "${BLUE}Accediendo a MySQL...${NC}"
    docker exec -it mysql-crud mysql -u root -prootpassword crud_db
}

backup_db() {
    TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
    BACKUP_FILE="backup_${TIMESTAMP}.sql"
    echo -e "${BLUE}Creando backup de la base de datos...${NC}"
    docker exec mysql-crud mysqldump -u root -prootpassword crud_db > "$BACKUP_FILE"
    echo -e "${GREEN}✓ Backup creado: ${BACKUP_FILE}${NC}"
}

restore_db() {
    echo -e "${YELLOW}Archivos de backup disponibles:${NC}"
    ls -lh backup_*.sql 2>/dev/null || echo "No hay backups disponibles"
    echo ""
    read -p "Introduce el nombre del archivo a restaurar: " backup_file
    
    if [ -f "$backup_file" ]; then
        echo -e "${BLUE}Restaurando backup...${NC}"
        docker exec -i mysql-crud mysql -u root -prootpassword crud_db < "$backup_file"
        echo -e "${GREEN}✓ Backup restaurado${NC}"
    else
        echo -e "${RED}✗ Archivo no encontrado${NC}"
    fi
}

show_access_log() {
    echo -e "${BLUE}Access Log (Ctrl+C para salir):${NC}"
    docker exec -it php-apache-crud tail -f /var/log/apache2/access.log
}

show_error_log() {
    echo -e "${BLUE}Error Log (Ctrl+C para salir):${NC}"
    docker exec -it php-apache-crud tail -f /var/log/apache2/error.log
}

restart_containers() {
    echo -e "${YELLOW}Reiniciando contenedores...${NC}"
    docker-compose restart
    echo -e "${GREEN}✓ Contenedores reiniciados${NC}"
}

clean_all() {
    echo -e "${RED}¡ADVERTENCIA! Esto eliminará todos los contenedores, volúmenes e imágenes.${NC}"
    read -p "¿Estás seguro? (y/n): " confirm
    
    if [ "$confirm" == "y" ] || [ "$confirm" == "Y" ]; then
        echo -e "${YELLOW}Limpiando todo...${NC}"
        docker-compose down -v --rmi all
        echo -e "${GREEN}✓ Limpieza completada${NC}"
    else
        echo -e "${BLUE}Operación cancelada${NC}"
    fi
}

show_urls() {
    echo ""
    echo -e "${GREEN}================================================${NC}"
    echo -e "${GREEN}  URLs de Acceso${NC}"
    echo -e "${GREEN}================================================${NC}"
    echo ""
    echo -e "  ${BLUE}Aplicación Principal (HTTPS):${NC}"
    echo -e "    → https://localhost"
    echo ""
    echo -e "  ${BLUE}Aplicación (HTTP - redirige a HTTPS):${NC}"
    echo -e "    → http://localhost"
    echo ""
    echo -e "  ${BLUE}phpMyAdmin:${NC}"
    echo -e "    → http://localhost:8080"
    echo -e "    Usuario: root | Password: rootpassword"
    echo ""
    echo -e "  ${BLUE}GoAccess Analytics:${NC}"
    echo -e "    → https://localhost/analytics.php"
    echo -e "    → https://localhost/goaccess/report.html"
    echo ""
    echo -e "${GREEN}================================================${NC}"
    echo ""
}

# Menú principal
while true; do
    show_menu
    read -p "Selecciona una opción: " option
    echo ""
    
    case $option in
        1) start_project ;;
        2) stop_project ;;
        3) show_logs ;;
        4) show_status ;;
        5) access_web ;;
        6) access_mysql ;;
        7) backup_db ;;
        8) restore_db ;;
        9) show_access_log ;;
        10) show_error_log ;;
        11) restart_containers ;;
        12) clean_all ;;
        13) show_urls ;;
        0) 
            echo -e "${GREEN}¡Hasta pronto!${NC}"
            exit 0
            ;;
        *)
            echo -e "${RED}Opción inválida${NC}"
            ;;
    esac
    
    echo ""
    read -p "Presiona Enter para continuar..."
    clear
done
