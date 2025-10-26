<?php
// pagina de informacion del servidor
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Informacion del Servidor</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
</head>
<body>
    <div class="container mt-5">
        <h2>Informacion del Servidor PHP</h2>
        <div class="alert alert-info">
            <strong>Version PHP:</strong> <?php echo phpversion(); ?><br>
            <strong>Servidor:</strong> <?php echo $_SERVER['SERVER_SOFTWARE']; ?><br>
            <strong>Nombre del Host:</strong> <?php echo $_SERVER['SERVER_NAME']; ?><br>
            <strong>Protocolo:</strong> <?php echo $_SERVER['SERVER_PROTOCOL']; ?><br>
        </div>
        <a href="index.html" class="btn btn-secondary">Volver</a>
    </div>
</body>
</html>
