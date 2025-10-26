<?php
    // Start the session
    session_start();
    
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
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
        $sql_select_registro = 
            "select * from usuarios where user = ? and pass = ?";
        
        $statement = $mysqli->prepare($sql_select_registro);
        $statement->bind_param('ss', $user, $pass);
        $statement->execute();
      
        $obj_usuario = $statement->get_result()->fetch_object();
        //var_dump($obj_usuario);

        $statement->close();
        $mysqli->close();
        if (isset($obj_usuario)) {
            $_SESSION["usuario_validado"] = $obj_usuario;
            header('Location: bienvenido.php');
        }
        else{
            $_SESSION["mensaje"] = "Usuario no encontrado";
            header('Location: login.php');
        }

       
    } catch (mysqli_sql_exception $e) {
        echo $e->getMessage();
        exit;
    }
?>