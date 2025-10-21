<?php
    try {
        // conectar a mysql y crear la base de datos si no existe
        $mysqli = new mysqli('mysql', 'root', 'super-secret-password');
        $database_name = "ej_login";
        
        // crear base de datos
        $mysqli->query('CREATE DATABASE IF NOT EXISTS ' . $database_name);
        $mysqli->close();

        // conectar a la base de datos creada
        $mysqli = new mysqli('mysql', 'root', 'super-secret-password', $database_name);
        
        // crear tabla usuarios
        $sql_crear_tabla = "CREATE TABLE IF NOT EXISTS usuarios (
            id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(30) NOT NULL,
            apellidos VARCHAR(30) NOT NULL,
            user VARCHAR(50),
            pass VARCHAR(50),
            reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            CONSTRAINT user_unico UNIQUE (user)
        )";
        
        $mysqli->query($sql_crear_tabla);
        $mysqli->close();
        
        echo "<!DOCTYPE html>";
        echo "<html><head>";
        echo "<meta charset='UTF-8'>";
        echo "<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css'>";
        echo "</head><body>";
        echo "<div class='container mt-5'>";
        echo "<div class='alert alert-success'>";
        echo "<h4>✅ Base de datos configurada correctamente</h4>";
        echo "<p>La base de datos <strong>ej_login</strong> y la tabla <strong>usuarios</strong> han sido creadas.</p>";
        echo "<a href='login.php' class='btn btn-primary'>Ir al Login</a> ";
        echo "<a href='registro.htm' class='btn btn-success'>Registrarse</a>";
        echo "</div></div>";
        echo "</body></html>";
        
    } catch (mysqli_sql_exception $e) {
        echo "<!DOCTYPE html>";
        echo "<html><head>";
        echo "<meta charset='UTF-8'>";
        echo "<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css'>";
        echo "</head><body>";
        echo "<div class='container mt-5'>";
        echo "<div class='alert alert-danger'>";
        echo "<h4>❌ Error en la configuración</h4>";
        echo "<p>" . $e->getMessage() . "</p>";
        echo "</div></div>";
        echo "</body></html>";
        exit;
    }
?>