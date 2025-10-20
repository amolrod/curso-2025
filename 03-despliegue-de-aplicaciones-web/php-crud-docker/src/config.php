<?php
/* Database credentials */
define('DB_SERVER', getenv('MYSQL_HOST') ?: 'db');
define('DB_USERNAME', getenv('MYSQL_USER') ?: 'crud_user');
define('DB_PASSWORD', getenv('MYSQL_PASSWORD') ?: 'crud_password');
define('DB_NAME', getenv('MYSQL_DATABASE') ?: 'crud_db');
 
/* Attempt to connect to MySQL database */
$link = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
// Check connection
if($link === false){
    die("ERROR: No se pudo conectar. " . mysqli_connect_error());
}

// Configurar charset UTF-8 para la conexion
if (!mysqli_set_charset($link, "utf8")) {
    die("Error cargando el conjunto de caracteres utf8: " . mysqli_error($link));
}
?>
