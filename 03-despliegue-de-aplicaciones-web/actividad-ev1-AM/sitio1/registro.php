<?php
    // Start the session
    session_start();

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        if (empty($_POST["txtNombre"])) {
            echo "Name is required";
            exit;
        } else {
            $nombre = $_POST["txtNombre"];
        }

        if (empty($_POST["txtApellidos"])) {
            echo "Apellidos is required";
            exit;
        } else {
            $apellidos = $_POST["txtApellidos"];
        }

        if (empty($_POST["txtUser"])) {
            echo "User is required";
            exit;
        } else {
            $user = $_POST["txtUser"];
        }

        if (empty($_POST["txtPass"])) {
            echo "Pass is required";
            exit;
        } else {
            $pass = md5($_POST["txtPass"]);
        }
    }

    try {
        require 'Conexion_DB.php';
        $sql_anadir_registro = 
            "INSERT INTO usuarios (nombre, apellidos, user, pass) VALUES (?, ?, ?, ?)";
        
        $statement = $mysqli->prepare($sql_anadir_registro);
        $statement->bind_param('ssss', $nombre, $apellidos, $user, $pass);
        $statement->execute();
        $statement->close();
        $mysqli->close();

        $obj_usuario_registrado = (object)[
            'nombre' => $nombre,
            'apellidos' => $apellidos,
            'user' => $user,
            'pass' => $pass
        ];

        $_SESSION["usuario_validado"] = $obj_usuario_registrado;
        header('Location: bienvenido.php');
        //echo "Usuario registrado correctamente.";
    } catch (mysqli_sql_exception $e) {
        echo $e->getMessage();
        exit;
    }
?>