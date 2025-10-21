<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Listado de Usuarios</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
        <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.4/dist/jquery.slim.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"></script>
    </head>
    <body>
        <div class="container">
            <h2>Listado de Usuarios</h2>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>nombre</th>
                        <th>apellidos</th>
                        <th>user</th>
                        <th>pass</th>
                        <th>reg_date</th>
                        <th colspan='2'>&nbsp;</th>
                    </tr>
                </thead>
                <?php
                    try {
                        require 'Conexion_DB.php';
                        // Report on all types of errors
                        mysqli_report(MYSQLI_REPORT_ALL ^ MYSQLI_REPORT_INDEX);

                        // Prepare an SQL statement for execution
                        $statement = $mysqli->prepare('SELECT * FROM usuarios order by id asc');

                        // Execute a prepared query
                        $statement->execute();

                        // Gets a result set from a prepared statement
                        $result = $statement->get_result();

                        // Fetch object from row/entry in result set
                        while ($usuarios = $result->fetch_object()) {
                            echo "<tr>";
                            echo '<td>' . $usuarios->id .'</td>';
                            echo '<td>' . $usuarios->nombre .'</td>';
                            echo '<td>' . $usuarios->apellidos .'</td>';
                            echo '<td>' . $usuarios->user .'</td>';
                            echo '<td>' . $usuarios->pass .'</td>';
                            echo '<td>' . $usuarios->reg_date .'</td>';
                            echo '<td><button type="button" class="btn btn-primary">Borrar</button></td>';
                            echo '<td><button type="button" class="btn btn-primary">Editar</button></td>';
                            echo "</tr>";
                        }

                        // Close a prepared statement
                        $statement->close();

                        // Close database connection
                        $mysqli->close();
                    } catch (mysqli_sql_exception $e) {
                        // Output error and exit upon exception
                        echo $e->getMessage();
                        exit;
                    }
                ?>
            </table>
        </div>
    </body>
</html>