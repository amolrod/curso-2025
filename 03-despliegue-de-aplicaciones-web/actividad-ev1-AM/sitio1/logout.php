<?php
    session_start();
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Log out</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
        <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.4/dist/jquery.slim.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"></script>
    </head>
    <body>
        <div class="container">
            <div class="alert alert-info">
                <strong>Info!</strong> 
                    <?php
                        // remove all session variables
                        session_unset();

                        // destroy the session
                        session_destroy();
                        echo "Ha sido desconectado correctamente.<br>";
                    ?>
            </div>
            <a href='login.php'>Login</a>
            <a href='registro.htm'>Registro</a>
        </div>
    </body>
</html>