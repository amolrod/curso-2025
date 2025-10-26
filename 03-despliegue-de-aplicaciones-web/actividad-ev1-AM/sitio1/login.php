<?php
    // Start the session
    session_start();
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Login</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
        <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.4/dist/jquery.slim.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"></script>
    </head>
    <body>
        <div class="container">
            <h2>Login</h2>
            <form method="post" action="login_process.php">
                <div class="form-group">
                    <label for="txtUser">User:</label>
                    <input type="text" class="form-control" id="txtUser" placeholder="Enter user" name="txtUser">
                </div>

                <div class="form-group">
                    <label for="txtPass">Password:</label>
                    <input type="password" class="form-control" id="txtPass" placeholder="Enter password" name="txtPass">
                </div>

                <button type="submit" class="btn btn-primary">Entrar</button>
                <a href="registro.htm" class="btn btn-primary">Darse de alta</a>
            </form>

            <?php
                if (isset($_SESSION["mensaje"])){
                    echo $_SESSION["mensaje"];
                    unset($_SESSION["mensaje"]);
                }
            ?>
        </div>
    </body>
</html>