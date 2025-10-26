<?php
    // Start the session
    session_start();
    if (!isset($_SESSION["usuario_validado"])){
        header('Location: login.php');
    }
    $obj_usuario = $_SESSION["usuario_validado"];
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Bootstrap Example</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
        <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.4/dist/jquery.slim.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"></script>
    </head>
    <body>
        <nav class="navbar navbar-expand-sm bg-dark navbar-dark" style="justify-content:space-between;">
            <ul class="navbar-nav">
                <li class="nav-item active">
                    <a class="nav-link" href="#">Active</a>
                </li>
                
                <li class="nav-item">
                    <a class="nav-link" href="#">Link</a>
                </li>
                
                <li class="nav-item">
                    <a class="nav-link" href="#">Link</a>
                </li>

                <li class="nav-item">
                    <a class="nav-link disabled" href="#">Disabled</a>
                </li>
            </ul>           
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="logout.php">Log out</a>
                </li>
            </ul>
        </nav>

        <div class="container">
            <?php
                echo "<pre>";
                var_dump($obj_usuario);
                echo "</pre>";
                echo "Bienvenido " . $obj_usuario ->nombre . " " . $obj_usuario ->apellidos;
            ?>
        </div>
    </body>
</html>